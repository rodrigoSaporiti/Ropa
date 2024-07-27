


// Almaceno donde voy a colocar el producto

const mainProduct = document.querySelector(".mainProduct")

// creo el carrito vacio

let listaCarrito = JSON.parse(localStorage.getItem("carrito")) || [];




// creo una funcion donde voy a traer el producto con un fetch



async function traerProducto (){


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

// creo una funcion para filtrar la remera que preciso con su id

//IMPORTANTE!!! Uso de esta funcion exclusivamente de forma FRONT END, para back end deberia utilizar erramientas sql, para filtrar la remera exclusivamente

// Almaceno el id de localStorage en una variable

const idProducto = localStorage.getItem("id");


// creo funcion para mostrar la remera

async function mostrarRemera(id){

  const remeras = await traerProducto();

 

  const remeraFiltrada = remeras.filter((e)=> e.id == id);


 


  remeraFiltrada.forEach(e => {


    const talles ={
      xl : e.xl,
      l : e.l,
      m : e.m,
      s : e.s, 
      xs : e.xs
    }


   
    const imagenes = [e.imagen, e.imagenMiniatura, e.imagenMiniatura2] ;
   
    
    localStorage.setItem("todosLosTalles", JSON.stringify(talles));
    
   
  


    mainProduct.innerHTML = `
    
    
<div class="row d-flex justify-content-center align-items-center">

 
    <div class="col-5 colImagen">
    
    <div>

   <svg id="flecha-izq" class="text-white cursor-pointer" xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" class="bi bi-arrow-left-short" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5"/>
</svg>

    <img id="img" class="imagenProduct cursor-pointer" src="${imagenes[0]}" alt="">

   
   <svg id="flecha-derecha" class="text-white cursor-pointer" xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" class="bi bi-arrow-right-short" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8"/>
</svg>

    </div>
    <div class="d-flex justify-content-center mt-4">

      <img id="img-min1" class="imgMiniatura cursor-pointer" src="${imagenes[1]}" alt="">

      <img id="img-min2" class="imgMiniatura cursor-pointer" src="${imagenes[2]}" alt="">

    </div>

    </div> <!-- cierre primer col  -->
    

    <div class="col-5 colInfo">

    

      <div class="contenedorInfo">

        <h2 id="descripcion" class="text-center text-white">${e.descripcion}</h2>
        
        <h1 class="text-center text-white" >$<span id="precio">${e.precio}</span></h1>

      <select id="talle" class="form-select m-3" aria-label="Default select example">
        <option id="" value="" disabled selected hidden>Talle</option>
         <option id="xs"   value="${e.xs}">XS</option>
        <option id="s"  value="${e.s}" >S</option>
        <option id="m"   value="${e.m}">M</option>
        <option id="l"  value="${e.l}" >L</option>
        <option id="xl"  value="${e.xl}">XL</option>
        
      </select>


  

      <input id="cantidadTalle" type="number" min="1"   disabled> 



      <button id="comprar" class="btn btn-dark m-3">Añadir al Carrito</button>


    </div>
  
      </div> <!-- cierre segundo col  -->




</div><!-- cierre row -->




    
    
    
    `


    // guardo las opciones de select en una variable

    let xl = document.getElementById("xl");
    let l = document.getElementById("l");
    let m = document.getElementById("m");
    let s = document.getElementById("s");
    let xs = document.getElementById("xs");
    
    
    disponibilidadTalles(xl)
    disponibilidadTalles(l)
    disponibilidadTalles(m)
    disponibilidadTalles(s)
    disponibilidadTalles(xs)



    const cantidadTalle = document.getElementById("cantidadTalle")

    const talle = document.getElementById("talle")


    // creo un avento de change para el select, y asi asignarle el valor maximo de cantidad dependiendo el stock del talle
    
    talle.addEventListener("change", ()=>{
      cantidadTalle.removeAttribute("disabled")
      cantidadTalle.value = 1;
      cantidadTalle.setAttribute("max", talle.value);
      
      
    })



const flechaDerecha = document.getElementById("flecha-derecha");

let imagen = document.getElementById("img")
let imagen2 = document.getElementById("img-min1")
let imagen3 = document.getElementById("img-min2")

clickEnImagen(imagen);
clickEnImagen(imagen2);
clickEnImagen(imagen3);

flechaDerecha.addEventListener("click", ()=>{
  
if(imagen.src == imagenes[0]){
  imagen.src = imagenes[1];
  imagen2.src = imagenes[2];
  imagen3.src = imagenes[0];
} else if( imagen.src == imagenes[1]){
  imagen.src = imagenes[2];
  imagen2.src = imagenes[0];
  imagen3.src = imagenes[1];
}else if (imagen.src == imagenes[2]){
  imagen.src = imagenes[0];
  imagen2.src = imagenes[1];
  imagen3.src = imagenes[2];
}


})
    


const flechaIzq = document.getElementById("flecha-izq");
    

   
flechaIzq.addEventListener("click", ()=>{
  
  if(imagen.src == imagenes[0]){
    imagen.src = imagenes[2];
    imagen2.src = imagenes[1];
    imagen3.src = imagenes[0];
  } else if( imagen.src == imagenes[1]){
    imagen.src = imagenes[0];
    imagen2.src = imagenes[2];
    imagen3.src = imagenes[1];
  }else if (imagen.src == imagenes[2]){
    imagen.src = imagenes[1];
    imagen2.src = imagenes[0];
    imagen3.src = imagenes[2];
  }
  
  
  })
      
   

    
// Almaceno el boton de agregar al carrito

let botonComprar = document.getElementById("comprar");

botonComprar.addEventListener("click", ()=>{

    let talle = document.getElementById("talle");
   let talleTexto = talle.options[talle.selectedIndex].textContent;

    let cantidad = document.getElementById("cantidadTalle").value
    let descripcion = document.getElementById("descripcion").textContent;
    let precio = document.getElementById("precio").textContent;
    let imagen = document.getElementById("img").src;


    let productoPorIngresar={
      talle: talleTexto,
      cantidad: cantidad,
      descripcion: descripcion,
      precio: precio,
      imagen: imagen
    }


listaCarrito.push(productoPorIngresar);

console.log(listaCarrito);

localStorage.setItem("carrito", JSON.stringify(listaCarrito));

})


  
   
    
  });

 

}


mostrarRemera(idProducto);


// creo funcion para bloquear la seleccion de los talles no disponibles

function disponibilidadTalles(e){


  if(e.value == 0 ){

   e.setAttribute("disabled","");
   e.className = "bg-dark"
} 


}



// funcion para abrir la imagen con zoom 

function clickEnImagen(e){

e.addEventListener("click", ()=>{

  const imgContenedor = document.getElementById("clickEnImagen");

  imgContenedor.style.display ="flex"

  const imgClick = document.getElementById("imgClick");

  imgClick.src= e.src;

})


function clickFueraDeImagen(){

  
  const imgContenedor = document.getElementById("clickEnImagen");

  imgContenedor.addEventListener("click", e =>{

    if(e.target.id == "imgClick"){

    }else{

      imgContenedor.style.display ="none"
      console.log("click fuera de la imagen")
    }

    

  })

  



}


clickFueraDeImagen();


}