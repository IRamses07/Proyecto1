"use strict";
moveUser(true);
imprimirListaProyectos();



let btnBuscar = document.querySelector('#btnBuscarProyecto');
let inputDatoBuscar = document.querySelector('#inputBuscar');


// inputFiltro.addEventListener('keyup', function () {
//     imprimirListaProyectos(inputFiltro.value)
// });

btnBuscar.addEventListener('click', function () {
    let radioSelected = document.querySelector('#form input[type="radio"]:checked');
    imprimirListaProyectos(radioSelected.value, inputDatoBuscar.value);
});

function imprimirListaProyectos(radioSelected, inputDatoBuscar) {

    let infoProyecto = obtenerListaProyectos();
    let tbody = document.querySelector('#tblProyectos tbody');
    tbody.innerHTML = '';

    if (!radioSelected) {
        radioSelected = 'identificacion_juridica';
    }
    if (!inputDatoBuscar) {
        inputDatoBuscar = '';
    }

    for (let i = 0; i < infoProyecto.length; i++) {
        if (infoProyecto[i][radioSelected].toLowerCase().includes(inputDatoBuscar.toLowerCase())) {
            {
                let fila = tbody.insertRow();

                let cCedulaJuridica = fila.insertCell();
                let cNombreProyecto = fila.insertCell();
                let cNombreCliente = fila.insertCell();
                let cFechaEntrega = fila.insertCell();
            
               

                let boton = document.createElement("input");
                boton.type = "button";
                boton.value = "Ver más";
                boton.classList.add('btnRegistro');


                cCedulaJuridica.innerHTML = infoProyecto[i]['identificacion_juridica'];
                cNombreProyecto.innerHTML = infoProyecto[i]['nombre_proyecto'];
                cNombreCliente.innerHTML = infoProyecto[i]['nombre_cliente'];
                cFechaEntrega.innerHTML = infoProyecto[i]['fecha_Entrega'];
              
              




            }

        }

    }
}