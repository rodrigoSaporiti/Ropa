let ingresarCards = document.getElementById("ingresarCards");



async function traerRemeras(){

    try {
        const response = await fetch(`https://rodrigosaporiti.github.io/Ropa/remeras.json`);
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


  async function mostrarRemeras(){

    let remeras = await traerRemeras();

    remeras.forEach(element => {

        ingresarCards.innerHTML += `
        
        
        
   <!-- inicio card producto -->
   <div onclick="product()" class="contenedorProductoPaginas">
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
        
    });


  }





mostrarRemeras()





let xl = document.getElementById("xl");
let l = document.getElementById("l");
let m = document.getElementById("m");
let s = document.getElementById("s");
let xs = document.getElementById("xs");




async function check(checkbox, talle){

  let remeras = await traerRemeras();

  if(checkbox.checked && checkbox.value === (remeras.l)


}