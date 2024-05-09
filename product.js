let botonComprar = document.getElementById("comprar");

let listaCarrito = JSON.parse(localStorage.getItem("carrito")) || [];

botonComprar.addEventListener("click", ()=>{

    let talle = document.getElementById("talle").value
    let color = document.getElementById("color").value
    let cantidad = document.getElementById("cantidad").value
    let descripcion = document.getElementById("descripcion").textContent;
    let precio = document.getElementById("precio").textContent;
    let imagen = document.getElementById("img").src;


    let productoPorIngresar={
      talle: talle,
      color: color,
      cantidad: cantidad,
      descripcion: descripcion,
      precio: precio,
      imagen: imagen
    }


listaCarrito.push(productoPorIngresar);

console.log(listaCarrito);

localStorage.setItem("carrito", JSON.stringify(listaCarrito));
})


