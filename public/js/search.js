/**
 * Copyright (c) 2026 BlazeInferno64 --> https://github.com/blazeinferno64
 */
const searchWordInput = document.querySelector(".srch");
const replaceWordInput = document.querySelector(".rep");

// Helper to escape regex special characters to prevent crashes
const escapeRegExp = (string) => string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

// Function to visually highlight matches in the contenteditable div
const highlightMatches = (term) => {
    if (!term) {
        textInput.innerHTML = textInput.innerText;
        return;
    }

    const text = textInput.innerText;
    const regex = new RegExp(`(${escapeRegExp(term)})`, 'gi');
    
    // We use innerHTML to inject the <mark> tags for the glow effect
    textInput.innerHTML = text.replace(regex, '<mark class="match">$1</mark>');
};

searchCard.addEventListener("input", (e) => {
    if (replaceWordInput.value.length <= 0) return replaceBtn.classList.add("no");
    else {
        return replaceBtn.classList.remove("no");
    }
});

const openSearchMenu = () => {
    searchBg.style.display = 'flex';
    searchBg.classList.remove("hide");
    searchCard.classList.add("ani");
    searchCard.classList.remove("hide");

    setTimeout(() => {
        searchCard.classList.remove("up");
        searchWordInput.focus();
    }, 500);
};

const closeSearchMenu = () => {
    searchCard.classList.add("down");
    searchCard.classList.add("anti-ani");
    
    // CRITICAL: Remove highlights before closing so the text is clean
    textInput.innerHTML = textInput.innerText;

    setTimeout(() => {
        searchCard.classList.add("hide");
    }, 700);
    setTimeout(() => {
        searchBg.classList.add("hide");
        searchCard.classList.remove("anti-ani");
        searchCard.classList.add("hide");
    }, 1000);

    setTimeout(() => {
        searchCard.classList.add("up");
        searchCard.classList.remove("down");
        searchCard.classList.remove("ani");
        searchBg.style.display = 'none';
    }, 1200);
};

searchBtn.addEventListener("click", (e) => {
    try {
        if (textInput.innerText.length <= 0) {
            throw new Error("There isn't any text available to search!\nTry entering some text for this to work!");
        }
        openSearchMenu();
        setState("searching", "Searching started...", false);
    } catch (error) {
        resetPopupMsg();
        changePopupMsg(error.message);
        openPopup();
        console.error(error);
    }
});

closeSearchCardBtn.addEventListener("click", (e) => {
    setState("ready", "Ready", false);
    return closeSearchMenu();
});

const replaceWord = (string, oldWord, newWord) => {
    if (!string || !oldWord) return string;

    const regex = new RegExp(escapeRegExp(oldWord), 'g');
    const matches = string.match(regex);
    
    if (!matches) {
        throw new Error(`No matches found for '${oldWord}'`);
    }

    const result = string.replace(regex, newWord);
    resultMatch.innerText = `Replaced ${matches.length} occurrences`;
    return result;
};

const searchString = (string, word) => {
    if (!string || !word) {
        resultMatch.innerText = "";
        textInput.innerHTML = textInput.innerText; // Clear highlights if input is empty
        return;
    };

    const regex = new RegExp(escapeRegExp(word), 'gi');
    const matches = string.match(regex);

    if (matches) {
        resultMatch.classList.add("ok");
        resultMatch.classList.remove("err");
        resultMatch.innerText = `${matches.length} matches found!`;
        highlightMatches(word); // Apply the highlights
    } else {
        resultMatch.classList.remove("ok");
        resultMatch.classList.add("err");
        resultMatch.innerText = `No matches found!`;
        textInput.innerHTML = textInput.innerText; // Clear highlights if no matches
    }
};

replaceBtn.addEventListener("click", async (e) => {
    try {
        const text = textInput.innerText;
        const searchVal = searchWordInput.value;
        const replaceVal = replaceWordInput.value;

        if (!text.toLowerCase().includes(searchVal.toLowerCase())) {
            throw new Error(`No match found for '${searchVal.trim()}'`);
        }

        // We update the innerText to strip any highlight tags before saving the replace
        textInput.innerText = replaceWord(text, searchVal, replaceVal);
        setState("ready", "Text replaced", false);
    } catch (error) {
        alert(error.message);
        console.error(error);
    }
});

let searchTimeout;

searchWordInput.addEventListener("input", (e) => {
    const term = e.target.value;
    
    if (term.length <= 0) {
        resultMatch.innerText = "";
        textInput.innerHTML = textInput.innerText;
        return;
    }

    clearTimeout(searchTimeout);
    resultMatch.classList.remove("ok", "err");
    resultMatch.innerText = `Searching...`;

    searchTimeout = setTimeout(() => {
        try {
            searchString(textInput.innerText, term);
            setState("ready", "Ready", false);
        } catch (err) {
            console.error(err);
        }
    }, 300);
});

searchWordInput.addEventListener("keydown", (e) => {
    if (e.target.value.length > 0 && e.keyCode === 13) {
        replaceWordInput.focus();
    }
});

replaceWordInput.addEventListener("keydown", (e) => {
    if (e.keyCode === 13) {
        replaceBtn.click();
        setState("ready", "Ready", false);
    }
});

textInput.addEventListener("focus", () => {
    // If there are highlights, clear them so typing isn't buggy
    if (textInput.querySelector("mark.match")) {
        textInput.innerHTML = textInput.innerText;
    }
});