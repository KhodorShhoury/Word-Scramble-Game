"use strict";
var _a, _b;
//declare variables
//header variables
let navLinks = [...document.querySelectorAll(".nav .main-links .link")];
let navLinksLI = [...document.querySelectorAll(".nav .main-links .link ul li")];
//level li Element
let levelElement = document.querySelector(".level");
//language li element
let languageElement = document.querySelector(".language");
//level variable
let level = (_a = document.querySelector(".current-level")) === null || _a === void 0 ? void 0 : _a.getAttribute("data-level");
//language variable
let language = (_b = document.querySelector(".current-language")) === null || _b === void 0 ? void 0 : _b.getAttribute("data-language");
//seconds variable
let seconds;
//current Shuffled Word h3
let currentShuffledWord = document.querySelector(".word");
//current word
let currentWord;
// hint span element
let hintText = document.querySelector(".hint-text");
//time span element
let timeLeft = document.querySelector(".time");
//input answer
let answerWord = document.querySelector(".enter-word-input");
//buttons
//refresh button
let refreshWordButton = document.querySelector(".refresh-button");
//checking button
let checkWordButton = document.querySelector(".check-button");
//start button
let startGameButton = document.querySelector(".start-game-button");
//end button
let endGameLoseButton = document.querySelector(".end-game-button");
//gameStarted
let gameStarted = false;
//countDown Interval
let startCountDownInterval;
//get words object from json 
let myRequest = new XMLHttpRequest();
myRequest.open("GET", "../../words.json");
myRequest.send();
//words object data
let mainData;
//check object
myRequest.onloadend = function () {
    if (this.readyState == 4 && this.status == 200) {
        //mainData = array of objects from json file that contains objects contains words
        mainData = JSON.parse(myRequest.responseText);
    }
};
//available levels object
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
//navLinks function
function handleNavLinks(e) {
    if (gameStarted == false) {
        //currenttarget = li.
        let currentTarget = e.currentTarget;
        //check if currentTarget contains active class
        //if yes remove.
        //else add.
        if (currentTarget.classList.contains("active")) {
            currentTarget.classList.remove("active");
        }
        else {
            currentTarget.classList.add("active");
        }
        //close li > ul when click on other li element by removing active from none clicked li.
        navLinks.forEach(link => {
            link !== currentTarget ? link.classList.remove("active") : "";
        });
    }
}
//handle settings
navLinksLI.forEach(link => {
    link.addEventListener("click", selectSettings);
});
//select game settings function
function selectSettings(e) {
    let currentTarget = e.currentTarget;
    currentTarget
        .parentNode
        .parentNode
        .querySelector("span")
        .innerHTML
        = currentTarget.getAttribute(`data-${currentTarget.parentNode.parentNode.classList[1]}`);
    //know what settings user wants to change dynamically.
    //if currentTarget (user clicked element) dataset == level so user want to change level so change level variable to selected level..
    //otherwise user want to change language so change language variable to selected language.
    if (currentTarget.dataset.level) {
        level = currentTarget.dataset.level;
        seconds = levels[level].seconds;
        timeLeft.innerHTML = seconds.toString();
    }
    else if (currentTarget.dataset.language) {
        language = currentTarget.dataset.language;
    }
}
//set Default settings for the game
function setDefaultGameSettings() {
    level = "easy";
    levelElement.children[0].innerHTML = level;
    seconds = levels[level].seconds;
    timeLeft.innerHTML = seconds.toString();
    language = "english";
}
//start game function
setDefaultGameSettings();
function startGame() {
    gameStarted = true;
    //get reversed word with hint
    generateData();
    //start startCountDown
    startCountDown();
    //show end game button if game is started
    startGameButton.classList.remove("active");
    endGameLoseButton.classList.add("active");
}
//generate word and hint
function generateData() {
    //get random number from 0 to how much words we have;
    let randomIndex = Math.floor(Math.random() * Object.keys(mainData[0][level]).length);
    //select word 
    currentWord = mainData[0][level][randomIndex].word;
    //get selected word hint
    let hint = mainData[0][level][randomIndex].hint;
    //shuffle the word
    shuffleWord(currentWord);
    //show word and hint
    showData(shuffleWord(currentWord), hint);
}
//shuffle word
function shuffleWord(word) {
    //word that will be shuffled
    let shuffledWord = word.split("");
    //word length
    let wordLen = shuffledWord.length, 
    //temp variable
    temp, 
    //random number variable
    randomNum;
    //check if wordLength more than 0
    while (wordLen > 0) {
        //generate random number from 0 to word length
        randomNum = Math.floor(Math.random() * wordLen);
        //temp = last word letter
        temp = shuffledWord[wordLen];
        //exchange last word letter with random letter from the same word
        shuffledWord[wordLen] = shuffledWord[randomNum];
        //return random exchanged letter with the last letter that we had;
        shuffledWord[randomNum] = temp;
        // wordLen - 1
        wordLen--;
    }
    //return shuffled word as string not array
    return shuffledWord.join("");
}
//show word and hint function
function showData(word, hint) {
    //html shuffledWord h3 element = shuffledword
    currentShuffledWord.innerHTML = word;
    //html hint element = word hint;
    hintText.innerHTML = hint;
}
//startCountDown function
function startCountDown() {
    seconds--;
    startCountDownInterval = setInterval(() => {
        if (seconds > 0) {
            seconds--;
            timeLeft.innerHTML = seconds.toString();
        }
        else {
            endGameLose();
        }
    }, 1000);
}
function endGameLose() {
    gameStarted = false;
    alert("You Lose");
    clearInterval(startCountDownInterval);
    seconds = levels[level].seconds;
    timeLeft.innerHTML = seconds.toString();
    startGameButton.classList.add("active");
    endGameLoseButton.classList.remove("active");
    answerWord.value = "";
}
function endGameWin() {
    gameStarted = false;
    alert("You win");
    clearInterval(startCountDownInterval);
    seconds = levels[level].seconds;
    timeLeft.innerHTML = seconds.toString();
    startGameButton.classList.add("active");
    endGameLoseButton.classList.remove("active");
    answerWord.value = "";
}
function checkWord() {
    if (gameStarted == true)
        if (answerWord.value.toLowerCase() == currentWord.toLowerCase()) {
            endGameWin();
        }
        else {
            return false;
        }
}
function refreshWord() {
    gameStarted == true ? generateData() : "";
}
function winPopUp() {
}
//buttons events
startGameButton.addEventListener("click", startGame);
endGameLoseButton.addEventListener("click", endGameLose);
checkWordButton.addEventListener("click", checkWord);
refreshWordButton.addEventListener("click", refreshWord);
