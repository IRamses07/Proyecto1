'use strict';

let botonRegistrar = document.querySelector('#btnModificar');

botonRegistrar.addEventListener('click', tomarDatosA);

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

    document.getElementById('slNombredelCliente').click();
    $('select[id="slNombredelCliente"]').find('option:contains("' + proyecto['nombre_cliente'] + '")').attr("selected", true);

    console.log(proyecto, inputNombreProyectoM.value, selectNombreClienteM.value);



}


function tomarDatosA() {
    let infoA = [];

    let sNombreProyecto = inputNombreProyectoM.value;

    let sNombreCliente = selectNombreClienteM.value;

    let nIdentifiacionJuridica = inputIdentifiacionJuridicaM.value;

    let sEstadoProyecto = selectEstadoProyectoM.value;

    let sFechaEntrega = dateFechaEntregaM.value;

    let sDescripcion = txtaDescripcionM.value;
    let lista = listarClientes();
    let cliente;
    for (let i = 0; i < lista.length; i++) {

        if (lista[i]['_id'] == (sNombreCliente)) {
            cliente = lista[i]['nombre'];
        }
    }
    let id = localStorage.getItem('idP')

    let tecnologiasWed = recorrerTecnologiasWed();
    let tecnologiasMovil = recorrerTecnologiasMovil();
    let tecologiasBd = recorrerTecnologiasBD();

    infoA.push(id, sNombreProyecto, cliente, nIdentifiacionJuridica, sEstadoProyecto, sFechaEntrega, sDescripcion, info);

    modificarProyecto(id, sNombreProyecto, cliente, nIdentifiacionJuridica, sEstadoProyecto, sFechaEntrega, sDescripcion, tecnologiasWed, tecnologiasMovil, tecologiasBd);




}




function listarSelectClientesM() {
    let slNombredelCliente = listarClientes();
    let select = document.querySelector('#slNombredelCliente');
    select.options[0] = new Option("Seleccione un cliente", "");

    for (let i = 0; i < slNombredelCliente.length; i++) {
        select.options[i + 1] = new Option(slNombredelCliente[i]['nombre'], slNombredelCliente[i]['_id']);

    }
}


function recorrerTecnologiasWed() {
    let listaProyectos = [];

    $("input[name=wed]").each(function (index) {
        if ($(this).is(':checked')) {
            listaProyectos.push(($(this).val()));

        }
    });

    return listaProyectos;

}


function recorrerTecnologiasMovil() {
    let listaProyectos = [];

    $("input[name=movil]").each(function (index) {
        if ($(this).is(':checked')) {
            listaProyectos.push(($(this).val()));

        }
    });

    return listaProyectos;

}

function recorrerTecnologiasBD() {
    let listaProyectos = [];

    $("input[name=baseDatos]").each(function (index) {
        if ($(this).is(':checked')) {
            listaProyectos.push(($(this).val()));

        }
    });

    return listaProyectos;

}

