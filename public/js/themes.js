/**
 * Copyright (c) 2024 BlazeInferno64 --> https://github.com/blazeinferno64
 */
const app = document.querySelector(".app");
const appHead = document.querySelector(".app-head");
const appOptions = document.querySelector(".app-options");
const footer = document.querySelector(".footer");
const mainBg = document.querySelector(".main");
const file_Card = document.querySelector(".f-card");

const themeBtn = document.querySelector("#theme");
const themeBtnText = document.querySelector(".t");
const themeIcon = document.querySelector("#ico");
const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)');

const switchThemes = () => {
    app.classList.toggle("dark");
    appHead.classList.toggle("dark");
    appOptions.classList.toggle("dark");
    footer.classList.toggle("dark");
    mainBg.classList.toggle("dark");
    textInput.classList.toggle("dark");
    themeBtn.classList.toggle("dark");

    helpBtn.classList.toggle("dark");
    editBtn.classList.toggle("dark");
    fileBtn.classList.toggle("dark");

    actionList.classList.toggle("dark");
    editList.classList.toggle("dark");
    helpList.classList.toggle("dark");
    searchCard.classList.toggle("dark");
    file_Card.classList.toggle("dark")
};

const updateThemeButtonText = () => {
    if (themeBtnText.innerText === "Light Mode") {
        themeIcon.classList.remove("fa-circle-half-stroke");
        themeIcon.classList.add("fa-moon");
        return themeBtnText.innerText = "Dark Mode";
    } else {
        themeIcon.classList.add("fa-circle-half-stroke");
        themeIcon.classList.remove("fa-moon");
        return themeBtnText.innerText = "Light Mode";
    }
};

themeBtn.addEventListener("click", () => {
    switchThemes();
    updateThemeButtonText();
});

const applyDarkMode = (e) => {
    if (e.matches) {
        switchThemes();
        updateThemeButtonText();
        console.log("Your system uses Dark Mode");
        themeIcon.classList.add("fa-circle-half-stroke");
        themeIcon.classList.remove("fa-moon");
        themeBtnText.innerText = `Light Mode`
    } else {
        console.log("Your system uses Light Mode");
        themeIcon.classList.remove("fa-circle-half-stroke");
        themeIcon.classList.add("fa-moon");
        themeBtnText.innerText = `Dark Mode`;
    }
};

prefersDarkMode.addListener(applyDarkMode);
applyDarkMode(prefersDarkMode); // Initial check
