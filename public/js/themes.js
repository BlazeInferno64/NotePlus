const app = document.querySelector(".app");
const appHead = document.querySelector(".app-head");
const appOptions = document.querySelector(".app-options");
const footer = document.querySelector(".footer");
const mainBg = document.querySelector(".main");

const themeBtn = document.querySelector("#theme");

const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark');

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
}

themeBtn.addEventListener("click", (e) =>{
    const modeName = e.target.innerText;
    if(modeName == "Light Mode"){
        switchThemes();
        e.target.innerText = `Dark Mode`;
    }
    else{
        switchThemes();
        e.target.innerText = `Light Mode`;
    }
})

if(prefersDarkMode.matches){
    console.log(`You have enabled dark mode!`);
    switchThemes();
}
else{
    console.log(`You haven't enabled dark mode!`)
    switchThemes();
}

prefersDarkMode.addEventListener("change", (e) => {
    if(e.matches){
        switchThemes();
        console.log(`Dark mode is enabled now!`);
    }
    else{
        console.log(`Dark mode isn't enabled now!`)
    }
})