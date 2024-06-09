const textInput = document.querySelector(".text");

const browserName = document.querySelector("#browser");
const encoding = document.querySelector("#encoding");


const mainElement = document.querySelector(".main");
const footerElement = document.querySelector(".footer");

const wordsCount = document.querySelector(".count");

const fileBtn = document.querySelector("#file");
const helpBtn = document.querySelector("#help");
const editBtn = document.querySelector("#edit");

const actionList = document.querySelector(".action-list");
const editList = document.querySelector(".edit-list");
const helpList = document.querySelector(".help-list");

const activeFileName = document.querySelector(".file-av");

const fileInput = document.querySelector("#file-input");
const openBtn = document.querySelector("#open-file");

const saveAsBtn = document.querySelector("#sv-as");

const saveBtn = document.querySelector("#sv");

const exitBtn = document.querySelector("#ex");

const selectAllBtn = document.querySelector("#sel-all");
const copyAllBtn = document.querySelector("#copy-all");
const pasteAllBtn = document.querySelector("#pst-all");

const aboutBtn = document.querySelector("#ab");
const reportIssuesBtn = document.querySelector("#rp");
const versionInfoBtn = document.querySelector("#vr");

const Body = document.querySelector("body");

const images = document.querySelectorAll(".img");

const noScriptTag = document.querySelector("#no-script");
const appBody = document.querySelector(".app");

noScriptTag.classList.add("none");
appBody.classList.remove("none");

let hasUnsavedChanges = false;

const detectBrowser = () => {
    let browserInfo = navigator.userAgent;
    let browser;

    if(browserInfo.includes("Opera") || browserInfo.includes("Opr")){
        browser = "Opera";
    }
    else if(browserInfo.includes("Edg") || browserInfo.includes("Edge")){
        browser = "Edge";
    }
    else if(browserInfo.includes("Chrome")){
        browser = "Chrome";
    }
    else if(browserInfo.includes("Safari")){
        browser = "Safari";
    }
    else if(browserInfo.includes("Firefox")){
        browser = "FireFox"
    }
    else if(browserInfo.includes("Brave")){
        browser = "Brave"
    }
    else if(browserInfo.includes("PostmanRuntime")){
        browser = "PostmanRuntime"
    }
    else{
        browser = "Unknown";
    }
    return browser;
}

document.addEventListener("DOMContentLoaded", (e) => {
    const name = detectBrowser();
    browserName.innerText = name;
    wordsCount.innerText = `Total Words: ${textInput.innerText.length}`;
    textInput.focus();
    return console.log(`Welcome to NotePlus text editor :)\nIt's an free open source text editor based on Notepad which is a text editor that comes pre-installed with windows!\nVisit https://github.com/blazeinferno64/NotePlus for more amazing info regarding this project!`)
})

window.addEventListener("load", (e) => {

})

mainElement.addEventListener("click", (e) => {
    if(e.target.className == "footer"){
        return textInput.focus();
    }
    else{
        textInput.focus();
    }
})

textInput.addEventListener("input", (e) => {
    const count = e.target.innerText.length
    wordsCount.innerText = `Total Words: ${count}`;
    hasUnsavedChanges = true;
})


const hideActionList = () => {
    actionList.classList.toggle("hide");
    setTimeout(() => {
        actionList.classList.toggle("up")
    }, 100);
}

const hideEditList = () => {
    editList.classList.toggle("hide");
    setTimeout(() => {
        editList.classList.toggle("up")
    }, 100);
}

const hideHelpList = () => {
    helpList.classList.toggle("hide");
    setTimeout(() => {
        helpList.classList.toggle("up")
    }, 100);
}

fileBtn.addEventListener("click", (e) => {
    fileBtn.classList.toggle("active");
    helpBtn.classList.remove("active");
    editBtn.classList.remove("active");
    hideActionList();

    editBtn.classList.remove("active");
    editList.classList.add("hide");
    setTimeout(() => {
        editList.classList.add("up")
    }, 100);

    helpBtn.classList.remove("active");
    helpList.classList.add("hide");
    setTimeout(() => {
        helpList.classList.add("up")
    }, 100);
})

editBtn.addEventListener("click", (e) => {
    fileBtn.classList.remove("active");
    helpBtn.classList.remove("active");
    editBtn.classList.toggle("active");
    hideEditList();

    fileBtn.classList.remove("active");
    actionList.classList.add("hide");
    setTimeout(() => {
        actionList.classList.add("up")
    }, 100);

    helpBtn.classList.remove("active");
    helpList.classList.add("hide");
    setTimeout(() => {
        helpList.classList.add("up")
    }, 100);
})

helpBtn.addEventListener("click", (e) => {
    fileBtn.classList.remove("active");
    helpBtn.classList.toggle("active");
    editBtn.classList.remove("active");
    hideHelpList();

    fileBtn.classList.remove("active");
    actionList.classList.add("hide");
    setTimeout(() => {
        actionList.classList.add("up")
    }, 100);

    editBtn.classList.remove("active");
    editList.classList.add("hide");
    setTimeout(() => {
        editList.classList.add("up")
    }, 100);
})

document.addEventListener("click", (e) => {
    if(e.target.className == "fl" || e.target.className == "set" || e.target.className == "ed" || e.target.className == "he"){
        return;
    }
    else{
        fileBtn.classList.remove("active");
        actionList.classList.add("hide");
        setTimeout(() => {
            actionList.classList.add("up")
        }, 100);

        editBtn.classList.remove("active");
        editList.classList.add("hide");
        setTimeout(() => {
            editList.classList.add("up")
        }, 100);

        helpBtn.classList.remove("active");
        helpList.classList.add("hide");
        setTimeout(() => {
            helpList.classList.add("up")
        }, 100);

        return textInput.focus();
    }
})

openBtn.addEventListener("click", async(e) => {
    return await fileInput.click();
})

const readFile = (file) => {
    const fileReader = new FileReader();
    fileReader.readAsText(file);
    fileReader.addEventListener("load", async(e) => {
        let result = await fileReader.result;
        hasUnsavedChanges = true;
        await console.log(`File reading has been successfully completed!`);
        console.warn(`If any issues occur try to refresh this page`);
        textInput.innerText = result;
        return wordsCount.innerText = `Total Words: ${textInput.innerText.length}`
    })

    fileReader.addEventListener("error", (e) => {
        console.error(e);
        alert(`Oops! There was an error reading the file! Please check Browser Console for more information!`)
    })

    fileReader.addEventListener("abort", (e) => {
        console.error(`File reading was aborted!`);
        console.warn(`If you believe this is an bug, then please file an issue here https://github.com/blazeinferno64/Noteplus`);
        return alert(`The file reading was aborted!`);
    })
}

fileInput.onchange = (e) => {
    const file = e.target.files[0];
    if(!file){
        return;
    }
    readFile(file);
    if(file.name == ""){
        activeFileName.innerText = `Untitled - NotePlus`;
    }
    activeFileName.innerText = `${file.name} - NotePlus`
}


saveAsBtn.addEventListener("click", async (e) => {
    const text = textInput.innerText.length;
    const blob = new Blob([text], { type: "text/plain" });

    let filename;

    if(activeFileName.innerText == "Untitled - NotePlus"){
        filename = `NotePlus File`;
    }
    else{
        const name = activeFileName.innerText.split(" ");
        filename = `${name[0]} - NotePlus`;
    }

    try {
        const handle = await window.showSaveFilePicker({
            suggestedName: filename,
            types: [
                {
                    description: `Text File`,
                    accept: {
                        "text/plain": [".txt"]
                    }
                },
                {
                    description: `HTML File`,
                    accept: {
                        "text/html": [".html"]
                    }
                },
                {
                    description: `JavaScript File`,
                    accept: {
                        "text/javascript": [".js"]
                    }
                },
                {
                    description: `CSS File`,
                    accept: {
                        "text/css": [".css"]
                    }
                },
                {
                    description: `JSON File`,
                    accept: {
                        "application/json": [".json"]
                    }
                },
                {
                    description: `Python File`,
                    accept: {
                        "text/x-python": [".py"]
                    }
                }
            ]
        })
        
        
        const writable = await handle.createWritable();
        await writable.write(blob);
        await writable.close();
        console.log(`File has been successfully saved!`);
    } catch (err) {
        alert(err);
        console.error(`Saving Failed: ${err}!`)
    }
})

saveBtn.addEventListener("click", (e) => {
    const text = textInput.innerText;
    const blob = new Blob([text], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${activeFileName.innerText}`;
    link.click();
    URL.revokeObjectURL(link.href);
    link.remove();
    alert(`File has been saved to the device`)
})


exitBtn.addEventListener("click", (e) => {
    fileBtn.classList.remove("active");
    actionList.classList.add("hide");
    setTimeout(() => {
        actionList.classList.add("up")
    }, 100);
})

reportIssuesBtn.addEventListener("click", async(e) => {
    const txt = `Please wait while your request is being processed...`;
    alert(txt);
    setTimeout(() => {
        window.location.href = `https://github.com/blazeinferno64/NotePlus`
    }, 3000);
})

versionInfoBtn.addEventListener("click", (e) => {
    // Any further changes to NotePlus in future will be updated here
    const about = {
        Name: "NotePlus",
        Version: 1,
        Developer: "BlazeInferno64",
        Platform: detectBrowser()
    }
    alert(`Name: ${about.Name}\nVersion: ${about.Version}\nDeveloper: ${about.Developer}\nPlatform: ${about.Platform}`);
})

aboutBtn.addEventListener("click", async(e) => {
    alert(`Please wait while your request is being processed...`);
    setTimeout(() => {
        window.location.href = `https://github.com/blazeinferno64/NotePlus`
    }, 2000);
})

pasteAllBtn.addEventListener("click", async(e) => {
    if(!navigator.clipboard){
        alert(`Sorry but your browser doesn't support Clipboard pasting!`);
        return;
    }
    try {
        const text = await navigator.clipboard.readText();
        textInput.innerText = text;
    } catch (error) {
        alert(`An error occured: ${error}!`);
        return console.error(error);
    }
})

copyAllBtn.addEventListener("click", async(e) => {
    if(!navigator.clipboard){
        return alert(`Sorry but your doesn't supports Clipboard pasting!`);
    }
    try {
        if(textInput.innerText == ""){
            return alert(`There's nothing to copy!\nTry entering some text for this to work!`)
        }
        await navigator.clipboard.writeText(textInput.innerText);
        console.log(`${textInput.innerText} has been copied to clipboard successfully!`)
        return alert(`Text has been successfully copied to clipboard!`);
    } catch (error) {
        
    }
})

selectAllBtn.addEventListener("click", (e) => {
    if(textInput.innerText == ""){
        return alert(`Cannot select as there isn't any text!\nTry entering some text for this to work!`);
    }
    else{
        const selection = window.getSelection();
        const range = document.createRange();
        range.selectNodeContents(textInput);
        selection.removeAllRanges();
        selection.addRange(range);
    }
})

let isCtrlPressed = false;

document.addEventListener("keydown", (e) => {
    if (e.ctrlKey){
        isCtrlPressed = true;
    }
});

document.addEventListener("keyup", (e) => {
    if (e.key === "m" && isCtrlPressed) {
        saveBtn.click();
        isCtrlPressed = false
    }
    if(e.key === "b" && isCtrlPressed){
        openBtn.click();
    }
    if(e.key === "i" && isCtrlPressed){
        saveAsBtn.click();
    }
})


window.addEventListener("beforeunload", (e) => {
    if(hasUnsavedChanges){
        e.preventDefault();
        e.returnValue = "";
        return "Are you sure you want to leave? You have unsaved changes";
    }
})

window.addEventListener("drop", (event) => {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files[0];
    if(droppedFile){
        readFile(droppedFile);
        if(droppedFile.name == ""){
            activeFileName.innerText = `Untitled - NotePlus`;
        }
        activeFileName.innerText = `${droppedFile.name} - NotePlus`;
    }
})

mainElement.addEventListener("drop", (event) => {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files[0];
    if(droppedFile){
        readFile(droppedFile);
        if(droppedFile.name == ""){
            activeFileName.innerText = `Untitled - NotePlus`;
        }
        activeFileName.innerText = `${droppedFile.name} - NotePlus`;
    }
})

textInput.addEventListener("drop", (event) => {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files[0];
    if(droppedFile){
        readFile(droppedFile);
        if(droppedFile.name == ""){
            activeFileName.innerText = `Untitled - NotePlus`;
        }
        activeFileName.innerText = `${droppedFile.name} - NotePlus`;
    }
})

Body.addEventListener("drop", (event) => {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files[0];
    if(droppedFile){
        readFile(droppedFile);
        if(droppedFile.name == ""){
            activeFileName.innerText = `Untitled - NotePlus`;
        }
        activeFileName.innerText = `${droppedFile.name} - NotePlus`;
    }
})

images.forEach(img => {
    img.addEventListener("contextmenu", (e) => {
        e.preventDefault();
    })
})