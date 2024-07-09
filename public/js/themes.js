const app = document.querySelector(".app");
const appHead = document.querySelector(".app-head");
const appOptions = document.querySelector(".app-options");
const footer = document.querySelector(".footer");
const mainBg = document.querySelector(".main");

const themeBtn = document.querySelector("#theme");
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
};

const updateThemeButtonText = () => {
    if (themeBtn.innerText === "Light Mode") {
        themeBtn.innerText = "Dark Mode";
    } else {
        themeBtn.innerText = "Light Mode";
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
        console.log("Dark mode is enabled now!");
    } else {
        console.log("Dark mode isn't enabled now!");
    }
};

prefersDarkMode.addListener(applyDarkMode);
applyDarkMode(prefersDarkMode); // Initial check
