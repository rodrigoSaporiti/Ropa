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





// funcion al hacer click que aparezca cada vestimenta

function cambioCategoriaRadio(e){
 

  e.addEventListener("click", ()=>{

    if(e.checked){
      localStorage.setItem("pagina", e.value)
      console.log(e.value)
     window.location.reload()
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


    }


}


siEstaMarcadoMantener(remerasRadio);
siEstaMarcadoMantener(cangurosRadio);
siEstaMarcadoMantener(camperasRadio);
siEstaMarcadoMantener(pantalonesRadio);
siEstaMarcadoMantener(shortRadio);
siEstaMarcadoMantener(accesoriosRadio);



// termina radio button


// ---------------------------------------------------------------------------------------------



//comienzo talles

const talleRadio = document.getElementsByName("opcionTalle");


async function mostrarPorTalle(e){
    

    e.forEach(element => {

        element.addEventListener("click", async(e)=>{

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





/*filtro precios */


// Almaceno el boton de filtrar

let botonOk = document.getElementById("botonOk");


botonOk.addEventListener("click", ()=>{
let minPrecio = document.getElementById("minPrecio").value;
let maxPrecio = document.getElementById("maxPrecio").value;

const localActualVestimenta  = JSON.parse(localStorage.getItem("actualVestimenta"))

const filtroLosPrecios = localActualVestimenta.filter((e)=> parseInt(e.precio)>=minPrecio &&   parseInt(e.precio)<= maxPrecio );

ingresarCards.innerHTML="";
filtroLosPrecios.forEach(e =>{

    card(e);

})

})




// Ordenar por precio


const selectOrdenar = document.getElementById("selectOrdenar");
 
selectOrdenar.addEventListener("change" , async()=>{


  console.log(selectOrdenar.value);


  if(selectOrdenar.value == 3 ){
  let remeras = JSON.parse(localStorage.getItem("actualVestimenta"))

  remeras.sort((e, y)=> y.precio - e.precio );

  ingresarCards.innerHTML = "";


  remeras.forEach(element => {

   card(element);
    
});


  console.log(remeras);

}else if(selectOrdenar.value==2){


  let remeras = JSON.parse(localStorage.getItem("actualVestimenta"))

  remeras.sort((e, y)=> e.precio - y.precio );

  ingresarCards.innerHTML = "";


  remeras.forEach(element => {
card(element)
    
});




}else if(selectOrdenar.value==1){


  let remeras = JSON.parse(localStorage.getItem("actualVestimenta"))

  let remerasDestacadas = remeras.filter((e)=> e.destacado ==1);

  console.log(remerasDestacadas);

  

  ingresarCards.innerHTML = "";


  remerasDestacadas.forEach(element => {

    card(element);
    
});




}
})

