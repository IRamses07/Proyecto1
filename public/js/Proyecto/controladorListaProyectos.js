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

        cCedulaJuridica.innerHTML = infoProyecto[i]['identificacion_juridica'];
        cNombreProyecto.innerHTML = infoProyecto[i]['nombre_proyecto'];
        cNombreCliente.innerHTML = infoProyecto[i]['nombre_cliente'];
        cFechaEntrega.innerHTML = infoProyecto[i]['fecha_Entrega'];
    }

}