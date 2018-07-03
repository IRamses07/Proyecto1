"use strict";

//declaracion del boton y declaracion del event listener para dicho boton

let botonRegistrar = document.querySelector('#btnRegistrar');

botonRegistrar.addEventListener('click', obtenerDatos);

//declaracion de elementos
let inputNombreProyecto = document.querySelector('#txtNombreProyecto');

let selectNombreCliente = document.querySelector('#slNombredelCliente');

let inputIdentifiacionJuridica = document.querySelector('#txtIdentifiacionJuridica');

let selectEstadoProyecto = document.querySelector('#sltEstado');

let dateFechaEntrega = document.querySelector('#dtEntregaEstimada');

let inputDescripcion = document.querySelector('#txtDescripcion');

function obtenerDatos() {


    let infoProyecto = [];
    let error = false;

    let sNombreProyecto = inputNombreProyecto.value;

    let sNombreCliente = selectNombreCliente.value;

    let nIdentifiacionJuridica = inputIdentifiacionJuridica.value;

    let sEstadoProyecto = selectEstadoProyecto.value;

    let sFechaEntrega = dateFechaEntrega.value;

    let sDescripcion = inputDescripcion.value;

    infoProyecto.push(sNombreProyecto, sNombreCliente, nIdentifiacionJuridica, sEstadoProyecto, sFechaEntrega, sDescripcion);
    
    registrarProyecto(infoProyecto);


}

function obtenerDatos() {


    let infoProyecto = [];
    let error = false;

    let sNombreProyecto = document.querySelector('#txtNombreProyecto').value;

    let sNombreCliente = document.querySelector('#slNombredelCliente').value;

    let nIdentifiacionJuridica = document.querySelector('#txtIdentifiacionJuridica').value;

    let sEstadoProyecto = document.querySelector('#sltEstado').value;

    let sFechaEntrega = document.querySelector('#dtEntregaEstimada').value;

    let sDescripcion = document.querySelector('#txtDescripcion').value;

    //
    let inputNombreProyecto = document.querySelector('#txtNombreProyecto');

    let selectNombreCliente = document.querySelector('#slNombredelCliente');

    let inputIdentifiacionJuridica = document.querySelector('#txtIdentifiacionJuridica');

    let selectEstadoProyecto = document.querySelector('#sltEstado');

    let dateFechaEntrega = document.querySelector('#dtEntregaEstimada');

    let inputDescripcion = document.querySelector('#txtDescripcion');

    

    infoProyecto.push(sNombreProyecto, sNombreCliente, nIdentifiacionJuridica, sEstadoProyecto, sFechaEntrega, sDescripcion);

    error = validarCampos();



}

function validarCampos() {
    let error = true;

    let regexNombreDelProyecto = /^[a-z A-ZáéíóúÁÉÍÓÚñÑ 1234567890]+$/;

    if (inputNombreProyecto.value == '' || (regexNombreDelProyecto.test(inputNombreProyecto.value) == false)) {
        inputNombreProyecto.classList.add('error_input');
        error = true;

    } else {
        inputNombreProyecto.classList.remove('error_input');
    }




    //  return error;


}


  





