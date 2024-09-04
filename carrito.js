let tabla = document.getElementById("tabla");


let carritoLocal = localStorage.getItem("carrito");

let carritoParse = JSON.parse(carritoLocal);

carritoParse.forEach(function(element, indice){

    let subtotal = element.cantidad * element.precio

    tabla.innerHTML += `

    <tr>
    <th scope="row">${indice+1}</th>
     <td class="d-flex  align-items-center m-0"> <img class="imgTabla m-0" src="${element.imagen}"> <p class="ms-5">${element.descripcion}</p></td>
    <td id="cantidadRemera">${element.cantidad}</td>
    <td>$ <span id="precio" value="${subtotal}">${subtotal}</span></td>
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

 




 // modal tipo de entrega parte1: boton siguiente





const retiroEnAgencia = document.getElementById("retiroEnAgencia");

const sucursales = document.getElementById("sucursales")

const envioDomicilio = document.getElementById("envioDomicilio")

const nombre = document.getElementById("Cliente_Destinatario");

const direccion = document.getElementById("Direccion_Destinatario");

const telefono = document.getElementById("Telefono")



retiroEnAgencia.addEventListener("change",(e)=>{

if(e.target.checked)

    sucursales.classList.remove("bg-dark")

    nombre.disabled= true
    direccion.disabled= true
    telefono.disabled= true

    sucursales.disabled = false

    envioDomicilio.checked = false
    
})



envioDomicilio.addEventListener("change",(e)=>{

    e.preventDefault()

    if(e.target.checked)
        
       

        sucursales.classList.add("bg-dark")

        
        nombre.disabled= false
       direccion.disabled= false
       telefono.disabled= false
    
        sucursales.disabled = true;
        retiroEnAgencia.checked = false
        
    })
    





