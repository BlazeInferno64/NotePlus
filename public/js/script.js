const textInput = document.querySelector(".text");

const browserName = document.querySelector("#browser");
const browserIcon = document.querySelector("#browser-icon");
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
const newDocumentBtn = document.querySelector("#new-doc");

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
let fileType = "";

// Function to detect the current browser
const detectBrowser = () => {
    const userAgent = navigator.userAgent;

    // Check if the environment provides VSCode API
    if (typeof acquireVsCodeApi !== 'undefined') {
        return "VSCode";
    }

    // Tor Browser detection
    if (userAgent.includes("TorBrowser")) {
        return "Tor Browser";
    }

    // Check for .onion address and Tor-like properties
    if (window.history.length === 1 && window.location.hostname.includes(".onion")) {
        return "Tor Browser";
    }

    // Check for undetermined language (common in Tor Browser)
    if (navigator.languages && navigator.languages.includes("und")) {
        return "Tor Browser";
    }

    // Standard browser detection based on user agent string
    if (userAgent.includes("Opera") || userAgent.includes("OPR")) {
        return "Opera";
    }
    if (userAgent.includes("Edg") || userAgent.includes("Edge")) {
        return "Edge";
    }
    if (userAgent.includes("Chrome")) {
        return "Chrome";
    }
    if (userAgent.includes("Safari")) {
        return "Safari";
    }
    if (userAgent.includes("Firefox")) {
        return "Firefox";
    }
    if (userAgent.includes("Brave")) {
        return "Brave";
    }
    if (userAgent.includes("SamsungBrowser")) {
        return "Samsung Internet";
    }
    if (userAgent.includes("PostmanRuntime")) {
        return "Postman";
    }
    if (userAgent.includes("Insomnia")) {
        return "Insomnia";
    } 
    if (userAgent.indexOf("Code") !== -1 && userAgent.indexOf("VS") !== -1) {
        return "VSCode";
    }
    // Fallback for unknown browsers
    return "Unknown";
};

// Function to set browser icon based on browser name
const setBrowserIcon = (name) => {
    const classes = ["fa-edge", "fa-opera", "fa-brave", "fa-safari", "fa-firefox", "fa-chrome", "fa-triangle-exclamation", "fa-code", "fa-user-secret"];

    // Remove all existing icon classes
    browserIcon.classList.remove(...classes);

    switch (name) {
        case "Chrome":
            browserIcon.classList.add("fa-chrome");
            break;
        case "Edge":
            browserIcon.classList.add("fa-edge");
            break;
        case "Brave":
            browserIcon.classList.add("fa-brave");
            break;
        case "Safari":
            browserIcon.classList.add("fa-safari");
            break;
        case "Opera":
            browserIcon.classList.add("fa-opera");
            break;
        case "Unknown":
            browserIcon.classList.add("fa-triangle-exclamation");
            break;
        case "Firefox":
            browserIcon.classList.add("fa-firefox");
            break;
        case "VSCode":
            browserIcon.classList.add("fa-code");
            break;
        case "Insomnia":
            browserIcon.classList.add("fa-code");
            break;
        case "Postman":
            browserIcon.classList.add("fa-code");
            break;
        case "Tor Browser":
            browserIcon.classList.add("fa-user-secret");
            break;
        case "Samsung Internet":
            browserIcon.classList.add("fa-triangle-exclamation");
            break;
        default:
            browserIcon.classList.add("fa-triangle-exclamation");
            break;
    }
};

// Function to save file
const saveFile = () => {
    const text = textInput.innerText;
    const blob = new Blob([text], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${activeFileName.innerText}.txt`;
    link.click();
    URL.revokeObjectURL(link.href);
    link.remove();
    alert(`File has been saved to the device. Please check your downloads folder.`);
}

// Function to detect search query 
const detectSearchQuery = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const text = urlParams.get('text');
    const saveText = urlParams.get('save');

    if (!urlParams.has('text') && urlParams.toString() === "" && !urlParams.has('save')) {
        return;
    } else {
        if (text === "") {
            alert(`Error: Text search query is present, but it doesn't have any value!`)
            console.log(`Text search query is present, but it doesn't have any value!`);
        }
        if (saveText === "") {
            if (text !== null) {
                textInput.innerText = text;
                hasUnsavedChanges = true;
            }
            alert(`Error: Save query is present, but the value is empty!`)
            console.log(`Save query is present, but the value is empty!`)
        }
        else if (text !== null && saveText === null) {
            console.log(`Found text query: ${text}`);
            textInput.innerText = text;
            return hasUnsavedChanges = true
        }
        else if (text === null && saveText !== null) {
            alert(`Error: Save query is present, but failed to save file as there isn't any text query`);
            return console.warn(`Save query is present, but failed to save file as there isn't any text query`)
        }
        else if (text !== null && saveText !== null) {
            textInput.innerText = text;
            hasUnsavedChanges = true;
            if (saveText === "true") {
                saveFile();
            }
            else if (saveText === "false") {
                hasUnsavedChanges = true;
                if (text !== null) {
                    alert(`Error: Text query is present, but didn't got saved as the save query is set to false`)
                    console.warn(`Text query is present, but didn't got saved as the save query is set to false`);
                }
                else {
                    alert(`Error: Text search query is absent`)
                    return console.warn(`Text query is absent!`);
                }
            }
            else {
                alert(`Error: Invalid save query provided: ${saveText}`)
                console.error(`Invalid save query provided: ${saveText}`)
                return hasUnsavedChanges = true;
            }
        }
    }
}

// Event listener when DOM content is loaded
document.addEventListener("DOMContentLoaded", (e) => {
    const name = detectBrowser();
    browserName.innerText = name;
    // Set browser icons
    setBrowserIcon(name);
    wordsCount.innerText = `Total Words: ${textInput.innerText.length}`;
    textInput.focus();

    // Check if browser supports Web File System API
    if (!window.showSaveFilePicker) {
        console.warn(`Your browser doesn't currently support the Web File System API. Please check browser compatibility at https://developer.mozilla.org/en-US/docs/Web/API/Window/showSaveFilePicker#browser_compatibility.`);
        alert(`Your browser currently doesn't support the Web File System API. Some features may not work as intended. Please check the browser console for more information.`);
    }

    console.log(`Welcome to NotePlus text editor :)`);
    console.log(`NotePlus is a free open-source text editor based on Notepad. Visit https://github.com/blazeinferno64/NotePlus for more information.`);
    return detectSearchQuery();
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

// Event listener for fileBtn click
fileBtn.addEventListener("click", (e) => {
    fileBtn.classList.toggle("active");
    helpBtn.classList.remove("active");
    editBtn.classList.remove("active");

    actionList.classList.toggle("hide");
    setTimeout(() => {
        actionList.classList.toggle("up");
    }, 100);
    editList.classList.add("hide");
    setTimeout(() => {
        editList.classList.add("up");
    }, 100);

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

    actionList.classList.add("hide");
    setTimeout(() => {
        actionList.classList.add("up");
    }, 100);

    editList.classList.toggle("hide");
    setTimeout(() => {
        editList.classList.toggle("up");
    }, 100);

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

    actionList.classList.add("hide");
    setTimeout(() => {
        actionList.classList.add("up");
    }, 100);

    editList.classList.add("hide");
    setTimeout(() => {
        editList.classList.add("up");
    }, 100);

    helpList.classList.toggle("hide");
    setTimeout(() => {
        helpList.classList.toggle("up");
    }, 100);
})

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

        if (searchBg.className == "srch-bg hide") {
            textInput.focus();
        }
        else {
            return;
        }
    }
});

const createNewDocument = () => {
    activeFileName.innerText = `Untitled - NotePlus`;
    textInput.innerText = "";
    textInput.focus();
}

// Event listener for newDocumentBtn click
newDocumentBtn.addEventListener("click", (e) => {
    if (hasUnsavedChanges) {
        const userChoice = prompt(`You have unsaved changes, do you wish to continue?\nType in Y for yes and N for no`);
        if (!userChoice) return;
        if (userChoice.toLocaleLowerCase() == "y") {
            alert(`Successfully created a new untitled document!`);
            console.log(`New untitled document has been created!`);
            return createNewDocument();
        } else if (userChoice.toLocaleLowerCase() == "n") {
            console.warn(`Abort Error: New untitled document creation was aborted!`);
            return alert(`Abort Error: New untitled document creation was aborted`);
        } else {
            console.error(`Error: Unrecognized command provided: ${userChoice}`);
            return alert(`Error: Unrecognized command provided: ${userChoice}`);
        }
    } else {
        alert(`Successfully created a new untitled document!`);
        console.log(`New untitled document has been created!`);
        return createNewDocument();
    }
})

// Event listener for openBtn click
openBtn.addEventListener("click", async (e) => {
    try {
        await fileInput.click();
    } catch (error) {
        console.error(`Error while handling file input click:`, error);
        alert(`An error occurred while opening file : ${error}`);
    }
});

const readFile = (file) => {
    const CHUNK_SIZE = 1024 * 1024; // 1MB chunk size, adjust as needed
    let offset = 0;

    textInput.innerText = "";

    const fileReader = new FileReader();

    fileReader.addEventListener("error", (e) => {
        console.error(`Error reading file '${file.name}':`, e.target.error);
        alert(`Error: Failed to read file '${file.name}'. Please check the console for more information!`);
    });

    fileReader.addEventListener("abort", (e) => {
        console.warn(`File reading aborted for '${file.name}'.`);
        alert(`File reading aborted for '${file.name}'!`);
    });

    fileReader.addEventListener("load", (e) => {
        const chunk = fileReader.result;
        processChunk(chunk); // Process the chunk here

        // Continue reading next chunk if file is not fully read
        if (offset < file.size) {
            readNextChunk();
        } else {
            // File reading completed
            handleFileComplete();
        }
    });

    // Function to read next chunk
    const readNextChunk = () => {
        const slice = file.slice(offset, offset + CHUNK_SIZE);
        fileReader.readAsText(slice);
        offset += CHUNK_SIZE;
    };

    // Start reading the first chunk
    readNextChunk();
};

// Function to process a chunk of file content
const processChunk = (chunk) => {
    // Perform some operation on the chunk, e.g.:
    // - Wait for the chunk to get processed
    // - Write the chunk to a file
    // - Perform some computation on the chunk
    console.log(`Processing chunks...`);
    // Update the text input with the chunk
    textInput.innerText += chunk;
    wordsCount.innerText = `Total Words: ${textInput.innerText.length}`;
};

// Function to handle file completion
const handleFileComplete = () => {
    hasUnsavedChanges = true;
    console.log(`File reading completed successfully!`);
    console.warn(`If any issues occur then please refresh this page and try to open the file again!`);
    textInput.focus();
};

// Event listener for fileInput change
fileInput.onchange = (e) => {
    const file = e.target.files[0];
    if (!file) {
        return;
    }
    readFile(file);
    activeFileName.innerText = file.name ? `${file.name} - NotePlus` : `Untitled - NotePlus`;
    return fileType = file.type;
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

        let options = [
            { description: `HTML File`, accept: { "text/html": [".html"] } },
            { description: `Text File`, accept: { "text/plain": [".txt"] } },
            { description: `JavaScript File`, accept: { "text/javascript": [".js"] } },
            { description: `CSS File`, accept: { "text/css": [".css"] } },
            { description: `JSON File`, accept: { "application/json": [".json"] } },
            { description: `Python File`, accept: { "text/x-python": [".py"] } },
            { description: `Php File`, accept: { "application/x-httpd-php": [".php"] } }
        ];


        for (let option of options) {
            if (fileType === option.accept) {
                const handle = await window.showSaveFilePicker({
                    suggestedName: filename,
                    types: option.accept,
                });
                const writable = await handle.createWritable();
                await writable.write(blob);
                await writable.close();
                console.log(`File has been successfully saved!`);
                alert(`Successfully saved file to the device!`);
                return;
            }
        }

        // Handle default case here if no specific fileType matches
        const handle = await window.showSaveFilePicker({
            suggestedName: filename,
            types: [
                { description: `Text File`, accept: { "text/plain": [".txt"] } },
                { description: `HTML File`, accept: { "text/html": [".html"] } },
                { description: `JavaScript File`, accept: { "text/javascript": [".js"] } },
                { description: `CSS File`, accept: { "text/css": [".css"] } },
                { description: `JSON File`, accept: { "application/json": [".json"] } },
                { description: `Python File`, accept: { "text/x-python": [".py"] } },
                { description: `Php File`, accept: { "application/x-httpd-php": [".php"] } }
            ]
        });
        const writable = await handle.createWritable();
        await writable.write(blob);
        await writable.close();
        console.log(`File has been successfully saved!`);
        alert(`Successfully saved file to the device!`);

    } catch (err) {
        console.error(`Saving Failed: ${err}`);
        // Handle specific errors
        if (err.name === 'NotAllowedError') {
            alert(`Saving failed: File system access not allowed. Please check your browser settings.`);
        } else if (err.name === 'AbortError') {
            alert(`Saving failed: You aborted the request.`);
        } else {
            alert(`Saving failed: ${err.message}`);
        }
    }
});


// Event listener for saveBtn click
saveBtn.addEventListener("click", (e) => {
    saveFile();
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
    Version: '3.9',
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
        alert(error);
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
        if (!text) {
            console.warn(`Seems like your clipboard is empty!`);
            return alert(`Error: NotePlus wasn't able to find any text present on your clipboard as it was empty!`);
        }
        textInput.innerText = text;
    } catch (error) {
        if (error.name = "NotAllowedError") {
            console.error(`Permission Error: You didn't allowed NotePlus to read and write text from your clipboard!`);
            return alert(`Permission Error: You didn't allowed NotePlus to read and write text from your clipboard!`)
        } else {
            console.error(error);
            return alert(`An error occured: ${error}`);
        }
    }
});

// Event listener for aboutBtn click
aboutBtn.addEventListener("click", async (e) => {
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
let folderDrop = false; // Flag to track if folder drop error has been shown

const handleDrop = (event) => {
    try {
        event.preventDefault();
        const droppedFile = event.dataTransfer.files[0];
        if (droppedFile) {
            const reader = new FileReader();
            reader.onload = () => {
                fileType = droppedFile.type;
                readFile(droppedFile);
                activeFileName.innerText = droppedFile.name ? `${droppedFile.name} - NotePlus` : `Untitled - NotePlus`;
            };
            reader.onerror = () => {
                if (folderDrop) return folderDrop = false;
                folderDrop = true;
                return alert(`Folder dropping isn't yet supported by NotePlus`)
            };
            reader.readAsArrayBuffer(droppedFile);
        }
    } catch (error) {
        console.error(error);
        return alert(`${error}`);
    }
};


Body.addEventListener("dragover", (event) => {
    textInput.focus();
    event.preventDefault();
});

Body.addEventListener("dragleave", (event) => {
    event.preventDefault();
    textInput.blur();
});

Body.addEventListener("drop", handleDrop);

mainElement.addEventListener("dragover", (event) => {
    textInput.focus();
    event.preventDefault();
});

mainElement.addEventListener("dragleave", (event) => {
    event.preventDefault();
    textInput.blur();
});

mainElement.addEventListener("drop", handleDrop);

textInput.addEventListener("dragover", (event) => {
    textInput.focus();
    event.preventDefault();
});

textInput.addEventListener("dragleave", (event) => {
    event.preventDefault();
    textInput.blur();
});

textInput.addEventListener("drop", handleDrop);

// Additional drag and drop listeners for other elements if needed

// Ctrl Key value
let isCtrlPressed = false;
// Alt Key value
let isAltKeyPressed = false;

// Check if the key pressed is Ctrl key or not
document.addEventListener("keydown", (e) => {
    isAltKeyPressed = false;
    isCtrlPressed = false;
    if (e.ctrlKey) {
        if (e.altKey) {
            isAltKeyPressed = true;
        }
        isCtrlPressed = true;
    }
    else {
        isCtrlPressed = false;
        isAltKeyPressed = false;
    }
});
// Check what other key is pressed with Ctrl key
document.addEventListener("keyup", (e) => {
    if (e.key === "m" && isCtrlPressed && !isAltKeyPressed) {
        saveBtn.click();
        return isCtrlPressed = false;
    }
    if (e.key === "o" && isCtrlPressed && isAltKeyPressed) {
        fileInput.click();
        isCtrlPressed = false;
        return isAltKeyPressed = false;
    }
    if (e.key === "x" && isCtrlPressed && !isAltKeyPressed) {
        saveAsBtn.click();
        return isCtrlPressed = false;
    }
    if (e.key === "j" && isCtrlPressed && isAltKeyPressed) {
        newDocumentBtn.click();
        isCtrlPressed = false;
        return isAltKeyPressed = false;
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
