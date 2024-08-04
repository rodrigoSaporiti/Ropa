
// Variable donde voy a mostrar las cards
let ingresarCards = document.getElementById("ingresarCards");


// fetch donde traigo las remeras del json

async function traerRemeras(){

    try {
        const response = await fetch(`remeras.json`);
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

 




  // funcion donde muestro las remeras de forma principal

  async function mostrarRemeras(){

    let remeras = await traerRemeras();

    remeras.forEach(element => {

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
        

        
        


    });


  }



mostrarRemeras()







// Almaceno los talles


let xl = document.getElementById("xl");
let l = document.getElementById("l");
let m = document.getElementById("m");
let s = document.getElementById("s");
let xs = document.getElementById("xs");



// Creo una funcion, donde voy a utilizar más adelante para todos los talles


let arrayConTodosLosTalles = [];



async function filtroTalle(e){

  let remeras = await traerRemeras();

  let talleRopa = e.value;
 
 

  let remerasFiltradasPorTalle = remeras.filter(talle => talle[talleRopa] > 0 )

  

  let remeras0 = remerasFiltradasPorTalle.length


e.addEventListener("click", async()=>{



  if(e.checked){

    console.log("ok")

  


    if(remeras0 ==0){
      ingresarCards.innerHTML= `
      <div class="sinResultado">
      <p class="text-white">No se encontraron resultados</p>
      </div> `;

    }else{

      remerasFiltradasPorTalle.forEach(element => {


        let objetoTalle = {
          id : element.id,
         color: element.color,
         xl : element.xl,
         l: element.l,
         m: element.m,
         s: element.s,
         xs: element.xs,
         descripcion: element.descripcion,
         precio: element.precio,
         imagen: element.imagen,
         imagenMiniatura: element.imagenMiniatura,
         imagenMiniatura2: element.imagenMiniatura2,
         destacado:  element.destacado

        }
       
        
       
        let iD = element.id
        let existeRemera = arrayConTodosLosTalles.some(e=> e.id == iD)

        console.log(existeRemera)

          if(!existeRemera){

            arrayConTodosLosTalles.push(objetoTalle)

  
            }

      
        
       
 
    
        });
  
      

      ingresarCards.innerHTML= "";







arrayConTodosLosTalles.forEach(element => {


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

  
  


let remerasJson = JSON.stringify(remerasFiltradasPorTalle);
localStorage.setItem("remerasOrdenar", remerasJson);


}
} else if(!e.checked){
    

    ingresarCards.innerHTML = "";

    console.log("hola")

    mostrarRemeras()




  }


})


}


filtroTalle(xl);
filtroTalle(l);
filtroTalle(m);
filtroTalle(s);
filtroTalle(xs);






/*filtro precios */


// Almaceno el boton de filtrar

let botonOk = document.getElementById("botonOk");



botonOk.addEventListener("click", async()=>{


let minPrecio = document.getElementById("minPrecio").value;
let maxPrecio = document.getElementById("maxPrecio").value;

let remeras = await traerRemeras();

console.log(remeras);



const remerasFiltradas = remeras.filter((e)=> parseInt(e.precio)>minPrecio &&   parseInt(e.precio)< maxPrecio );

if(remerasFiltradas.length !== 0){

console.log(remerasFiltradas);


ingresarCards.innerHTML = "";


// let remerasOrdenar = JSON.parse(localStorage.getItem("remerasOrdenar"));

remerasFiltradas.forEach(element => {

  

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
 


} else{

  ingresarCards.innerHTML= `
  <div class="sinResultado">
  <p class="text-white">No se encontraron resultados</p>
  </div> `;

}



})






// Orderar por precio


const selectOrdenar = document.getElementById("selectOrdenar");
 
selectOrdenar-addEventListener("change" , async()=>{


  console.log(selectOrdenar.value);


  if(selectOrdenar.value == 3 ){
  let remeras = await traerRemeras();

  remeras.sort((e, y)=> y.precio - e.precio );

  ingresarCards.innerHTML = "";


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


  console.log(remeras);

}else if(selectOrdenar.value==2){


  let remeras = await traerRemeras();

  remeras.sort((e, y)=> e.precio - y.precio );

  ingresarCards.innerHTML = "";


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




}else if(selectOrdenar.value==1){


  let remeras = await traerRemeras();



  let remerasDestacadas = remeras.filter((e)=> e.destacado ==1);

  console.log(remerasDestacadas);

  

  ingresarCards.innerHTML = "";


  remerasDestacadas.forEach(element => {

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
})



// funcion para setear en local el producto al hacer click y redirigir a product.html



function product(e){

  

  window.location.href="product.html"



  localStorage.setItem("id", e )

   

}



