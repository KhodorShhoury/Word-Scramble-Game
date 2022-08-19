"use strict";;
//declare variables
let navLinks : Element[] = [...document.querySelectorAll(".nav .main-links .link")];
let navLinksLI : Element[] = [...document.querySelectorAll(".nav .main-links .link ul li")];
let levelElement = document.querySelector(".level");
let languageElement = document.querySelector(".language");
let level  = document.querySelector(".current-level")?.getAttribute("data-level") as string;
let language = document.querySelector(".current-language")?.getAttribute("data-language") as string;
let currenReversedtWord = document.querySelector(".word") as HTMLHeadingElement;
let hintText = document.querySelector(".hint-text") as HTMLSpanElement;
let timeLeft = document.querySelector(".time") as HTMLSpanElement;
let answerWord = document.querySelector(".enter-word-input") as HTMLInputElement;
//buttons
let refreshWordButton = document.querySelector(".refresh-button") as HTMLButtonElement;
let checkWordButton = document.querySelector(".check-button") as HTMLButtonElement;
let startGameButton = document.querySelector(".start-game-button") as HTMLButtonElement;
//get words from json 
let myRequest = new XMLHttpRequest();
myRequest.open("GET","../../words.json");
myRequest.send();
interface keyable {
    [key: string]: any  
}
let mainData : [keyable];
myRequest.onloadend = function(){
    if(this.readyState == 4 && this.status == 200){
        mainData = JSON.parse(myRequest.responseText);
        console.log(mainData)
    }
}
//levels object
let levels : object = {
    "easy" : {
        seconds : 30,
    },
    "normal" : {
        seconds : 20,
    },
    "hard" : {
        seconds : 15,
    }
}
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
function handleNavLinks(e : any) {
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
startGameButton.addEventListener("click",startGame);
//select language and level
function selectSettings(e : any) : void{
    let currentTarget  = e.currentTarget;
    currentTarget
    .parentNode
    .parentNode
    .querySelector("span")
    .innerHTML = currentTarget.getAttribute(`data-${currentTarget.parentNode.parentNode.classList[1]}`);
    if(currentTarget.dataset.level){
        level = currentTarget.dataset.level;
    }else if (currentTarget.dataset.language){
        language = currentTarget.dataset.language;
    }
}

//startGame function
function startGame() : void{
    GenerateWord();
}

function GenerateWord() : void {
    let randomIndex = Math.floor(Math.random() * Object.keys(mainData[0][level]).length);
    let selectedWord = mainData[0][level][randomIndex];
    reverseWord(selectedWord.word);
}
function reverseWord(word : String){
    let reversedWord = word.split("");
    let wordLen = reversedWord.length,
    temp,
    randomNum;
    while(wordLen > 0){
        randomNum = Math.floor(Math.random() * wordLen);
        
        temp = reversedWord[wordLen];

        reversedWord[wordLen] = reversedWord[randomNum];

        reversedWord[randomNum] = temp;
        wordLen--;
    }
    console.log(reversedWord.join(""),word)
}