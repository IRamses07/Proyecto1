"use strict";

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

    console.log(error);

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
        swal({
            type: 'success',
            title: 'Registro exitoso',
            text: 'El usuario se registró adecuadamente',
            confirmButtonText: 'Entendido'
        });


    }


}

function listarSelectClientes(){
    let slNombredelCliente = listarClientes();
    let select =  document.querySelector('#slNombredelCliente');
    select.options[0] = new Option("Seleccione un cliente...", "");

    for(let i = 0; i < slNombredelCliente.length; i++){
        select.options[i] = new Option(slNombredelCliente[i]['nombre'], slNombredelCliente[i]['nombre']);

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








