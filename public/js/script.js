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

const versionP = document.querySelector("#ver");

const searchBtn = document.querySelector("#srch");
const searchCard = document.querySelector(".srch-card");
const searchBg = document.querySelector(".srch-bg");
const replaceBtn = document.querySelector(".replace");
const closeSearchCardBtn = document.querySelector("#close-srch")

const resultMatch = document.querySelector(".res");

// Hide noscript message and show app body
noScriptTag.classList.add("none");
appBody.classList.remove("none");

let hasUnsavedChanges = false;

// Function to detect the current browser
const detectBrowser = () => {
    let browserInfo = navigator.userAgent;
    let browser;

    if (typeof acquireVsCodeApi !== 'undefined') {
        return "VSCode";
    }

    // Check for Tor Browser based on user agent and additional properties
    if (browserInfo.includes("TorBrowser")) {
        browser = "Tor Browser";
    } else if (typeof window !== 'undefined' && window.history.length === 1 && window.location.hostname.includes(".onion")) {
        // Check if the hostname is a .onion address and history.length is 1 (indicating a new circuit in Tor)
        browser = "Tor Browser";
    } else if (navigator.languages && navigator.languages.includes("und")) {
        // Check if navigator.languages includes "und" (undetermined language) which is common in Tor Browser
        browser = "Tor Browser";
    } else {
        // Other browser detection logic as before
        if (browserInfo.includes("Opera") || browserInfo.includes("OPR")) {
            browser = "Opera";
        } else if (browserInfo.includes("Edg") || browserInfo.includes("Edge")) {
            browser = "Edge";
        } else if (browserInfo.includes("Chrome")) {
            browser = "Chrome";
        } else if (browserInfo.includes("Safari")) {
            browser = "Safari";
        } else if (browserInfo.includes("Firefox")) {
            browser = "Firefox";
        } else if (browserInfo.includes("Brave")) {
            browser = "Brave";
        } else if (browserInfo.includes("SamsungBrowser")) {
            browser = "Samsung Internet";
        } else if (browserInfo.includes("PostmanRuntime")) {
            browser = "Postman";
        } else if (browserInfo.includes("Insomnia")) {
            browser = "Insomnia";
        } else {
            browser = "Unknown";
        }
    }
    
    return browser;
}

// Event listener when DOM content is loaded
document.addEventListener("DOMContentLoaded", (e) => {
    const name = detectBrowser();
    browserName.innerText = name;
    wordsCount.innerText = `Total Words: ${textInput.innerText.length}`;
    textInput.focus();

    // Check if browser supports Web File System API
    if (!window.showSaveFilePicker) {
        console.warn(`Your browser doesn't currently support the Web File System API. Please check browser compatibility at https://developer.mozilla.org/en-US/docs/Web/API/Window/showSaveFilePicker#browser_compatibility.`);
        alert(`Your browser currently doesn't support the Web File System API. Some features may not work as intended. Please check the browser console for more information.`);
    }

    console.log(`Welcome to NotePlus text editor :)`);
    console.log(`NotePlus is a free open-source text editor based on Notepad. Visit https://github.com/blazeinferno64/NotePlus for more information.`);
});

// Event listener for mainElement clicks
mainElement.addEventListener("click", (e) => {
    if (e.target.className == "footer") {
        textInput.focus();
    } else {
        textInput.focus();
    }
});

// Event listener for textInput changes
textInput.addEventListener("input", (e) => {
    const count = e.target.innerText.length;
    wordsCount.innerText = `Total Words: ${count}`;
    hasUnsavedChanges = true;
});

// Function to toggle action list visibility
const hideActionList = () => {
    actionList.classList.toggle("hide");
    setTimeout(() => {
        actionList.classList.toggle("up");
    }, 100);
};

// Function to toggle edit list visibility
const hideEditList = () => {
    editList.classList.toggle("hide");
    setTimeout(() => {
        editList.classList.toggle("up");
    }, 100);
};

// Function to toggle help list visibility
const hideHelpList = () => {
    helpList.classList.toggle("hide");
    setTimeout(() => {
        helpList.classList.toggle("up");
    }, 100);
};

// Event listener for fileBtn click
fileBtn.addEventListener("click", (e) => {
    fileBtn.classList.toggle("active");
    helpBtn.classList.remove("active");
    editBtn.classList.remove("active");
    hideActionList();

    editBtn.classList.remove("active");
    editList.classList.add("hide");
    setTimeout(() => {
        editList.classList.add("up");
    }, 100);

    helpBtn.classList.remove("active");
    helpList.classList.add("hide");
    setTimeout(() => {
        helpList.classList.add("up");
    }, 100);
});

// Event listener for editBtn click
editBtn.addEventListener("click", (e) => {
    fileBtn.classList.remove("active");
    helpBtn.classList.remove("active");
    editBtn.classList.toggle("active");
    hideEditList();

    fileBtn.classList.remove("active");
    actionList.classList.add("hide");
    setTimeout(() => {
        actionList.classList.add("up");
    }, 100);
    helpBtn.classList.remove("active");
    helpList.classList.add("hide");
    setTimeout(() => {
        helpList.classList.add("up");
    }, 100);
});

// Event listener for helpBtn click
helpBtn.addEventListener("click", (e) => {
    fileBtn.classList.remove("active");
    helpBtn.classList.toggle("active");
    editBtn.classList.remove("active");
    hideHelpList();

    fileBtn.classList.remove("active");
    actionList.classList.add("hide");
    setTimeout(() => {
        actionList.classList.add("up");
    }, 100);

    editBtn.classList.remove("active");
    editList.classList.add("hide");
    setTimeout(() => {
        editList.classList.add("up");
    }, 100);
});

// Event listener to close action, edit, and help lists when clicking outside
document.addEventListener("click", (e) => {
    if (!e.target.classList.contains("fl") &&
        !e.target.classList.contains("set") &&
        !e.target.classList.contains("ed") &&
        !e.target.classList.contains("he")) {
        fileBtn.classList.remove("active");
        actionList.classList.add("hide");
        setTimeout(() => {
            actionList.classList.add("up");
        }, 100);

        editBtn.classList.remove("active");
        editList.classList.add("hide");
        setTimeout(() => {
            editList.classList.add("up");
        }, 100);

        helpBtn.classList.remove("active");
        helpList.classList.add("hide");
        setTimeout(() => {
            helpList.classList.add("up");
        }, 100);

        if(searchBg.className == "srch-bg hide"){
            textInput.focus();
        }
        else{
            return;
        }
    }
});

// Event listener for openBtn click
openBtn.addEventListener("click", async (e) => {
    await fileInput.click();
});

// Function to read file content
const readFile = (file) => {
    const fileReader = new FileReader();
    fileReader.readAsText(file);
    
    fileReader.addEventListener("load", async (e) => {
        let result = await fileReader.result;
        hasUnsavedChanges = true;
        console.log(`File reading has been successfully completed!`);
        console.warn(`If any issues occur try to refresh this page.`);
        textInput.innerText = result;
        wordsCount.innerText = `Total Words: ${textInput.innerText.length}`;
        return textInput.focus();
    });

    fileReader.addEventListener("error", (e) => {
        console.error(e);
        alert(`Oops! There was an error reading the file. Please check Browser Console for more information.`);
    });

    fileReader.addEventListener("abort", (e) => {
        console.error(`File reading was aborted!`);
        console.warn(`If you believe this is a bug, please file an issue at https://github.com/blazeinferno64/NotePlus`);
        alert(`The file reading was aborted!`);
    });
};

// Event listener for fileInput change
fileInput.onchange = (e) => {
    const file = e.target.files[0];
    if (!file) {
        return;
    }
    readFile(file);
    activeFileName.innerText = file.name ? `${file.name} - NotePlus` : `Untitled - NotePlus`;
};

// Event listener for saveAsBtn click
saveAsBtn.addEventListener("click", async (e) => {
    const text = textInput.innerText;
    const blob = new Blob([text], { type: "text/plain" });

    let filename = activeFileName.innerText !== "Untitled - NotePlus" ? activeFileName.innerText : "NotePlus File";

    try {
        // Check if browser supports showSaveFilePicker
        if (!window.showSaveFilePicker) {
            throw new Error(`Your browser doesn't support the Web File System API.`);
        }


        const handle = await window.showSaveFilePicker({
            suggestedName: filename,
            types: [
                { description: `Text File`, accept: { "text/plain": [".txt"] } },
                { description: `HTML File`, accept: { "text/html": [".html"] } },
                { description: `JavaScript File`, accept: { "text/javascript": [".js"] } },
                { description: `CSS File`, accept: { "text/css": [".css"] } },
                { description: `JSON File`, accept: { "application/json": [".json"] } },
                { description: `Python File`, accept: { "text/x-python": [".py"] } }
            ]
        });

        const writable = await handle.createWritable();
        await writable.write(blob);
        await writable.close();
        console.log(`File has been successfully saved!`);
    } catch (err) {
        console.error(`Saving Failed: ${err}`);
        // Handle specific errors
        if (err.name === 'NotAllowedError') {
            alert(`Saving failed: File system access not allowed. Please check your browser settings.`);
        } else {
            alert(`Saving failed: ${err.message}`);
        }
    }
});

// Event listener for saveBtn click
saveBtn.addEventListener("click", (e) => {
    const text = textInput.innerText;
    const blob = new Blob([text], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${activeFileName.innerText}.txt`;
    link.click();
    URL.revokeObjectURL(link.href);
    link.remove();
    alert(`File has been saved to the device.`);
});

// Event listener for exitBtn click
exitBtn.addEventListener("click", (e) => {
    fileBtn.classList.remove("active");
    actionList.classList.add("hide");
    setTimeout(() => {
        actionList.classList.add("up");
    }, 100);
});

// Event listener for reportIssuesBtn click
reportIssuesBtn.addEventListener("click", async (e) => {
    alert(`Please wait while your request is being processed...`);
    setTimeout(() => {
        window.location.href = `https://github.com/blazeinferno64/NotePlus/issues/new/choose`;
    }, 2000);
});

// Any further changes to NotePlus in future will be updated here
const about = {
    Name: "NotePlus",
    Version: '3.5',
    Developer: "BlazeInferno64",
    Platform: detectBrowser()
}

// Event listener for versionInfoBtn click
versionInfoBtn.addEventListener("click", (e) => {
    alert(`Name: ${about.Name}\nVersion: ${about.Version}\nDeveloper: ${about.Developer}\nPlatform: ${about.Platform}`);
})

versionP.innerText = about.Version;

// Event listener for copyAllBtn click
copyAllBtn.addEventListener("click", async () => {
    if (!navigator.clipboard) {
        alert(`Sorry, but your browser doesn't support clipboard copying!`);
        return;
    }
    try {
        if (textInput.innerText === "") {
            return alert(`There's nothing to copy!\nTry entering some text for this to work!`);
        }
        await navigator.clipboard.writeText(textInput.innerText);
        console.log(`${textInput.innerText} has been copied to clipboard successfully!`);
        alert(`Text has been successfully copied to clipboard!`);
    } catch (error) {
        console.error(error);
    }
});

// Event listener for selectAllBtn click to select all text in textInput
selectAllBtn.addEventListener("click", () => {
    if (textInput.innerText === "") {
        return alert(`Cannot select as there isn't any text!\nTry entering some text for this to work!`);
    } else {
        const selection = window.getSelection();
        const range = document.createRange();
        range.selectNodeContents(textInput);
        selection.removeAllRanges();
        selection.addRange(range);
    }
});

// Event listener for pasteAllBtn click to paste clipboard content to textInput
pasteAllBtn.addEventListener("click", async () => {
    if (!navigator.clipboard) {
        alert(`Sorry, but your browser doesn't support clipboard pasting!`);
        return;
    }
    try {
        const text = await navigator.clipboard.readText();
        textInput.innerText = text;
    } catch (error) {
        alert(`An error occurred: ${error}!`);
        console.error(error);
    }
});

// Event listener for aboutBtn click
aboutBtn.addEventListener("click", async(e) => {
    alert(`Please wait while your request is being processed...`);
    setTimeout(() => {
        window.location.href = `https://github.com/blazeinferno64/NotePlus`
    }, 2000);
})

// Event listener for images click
images.forEach((image) => {
    image.addEventListener("click", (e) => {
        alert(`NotePlus was made by blazeinferno64 on GitHub!`);
    });
});

// Drag and drop listeners
const handleDrop = (event) => {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files[0];
    if (droppedFile) {
        readFile(droppedFile);
        activeFileName.innerText = droppedFile.name ? `${droppedFile.name} - NotePlus` : `Untitled - NotePlus`;
    }
};

Body.addEventListener("dragover", (event) => {
    event.preventDefault();
});

Body.addEventListener("drop", handleDrop);

mainElement.addEventListener("dragover", (event) => {
    event.preventDefault();
});

mainElement.addEventListener("drop", handleDrop);

textInput.addEventListener("dragover", (event) => {
    event.preventDefault();
});

textInput.addEventListener("drop", handleDrop);

// Additional drag and drop listeners for other elements if needed


let isCtrlPressed = false;

document.addEventListener("keydown", (e) => {
    if (e.ctrlKey){
        isCtrlPressed = true;
    }
    else{
        isCtrlPressed = false;
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

// Event listener for beforeunload to prompt user with unsaved changes
window.addEventListener("beforeunload", (e) => {
    if (hasUnsavedChanges) {
        const confirmationMessage = "You have unsaved changes. Are you sure you want to leave?";
        e.returnValue = confirmationMessage;
        return confirmationMessage;
    }
});
