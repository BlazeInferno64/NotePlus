/**
 * Copyright (c) BlazeInferno64.
 * Licensed under the MIT License. See LICENSE in the project root for license information.
 * Author: BlazeInferno64 (https://blazeinferno64.github.io/)
 */

const popupBg = document.querySelector('.popup-bg');
const popup = document.querySelector('.popup');
const popupMsg = document.querySelector('.popup-msg');
const closePopupBtn = document.querySelector(".popup-close");

let earlyPopupMsg = popupMsg.innerHTML;


if (popup) {
    popup.addEventListener('click', (e) => {
        return e.stopPropagation();
    })
}

const openPopup = () => {
    popupBg.classList.remove("hide");
    setTimeout(() => {
        popup.classList.remove("go-down");
    }, 500);
    setTimeout(() => {
        popup.classList.remove("hide");
    }, 600);
}

const closePopup = () => {
    popup.classList.add("go-down");
    setTimeout(() => {
        popup.classList.add("hide");
    }, 100);
    setTimeout(() => {
        popupBg.classList.add("hide");
    }, 500);
}

const resetPopupMsg = () => {
    return popupMsg.innerHTML = earlyPopupMsg;
}

const changePopupMsg = (msg, html = false) => {
    if (html) {
        popupMsg.innerHTML = msg;
    } else {
        popupMsg.innerText = msg;
    }
}

closePopupBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    setTimeout(() => {
        textInput.focus();
    }, 800);
    return closePopup();
})