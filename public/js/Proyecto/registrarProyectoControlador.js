"use strict";
moveUser(true);
listarSelectClientes();


//declaracion del boton y declaracion del event listener para dicho boton

let botonRegistrar = document.querySelector('#btnRegistrar');

botonRegistrar.addEventListener('click', obtenerDatos);




//declaracion de elementos
let inputNombreProyecto = document.querySelector('#txtNombreProyecto');

let selectNombreCliente = document.querySelector('#slNombredelCliente');

let inputIdentifiacionJuridica = document.querySelector('#txtIdentifiacionJuridica');

let selectEstadoProyecto = document.querySelector('#sltEstado');

let dateFechaEntrega = document.querySelector('#dtEntregaEstimada');

let txtaDescripcion = document.querySelector('#txtDescripcion');



 document.getElementById('#slNombredelCliente').onchange = llenarCedulaJuridica();

function llenarCedulaJuridica () {
    let listaClientes = listarClientes();
    let nombreCliente = document.querySelector('#slNombredelCliente').value;
    let cedulaJuridica;

    for (let i = 0; i < listaClientes.length; i++) {

        if (listaClientes[i]['_id'] == (nombreCliente)) {
            cedulaJuridica = listaClientes[i]['cedula_juridica'];
        }
    }

    let inputIdentifiacionJuridica = document.querySelector('#txtIdentifiacionJuridica');

    inputIdentifiacionJuridica.value = cedulaJuridica; 
}

function limpiarFormulairo() {
    inputNombreProyecto.value = '';
    inputIdentifiacionJuridica.value = '';
    txtaDescripcion.value = '';
    dateFechaEntrega.value = 'dd/mm/aaaa';

}

function obtenerDatos() {


    let infoProyecto = [];
    let error = false;

    let sNombreProyecto = inputNombreProyecto.value;

    let sNombreCliente = selectNombreCliente.value;

    let nIdentifiacionJuridica = inputIdentifiacionJuridica.value;

    let sEstadoProyecto = selectEstadoProyecto.value;

    let sFechaEntrega = dateFechaEntrega.value;

    let sDescripcion = txtaDescripcion.value;
    let lista = listarClientes();
    let cliente;
    for (let i = 0; i < lista.length; i++) {

        if (lista[i]['_id'] == (sNombreCliente)) {
            cliente = lista[i]['nombre'];
        }
    }

    // obtenerNombre();
    infoProyecto.push(sNombreProyecto, cliente, nIdentifiacionJuridica, sEstadoProyecto, sFechaEntrega, sDescripcion);

    error = validarCampos();


    if (error == true) {
        swal({
            type: 'warning',
            title: 'No se pudo registrar el usuario',
            text: 'Por favor revise los campos en rojo',
            confirmButtonText: 'Entendido'
        });
        console.log('No se pudo registrar el usuario');
    } else {
        agregarProyectoCliente();
        registrarProyecto(infoProyecto);
        limpiarFormulairo();

        swal({
            type: 'success',
            title: 'Registro exitoso',
            text: 'El usuario se registró adecuadamente',
            confirmButtonText: 'Entendido'
        });


    }


}



function listarSelectClientes() {
    let slNombredelCliente = listarClientes();
    let select = document.querySelector('#slNombredelCliente');
    select.options[0] = new Option("Seleccione un cliente...", "");

    for (let i = 0; i < slNombredelCliente.length; i++) {
        select.options[i+1] = new Option(slNombredelCliente[i]['nombre'], slNombredelCliente[i]['_id']);

    }
}



function validarCampos() {
    let error = true;

    let regexNombreDelProyecto = /^[a-z A-ZáéíóúÁÉÍÓÚñÑ 1234567890]+$/;
    let regexCedulaJuridica = /^[1234567890 ]+$/;

    if (inputNombreProyecto.value == '' || (regexNombreDelProyecto.test(inputNombreProyecto.value) == false)) {
        inputNombreProyecto.classList.add('error_input');
        error = true;

    } else {
        inputNombreProyecto.classList.remove('error_input');
        error = false
    }

    if (selectNombreCliente.value == '') {
        selectNombreCliente.classList.add('error_input');
        error = true;
    } else {

        selectNombreCliente.classList.remove('error_input');
        error = false

    }

    if (inputIdentifiacionJuridica.value == '' || (regexCedulaJuridica.test(inputIdentifiacionJuridica.value) == false)) {
        inputIdentifiacionJuridica.classList.add('error_input');
        error = true;
    } else {
        inputIdentifiacionJuridica.classList.remove('error_input');
        error = false
    }

    if (selectEstadoProyecto.value == '') {
        selectEstadoProyecto.classList.add('error_input');
        error = true;
    } else {
        selectEstadoProyecto.classList.remove('error_input');
        error = false;
    }
    if (dateFechaEntrega.value == '') {
        dateFechaEntrega.classList.add('error_input');
        error = true;
    } else {
        dateFechaEntrega.classList.remove('error_input');
        error = false;
    }

    if (txtaDescripcion.value == '') {
        txtaDescripcion.classList.add('error_input');
        error = true;
    } else {
        txtaDescripcion.classList.remove('error_input');
    }

    return error;


}

function agregarProyectoCliente() {
    let infoProyecto = [];





    let id = selectNombreCliente.value;
    let id1 = selectNombreCliente.value;
    let nombreProyecto = inputNombreProyecto.value;
    let fechaEntrega = dateFechaEntrega.value;
    let estadoProyecto = selectEstadoProyecto.value;

    let proyecto = obtenerListaProyectos();


    for (let i = 0; i < proyecto.length; i++) {

        if (proyecto[i]['nombre_proyecto'] == (inputNombreProyecto.value)) {
            id1 = proyecto[i]['_id'];
        }


    }

    infoProyecto.push(id, id1, nombreProyecto, fechaEntrega, estadoProyecto);


    asignarProyectoC(id, id1, nombreProyecto, fechaEntrega, estadoProyecto);


}


// function llenarCedulaJuridica() {
//     let cedulaJuridica = listarClientes()['cedula_juridica'];
//     let inptCedulaJuridica = document.querySelector('#txtnombreCliente');
//     inptCedulaJuridica.value = cedulaJuridica;

// }