


// Almaceno donde voy a colocar el producto

const mainProduct = document.querySelector(".mainProduct")

// creo el carrito vacio

let listaCarrito = JSON.parse(localStorage.getItem("carrito")) || [];




// creo una funcion donde voy a traer el producto con un fetch



async function traerProducto (){


  try {
    const response = await fetch(`remerasHombre.json`);
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
    
    
<div class="row  containProduct">

 
    <div class="col-lg-5 col-12 colImagen">
    
    <div class="containRes">

   <svg id="flecha-izq" class=" cursor-pointer" xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" class="bi bi-arrow-left-short" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5"/>
</svg>

    <img id="img" class="imagenProduct" src="${imagenes[0]}" alt="">

   
   <svg id="flecha-derecha" class="cursor-pointer" xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" class="bi bi-arrow-right-short" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8"/>
</svg>

    </div>
    <div class=" imgContain mt-4">

    <img id="img-min" class="imgMiniatura cursor-pointer" src="${imagenes[0]}" alt="">

      <img id="img-min1" class="imgMiniatura cursor-pointer" src="${imagenes[1]}" alt="">

      <img id="img-min2" class="imgMiniatura cursor-pointer" src="${imagenes[2]}" alt="">

    </div>
   

    </div> <!-- cierre primer col  -->
    

    <div class="col-lg-4 colInfo">

    

      <div class="contenedorInfo">

      <p class="sku">SKU <span>${e.id}</span></p>

        <h2 id="descripcion" class="">${e.descripcion}</h2>
        
        <h1 class="text-center " >$<span id="precio">${e.precio}</span></h1>

        <div class="linea"></div>

   


    <div class="mt-2">
    
 <input class="btn-check" type="radio" name="talleCarrito" id="xs" value="${e.xs}">
    <label class=" btn btn-outline-dark" for="xs">XS</label>
  
     <input class="btn-check" type="radio" name="talleCarrito" id="s" value="${e.s}">
    <label class=" m-1 btn btn-outline-dark" for="s">S</label>
  
     <input class="btn-check" type="radio" name="talleCarrito" id="m" value="${e.m}">
    <label class=" m-1 btn btn-outline-dark" for="m">M</label>
  

  
    <input class="btn-check" type="radio" name="talleCarrito" id="l" value="${e.l}">
    <label class=" m-1 btn btn-outline-dark" for="l">L</label>
  
  
  
    <input class="btn-check" type="radio" name="talleCarrito" id="xl" value="${e.xl}">
    <label class=" m-1 btn btn-outline-dark" for="xl">XL</label>
  
  

  
  </div>



  <div>
<button  id="menos">-</button>
      <input class="inputTalle" id="cantidadTalle" type="number" min="1" disabled> 
<button id="mas">+</button>
</div>

<p id="textAviso" class="text-danger m-0 p-0 d-none">Seleccione un talle</p>

      <button id="comprar" class="btn btn-dark mt-4">Añadir al Carrito</button>


    </div>
  
      </div> <!-- cierre segundo col  -->




</div><!-- cierre row -->




    
    
    
    `


   

    // guardo las opciones de talle en una variable

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

    // funcion para que los talles no disponibles se ajusten a disabled

    function disponibilidadTalles(e){
      if(e.value == 0 ){
    
       e.setAttribute("disabled","");
    } 
    
    
    }
    

// input de aumentar cantidad del producto al carrito

  let cantidadTalle = document.getElementById("cantidadTalle")

   

    click(xl)
    click(l)
    click(m)
    click(s)
    click(xs)
   
    

    //funcion que al hacer click en el talle agregue un maximo de stock al input cantidad

function click(x){

  x.addEventListener("click", ()=>{

    cantidadTalle.removeAttribute("disabled")
    textAviso.classList.add("d-none")

      cantidadTalle.value = 1;

     
     
      cantidadTalle.setAttribute("max", x.value);

      localStorage.setItem("talleProducto", x.id)
    
  })
}


// funcion botones + - talle

const mas = document.getElementById("mas");
const menos = document.getElementById("menos");

disminuirTalle(menos);
incrementarTalle(mas);

function disminuirTalle(x){

x.addEventListener("click", ()=>{

if(1 < cantidadTalle.value){
  cantidadTalle.value = parseInt(cantidadTalle.value) - 1

}
})

}



function incrementarTalle(x){
  x.addEventListener("click", ()=>{

if(cantidadTalle.getAttribute("max") > cantidadTalle.value){

  cantidadTalle.value = parseInt(cantidadTalle.value) + 1
 
}

  })
}


// funcion para cuando se hace click en agregar cantidad pero no se eligio talle

function siNoEligioTalle(x){


  x.addEventListener("click", ()=>{

if(cantidadTalle.disabled == true){

let textAviso = document.getElementById("textAviso");

textAviso.classList.remove("d-none")
}
  })
}
   

siNoEligioTalle(mas);
siNoEligioTalle(menos);



//almaceno las imagenes

let imagen = document.getElementById("img")
let imagen1 = document.getElementById("img-min") 
let imagen2 = document.getElementById("img-min1")
let imagen3 = document.getElementById("img-min2")

// click en imagen

function imagenClick(x){

  x.addEventListener("click", ()=>{

    imagen.src = x.src

    border(imagen, imagen1)
    border(imagen, imagen2)
    border(imagen, imagen3)
  })

}

imagenClick(imagen1);
imagenClick(imagen2);
imagenClick(imagen3);




//agrego border a la imagen secundaria que esta tambien en la imagen principal

border(imagen, imagen1)
border(imagen, imagen2)
border(imagen, imagen3)

function border(a,b){

  if(a.src == b.src){

    b.classList.add("borderSeleccion")

  }else{
    b.classList.remove("borderSeleccion")
  }


}


// eventos de click en flechas


const flechaDerecha = document.getElementById("flecha-derecha");

flechaDerecha.addEventListener("click", ()=>{

  if(imagen.src == imagenes[0]){
    imagen.src = imagenes[1];
  } else if( imagen.src == imagenes[1]){
    imagen.src = imagenes[2];
  }else if (imagen.src == imagenes[2]){
    imagen.src = imagenes[0];
  }

border(imagen, imagen1)
border(imagen, imagen2)
border(imagen, imagen3)
})




const flechaIzq = document.getElementById("flecha-izq");
    

   
flechaIzq.addEventListener("click", ()=>{
  
  if(imagen.src == imagenes[0]){
    imagen.src = imagenes[2];
  } else if( imagen.src == imagenes[1]){
    imagen.src = imagenes[0];
  }else if (imagen.src == imagenes[2]){
    imagen.src = imagenes[1];
  }
  border(imagen, imagen1)
border(imagen, imagen2)
border(imagen, imagen3)

  })
      
   
 
    
// Almaceno el boton de agregar al carrito

let botonComprar = document.getElementById("comprar");

 botonComprar.addEventListener("click", ()=>{

   
    let talleTexto = localStorage.getItem("talleProducto")

     let cantidad = document.getElementById("cantidadTalle").value
     let descripcion = document.getElementById("descripcion").textContent;
     let precio = document.getElementById("precio").textContent;
     let imagen = document.getElementById("img-min")


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


