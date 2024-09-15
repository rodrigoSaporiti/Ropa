// menu

const menu = document.getElementById("menu");

const asideMenu = document.getElementById("asideMenu");

const body = document.getElementById("body")


menu.addEventListener("click", ()=>{

asideMenu.classList.toggle("d-none")

body.classList.toggle("overflow-hidden")


})


/* redirigir menu Mujer y hombre*/

const remerasMujer = document.getElementById("remerasMujer")
const camperasMujer = document.getElementById("camperasMujer");
const shortMujer = document.getElementById("shortMujer");
const pantalonesMujer = document.getElementById("pantalonesMujer");
const accesoriosMujer = document.getElementById("accesoriosMujer");


const remerasHombre = document.getElementById("remerasHombre")
const camperasHombre = document.getElementById("camperasHombre");
const shortHombre = document.getElementById("shortHombre");
const pantalonesHombre = document.getElementById("pantalonesHombre");
const accesoriosHombre = document.getElementById("accesoriosHombre");

function agregarLocalStorage(e){

    

    e.addEventListener("click", ()=>{

        let nombre = e.dataset.titulo

        localStorage.setItem("pagina", nombre);
        window.location.href= "tienda.html"
       
    })

    e.addEventListener("contextmenu", ()=>{
        let nombre = e.dataset.titulo
        localStorage.setItem("pagina", nombre);
    })
   
    // e.addEventListener("touchstart", ()=>{
    //     let nombre = e.dataset.titulo
    //     localStorage.setItem("pagina", nombre);

    // })

};


agregarLocalStorage(remerasMujer);
agregarLocalStorage(cangurosMujer);
agregarLocalStorage(camperasMujer);
agregarLocalStorage(pantalonesMujer);
agregarLocalStorage(shortMujer);
agregarLocalStorage(accesoriosMujer);

agregarLocalStorage(remerasHombre);
agregarLocalStorage(cangurosHombre);
agregarLocalStorage(camperasHombre);
agregarLocalStorage(pantalonesHombre);
agregarLocalStorage(shortHombre);
agregarLocalStorage(accesoriosHombre);