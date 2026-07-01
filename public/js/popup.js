/**
 * Copyright (c) BlazeInferno64.
 * Licensed under the MIT License. See LICENSE in the project root for license information.
 * Author: BlazeInferno64 (https://blazeinferno64.github.io/)
 */

const popupBg = document.querySelector('.popup-bg');
const popup = document.querySelector('.popup');
const popupMsg = document.querySelector('.popup-msg');
const closePopupBtn = document.querySelector(".popup-close");

let earlyPopupMsg = popupMsg.innerHTML;

if (popup) {
    popup.addEventListener('click', (e) => {
        return e.stopPropagation();
    });
}

const triggerShake = () => {
    popup.classList.remove('shake');
    // Force reflow to restart the animation
    void popup.offsetWidth;
    popup.classList.add('shake');
    popup.addEventListener('animationend', () => {
        popup.classList.remove('shake');
    }, { once: true });
};

const openPopup = (alertOrOptions = false, silent = false) => {
    let alertMode = false;
    let silentMode = false;

    // 1. Parse arguments strictly based on explicit user input
    if (typeof alertOrOptions === 'string') {
        const normalized = alertOrOptions.trim().toLowerCase();
        alertMode = normalized === 'alert' || normalized === 'error' || normalized === 'warning';
        silentMode = normalized === 'silent';
    } else if (typeof alertOrOptions === 'object' && alertOrOptions !== null) {
        alertMode = Boolean(alertOrOptions.alert);
        silentMode = Boolean(alertOrOptions.silent);
    } else {
        alertMode = Boolean(alertOrOptions);
        silentMode = Boolean(silent);
    }

    // 2. Sound type is completely dependent on explicit alertMode status
    const soundType = alertMode ? 'alert' : 'pop';

    const alreadyVisible = popupBg.style.display === "flex" && !popupBg.classList.contains("hide");
    popupBg.style.display = "flex";
    popupBg.classList.remove("hide");

    if (alreadyVisible) {
        if (alertMode) {
            triggerShake();
        }
        if (!silentMode) {
            playSound(soundType);
        }
        return;
    }

    setTimeout(() => {
        popup.classList.remove("go-down");
    }, 500);

    setTimeout(() => {
        popup.classList.remove("hide");
        if (!silentMode) {
            playSound(soundType);
        }
    }, 600);

    setTimeout(() => {
        if (alertMode) {
            requestAnimationFrame(() => {
                triggerShake();
            });
        }
        if (!silentMode) {
            playSound(soundType);
        }
    }, 700)
};

const closePopup = () => {
    popup.classList.add("go-down");
    setTimeout(() => {
        popup.classList.add("hide");
    }, 100);
    setTimeout(() => {
        popupBg.classList.add("hide");
        popupBg.style.display = "none";
    }, 500);
};

const resetPopupMsg = () => {
    return popupMsg.innerHTML = earlyPopupMsg;
};

const changePopupMsg = (msg, html = false) => {
    if (html) {
        popupMsg.innerHTML = msg;
    } else {
        popupMsg.innerText = msg;
    }
};

if (closePopupBtn) {
    closePopupBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        setTimeout(() => {
            if (typeof textInput !== 'undefined') {
                textInput.focus();
            }
        }, 800);
        return closePopup();
    });
}