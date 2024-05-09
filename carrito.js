let tabla = document.getElementById("tabla");


let carritoLocal = localStorage.getItem("carrito");

let carritoParse = JSON.parse(carritoLocal);

carritoParse.forEach(function(element, indice){

    let subtotal = element.cantidad * element.precio

    tabla.innerHTML += `

    <tr>
    <th scope="row">${indice+1}</th>
     <td class="d-flex  align-items-center m-0"> <img class="imgTabla m-0" src="${element.imagen}"> <p class="ms-5">${element.descripcion}</p></td>
    <td>${element.cantidad}</td>
    <td>$ <span>${subtotal}</span></td>
  </tr>

    `
    
});


let totalPrecio = 0;

    carritoParse.forEach(element => {
  
        totalPrecio += element.cantidad * element.precio
        
    });




let total = document.getElementById("total");

 total.innerHTML = `<p class="totalTexto">Total $ ${totalPrecio} <p/>`




 let finalizarCompra = document.getElementById("finalizarCompra");

 finalizarCompra.addEventListener("click", ()=>{

    alert("Compra Finalizada con Exito")

    localStorage.removeItem("carrito")
    location.reload()
 })