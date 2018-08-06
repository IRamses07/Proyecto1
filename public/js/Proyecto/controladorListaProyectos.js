"use strict";
moveUser(true);
imprimirListaProyectos();



const inputFiltro = document.querySelector('#txtFiltro');

inputFiltro.addEventListener('keyup', function () {
    imprimirListaProyectos(inputFiltro.value)
});

function imprimirListaProyectos(pFiltro) {

    let infoProyecto = obtenerListaProyectos();
    let tbody = document.querySelector('#tblProyectos tbody');
    if (!pFiltro) {
        pFiltro = '';
    }
    tbody.innerHTML = ' ';

    for (let i = 0; i < infoProyecto.length; i++) {
        if (infoProyecto[i]['nombre_proyecto'].toLowerCase().includes(pFiltro.toLowerCase()) || infoProyecto[i]['identificacion_juridica'].toLowerCase().includes(pFiltro.toLowerCase())) {
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
modificaProyecto();
function modificaProyecto() {

    let modProyecto = document.querySelectorAll('.modProyecto');
    modProyecto.forEach(function (elem) {
        elem.addEventListener("click", function () {
            
            let _id = elem.dataset._id;
            
            localStorage.setItem('idP',_id);
            document.location.href = 'modificarProyecto.html';
        })
    });

}