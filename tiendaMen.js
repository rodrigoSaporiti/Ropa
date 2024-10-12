//bajo categoria que elige el cliente
const localCategoria = localStorage.getItem("pagina");

// Variable donde voy a mostrar las cards
let ingresarCards = document.getElementById("ingresarCards");



// funcion con la estructura de las cards

function card(element){
    ingresarCards.innerHTML += `
    <!-- inicio card producto -->
    <div onclick="product(${element.id})" class="contenedorProductoPaginas">
     <div class="contenedorImagenPaginas" >
        <img class="imagenPaginas" src="${element.imagen}" alt="">
         </div><!-- cierre contenedorImagenPaginas -->
        <div class="infoProducto">
        <p class="m-0 ">${element.descripcion}</p>
        <p class="m-0 ">$ ${element.precio}</p>
      </div>
    </div> 
    <!-- cierre producto -->
         `
  }



  

  // fetch para traer la vestimenta

async function traerVestimenta(){

    try {
        const response = await fetch(`${localCategoria}.json`);
        // const response = await fetch(`https://rodrigosaporiti.github.io/Ropa/remeras.json`);
        if (!response.ok) {
          throw new Error('Hubo un problema al obtener los datos');
        }
        const data = await response.json();
        return data;
      } catch (error) {
        console.error(error);
        return []; // Devuelve un array vacío en caso de error
      }

  }


  
  async function mostrarVestimenta(){
    let remeras = await traerVestimenta();
    localStorage.setItem("actualVestimenta", JSON.stringify(remeras))
    console.log(remeras)
    remeras.forEach(element => {
      card(element);
    });
}



mostrarVestimenta();





// ---------------------------------------------------------------------------------------------
  


  // radio buttons




const radiosTienda = document.querySelector('input[name="categorias"]:checked')


 const remerasRadio = document.getElementById("remerasRadio")
 const cangurosRadio = document.getElementById("cangurosRadio")
 const camperasRadio = document.getElementById("camperasRadio")
 const pantalonesRadio = document.getElementById("pantalonesRadio")
 const shortRadio = document.getElementById("shortRadio")
 const accesoriosRadio = document.getElementById("accesoriosRadio")

 const remerasRadioRes = document.getElementById("remerasRadioRes")
 const cangurosRadioRes = document.getElementById("cangurosRadioRes")
 const camperasRadioRes = document.getElementById("camperasRadioRes")
 const pantalonesRadioRes = document.getElementById("pantalonesRadioRes")
 const shortRadioRes = document.getElementById("shortRadioRes")
 const accesoriosRadioRes = document.getElementById("accesoriosRadioRes")



// funcion al hacer click que aparezca cada vestimenta

function cambioCategoriaRadio(e){
 

  e.addEventListener("click", ()=>{

    


    if(e.checked){
      localStorage.setItem("pagina", e.value)
      console.log(e.value)
     
//scroll hacia arriba
     window.scrollTo({
      top: 0,      // Desplazarse a la parte superior
      behavior: 'smooth'  // Movimiento suave
    });
    


    setTimeout(() => {
      window.location.reload();
    }, 500); // Espera 500 milisegundos (medio segundo) para hacer el scroll antes de recargar
  
  
    }

  })


}



function siEstaMarcadoMantener(e){


    if(e.value == localCategoria){
        e.checked= true;

// las variables estan decretradas en inicio.js
cambioCategoriaRadio(remerasRadio);
cambioCategoriaRadio(cangurosRadio);
cambioCategoriaRadio(camperasRadio);
cambioCategoriaRadio(pantalonesRadio);
cambioCategoriaRadio(shortRadio);
cambioCategoriaRadio(accesoriosRadio);

cambioCategoriaRadio(remerasRadioRes);
cambioCategoriaRadio(cangurosRadioRes);
cambioCategoriaRadio(camperasRadioRes);
cambioCategoriaRadio(pantalonesRadioRes);
cambioCategoriaRadio(shortRadioRes);
cambioCategoriaRadio(accesoriosRadioRes);


    }


}


siEstaMarcadoMantener(remerasRadio);
siEstaMarcadoMantener(cangurosRadio);
siEstaMarcadoMantener(camperasRadio);
siEstaMarcadoMantener(pantalonesRadio);
siEstaMarcadoMantener(shortRadio);
siEstaMarcadoMantener(accesoriosRadio);

siEstaMarcadoMantener(remerasRadioRes);
siEstaMarcadoMantener(cangurosRadioRes);
siEstaMarcadoMantener(camperasRadioRes);
siEstaMarcadoMantener(pantalonesRadioRes);
siEstaMarcadoMantener(shortRadioRes);
siEstaMarcadoMantener(accesoriosRadioRes);



// termina radio button


// ---------------------------------------------------------------------------------------------



//comienzo talles

const talleRadio = document.getElementsByName("opcionTalle");
const talleRadioRes = document.getElementsByName("opcionTalleRes");


async function mostrarPorTalle(e){
    

    e.forEach(element => {

        element.addEventListener("click", async(e)=>{

          // Se restablece precio filtro al hacer click en un talle nuevo
           let min = document.getElementById("minPrecio")
           let max = document.getElementById("maxPrecio")

           let minRes = document.getElementById("minPrecioRes")
          let maxRes = document.getElementById("maxPrecioRes")

           min.value= "";
           max.value= "";

           minRes.value= "";
           maxRes.value= "";
          
           //

           window.scrollTo({
            top: 0,      // Desplazarse a la parte superior
            behavior: 'smooth'  // Movimiento suave
          });

           // Se restablece ordenar//
         
           const select = document.getElementById("selectOrdenar");
           const selectRes = document.getElementById("selectOrdenarRes");

           select.value = "default";
           selectRes.value = "default";

           //



           //

            if(e.target.checked = true){

                let vestimenta = await traerVestimenta()

                console.log(vestimenta)

                let talle = e.target.value;
                
                let filtrarPorTalle = vestimenta.filter(y => y[talle] > 0)


                if(filtrarPorTalle.length <= 0){

                    ingresarCards.innerHTML= `
                    <div class="sinResultado">
                    <p class="text-white">No se encontraron resultados</p>
                    </div> `;
              
                }else{


                    console.log(e.target.value)

                    console.log(filtrarPorTalle)

                    localStorage.setItem("actualVestimenta", JSON.stringify(filtrarPorTalle))
     
                   ingresarCards.innerHTML="";
                    
                     filtrarPorTalle.forEach(x => {
                         
                         card(x) 
                     });

                }
    
              


            }

           
        })
        
    });


}


mostrarPorTalle(talleRadio);
mostrarPorTalle(talleRadioRes);





/*filtro precios */


// Almaceno el boton de filtrar

let botonOk = document.getElementById("botonOk");
let min = document.getElementById("minPrecio")
let max = document.getElementById("maxPrecio")


let botonOkRes = document.getElementById("botonOkRes");
let minRes = document.getElementById("minPrecioRes")
let maxRes = document.getElementById("maxPrecioRes")

filtroPrecios(botonOk, min, max);
filtroPrecios(botonOkRes, minRes, maxRes);



function filtroPrecios(boton, min, max){

//quitar el disabled del boton ok

max.addEventListener("input", ()=>{

  if(max.value == ""){
boton.disabled = true;
  }else{
    boton.disabled = false;
  }


})


  boton.addEventListener("click", ()=>{


    let minPrecio = min.value;
    let maxPrecio = max.value;


    // Se restablece ordenar//
         
    const select = document.getElementById("selectOrdenar");
    const selectRes = document.getElementById("selectOrdenarRes");

    select.value = "default";
    selectRes.value = "default";

    //
  

    window.scrollTo({
      top: 0,      // Desplazarse a la parte superior
      behavior: 'smooth'  // Movimiento suave
    });
    
    
    const localActualVestimenta  = JSON.parse(localStorage.getItem("actualVestimenta"))
    
    if(minPrecio == ""){
      
      minPrecio = 0;
      console.log(minPrecio)
    
      const filtroLosPrecios = localActualVestimenta.filter((e)=> parseInt(e.precio)>=minPrecio &&   parseInt(e.precio)<= maxPrecio );

    
      if(filtroLosPrecios.length == 0){

        ingresarCards.innerHTML= `
        <div class="sinResultado">
        <p class="text-white">No se encontraron resultados</p>
        </div> `;


      }else{

        localStorage.setItem("actualVestimenta", JSON.stringify(filtroLosPrecios))
        let actualVestimenta = JSON.parse(localStorage.getItem("actualVestimenta"))
  
      ingresarCards.innerHTML="";
  
      actualVestimenta.forEach(e =>{
      
          card(e);
      
      })

        
      }
    
    }
    
    else{
    
      const filtroLosPrecios = localActualVestimenta.filter((e)=> parseInt(e.precio)>=minPrecio &&   parseInt(e.precio)<= maxPrecio );

      if(filtroLosPrecios.length == 0){

        ingresarCards.innerHTML= `
        <div class="sinResultado">
        <p class="text-white">No se encontraron resultados</p>
        </div> `;


      }else{

        localStorage.setItem("actualVestimenta", JSON.stringify(filtroLosPrecios))
        let actualVestimenta = JSON.parse(localStorage.getItem("actualVestimenta"))
  
      ingresarCards.innerHTML="";
  
      actualVestimenta.forEach(e =>{
      
          card(e);
      
      })

        
      }

     
    
    }
    
    
    
    })


}






// Ordenar por precio


const select = document.getElementById("selectOrdenar");
const selectRes = document.getElementById("selectOrdenarRes");

ordenar(select);
ordenar(selectRes);

function ordenar(selectOrdenar){

  
selectOrdenar.addEventListener("change" , async()=>{


  console.log(selectOrdenar.value);


  if(selectOrdenar.value == 3 ){

    window.scrollTo({
      top: 0,      // Desplazarse a la parte superior
      behavior: 'smooth'  // Movimiento suave
    });

  let remeras = JSON.parse(localStorage.getItem("actualVestimenta"))

  remeras.sort((e, y)=> y.precio - e.precio );

  ingresarCards.innerHTML = "";


  remeras.forEach(element => {

   card(element);
    
});


  console.log(remeras);

}else if(selectOrdenar.value==2){

  window.scrollTo({
    top: 0,      // Desplazarse a la parte superior
    behavior: 'smooth'  // Movimiento suave
  });

  let remeras = JSON.parse(localStorage.getItem("actualVestimenta"))

  remeras.sort((e, y)=> e.precio - y.precio );

  ingresarCards.innerHTML = "";


  remeras.forEach(element => {
card(element)
});
}

})
}
 



// restablecer filtros

const restablecerBoton = document.getElementById("restablecer");

const restablecerRes = document.getElementById("restablecerRes");

restablecer(restablecerBoton);
restablecer(restablecerRes);

function restablecer(r){

  r.addEventListener("click", ()=>{

       
//scroll hacia arriba
     window.scrollTo({
      top: 0,      // Desplazarse a la parte superior
      behavior: 'smooth'  // Movimiento suave
    });
    


    setTimeout(() => {
      window.location.reload();
    }, 500); // Espera 500 milisegundos (medio segundo) para hacer el scroll antes de recargar
  
  
  })
  
}


// filtro responsive


const filtroResponsive = document.getElementById("filtroResponsive");
const okRes = document.getElementById("okRes");
const menuResponsive = document.getElementById("menuResponsive");
const pantallaNegra = document.getElementById("pantallaNegra");
const scroll0 = document.getElementById("body");

let menuAbierto 

cerrarMenu(filtroResponsive);
cerrarMenu(okRes);

function cerrarMenu(filtroResponsive){


filtroResponsive.addEventListener("click", (e)=>{
  
  e.preventDefault()

  let menuDnone = menuResponsive.classList.contains("d-none");



  menuResponsive.classList.toggle("d-none")
  pantallaNegra.classList.toggle("d-none")
  scroll0.classList.toggle("overflow-hidden")

  if(!menuDnone){
    menuAbierto = false;
    localStorage.setItem("menuAbierto", menuAbierto)
  }else{
    menuAbierto = true
    localStorage.setItem("menuAbierto", menuAbierto)
  }


})

}


function dejarAbiertoFiltro(menuResponsive){

  let menu = localStorage.getItem("menuAbierto")

  console.log(menu)
  if(menu == "true"){
    menuResponsive.classList.remove("d-none")
    pantallaNegra.classList.remove("d-none")
    scroll0.classList.add("overflow-hidden")
    console.log("hola")
  }



}


dejarAbiertoFiltro(menuResponsive);