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



async function filtroTalle(e){

  let remeras = await traerRemeras();

let talleRopa = e.value;


  let remerasXl = remeras.filter(talle => talle[talleRopa] > 0)

  let remeras0 = remerasXl.length


e.addEventListener("click", async()=>{



  if(e.checked){

    console.log("ok")

    console.log(remerasXl)


    if(remeras0 ==0){
      ingresarCards.innerHTML= "";

    }else{



remerasXl.forEach(element => {

  ingresarCards.innerHTML = `
  
  
  
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


// async function click (talleInput){

//   talleInput.addEventListener("click", async()=>{

//     let remeras = await traerRemeras();

//     if(talleInput.value == remeras.talleInput){

//       let remerasTalle = remeras.find(talle => remeras.talleInput)

      
//     remerasTalle.forEach(element => {

//       ingresarCards.innerHTML += `
      
      
      
//  <!-- inicio card producto -->
//  <div onclick="product()" class="contenedorProductoPaginas">
//   <div class="contenedorImagenPaginas" >
//      <img class="imagenPaginas" src="${element.imagen}" alt="">
//       </div><!-- cierre contenedorImagenPaginas -->
//      <div class="infoProducto">
//      <p class="m-0 ">${element.descripcion}</p>
//      <p class="m-0 ">$ ${element.precio}</p>
//    </div>
//  </div> 
//  <!-- cierre producto -->
      
      
//       `
      
//   });


//     }

//   })
 
// }


// click(xl);
// click(l);
// click(m);
// click(s);
// click(xs);






