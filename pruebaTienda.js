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

 
  let vestimentaActualizada =[] ;


  
  // funcion donde muestro las remeras de forma principal

  async function mostrarVestimenta(){

   

   


      let remeras = await traerVestimenta();
      vestimentaActualizada.push(remeras);

      vestimentaActualizada[0].forEach(element => {
        card(element);
  
      });
      

    
 
      
    

  

  }


  console.log(vestimentaActualizada)


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




// Almaceno los talles


let xl = document.getElementById("xl");
let l = document.getElementById("l");
let m = document.getElementById("m");
let s = document.getElementById("s");
let xs = document.getElementById("xs");






// variable que voy a utilizar para comparar

let almacenoVestimentasTalles = [];

// funcion donde empiezo a filtrar y agregar talles

async function filtroTalle(e){

 
  
    
e.addEventListener("click", ()=>{


  let valorTalle = e.value

  let filtroTalles = vestimentaActualizada[0].filter(element => element[valorTalle] > 0 );

  let remera0 = filtroTalles.length;

  let remera0AlmacenoTalles = almacenoVestimentasTalles.length
  
 


  if(e.checked){


if(remera0 == 0 && almacenoVestimentasTalles ==0 ){

  ingresarCards.innerHTML= `
      <div class="sinResultado">
      <p class="text-white">No se encontraron resultados</p>
      </div> `;



} else{

  console.log(vestimentaActualizada)

  filtroTalles.forEach(element => {

  
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
           let existeRemera = almacenoVestimentasTalles.some(e=> e.id == iD)


          if(!existeRemera){
            almacenoVestimentasTalles.push(objetoTalle)

            localStorage.setItem("vestimentaActual", JSON.stringify(almacenoVestimentasTalles))

            }
            
            ingresarCards.innerHTML= "";

           let vestimentaActual = JSON.parse(localStorage.getItem("vestimentaActual"));

            vestimentaActual.forEach(element => {
              
              card(element)
            
            });
            

  });
  

}

  }
 
})// cierre evento de click
  
  
}// cierre funcion
  
  
  
  filtroTalle(xl);
  filtroTalle(l);
  filtroTalle(m);
  filtroTalle(s);
  filtroTalle(xs);
  

  // funcion para cuando se desclick un talle y eliminarlo

  function eliminoVestimenta(e){
    let talle = e.value
    
    e.addEventListener("click", (x)=>{

      if(x.target.checked == false){
        let bajoVestimentaActual = JSON.parse(localStorage.getItem("vestimentaActual"));
        
        console.log(talle)
      

        let vestimentaActual = bajoVestimentaActual.filter(element => !(element[talle] > 0))
        console.log(vestimentaActual)

        localStorage.setItem("vestimentaActual", JSON.stringify(vestimentaActual))

        let bajoNuevamenteLocal = JSON.parse(localStorage.getItem("vestimentaActual"));
        ingresarCards.innerHTML=""


        if( bajoNuevamenteLocal.length == 0){

          window.location.reload();
        }else{


          bajoNuevamenteLocal.forEach(element => {
          
            card(element)
  
          });
        }


    


      }

       
    })
  }

  eliminoVestimenta(xl);
  eliminoVestimenta(l);
  eliminoVestimenta(m);
  eliminoVestimenta(s);
  eliminoVestimenta(xs);
  


 







  // funcion para setear en local el producto al hacer click y redirigir a product.html



function product(e){

  

  window.location.href="product.html"



  localStorage.setItem("id", e )

   

}





/*filtro precios */


// Almaceno el boton de filtrar

let botonOk = document.getElementById("botonOk");



botonOk.addEventListener("click", async()=>{


let minPrecio = document.getElementById("minPrecio").value;
let maxPrecio = document.getElementById("maxPrecio").value;



let bajoVestimentaActual = JSON.parse(localStorage.getItem("vestimentaActual"));

if(bajoVestimentaActual.length > 0){


  const filtroLosPrecios = bajoVestimentaActual.filter((e)=> parseInt(e.precio)>=minPrecio &&   parseInt(e.precio)<= maxPrecio );

  if(filtroLosPrecios.length !== 0){
  
  console.log(filtroLosPrecios);
  
  
  ingresarCards.innerHTML = "";
  
  
  // let remerasOrdenar = JSON.parse(localStorage.getItem("remerasOrdenar"));
  
  filtroLosPrecios.forEach(element => {
  
    
  card(element);
  
  
  
  });

} else{
  ingresarCards.innerHTML= `
  <div class="sinResultado">
  <p class="text-white">No se encontraron resultados</p>
  </div> `;

}

} else{

  let remeras = await traerVestimenta();

  console.log(remeras);
  
  
  
  const remerasFiltradas = remeras.filter((e)=> parseInt(e.precio)>minPrecio &&   parseInt(e.precio)< maxPrecio );
  
  if(remerasFiltradas.length !== 0){
  
  console.log(remerasFiltradas);
  
  
  ingresarCards.innerHTML = "";
  
  
  // let remerasOrdenar = JSON.parse(localStorage.getItem("remerasOrdenar"));
  
  remerasFiltradas.forEach(element => {
  
    
  card(element);
  
  
  
  });
   
  
  
  } else{
  
    ingresarCards.innerHTML= `
    <div class="sinResultado">
    <p class="text-white">No se encontraron resultados</p>
    </div> `;
  
  }
  
  
  
}




})


