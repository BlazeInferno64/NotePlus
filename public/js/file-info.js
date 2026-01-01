/**
 * Copyright (c) 2025 BlazeInferno64 --> https://github.com/blazeinferno64
 */
const closeFileMenuBtn = document.querySelector(".f-close");
const fileInfoViewer = document.querySelector(".f-info");

const fileCopyBtn = document.querySelector(".f-copy");
const fileMetaDataDownloadBtn = document.querySelector(".f-down");

const ENCODING = document.querySelector(".enc");

let prevURL = null;

const openFileMenu = () => {
    fileBg.style.display = 'flex';
    fileBg.classList.remove("hide");
    fileCard.classList.add("ani");
    fileCard.classList.remove("hide");

    setTimeout(() => {
        fileCard.classList.remove("up");
        searchWordInput.focus();
    }, 500);
};

const closeFileMenu = () => {
    fileCard.classList.add("down");
    fileCard.classList.add("anti-ani");
    setTimeout(() => {
        fileCard.classList.add("hide");
    }, 700);
    setTimeout(() => {
        fileBg.classList.add("hide");
        fileCard.classList.remove("anti-ani");
        fileCard.classList.add("hide");
    }, 1000);

    setTimeout(() => {
        fileCard.classList.add("up");
        fileCard.classList.remove("down");
        fileCard.classList.remove("ani");
        fileBg.style.display = 'none';
    }, 1200);
};

const parseFile = async (file) => {
    if (file) {
        setState("view", "Parsing file...", false);
        const fileURL = URL.createObjectURL(file);
        const response = await fetch(fileURL);
        const blobbedResponse = await response.blob();

        const formattedSize = formatBytes(blobbedResponse.size);
        const fileName = file.name;

        const lastModifiedDate = new Date(file.lastModified);
        const now = new Date();
        const timeDiff = Math.floor((now - lastModifiedDate) / 1000);

        let timeAgo;

        if (timeDiff < 60) {
            timeAgo = "just now";
        } else if (timeDiff < 3600) {
            const minutes = Math.floor(timeDiff / 60);
            timeAgo = `${minutes} minute${minutes !== 1 ? 's' : ''} ago`;
        } else if (timeDiff < 86400) {
            const hours = Math.floor(timeDiff / 3600);
            timeAgo = `${hours} hour${hours !== 1 ? 's' : ''} ago`;
        } else if (timeDiff < 604800) { // Less than 7 days
            const days = Math.floor(timeDiff / 86400);
            timeAgo = `${days} day${days !== 1 ? 's' : ''} ago`;
        } else if (timeDiff < 2592000) { // Less than 30 days (but more than or equal to 7 days)
            const weeks = Math.floor(timeDiff / 604800); // 604800 seconds in a week
            timeAgo = `${weeks} week${weeks !== 1 ? 's' : ''} ago`;
        } else if (timeDiff >= 2592000 && timeDiff < 5184000) { // Less than 2 months (but more than or equal to 30 days)
            timeAgo = '1 month ago'; //For anything 30 days or more but less than 2 months
        } else if (timeDiff < 31556952) { // Less than a year
            const months = Math.floor(timeDiff / 2592000); // 2592000 seconds in a month
            timeAgo = `${months} month${months !== 1 ? 's' : ''} ago`;
        } else {
            const years = Math.floor(timeDiff / 31556952); // 31556952 seconds in a year
            timeAgo = `${years} year${years !== 1 ? 's' : ''} ago`;
        }

        const fileMetaJSON = {
            "Name": file.name,
            "Last_Modified": timeAgo,
            "Size": formattedSize,
            "File_Type": blobbedResponse.type,
            "Last-Modified-Date": lastModifiedDate
        }
        encoding.innerText = blobbedResponse.type ? blobbedResponse.type : 'No type available';
        fileInfoViewer.textContent = `{
    "Name": ${fileMetaJSON.Name ? fileMetaJSON.Name : 'No name available'},
    "Size": ${formattedSize ? formattedSize : '0'},
    "File-Type": ${blobbedResponse.type ? blobbedResponse.type : 'No type available'},
    "Last-Modified": ${timeAgo ? timeAgo : 'Undefined'},
    "Last-Modified-Date": ${fileMetaJSON["Last-Modified-Date"] ? fileMetaJSON["Last-Modified-Date"] : 'Undefined'}
}`;
        setState("ready", "Ready", false);
    } else {
        return;
    }
}

const downloadData = (JSONData, file) => {
    const blob = new Blob([JSONData], { type: "application/json" });
    const aTag = document.createElement("a");
    const blobURL = URL.createObjectURL(blob);
    aTag.href = blobURL;
    aTag.download = `${file.name}-Metadata.json`;
    aTag.click();
    URL.revokeObjectURL(aTag.href);
    aTag.remove();
    alert(`${file.name}-Metadata.json file has been succesfully saved to the device!`);
}

function formatBytes(bytes) {
    if (bytes < 0) {
        return "Invalid byte size"; // Handle negative values
    }
    if (bytes === 0) {
        return "0 Bytes"; // Handle zero bytes
    }
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
    const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
    return `${(bytes / Math.pow(1024, i)).toFixed(2)} ${sizes[i]}`;
}

closeFileMenuBtn.addEventListener("click", (e) => {
    setState("ready", "Ready", false);
    return closeFileMenu();
})

openFileInfoBtn.addEventListener("click", (e) => {
    setState("view", "Viewing file info...", false);
    return openFileMenu();
})

fileCopyBtn.addEventListener("click", async (e) => {
    try {
        alert(`Successfully copied!`);
        return await navigator.clipboard.writeText(fileInfoViewer.textContent);
    } catch (error) {
        return alert(error);
    }
})

fileMetaDataDownloadBtn.addEventListener("click", (e) => {
    return downloadData(fileInfoViewer.textContent, fileInput.files[0]);
})