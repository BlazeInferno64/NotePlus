const searchWordInput = document.querySelector(".srch");
const replaceWordInput = document.querySelector(".rep");

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
    } catch (error) {
        alert(error.message);
        console.error(error);
    }
});

closeSearchCardBtn.addEventListener("click", (e) => {
    closeSearchMenu();
});

const replaceWord = (string, oldWord, newWord) => {
    if (!string) {
        throw new Error("No string input provided!");
    }
    if (!oldWord) {
        throw new Error("No word supplied for checking!");
    }
    if (!newWord) {
        throw new Error("No word supplied for replacing!");
    }

    const regex = new RegExp(`\\b${oldWord}\\b`, `g`);
    const matches = string.match(regex);
    if (!matches) {
        throw new Error(`No matches found for the word '${oldWord}' in the text!`);
    }

    wordsCount.innerText = `Total Words: ${string.length}`;
    resultMatch.innerText = `Replaced ${matches.length} occurrences`;
    return string.replace(regex, newWord);
};

const searchString = (string, word) => {
    if (!string) {
        throw new Error("No value available to search!");
    }
    if (!word) {
        throw new Error("No word supplied for checking!");
    }

    const regex = new RegExp(`\\b${word}\\b`, `g`);
    const matches = string.match(regex);
    if (matches) {
        resultMatch.classList.add("ok");
        resultMatch.classList.remove("err");
        resultMatch.innerText = `${matches.length} matches found!`;
    } else {
        resultMatch.classList.remove("ok");
        resultMatch.classList.add("err");
        resultMatch.innerText = `No matches found!`;
    }
};

replaceBtn.addEventListener("click", async (e) => {
    try {
        if (!textInput.innerText.includes(searchWordInput.value)) {
            throw new Error(`No match found for the word '${searchWordInput.value}' in the active document!`);
        }

        const output = replaceWord(textInput.innerText, searchWordInput.value, replaceWordInput.value);
        textInput.innerText = output;
    } catch (error) {
        alert(error.message);
        console.error(error);
    }
});

searchWordInput.addEventListener("input", (e) => {
    try {
        if (e.target.value.length <= 0) return;

        resultMatch.classList.remove("ok");
        resultMatch.classList.remove("err");
        resultMatch.innerText = `Searching...`;

        setTimeout(() => {
            searchString(textInput.innerText, searchWordInput.value);
        }, 1000);
    } catch (error) {
        alert(error.message);
        console.error(error);
    }
});

searchWordInput.addEventListener("keydown", (e) => {
    try {
        if(e.target.value.length <= 0) return;
        if(e.keyCode === 13) return replaceWordInput.focus();
    } catch (error) {
        
    }
})


replaceWordInput.addEventListener("keydown", (e) => {
    if(e.keyCode === 13) {
        return replaceBtn.click();
    }
})