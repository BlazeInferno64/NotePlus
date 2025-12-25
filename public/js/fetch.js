/**
 * Copyright (c) 2025 BlazeInferno64 --> https://github.com/blazeinferno64
 */
const fetchBg = document.querySelector(".fetch-bg");
const closeFetchCardBtn = document.querySelector(".fetch-close");

const fetchBtn = document.querySelector(".fetch-ok");

const fetchInput = document.querySelector(".fetch-input input");

const fetchInfo = document.querySelector(".fetch-info");

const openFetchMenu = () => {
    fetchBg.style.display = 'flex';
    fetchBg.classList.remove("hide");
    fetchCard.classList.add("ani");
    fetchCard.classList.remove("hide");

    setTimeout(() => {
        fetchCard.classList.remove("up");
        fetchInput.focus();
    }, 500);
};

const closeFetchMenu = () => {
    fetchCard.classList.add("down");
    fetchCard.classList.add("anti-ani");
    setTimeout(() => {
        fetchCard.classList.add("hide");
    }, 700);
    setTimeout(() => {
        fetchBg.classList.add("hide");
        fetchCard.classList.remove("anti-ani");
        fetchCard.classList.add("hide");
    }, 1000);

    setTimeout(() => {
        fetchCard.classList.add("up");
        fetchCard.classList.remove("down");
        fetchCard.classList.remove("ani");
        fetchBg.style.display = 'none';
    }, 1200);
};

const isValidURL = (url) => {
    try {
        if (!url || typeof url !== 'string' || url.trim() === '') {
            throw new Error('URL is required and must be a non-empty string');
        }
        let trimmed = url.trim();
        if (!trimmed.includes('://')) {
            trimmed = 'https://' + trimmed;
        }
        const urlObj = new URL(trimmed);
        if (!['http:', 'https:'].includes(urlObj.protocol)) {
            throw new Error('URL must use HTTP or HTTPS protocol');
        }
        if (!new URL(url)) {
            throw new Error(`${url} isn't a valid HTTP or HTTPS URL`)
        }
        return trimmed; // Return the possibly modified URL
    } catch (error) {
        if (error.message === 'URL must use HTTP or HTTPS protocol' || error.message === 'URL is required and must be a non-empty string') {
            throw new Error(error);
        }
        //console.log(error.message)
        throw new Error('The provided URL is not valid. Please enter a valid HTTP or HTTPS URL!');
    }
}
const fetchText = async (url) => {
    try {
        const validUrl = isValidURL(url);
        const response = await fetch(validUrl);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        // Reset UI
        textInput.textContent = "";
        hasUnsavedChanges = true;

        fetchInfo.classList.add("ok");
        fetchInfo.classList.remove("err");
        fetchInfo.innerText = `Fetching '${fetchInput.value.trim()}'...`;

        const reader = response.body.getReader();
        const decoder = new TextDecoder();

        let totalChars = 0;
        let buffer = "";

        while (true) {
            const { value, done } = await reader.read();
            if (done) break;

            const chunk = decoder.decode(value, { stream: true });
            buffer += chunk;
            totalChars += chunk.length;

            // Flush occasionally to avoid DOM thrashing
            if (buffer.length > 500_000) { // ~500 KB
                textInput.textContent += buffer;
                buffer = "";

                // Yield to UI thread
                await new Promise(requestAnimationFrame);
            }
        }

        // Flush remaining data
        buffer += decoder.decode();
        if (buffer) textInput.textContent += buffer;

        fetchInfo.innerText = `Loaded text successfully from '${url}'!`;
        closeFetchMenu();

    } catch (error) {
        fetchInfo.classList.remove("ok");
        fetchInfo.classList.add("err");

        if (error.name === "TypeError" && error.message.includes("Failed to fetch")) {
            fetchInfo.innerText =
                "Possible CORS error! Please check your browser console.";
            console.error("CORS / Network error:", error);
            return;
        }

        fetchInfo.innerText = error.message || String(error);
        throw error;
    }
};


closeFetchCardBtn.addEventListener("click", (e) => {
    return closeFetchMenu();
})

fetchInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        return fetchBtn.click();
    }
})


fetchBtn.addEventListener("click", async (e) => {
    try {
        if (!fetchInput.value.trim()) {
            return alert(`Enter a valid URL first!`);
        }
        isValidURL(fetchInput.value.trim());
        /*if (!isValidURL(fetchInput.value.trim())) {
            return alert(`${fetchInput.value.trim()} isn't a valid URL!\nPlease provide a valid URL!`)
        }*/
        fetchInfo.classList.remove("ok");
        fetchInfo.classList.remove("err");
        fetchInfo.innerText = `Sending request to '${fetchInput.value.trim()}'...`;
        const text = await fetchText(fetchInput.value.trim());
        // Do something with the text, e.g., set it to the editor
    } catch (error) {
        /*if (error.message === "TypeError: Failed to construct 'URL': Invalid URL") {
            return alert(`${fetchInput.value.trim()} isn't a valid URL!\nPlease provide a valid URL!`);
        }*/
        console.error(error);
        alert(error.message);
    }
})

