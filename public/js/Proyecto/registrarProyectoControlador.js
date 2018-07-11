"use strict";
moveUser(true);
listarSelectClientes();
//declaracion del boton y declaracion del event listener para dicho boton

let botonRegistrar = document.querySelector('#btnRegistrar');

botonRegistrar.addEventListener('click', obtenerDatos);
botonRegistrar.addEventListener('click',  agregarProyectoCliente);

//declaracion de elementos
let inputNombreProyecto = document.querySelector('#txtNombreProyecto');

let selectNombreCliente = document.querySelector('#slNombredelCliente');

let inputIdentifiacionJuridica = document.querySelector('#txtIdentifiacionJuridica');

let selectEstadoProyecto = document.querySelector('#sltEstado');

let dateFechaEntrega = document.querySelector('#dtEntregaEstimada');

let txtaDescripcion = document.querySelector('#txtDescripcion');


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

    infoProyecto.push(sNombreProyecto, sNombreCliente, nIdentifiacionJuridica, sEstadoProyecto, sFechaEntrega, sDescripcion);

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
        select.options[i] = new Option(slNombredelCliente[i]['nombre'], slNombredelCliente[i]['_id']);

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
console.log(id);
    let identificacionJuridica = inputIdentifiacionJuridica.value;
    let nombreProyecto = inputNombreProyecto.value;
    let fechaEntrega = dateFechaEntrega.value;
    let estadoProyecto = selectEstadoProyecto.value;

    infoProyecto.push(id, identificacionJuridica, nombreProyecto, fechaEntrega, estadoProyecto);


    asignarProyecto(infoProyecto);


}








