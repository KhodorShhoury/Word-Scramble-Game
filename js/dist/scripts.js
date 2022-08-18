"use strict";
//declare variables
//start header
let navLinks = [...document.querySelectorAll(".nav .main-links .link")];
//handle navLinks
navLinks.forEach(link => {
    link.addEventListener("click", handleNavLinks);
});
//functions
function handleNavLinks(e) {
    let currentTarget = e.currentTarget;
    navLinks.forEach(link => {
        link.classList.remove("active");
    });
    if (currentTarget.classList.contains("active")) {
        currentTarget.classList.remove("active");
    }
    else {
        currentTarget.classList.add("active");
    }
}
