/**
 * Copyright (c) 2026 BlazeInferno64 --> https://github.com/blazeinferno64
 */
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
const newTabBtn = document.querySelector("#new-win");
const closeTabBtn = document.querySelector("#cl-tab");

const selectAllBtn = document.querySelector("#sel-all");
const copyAllBtn = document.querySelector("#copy-all");
const pasteAllBtn = document.querySelector("#pst-all");
const readTextBtn = document.querySelector("#read-txt")
const readTextBtnPara = readTextBtn.querySelector("p");

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
const fileBg = document.querySelector(".f-bg");
const fileCard = document.querySelector(".f-card");
const replaceBtn = document.querySelector(".replace");
const openFileInfoBtn = document.querySelector("#f-open");
const closeSearchCardBtn = document.querySelector("#close-srch");

const installNotePlusBtn = document.querySelector("#download-noteplus");
const downloadOpt = document.querySelector("#download-Opt");

const stateText = document.querySelector(".state");

const resultMatch = document.querySelector(".res");

const imageIcon = document.querySelector("#im");

const isPWA = window.matchMedia('(display-mode: standalone)').matches || navigator.standalone;

// Hide noscript message and show app body
noScriptTag.classList.add("none");
noScriptTag.style.display = "none";
appBody.classList.remove("none");

let hasUnsavedChanges = false;
let fileType = "";


/**
 * Ready
    Typing…
    Unsaved changes
    Reading file…
    Saving…
    Saved
    Error
 */

const appState = {
    mode: "ready", // ready | typing | reading | saving | error
    dirty: false,  // unsaved changes
    message: "Ready"
};


function setState(mode, message, dirty = appState.dirty) {
    appState.mode = mode;
    appState.message = message;
    appState.dirty = dirty;

    const iconMap = {
        ready: "fa-circle-check",
        typing: "fa-pen",
        reading: "fa-file-lines",
        saving: "fa-floppy-disk",
        error: "fa-triangle-exclamation",
        fetching: "fa-paper-plane",
        info: "fa-circle-info",
        searching: "fa-magnifying-glass",
        view: "fa-file-code",
        closeTab: "fa-arrow-right-from-bracket",
        ai: "fa-hexagon-nodes",
    };
    const icon = document.querySelector("#state-icon");
    icon.className = `fa-solid ${iconMap[mode]}`;

    stateText.textContent = ` State: ${message}`;
}

// Function to detect the current browser
const detectBrowser = () => {
    const userAgent = navigator.userAgent;

    // Check if the environment provides VSCode API
    if (typeof acquireVsCodeApi !== 'undefined' || typeof acquireVsCodeApi === 'function' || userAgent.indexOf("VS") !== -1 || userAgent.indexOf("Code") !== -1) {
        return "VSCode";
    }

    // Tor Browser detection
    if (userAgent.includes("TorBrowser") || userAgent.includes("Tor Browser")) {
        return "Tor";
    }

    // Check for .onion address and Tor-like properties
    if (window.history.length === 1 && window.location.hostname.includes(".onion")) {
        return "Tor";
    }

    // Check for undetermined language (common in Tor Browser)
    if (navigator.languages && navigator.languages.includes("und")) {
        return "Tor";
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
    // Fallback for unknown browsers
    return "Unknown";
};

const detectOS = () => {
    const userAgent = navigator.userAgent;

    //Check for windows
    if (userAgent.indexOf("Windows NT") !== -1) {
        return "Windows";
    }
    //Check for iOS
    if (userAgent.indexOf("iPhone") !== -1) {
        return "iOS";
    }
    //Check for macOS
    if (userAgent.indexOf("Mac OS X") !== -1) {
        return "MacOS";
    }
    //Check for android
    if (userAgent.indexOf("Android") !== -1) {
        return "Android";
    }
    //Check for linux
    if (userAgent.indexOf("Linux") !== -1) {
        return "Linux";
    }
    // If none of the above match then return 'Unknown'
    return "Unknown";
}

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

// Detects env
const detectEnvironment = () => {
    const { hostname, port, protocol } = window.location;
    const host = hostname.toLowerCase();

    const resolvedPort =
        port || (protocol === "https:" ? "443" : "80");

    let platform = "Custom";

    if (host === "localhost" || host === "127.0.0.1" || host === "::1") {
        platform = "Localhost(127.0.0.1)";
    } else if (host.endsWith(".github.io")) {
        platform = "GitHub Pages";
    } else if (host.endsWith(".vercel.app")) {
        platform = "Vercel Serverless Platform";
    }

    return {
        hostname: host,
        port: resolvedPort,
        protocol,
        platform
    };
};



// Function to save file
const saveFile = () => {
    setState("ready", "Saving...", false);
    const text = textInput.innerText;
    const blob = new Blob([text], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${activeFileName.innerText}.txt`;
    link.click();
    URL.revokeObjectURL(link.href);
    link.remove();
    //alert(`File has been saved to the device. Please check your downloads folder.`);
    resetPopupMsg();
    changePopupMsg(`File has been saved to the device. Please check your downloads folder.`);
    openPopup();
    setState("ready", "Ready", false);
}

// Function to detect search query 
const detectSearchQuery = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const text = urlParams.get('text');
    const saveText = urlParams.get('save');

    if (urlParams.has('newtab') && urlParams.get('newtab') === "true") {
        resetPopupMsg();
        changePopupMsg(`Successfully created a new tab with an untitled NotePlus window!`);
        openPopup();
    }

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
    resetPopupMsg();
    openPopup();
    setState("ready", "Ready");
    const name = detectBrowser();
    browserName.innerText = name;
    // Set browser icons
    setBrowserIcon(name);
    wordsCount.innerText = `Total Chars: ${textInput.innerText.length}`;
    textInput.focus();

    // Check if browser supports Web File System API
    if (!window.showSaveFilePicker) {
        changePopupMsg(`Your version of ${detectBrowser()} doesn't currently supports the Web File System API. Some features may not work as intended. Please check browser compatibility at <a href="https://developer.mozilla.org/en-US/docs/Web/API/Window/showSaveFilePicker#browser_compatibility" target="_blank">MDN Web Docs</a>.`, true);
        openPopup();
        console.warn(`Your version of ${detectBrowser()} doesn't currently supports the Web File System API. Please check browser compatibility at https://developer.mozilla.org/en-US/docs/Web/API/Window/showSaveFilePicker#browser_compatibility.`);
        //alert(`Your version of ${detectBrowser()} currently doesn't supports the Web File System API. Some features may not work as intended. Please check the browser console for more information regarding the Web File System API compatibility issue.`);
    }

    fileInfoViewer.textContent = `
    No metadata available!
    Error: No file selected!
    `
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
    const count = e.target.textContent.length;
    wordsCount.innerText = `Total Chars: ${count}`;
    hasUnsavedChanges = true;
    setState("typing", "Typing…", true);
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

// Event listener for close tab btn
closeTabBtn.addEventListener("click", async (e) => {
    setState("closeTab", "Closing the active tab...", false);

    // Attempt to close the window
    window.close();

    // Check if the window is still open after a short delay
    setTimeout(() => {
        if (!window.closed) {
            // If it didn't close, it's likely a security restriction.
            // Provide a fallback or instruction to the user.
            resetPopupMsg();
            changePopupMsg(
                `Browser's security prevented NotePlus from closing this tab automatically. <br><br>` +
                `Please close this tab manually or <a href="about:blank">click here to go to a blank page</a>.`,
                true
            );
            openPopup();
            setState("ready", "Ready", false);
        }
    }, 500);
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

        if (searchBg.className == "srch-bg hide" && fileBg.className == "f-bg hide" && fetchBg.className == "fetch-bg hide" && aiBg.className == 'ai-bg hide') {
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
            //alert(`Successfully created a new untitled document!`);
            resetPopupMsg();
            changePopupMsg(`Successfully created a new untitled document!`);
            openPopup();
            console.log(`New untitled document has been created!`);
            return createNewDocument();
        } else if (userChoice.toLocaleLowerCase() == "n") {
            resetPopupMsg();
            changePopupMsg(`Abort Error: New untitled document creation was aborted!`);
            openPopup();
            return console.warn(`Abort Error: New untitled document creation was aborted!`);
            //return alert(`Abort Error: New untitled document creation was aborted`);
        } else {
            console.error(`Error: Unrecognized command provided: ${userChoice}`);
            resetPopupMsg();
            changePopupMsg(`Error: Unrecognized command provided: ${userChoice}`);
            openPopup();
            return;
        }
    } else {
        //alert(`Successfully created a new untitled document!`);
        resetPopupMsg();
        changePopupMsg(`Successfully created a new untitled document!`);
        openPopup();
        console.log(`New untitled document has been created!`);
        return createNewDocument();
    }
})

// Event listener for openBtn click
openBtn.addEventListener("click", async (e) => {
    try {
        await fileInput.click();
        resetPopupMsg();
        changePopupMsg(`Trying to capture the file...`);
        openPopup();
    } catch (error) {
        console.error(`Error while handling file input click:`, error);
        resetPopupMsg();
        changePopupMsg(`Unexpected error occurred while opening file dialog!`);
        openPopup();
        //alert(`An error occurred while opening file : ${error}`);
    }
});

const readFile = async (file) => {
    let totalChars = 0;
    let reader;

    try {
        // 1. Attempt to get the reader FIRST.
        // If 'file' is a directory, this often throws immediately or on the first read.
        reader = file.stream().getReader();

        const decoder = new TextDecoder("utf-8", { fatal: false });
        let contentChunks = [];

        // 2. Perform a "Probe" read to confirm it's not a folder.
        // Folders will usually fail here.
        const { value: firstValue, done: firstDone } = await reader.read();

        // 3. ONLY CLEAR AFTER SUCCESSFUL PROBE
        // If we reach this line, it's a valid file. Now we wipe the old text.
        textInput.textContent = "";

        if (!firstDone && firstValue) {
            const chunk = decoder.decode(firstValue, { stream: true });
            contentChunks.push(chunk);
            totalChars += chunk.length;
        }

        // 4. Continue with the rest of the stream
        while (!firstDone) {
            const { value, done } = await reader.read();
            if (done) break;

            const chunk = decoder.decode(value, { stream: true });
            contentChunks.push(chunk);
            totalChars += chunk.length;

            setState("reading", `Reading… ${(totalChars / 1024).toFixed(1)} KB`, false);

            if (totalChars % 1048576 < value.length) {
                wordsCount.textContent = `Total Chars: ${totalChars}`;
                await new Promise(requestAnimationFrame);
            }
        }

        textInput.textContent = contentChunks.join("");
        handleFileComplete();
        wordsCount.textContent = `Total Chars: ${totalChars}`;
        setState("ready", "File loaded", false);

    } catch (err) {
        // If a folder was dropped, the error happens above, and we jump here
        // WITHOUT having cleared textInput.textContent.
        setState("error", "Error reading file", false);
        console.error(err);
        throw err; // Pass error back to handleDrop for the alert
    } finally {
        if (reader) reader.releaseLock();
    }
};




/*
let buffer = "";
// Function to process a chunk of file content
const processChunk = (chunk) => {
    buffer += chunk;
    // Perform some operation on the chunk, e.g.:
    // - Wait for the chunk to get processed
    // - Write the chunk to a file
    // - Perform some computation on the chunk
    console.log(`Processing chunks...`);
    if (buffer.length > 5_000_000) { // 5MB
        textInput.textContent += buffer;
        buffer = "";
    }
    // Update the text input with the chunk
    textInput.innerText += chunk;
    wordsCount.innerText = `Total Words: ${textInput.innerText.length}`;
};*/

// Function to handle file completion
const handleFileComplete = () => {
    hasUnsavedChanges = true;
    console.log(`File reading completed successfully!`);
    console.warn(`If any issues occur then please refresh this page and try to open the file again!`);
    textInput.focus();
    resetPopupMsg();
    changePopupMsg(`File reading completed successfully! If any issues occur then please refresh this page and try to open the file again!`);
    openPopup();
    setState("ready", "File loaded", false);
};

const saveAsFile = async () => {
    const text = textInput.innerText;
    const blob = new Blob([text], { type: "text/plain" });

    //let filename = activeFileName.innerText !== "Untitled - NotePlus" ? activeFileName.innerText : appState.fileName;
    let filename = activeFileName.innerText.trim();

    // Check if it's the default "Untitled" state
    if (filename === "Untitled - NotePlus" || filename === "" || !filename) {
        filename = "Untitled - NotePlus.txt"; // Provide a clean default filename with extension
    }

    setState("saving", "Saving…", false);

    try {
        // Check if browser supports Web File System API
        if (!window.showSaveFilePicker) {
            resetPopupMsg();
            changePopupMsg(`Your version of ${detectBrowser()} doesn't currently supports the Web File System API. Some features may not work as intended. Please check browser compatibility at <a href="https://developer.mozilla.org/en-US/docs/Web/API/Window/showSaveFilePicker#browser_compatibility" target="_blank">MDN Web Docs</a>.`, true);
            openPopup();
            console.warn(`Your version of ${detectBrowser()} doesn't currently supports the Web File System API. Please check browser compatibility at https://developer.mozilla.org/en-US/docs/Web/API/Window/showSaveFilePicker#browser_compatibility.`);
            //alert(`Your version of ${detectBrowser()} currently doesn't supports the Web File System API. Some features may not work as intended. Please check the browser console for more information regarding the Web File System API compatibility issue.`);
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
                resetPopupMsg();
                changePopupMsg(`Successfully saved file to the device!`);
                openPopup();
                //alert(`Successfully saved file to the device!`);
                setState("ready", "Saved", false);

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
                { description: `Php File`, accept: { "application/x-httpd-php": [".php"] } },
                { description: "TypeScript File", accept: { "text/typescript": [".ts"] } },
                { description: "C/C++ File", accept: { "text/x-c": [".c", ".cpp", ".h"] } },
                { description: "Java File", accept: { "text/x-java-source": [".java"] } },
                { description: "Markdown File", accept: { "text/markdown": [".md"] } },
                { description: "XML File", accept: { "application/xml": [".xml"] } },
                { description: "YAML File", accept: { "application/x-yaml": [".yml", ".yaml"] } },
                { description: "CSV File", accept: { "text/csv": [".csv"] } },
                { description: "INI File", accept: { "text/plain": [".ini"] } },
                { description: "ENV File", accept: { "text/plain": [".env"] } },
                { description: "Shell Script", accept: { "application/x-sh": [".sh"] } },
                { description: "Batch File", accept: { "application/x-bat": [".bat", ".cmd"] } },
                { description: "PowerShell Script", accept: { "application/x-powershell": [".ps1"] } }


            ]
        });
        const writable = await handle.createWritable();
        await writable.write(blob);
        await writable.close();
        console.log(`File has been successfully saved!`);
        resetPopupMsg();
        changePopupMsg(`Successfully saved file to the device!`);
        openPopup();
        //alert(`Successfully saved file to the device!`);
        setState("ready", "Saved", false);

    } catch (err) {
        //setState("error", "Saving failed", false);
        //console.error(`Saving Failed: ${err}`);
        // Handle specific errors
        if (err.name === 'NotAllowedError') {
            resetPopupMsg();
            changePopupMsg(`File system access is not allowed. Please check your browser settings to enable file system access for NotePlus.`);
            openPopup();
            setState("error", "Saving not allowed", false);
            //alert(`Saving failed: File system access not allowed. Please check your browser settings.`);
        } else if (err.name === 'AbortError') {
            resetPopupMsg();
            changePopupMsg(`Saving request was aborted. If this wasn't intentional, please try saving the file again.`);
            openPopup();
            setState("error", "Saving request aborted", false);
            //alert(`Saving failed: You aborted the request.`);
        } else if (err.name === 'TypeError') {
            resetPopupMsg();
            changePopupMsg(`Please use a supported browser that implements the Web File System API to use the saving feature of NotePlus. Check browser compatibility at <a href="https://developer.mozilla.org/en-US/docs/Web/API/Window/showSaveFilePicker#browser_compatibility" target="_blank">MDN Web Docs</a>.`);
            openPopup();
            setState("error", "Unsupported browser", false);
            //alert(`Please use a supported browser!`);
        }
        else {
            resetPopupMsg();
            changePopupMsg(`An unexpected error occurred while saving the file: ${err.message}. Please try again or check the browser console for more details.`);
            openPopup();
            setState("error", "Saving failed", false);
            //alert(`Saving failed: ${err}`);
        }
    }
}

// Event listener for fileInput change
fileInput.onchange = async (e) => {
    try {
        setState("reading", "Reading file…", false);
        const file = e.target.files[0];
        if (!file) {
            return;
        }
        await parseFile(file);
        readFile(file);
        activeFileName.innerText = file.name ? `${file.name} - NotePlus` : `Untitled - NotePlus`;
        fileType = file.type;
        setState("ready", "File loaded", false);
    } catch (error) {
        setState("error", "Failed to open file", true);
        alert(`Failed to open file`);
    }
};

// Event listener for imageIcon contextmenu
imageIcon.addEventListener("contextmenu", (e) => {
    return e.preventDefault();
})

let isSpeaking = false;
let synthesis = null;
let speechState = 'stopped'; // 'stopped', 'speaking', 'paused'

readTextBtn.addEventListener("click", (e) => {
    try {
        e.stopPropagation();
        resetPopupMsg();
        changePopupMsg(`Processing text-to-speech request...`);
        openPopup();
        const text = textInput.textContent.trim();
        if (!text) {
            resetPopupMsg();
            changePopupMsg(`Nothing to read!`);
            return openPopup();
            //return alert("Nothing to read!")
        };

        if (speechState === 'stopped') {
            synthesis = new SpeechSynthesisUtterance(text);

            synthesis.onend = () => {
                changePopupMsg(`Finished reading the text!`);
                speechState = 'stopped';
                isSpeaking = false;
                readTextBtnPara.innerText = "Read";
            };

            synthesis.onerror = () => {
                changePopupMsg(`An error occurred during speech! Please try again.`);
                speechState = 'stopped';
                isSpeaking = false;
                readTextBtnPara.innerText = "Read";
                console.error("SpeechSynthesis error occurred");
            };

            changePopupMsg(`Speaking the text...`);
            speechSynthesis.speak(synthesis);
            console.log(`Speaking...`);
            speechState = 'speaking';
            isSpeaking = true;
            readTextBtnPara.innerText = "Pause";

        } else if (speechState === 'paused') {
            changePopupMsg(`Resuming speech...`);
            speechSynthesis.resume();
            speechState = 'speaking';
            readTextBtnPara.innerText = "Pause";
            console.log(`Resumed!`);

        } else if (speechState === 'speaking') {
            changePopupMsg(`Pausing speech...`);
            speechSynthesis.pause();
            speechState = 'paused';
            readTextBtnPara.innerText = "Resume";
            console.log(`Paused!`);
        }

    } catch (error) {
        changePopupMsg(`An unexpected error occurred while processing text-to-speech!\nError:${error.message}`);
        speechState = 'stopped';
        isSpeaking = false;
        readTextBtnPara.innerText = "Read";
        console.error(error);
    }
});


// Event listener for saveAsBtn click
saveAsBtn.addEventListener("click", async (e) => {
    return saveAsFile();
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
    //alert(`Please wait while your request is being processed...`);
    resetPopupMsg();
    changePopupMsg(`Please wait while your request is being processed...`);
    openPopup();
    setTimeout(() => {
        window.location.href = `https://github.com/blazeinferno64/NotePlus/issues/new/choose`;
    }, 2000);
});

// Any further changes to NotePlus in future will be updated here
const about = {
    Name: "NotePlus",
    Version: 'Loading...',
    Developer: "BlazeInferno64",
    Platform: detectBrowser(),
    OS: detectOS(),
    Hostname: detectEnvironment().platform,
    Port: detectEnvironment().port
}

// Event listener for versionInfoBtn click
versionInfoBtn.addEventListener("click", (e) => {
    resetPopupMsg();
    changePopupMsg(`
    <b>Name:</b> <a href="https://github.com/blazeinferno64/NotePlus" target="_blank">${about.Name}</a><br>
    <b>Version:</b> <span style="color: #28a75f; font-weight: 600;">${about.Version}</span> (Stable)<br>
    <b>Developer:</b> <a href="https://github.com/blazeinferno64/" target="_blank">${about.Developer}</a><br>
    <hr style="border: 0; border-top: 4px solid #433e50; margin: 10px 0;">
    <b>Platform:</b> <span title="Detected via UserAgent">${about.Platform}</span><br>
    <b>OS:</b> <span>${about.OS}</span><br>
    <b>Environment:</b> <code style="color: #f4f4f4; padding: 2px 4px;">${about.Hostname}:${about.Port}</code>
    <br><br>
    <a href="https://github.com/blazeinferno64/NotePlus/blob/main/LICENSE" target="_blank" style="font-size: 0.8em;">View License</a>
    `, true);
    openPopup();
    //return alert(`Name: ${about.Name}\nVersion: ${about.Version}\nDeveloper: ${about.Developer}\nPlatform: ${about.Platform}\nOS: ${about.OS}\nHostname: ${about.Hostname}\nPort: ${about.Port}`);
})


// Event listener for newTabBtn click
newTabBtn.addEventListener("click", (e) => {
    setState("ready", "Ready", false);
    const aTag = document.createElement("a");
    aTag.href = "?newtab=true";
    aTag.target = "_blank";
    aTag.click();
    aTag.remove();
    console.log(`Successfully created a new tab with an untitled NotePlus window!`);
    resetPopupMsg();
    changePopupMsg(`New Untitled NotePlus window has been created!`);
    openPopup();
    //return alert(`New Untitled NotePlus window has been created!`);
})

// Event listener for copyAllBtn click
copyAllBtn.addEventListener("click", async () => {
    if (!navigator.clipboard) {
        //alert(`Sorry, but your browser doesn't support clipboard copying!`);
        resetPopupMsg();
        changePopupMsg(`Sorry, but your browser doesn't support clipboard copying!`);
        openPopup();
        return;
    }
    try {
        if (textInput.innerText.length === 0) {
            resetPopupMsg();
            changePopupMsg(`There's nothing to copy!\nTry entering some text for this to work!`);
            return openPopup();
            //return alert(`There's nothing to copy!\nTry entering some text for this to work!`);
        }
        await navigator.clipboard.writeText(textInput.innerText);
        console.log(`${textInput.innerText} has been copied to clipboard successfully!`);
        resetPopupMsg();
        changePopupMsg(`Text has been successfully copied to clipboard!`);
        openPopup();
        //alert(`Text has been successfully copied to clipboard!`);
    } catch (error) {
        resetPopupMsg();
        changePopupMsg(`An error occurred while copying to clipboard: ${error.message}. Please try again or check the browser console for more details.`, true);
        openPopup();
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
        resetPopupMsg();
        changePopupMsg(`Your browser doesn't support clipboard pasting! Please check browser compatibility at <a href="https://developer.mozilla.org/en-US/docs/Web/API/Clipboard#browser_compatibility" target="_blank">MDN Web Docs</a>.`, true);
        openPopup();
        alert(`Sorry, but your browser doesn't support clipboard pasting!`);
        return;
    }
    try {
        setState("ready", "Copying...", false);
        resetPopupMsg();
        changePopupMsg(`Pasting from clipboard...`);
        openPopup();
        const text = await navigator.clipboard.readText();
        if (!text) {
            resetPopupMsg();
            changePopupMsg(`NotePlus wasn't able to find any text present on your clipboard as it was empty! Please copy some text and try again!`, true);
            openPopup();
            setState("info", "Clipboard is empty", false);
            console.warn(`Seems like your clipboard is empty!`);
            //return alert(`Error: NotePlus wasn't able to find any text present on your clipboard as it was empty!`);
        }
        resetPopupMsg();
        changePopupMsg(`NotePlus successfully pasted text from clipboard!`);
        openPopup();
        textInput.innerText = text;
    } catch (error) {
        if (error.name = "NotAllowedError") {
            resetPopupMsg();
            changePopupMsg(`Permission Error: You didn't allowed NotePlus to read and write text from your clipboard!`);
            openPopup();
            setState("error", "Clipboard reading not allowed", false);
            console.error(`Permission Error: You didn't allowed NotePlus to read and write text from your clipboard!`);
            //return alert(`Permission Error: You didn't allowed NotePlus to read and write text from your clipboard!`)
        } else {
            resetPopupMsg();
            changePopupMsg(`An unexpected error occurred while accessing the clipboard: ${error.message}. Please try again or check the browser console for more details.`);
            openPopup();
            setState("error", "There was an error", false);
            console.error(error);
            return alert(`An error occured: ${error}`);
        }
    }
});

// Event listener for aboutBtn click
aboutBtn.addEventListener("click", async (e) => {
    //alert(`Please wait while your request is being processed...`);
    resetPopupMsg();
    changePopupMsg(`Please wait while your request is being processed...`);
    openPopup();
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
let folderDrop = false;

const handleDrop = async (event) => {
    try {
        event.preventDefault();
        const droppedFile = event.dataTransfer.files[0];
        if (!droppedFile) return;

        resetPopupMsg();
        changePopupMsg(`Processing dropped file...`);
        openPopup();
        setState("ready", "Reading...", false);

        try {
            // 1. Attempt to read/stream the file first
            // If this throws (e.g., it's a folder), the code jumps to 'catch' 
            // BEFORE changing the filename or clearing the text.
            await readFile(droppedFile);

            // 2. Only if successful, update the file metadata and UI
            fileType = droppedFile.type;
            changePopupMsg(`File reading completed successfully! If any issues occur then please refresh this page and try to open the file again!`);
            await parseFile(droppedFile);
            activeFileName.innerText = droppedFile.name ? `${droppedFile.name} - NotePlus` : `Untitled - NotePlus`;
            setState("ready", "File loaded", false);

        } catch (streamError) {
            // If readFile fails (folders throw here), we reset state but DON'T clear text
            if (folderDrop) return folderDrop = false;
            folderDrop = true;

            changePopupMsg(`Folder dropping isn't yet supported! Please drop a file instead.`, true);
            setState("error", "Folder detected", false);
            //alert(`Folder dropping isn't yet supported by NotePlus`);
        }
    } catch (error) {
        setState("error", "There was an error", false);
        console.error(error);
    }
};


Body.addEventListener("dragover", (event) => {
    setState("info", "File detected", false);
    textInput.focus();
    event.preventDefault();
});

Body.addEventListener("dragleave", (event) => {
    setState("ready", "Ready", false);
    event.preventDefault();
    textInput.blur();
});

Body.addEventListener("drop", handleDrop);

mainElement.addEventListener("dragover", (event) => {
    setState("info", "File detected", false);
    textInput.focus();
    event.preventDefault();
});

mainElement.addEventListener("dragleave", (event) => {
    setState("ready", "Ready", false);
    event.preventDefault();
    textInput.blur();
});

mainElement.addEventListener("drop", handleDrop);

textInput.addEventListener("dragover", (event) => {
    setState("info", "File detected", false);
    textInput.focus();
    event.preventDefault();
});

textInput.addEventListener("dragleave", (event) => {
    setState("info", "File detected", false);
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
    if (e.key === "p" && isCtrlPressed && isAltKeyPressed) {
        newTabBtn.click();
        isCtrlPressed = false;
        return isAltKeyPressed = false;
    }
    if (e.key === "f" && isCtrlPressed && isAltKeyPressed) {
        closeTabBtn.click();
        isCtrlPressed = false;
        return isAltKeyPressed = false;
    }
    if (e.key === "k" && isCtrlPressed && isAltKeyPressed) {
        openFileMenu();
        isCtrlPressed = false;
        return isAltKeyPressed = false;
    }
    if (e.key === "l" && isCtrlPressed && isAltKeyPressed) {
        fetchOpenBtn.click();
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

if ('launchQueue' in window) {
    window.launchQueue.setConsumer(async (launchParams) => {
        if (launchParams.files && launchParams.files.length > 0) {
            const fileHandle = launchParams.files[0];
            const file = await fileHandle.getFile();

            resetPopupMsg();
            changePopupMsg(`Opening file from operating system...`);
            openPopup();
            setState("reading", "Opening from OS...", false);

            await parseFile(file);
            await readFile(file);

            activeFileName.innerText = file.name ? `${file.name} - NotePlus` : `Untitled - NotePlus`;
            fileType = file.type;
            resetPopupMsg();
            changePopupMsg(`File opened successfully from operating system! If any issues occur then please refresh this page and try to open the file again!`);
            openPopup();
            setState("ready", "File loaded", false);
            console.log(`[Launch] Opened file: ${file.name}`);
        }
    })

}

let deferredPrompt = null;
let isAppInstalled = false;
let beforeInstallPromptHandled = false;

// Check if app was uninstalled
function checkIfAppUninstalled() {
    // If beforeinstallprompt fires and we think app is installed, it means it was uninstalled
    if (isAppInstalled && beforeInstallPromptHandled) {
        console.warn('✗ App appears to have been uninstalled!');
        isAppInstalled = false;
        beforeInstallPromptHandled = false;
        localStorage.removeItem("isAppInstalled"); // Clear localStorage
        installNotePlusBtn.style.display = 'block'; // Show download button again
        console.log('[App] Cleared isAppInstalled from localStorage');
    }
}

window.addEventListener("beforeinstallprompt", (e) => {
    e.preventDefault();

    // Check for uninstall
    checkIfAppUninstalled();

    deferredPrompt = e;

    if (!beforeInstallPromptHandled) {
        beforeInstallPromptHandled = true;
        installNotePlusBtn.style.display = 'block'; // Show download button
        console.log("✓ App is ready for the installation process!");
        console.warn(`If changes aren't available then please try to clear this site's data and reload the page again!`);
    }
});

installNotePlusBtn.addEventListener("click", async (e) => {
    if (isAppInstalled) {
        console.log("App is already installed! Checking for updates...");

        // Check for updates
        if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
            navigator.serviceWorker.controller.postMessage({ type: 'CHECK_FOR_UPDATES' });

            // Show a checking message
            const originalText = installNotePlusBtn.innerHTML;
            installNotePlusBtn.innerHTML = '<span><p><i class="fa-solid fa-spinner fa-spin"></i>  Checking for updates...</p></span>';

            // Reset button text after 3 seconds
            setTimeout(() => {
                installNotePlusBtn.innerHTML = originalText;
                return alert(`No updates found!\nYou're already on the latest version of Blaze Audio Player!`);
            }, 3000);
        } else {
            console.warn("Service Worker not available for update check");
            alert("Unable to check for updates. Please refresh the page!");
        }
        return;
    }

    if (deferredPrompt !== null) {
        deferredPrompt.prompt();
        const choiceResult = await deferredPrompt.userChoice;
        if (choiceResult.outcome === 'accepted') {
            console.log('User accepted the install prompt');
            isAppInstalled = true;
            //downloadAppBtn.style.display = 'none';
            localStorage.setItem("isAppInstalled", "true");
        } else {
            console.log('User dismissed the install prompt');
            isAppInstalled = false;
            deferredPrompt = null;
            localStorage.setItem("isAppInstalled", "false");
        }
    }
})


window.addEventListener("appinstalled", (e) => {
    isAppInstalled = true;
    //installNotePlusBtn.innerHTML = '<span><i class="fa-solid fa-spinner fa-spin"></i> <p> Check for updates</p></span>';
    //downloadAppBtn.style.display = 'none'; // Hide download button after installation
    localStorage.setItem("isAppInstalled", "true"); // Persist to localStorage
    console.info("✓ NotePlus has been installed successfully on your device as a standalone app!\nLaunch it from your operating system's app menu!");
    //alert(`Thank you for installing NotePlus!\nYou can now launch it from your device's app menu.\nEnjoy your premium writing/editing experience for free!`);
    resetPopupMsg();
    changePopupMsg(`Thank you for installing NotePlus!<br>You can now launch it from your device's app menu.<br>Enjoy your premium writing/editing experience for free!<br>Please consider giving a ⭐ on <a target="_blank" href="https://github.com/blazeinferno64/NotePlus">Github</a> if you like the app experience :D`, true);
    openPopup();
    deferredPrompt = null;
    installNotePlusBtn.style.display = 'none'; // Hide install button if already in PWA mode

})

// Periodic check for uninstall (every 5 seconds when app reports as installed)
setInterval(() => {
    const storedInstallState = localStorage.getItem("isAppInstalled");

    if (storedInstallState === "true") {
        // App was installed according to localStorage
        // Check if we're still in standalone mode
        const isStandalone = window.navigator.standalone === true ||
            window.matchMedia('(display-mode: standalone)').matches;

        // If NOT in standalone mode and app is NOT running in PWA, check via beforeinstallprompt
        // If beforeinstallprompt can fire, app must be uninstalled
        if (!isStandalone && !beforeInstallPromptHandled) {
            console.warn('✗ App may have been uninstalled - no longer in standalone mode');
            isAppInstalled = false;
            localStorage.removeItem("isAppInstalled");
            //downloadAppBtn.style.display = 'block';
        }
    }
}, 5000);

// Service Worker Update Management
let updateRefreshScheduled = false;

// Check for updates when app loads
window.addEventListener('load', () => {
    if (isPWA) {
        installNotePlusBtn.style.display = 'none'; // Hide install button if already in PWA mode
    }
    // Register service worker if not already registered
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('./service-worker.js')
            .then(registration => {
                const worker = registration.active || registration.installing || registration.waiting;
                console.log('[App] Service Worker registered successfully');

                // Check for updates immediately when app loads
                if (registration.controller) {
                    registration.controller.postMessage({ type: 'CHECK_FOR_UPDATES' });
                }

                if (worker) {
                    const messageChannel = new MessageChannel();

                    // Listen for the reply from SW
                    messageChannel.port1.onmessage = (event) => {
                        if (event.data.version) {
                            about.Version = event.data.version;
                            versionP.innerText = about.Version;
                            console.log(`Version synced from SW: ${about.Version}`);
                        }
                    };

                    // Ask the SW for the version
                    worker.postMessage({ type: 'GET_VERSION' }, [messageChannel.port2]);
                }

                // Optional: Check for updates every 30 seconds
                setInterval(() => {
                    if (registration.controller) {
                        registration.controller.postMessage({ type: 'CHECK_FOR_UPDATES' });
                    }
                }, 30000);
            })
            .catch(error => {
                console.error('[App] Service Worker registration failed:', error);
            });
    }

    // Listen for update notifications from the service worker
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.addEventListener('message', (event) => {
            if (event.data && event.data.type === 'UPDATE_AVAILABLE') {
                console.log('[App] Update available:', event.data.message);

                // Show update notification to user
                showUpdateNotification();
            }

            // Handle installation complete message
            if (event.data && event.data.type === 'INSTALLATION_COMPLETE') {
                console.log('[App] Installation complete:', event.data.message);

                // Show installation complete alert to user
                showInstallationCompleteAlert(event.data.version);
            }
        });
    }
});

// Add this event listener to your script.js
window.addEventListener('swUpdateAvailable', () => {
    showUpdateNotification();
});

// Function to show update notification
function showUpdateNotification() {
    if (updateRefreshScheduled) return;
    updateRefreshScheduled = true;

    const userConfirmed = confirm(
        'A new version of NotePlus is available!\n' +
        'Click OK to update and apply the changes now!'
    );

    if (userConfirmed) {
        // Find the waiting worker and tell it to take over
        navigator.serviceWorker.getRegistration().then(reg => {
            if (reg && reg.waiting) {
                reg.waiting.postMessage({ type: 'SKIP_WAITING' });
            } else {
                alert(`Applying update...`);
                setTimeout(() => {
                    return window.location.reload();
                }, 2000);
                //window.location.reload();
            }
        });
    } else {
        updateRefreshScheduled = false;
    }
}

let shown = false;

// Function to show installation complete notification
function showInstallationCompleteAlert(version) {
    // Show alert that installation is complete
    if (!shown) {
        alert(
            `NotePlus ${version} is ready!\n` +
            'The app has been updated successfully!\n' +
            'Applying changes...'
        );
        shown = true;
        // Reset flag after 2 seconds
        setTimeout(() => {
            shown = false;
        }, 2000);
    }
}

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.addEventListener('message', (event) => {
        if (event.data.type === 'UPDATE_AVAILABLE') {
            showUpdateNotification();
        }

        if (event.data.type === 'NO_UPDATE_FOUND') {
            // Reset button text
            if (isPWA) {
                //alert(`No updates found!\nYou're already on the latest version of NotePlus!`);
                resetPopupMsg();
                changePopupMsg(`No updates found!\nYou're already on the latest version of NotePlus!`);
                openPopup();
                console.log('[App] No update found - app is on the latest version');
            }
        }

        if (event.data.type === 'INSTALLATION_COMPLETE') {
            showInstallationCompleteAlert(event.data.version);
        }
    });

    // Listen for controller change (when service worker updates)
    navigator.serviceWorker.addEventListener('controllerchange', () => {
        console.log('[App] Service worker controller changed - new version is now active');
        window.location.reload();
    });
}