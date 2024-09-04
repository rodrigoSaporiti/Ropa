document.addEventListener("DOMContentLoaded", async () => {
    let tabla = document.getElementById("tabla");
    let carritoLocal = localStorage.getItem("carrito");
    let carritoParse = JSON.parse(carritoLocal) || [];

    // Generar el contenido de la tabla del carrito
    carritoParse.forEach((element, indice) => {
        let subtotal = element.cantidad * element.precio;
        tabla.innerHTML += `
            <tr>
                <th scope="row">${indice + 1}</th>
                <td class="d-flex align-items-center m-0">
                    <img class="imgTabla m-0" src="${element.imagen}">
                    <p class="ms-5">${element.descripcion}</p>
                </td>
                <td id="cantidadRemera">${element.cantidad}</td>
                <td>$ <span id="precio" value="${subtotal}">${subtotal}</span></td>
            </tr>
        `;
    });

    // Calcular el total
    let totalPrecio = carritoParse.reduce((acc, element) => acc + (element.cantidad * element.precio), 0);
    let total = document.getElementById("total");
    total.innerHTML = `<p class="totalTexto">Total $ ${totalPrecio} <p/>`;

    // Configuración de botones
    const finalizarCompra = document.getElementById("finalizarCompra");
    const retiroEnAgencia = document.getElementById("retiroEnAgencia");
    const envioDomicilio = document.getElementById("envioDomicilio");
    const nombre = document.getElementById("Cliente_Destinatario");
    const direccion = document.getElementById("Direccion_Destinatario");
    const telefono = document.getElementById("Telefono");
    const sucursales = document.getElementById("sucursales");

    retiroEnAgencia.addEventListener("change", (e) => {
        if (e.target.checked) {
            sucursales.classList.remove("bg-dark");
            nombre.disabled = true;
            direccion.disabled = true;
            telefono.disabled = true;
            sucursales.disabled = false;
            envioDomicilio.checked = false;
        }
    });

    envioDomicilio.addEventListener("change", (e) => {
        e.preventDefault();
        if (e.target.checked) {
            sucursales.classList.add("bg-dark");
            nombre.disabled = false;
            direccion.disabled = false;
            telefono.disabled = false;
            sucursales.disabled = true;
            retiroEnAgencia.checked = false;
        }
    });

   
    // Función para obtener las agencias
    async function cargarSucursales() {
        const idSesion = "OTkwOTA0NjEzMDMzODA0U2VwMjAyNDE1OjA0OjA5OjM3MA=="; // Reemplaza con el ID de sesión real

        if (!idSesion) {
            console.error('ID_Session no encontrado en el localStorage');
            return;
        }

        try {
            const url = "https://altis-ws.grupoagencia.com:444/JAgenciaQA/JAgencia.asmx/wsOficina";
            const data = {
                K_Oficina: 0, // Traer todas las agencias
                ID_Sesion: idSesion
            };

            const requestOptions = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                mode: "cors",
                body: JSON.stringify(data),
            };

            const response = await fetch(url, requestOptions);

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const responseData = await response.json();

            // Muestra en consola para depuración
            console.log('Respuesta del web service (JSON):', responseData);

            if (responseData.result === 0 && responseData.data) {
                sucursales.innerHTML = '<option selected disabled>Seleccione Sucursal</option>';
                responseData.data.forEach(agencia => {
                    const option = document.createElement('option');
                    option.value = agencia.K_Oficina;
                    option.textContent = agencia.D_Oficina;
                    sucursales.appendChild(option);
                });

                // Agregar evento para almacenar la selección
                sucursales.addEventListener('change', (e) => {
                    const K_Oficina_Destino = e.target.value;
                    localStorage.setItem('K_Oficina_Destino', K_Oficina_Destino);
                });
            } else {
                console.error('No se encontraron datos válidos.');
            }
        } catch (error) {
            console.error('Error al cargar las sucursales:', error);
        }
    }

    // Llama a la función para cargar las sucursales cuando la página se cargue
    cargarSucursales();
});
