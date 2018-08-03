'use strict';


let inputNombreProyectoM = document.querySelector('#txtNombreProyecto');

let selectNombreClienteM = document.querySelector('#slNombredelCliente');

let inputIdentifiacionJuridicaM = document.querySelector('#txtIdentifiacionJuridica');

let selectEstadoProyectoM = document.querySelector('#sltEstado');

let dateFechaEntregaM = document.querySelector('#dtEntregaEstimada');

let txtaDescripcionM = document.querySelector('#txtDescripcion');

llenarFormulario();

function llenarFormulario() {
    listarSelectClientesM();
    let id = localStorage.getItem('idP')

    let proyecto = obtenerProyectoId(id);

    inputNombreProyectoM.value = proyecto['nombre_proyecto'];

    dateFechaEntregaM.value = proyecto['fecha_Entrega'];
    inputIdentifiacionJuridicaM.value = proyecto['identificacion_juridica'];
    selectEstadoProyectoM.value = proyecto['estado_proyecto'];
    selectNombreClienteM.value = proyecto['nombre_cliente'];
    txtaDescripcionM.value = proyecto['descripcion'];

    console.log(proyecto, inputNombreProyectoM.value, selectNombreClienteM.value);



}


function listarSelectClientesM() {
    let slNombredelCliente = listarClientes();
    let select = document.querySelector('#slNombredelCliente');
    select.options[0] = new Option("Seleccione un cliente", "");

    for (let i = 0; i < slNombredelCliente.length; i++) {
        select.options[i + 1] = new Option(slNombredelCliente[i]['nombre'], slNombredelCliente[i]['_id']);

    }
}

