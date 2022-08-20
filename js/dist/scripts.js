"use strict";
var _a, _b;
;
//declare variables
let navLinks = [...document.querySelectorAll(".nav .main-links .link")];
let navLinksLI = [...document.querySelectorAll(".nav .main-links .link ul li")];
let levelElement = document.querySelector(".level");
let languageElement = document.querySelector(".language");
let level = (_a = document.querySelector(".current-level")) === null || _a === void 0 ? void 0 : _a.getAttribute("data-level");
let language = (_b = document.querySelector(".current-language")) === null || _b === void 0 ? void 0 : _b.getAttribute("data-language");
let seconds;
let currentShuffledWord = document.querySelector(".word");
let hintText = document.querySelector(".hint-text");
let timeLeft = document.querySelector(".time");
let answerWord = document.querySelector(".enter-word-input");
//buttons
let refreshWordButton = document.querySelector(".refresh-button");
let checkWordButton = document.querySelector(".check-button");
let startGameButton = document.querySelector(".start-game-button");
let endGameButton = document.querySelector(".end-game-button");
//get words from json 
let myRequest = new XMLHttpRequest();
myRequest.open("GET", "../../words.json");
myRequest.send();
let mainData;
myRequest.onloadend = function () {
    if (this.readyState == 4 && this.status == 200) {
        mainData = JSON.parse(myRequest.responseText);
        console.log(mainData);
    }
};
//levels object
let levels = {
    "easy": {
        seconds: 30,
    },
    "normal": {
        seconds: 20,
    },
    "hard": {
        seconds: 15,
    }
};
//handle navLinks
navLinks.forEach(link => {
    link.addEventListener("click", handleNavLinks);
});
navLinksLI.forEach(link => {
    link.addEventListener("click", selectSettings);
});
//functions
//header function
//navLinks function
function handleNavLinks(e) {
    let currentTarget = e.currentTarget;
    if (currentTarget.classList.contains("active")) {
        currentTarget.classList.remove("active");
    }
    else {
        currentTarget.classList.add("active");
    }
    navLinks.forEach(link => {
        link !== currentTarget ? link.classList.remove("active") : "";
    });
}
startGameButton.addEventListener("click", startGame);
//select language and level
function selectSettings(e) {
    let currentTarget = e.currentTarget;
    currentTarget
        .parentNode
        .parentNode
        .querySelector("span")
        .innerHTML = currentTarget.getAttribute(`data-${currentTarget.parentNode.parentNode.classList[1]}`);
    if (currentTarget.dataset.level) {
        level = currentTarget.dataset.level;
        seconds = levels[level].seconds;
        timeLeft.innerHTML = seconds.toString();
    }
    else if (currentTarget.dataset.language) {
        language = currentTarget.dataset.language;
    }
}
//startGame function
function defaultGameSettings() {
    level = "easy";
    levelElement.querySelector("span").innerHTML = level;
    seconds = levels[level].seconds;
    language = "english";
}
function startGame() {
    generateData();
    countDown();
    startGameButton.classList.remove("active");
    endGameButton.classList.add("active");
}
function generateData() {
    let randomIndex = Math.floor(Math.random() * Object.keys(mainData[0][level]).length);
    let selectedWord = mainData[0][level][randomIndex].word;
    let hint = mainData[0][level][randomIndex].hint;
    shuffleWord(selectedWord);
    showData(shuffleWord(selectedWord), hint);
}
function shuffleWord(word) {
    let shuffledWord = word.split("");
    let wordLen = shuffledWord.length, temp, randomNum;
    while (wordLen > 0) {
        randomNum = Math.floor(Math.random() * wordLen);
        temp = shuffledWord[wordLen];
        shuffledWord[wordLen] = shuffledWord[randomNum];
        shuffledWord[randomNum] = temp;
        wordLen--;
    }
    return shuffledWord.join("");
}
//
function showData(word, hint) {
    currentShuffledWord.innerHTML = word;
    hintText.innerHTML = hint;
}
//get time
function countDown() {
    seconds--;
    let countDownInterval = setInterval(() => {
        if (seconds > 0) {
            seconds--;
            timeLeft.innerHTML = seconds.toString();
        }
        else {
            clearInterval(countDownInterval);
            endGame();
        }
    }, 100);
}
function endGame() {
    alert("You Lose");
}
