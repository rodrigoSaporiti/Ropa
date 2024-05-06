// click mujer index

let mujer = document.getElementById("mujer")
let clickMujer = document.getElementById("clickMujer")


// click hombre index

let hombre = document.getElementById("hombre")
let clickHombre = document.getElementById("clickHombre")



mujer.addEventListener("click", ()=>{


    
    if(clickHombre.classList.contains("d-block")){
  
        clickHombre.classList.remove("d-block");
        clickHombre.classList.add("d-none")
    }

clickMujer.classList.toggle("d-none")
clickMujer.classList.toggle("d-block")

})





hombre.addEventListener("click", ()=>{


    if(clickMujer.classList.contains("d-block") ){
  
        clickMujer.classList.remove("d-block");
        clickMujer.classList.add("d-none")
    }

    clickHombre.classList.toggle("d-none")
    clickHombre.classList.toggle("d-block")
    


})



