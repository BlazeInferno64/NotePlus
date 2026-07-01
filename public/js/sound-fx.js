const alertSoundPath = '/public/sound/alert.mp3';
const popSoundPath = '/public/sound/pop.wav';
const clickSoundPath = '/public/sound/click.mp3';
const beepSoundPath = '/public/sound/beep.mp3';

const soundObject = {
    alert: alertSoundPath,
    pop: popSoundPath,
    click: clickSoundPath,
    beep: beepSoundPath
}

// Use Web Audio API to preload and play decoded buffers for low-latency playback.
let audioCtx = null;
const audioBuffers = {};

async function ensureAudioContext() {
    if (!audioCtx) {
        try {
            audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        } catch (err) {
            audioCtx = null;
        }
    }
    if (audioCtx && audioCtx.state === 'suspended') {
        // resume on the next user interaction — many browsers require this.
        try { await audioCtx.resume(); } catch (e) { /* ignore */ }
    }
}

async function loadSound(url) {
    if (!('fetch' in window) || !('AudioContext' in window || 'webkitAudioContext' in window)) {
        return null;
    }
    try {
        const res = await fetch(url);
        const arrayBuffer = await res.arrayBuffer();
        await ensureAudioContext();
        if (!audioCtx) return null;
        const audioBuffer = await audioCtx.decodeAudioData(arrayBuffer.slice(0));
        return audioBuffer;
    } catch (err) {
        console.warn('Failed to load sound', url, err);
        return null;
    }
}

// Start preloading all sounds (best-effort).
(function preloadAll() {
    Object.entries(soundObject).forEach(([key, url]) => {
        loadSound(url).then(buf => {
            if (buf) audioBuffers[key] = buf;
        });
    });
})();

const playSound = async (type) => {
    // Prefer WebAudio buffer playback when available (lowest latency).
    const buffer = audioBuffers[type];
    if (buffer && (window.AudioContext || window.webkitAudioContext)) {
        await ensureAudioContext();
        if (!audioCtx) {
            // fall back to HTMLAudio
            const a = new Audio(soundObject[type]);
            a.play().catch(() => {});
            return;
        }
        const src = audioCtx.createBufferSource();
        src.buffer = buffer;
        src.connect(audioCtx.destination);
        try {
            src.start(0);
        } catch (e) {
            // If start fails, fallback
            const a = new Audio(soundObject[type]);
            a.play().catch(() => {});
        }
        return;
    }

    // Fallback: use preloaded/cloned HTMLAudio for reasonable latency
    try {
        const htmlAudio = new Audio(soundObject[type]);
        htmlAudio.preload = 'auto';
        htmlAudio.play().catch(() => {});
    } catch (err) {
        // last-resort silence
    }
}