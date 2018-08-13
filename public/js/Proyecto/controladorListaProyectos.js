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
    if (!radioSelected) {
        radioSelected = 'identificacion_juridica';
    }
    if (!inputDatoBuscar) {
        inputDatoBuscar = '';
    }

    for (let i = 0; i < infoProyecto.length; i++) {
        if(infoProyecto[i][radioSelected].toLowerCase().includes(inputDatoBuscar.toLowerCase())){ {
            let fila = tbody.insertRow();

            let cCedulaJuridica = fila.insertCell();
            let cNombreProyecto = fila.insertCell();
            let cNombreCliente = fila.insertCell();
            let cFechaEntrega = fila.insertCell();
            let verMas = fila.insertCell();
            let Modificar = fila.insertCell();

            let boton = document.createElement("input");
            boton.type = "button";
            boton.value = "Ver más";
            boton.classList.add('btnRegistro');

            let botonM = document.createElement("input");
            botonM.type = "button";
            botonM.value = "Modificar";
            botonM.classList.add('btnRegistro');
            botonM.classList.add('modProyecto')
            botonM.dataset._id = infoProyecto[i]['_id'];


            cCedulaJuridica.innerHTML = infoProyecto[i]['identificacion_juridica'];
            cNombreProyecto.innerHTML = infoProyecto[i]['nombre_proyecto'];
            cNombreCliente.innerHTML = infoProyecto[i]['nombre_cliente'];
            cFechaEntrega.innerHTML = infoProyecto[i]['fecha_Entrega'];
            verMas.appendChild(boton);
            Modificar.appendChild(botonM);




        }

    }

}
}


modificaProyecto();
function modificaProyecto() {

    let modProyecto = document.querySelectorAll('.modProyecto');
    modProyecto.forEach(function (elem) {
        elem.addEventListener("click", function () {

            let _id = elem.dataset._id;

            localStorage.setItem('idP', _id);
            document.location.href = 'modificarProyecto.html';
        })
    });

} 