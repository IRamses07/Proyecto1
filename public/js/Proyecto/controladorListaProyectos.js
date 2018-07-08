"use strict";

imprimirListaProyectos();

function imprimirListaProyectos(){
    let infoProyecto = obtenerListaProyectos();
    let tbody = document.querySelector('#tblProyectos tbody');
    tbody.innerHTML = ' ';

    for(let i = 0; i < infoProyecto.length; i++){
        let fila = tbody.insertRow();

        let cCedulaJuridica = fila.insertCell();
        let cNombreProyecto = fila.insertCell();
        let cNombreCliente = fila.insertCell();
        let cFechaEntrega = fila.insertCell();
        let verMas = fila.insertCell();

        let boton = document.createElement("input");
        boton.type = "button";
        boton.value = "Ver más";
        boton.classList.add('btnRegistro');

        cCedulaJuridica.innerHTML = infoProyecto[i]['identificacion_juridica'];
        cNombreProyecto.innerHTML = infoProyecto[i]['nombre_proyecto'];
        cNombreCliente.innerHTML = infoProyecto[i]['nombre_cliente'];
        cFechaEntrega.innerHTML = infoProyecto[i]['fecha_Entrega'];
        verMas.appendChild(boton);
    }

}