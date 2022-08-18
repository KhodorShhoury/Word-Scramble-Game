//declare variables
//start header
let navLinks : Element[] = [...document.querySelectorAll(".nav .main-links .link")];
//handle navLinks
navLinks.forEach(link => {
    link.addEventListener("click",handleNavLinks);
});

//functions
function handleNavLinks(e : any){
    let currentTarget = e.currentTarget;
     navLinks.forEach(link => {
         link.classList.remove("active")
     });
     if(currentTarget.classList.contains("active")){
         currentTarget.classList.remove("active");
     }else{
         currentTarget.classList.add("active");
     }
 }
 