// menu

const menu = document.getElementById("menu");

const asideMenu = document.getElementById("asideMenu");

const body = document.getElementById("body")


menu.addEventListener("click", ()=>{

asideMenu.classList.toggle("d-none")

body.classList.toggle("overflow-hidden")


})


