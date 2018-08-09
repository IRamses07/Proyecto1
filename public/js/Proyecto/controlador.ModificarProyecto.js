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





    let error = 0;

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


    error = validarCampos();
    error = verificarEstado();

    mensajesDeRetroAlimentacion(error, sNombreProyecto, nIdentifiacionJuridica, sEstadoProyecto, sFechaEntrega, sDescripcion, cliente);


}

function mensajesDeRetroAlimentacion(error, sNombreProyecto, nIdentifiacionJuridica, sEstadoProyecto, sFechaEntrega, sDescripcion, cliente) {

    switch (error) {
        case 1:
            swal({
                type: 'warning',
                title: 'No se pudo registrar el usuario',
                text: 'Por favor revise los campos en rojo',
                confirmButtonText: 'Entendido'
            });
            break;
        case 2:
            let id = localStorage.getItem('idP')
            let tecnologiasWed = recorrerTecnologiasWed();
            let tecnologiasMovil = recorrerTecnologiasMovil();
            let tecologiasBd = recorrerTecnologiasBD();

            modificarProyecto(id, sNombreProyecto, cliente, nIdentifiacionJuridica, sEstadoProyecto, sFechaEntrega, sDescripcion, tecnologiasWed, tecnologiasMovil, tecologiasBd);

            swal({
                type: 'success',
                title: 'Registro exitoso',
                text: 'El Proyecto se registró adecuadamente',
                confirmButtonText: 'Entendido'
            });
            break;

        case 3:
            swal({
                type: 'warning',
                title: 'No se pudo registrar el Proyecto',
                text: 'Por favor establesca otra fecha para le plazo de mantemiento',
                confirmButtonText: 'Entendido'
            });
            break;
        default:

            swal({
                type: 'info',
                title: 'Algo salio mal',
                text: 'Por favor intenete de nuevo',
                confirmButtonText: 'Entendido'
            });



    }
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

function validarCampos() {
    let error = 0;
    // let Proyectos = obtenerListaProyectos();
    let regexNombreDelProyecto = /^[a-z A-ZáéíóúÁÉÍÓÚñÑ 1234567890]+$/;
    let regexCedulaJuridica = /^[1234567890 ]+$/;

    if (inputNombreProyectoM.value == '' || (regexNombreDelProyecto.test(inputNombreProyectoM.value) == false)) {
        inputNombreProyectoM.classList.add('error_input');
        error = 1;
        inputNombreProyectoM.classList.add('error_input');

    }
    else {
        inputNombreProyectoM.classList.remove('error_input');
        error = 2
    }

    if (selectNombreClienteM.value == '' || selectNombreClienteM.value == 'Seleccione un cliente') {
        selectNombreClienteM.classList.add('error_input');
        error = 1;
    } else {

        selectNombreClienteM.classList.remove('error_input');
        error = 2

    }

    if (inputIdentifiacionJuridicaM.value == '') {
        inputIdentifiacionJuridicaM.classList.add('error_input');
        error = true;
    } else {
        inputIdentifiacionJuridicaM.classList.remove('error_input');
        error = false
    }

    if (selectEstadoProyectoM.value == '' || selectEstadoProyectoM.value == 'defecto') {
        selectEstadoProyectoM.classList.add('error_input');
        error = 1;
    } else {
        selectEstadoProyectoM.classList.remove('error_input');
        error = 2;
    }
    if (dateFechaEntregaM.value == '') {
        dateFechaEntregaM.classList.add('error_input');
        error = 1;
    } else {
        dateFechaEntregaM.classList.remove('error_input');
        error = 2;
    }

    if (txtaDescripcionM.value == '') {
        txtaDescripcionM.classList.add('error_input');
        error = 1;
    } else {
        txtaDescripcionM.classList.remove('error_input');
        error = 2;
    }


    return error;
}


function verificarEstado() {

    let error = 0;
    let proyectos = obtenerListaProyectos();
    for (let i = 0; i < proyectos.length; i++) {
        if (selectEstadoProyectoM.value == 'mantenimiento' && dateFechaEntregaM.value == proyectos[i]['fecha_Entrega']) {
            error = 3;
            break;
        } else {
            if (dateFechaEntregaM.value < proyectos[i]['fecha_Entrega']) {
                error = 3;
                return error;
                break;
            } else {
                error = 2;
            }
        }
    }
    return error;

}

