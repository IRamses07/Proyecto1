'use strict';


let inputNombreProyecto = document.querySelector('#txtNombreProyecto');

let selectNombreCliente = document.querySelector('#slNombredelCliente');

let inputIdentifiacionJuridica = document.querySelector('#txtIdentifiacionJuridica');

let selectEstadoProyecto = document.querySelector('#sltEstado');

let dateFechaEntrega = document.querySelector('#dtEntregaEstimada');

let txtaDescripcion = document.querySelector('#txtDescripcion');


function llenarFormulario() {

    let id = localStorage.getItem('idP')

    let proyecto = obtenerProyectoId(id);

    inputNombreProyecto.value = proyecto['nombre_proyecto'];
    
    

}
