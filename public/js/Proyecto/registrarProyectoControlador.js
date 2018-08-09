"use strict";
moveUser(true);
listarSelectClientes();


//declaracion del boton y declaracion del event listener para dicho boton

let botonRegistrar = document.querySelector('#btnRegistrar');

botonRegistrar.addEventListener('click', obtenerDatosr);






//declaracion de elementos
let inputNombreProyecto = document.querySelector('#txtNombreProyecto');

let selectNombreCliente = document.querySelector('#slNombredelCliente');

let inputIdentifiacionJuridica = document.querySelector('#txtIdentifiacionJuridica');

let selectEstadoProyecto = document.querySelector('#sltEstado');

let dateFechaEntrega = document.querySelector('#dtEntregaEstimada');

let txtaDescripcion = document.querySelector('#txtDescripcion');



document.getElementById('#slNombredelCliente').onchange = llenarCedulaJuridica();

function llenarCedulaJuridica() {
    let listaClientes = listarClientes();
    let nombreCliente = document.querySelector('#slNombredelCliente').value;
    let cedulaJuridica;

    for (let i = 0; i < listaClientes.length; i++) {

        if (listaClientes[i]['_id'] == (nombreCliente)) {
            cedulaJuridica = listaClientes[i]['cedula_juridica'];
        } else {
            if (nombreCliente == '' || nombreCliente.value == 'Seleccione un cliente') {
                cedulaJuridica.document.pplaceholder = 'Ejm:123456789';
            }
        }
    }

    let inputIdentifiacionJuridica = document.querySelector('#txtIdentifiacionJuridica');

    inputIdentifiacionJuridica.value = cedulaJuridica;
}

function limpiarFormulairo() {
    inputNombreProyecto.value = '';
    // inputIdentifiacionJuridica.value = '';
    txtaDescripcion.value = '';
    dateFechaEntrega.value = 'dd/mm/aaaa';

}

function obtenerDatosr() {


    let infoProyecto = [];
    let error = false;
    let tecnologiasWed;
    let tecnologiasMovil;
    let tecologiasBd;

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


    // if (error == '1') {
    //     swal({
    //         type: 'warning',
    //         title: 'No se pudo registrar el usuario',
    //         text: 'Ya existe un Proyecto con este nombre',
    //         confirmButtonText: 'Entendido'
    //     });
    //     console.log('No se pudo registrar el usuario');
    // } else {
    //     if (error = true) {
    //         swal({
    //             type: 'warning',
    //             title: 'No se pudo registrar el usuario',
    //             text: 'Por favor revise los campos en rojo',
    //             confirmButtonText: 'Entendido'
    //         });
    //     } else {
    //         tecnologiasT = recorrerTecnologias();

    //         registrarProyecto(sNombreProyecto, cliente, nIdentifiacionJuridica, sEstadoProyecto, sFechaEntrega, sDescripcion, tecnologiasT);
    //         agregarProyectoCliente();
    //         limpiarFormulairo();



    //         swal({
    //             type: 'success',
    //             title: 'Registro exitoso',
    //             text: 'El usuario se registró adecuadamente',
    //             confirmButtonText: 'Entendido'
    //         });
    //     }
    // }
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
                tecnologiasWed = recorrerTecnologiasWed();
                tecnologiasMovil = recorrerTecnologiasMovil();
                tecologiasBd = recorrerTecnologiasBD();

            registrarProyecto(sNombreProyecto, cliente, nIdentifiacionJuridica, sEstadoProyecto, sFechaEntrega, sDescripcion, tecnologiasWed, tecnologiasMovil, tecologiasBd);
            agregarProyectoCliente();
            limpiarFormulairo();
        

            swal({
                type: 'success',
                title: 'Registro exitoso',
                text: 'El usuario se registró adecuadamente',
                confirmButtonText: 'Entendido'
            });
            break;

        case 3:
            swal({
                type: 'warning',
                title: 'No se pudo registrar el usuario',
                text: 'Ya existe un Proyecto con este nombre',
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



function listarSelectClientes() {
    let slNombredelCliente = listarClientes();
    let select = document.querySelector('#slNombredelCliente');
    select.options[0] = new Option("Seleccione un cliente", "");

    for (let i = 0; i < slNombredelCliente.length; i++) {
        select.options[i + 1] = new Option(slNombredelCliente[i]['nombre'], slNombredelCliente[i]['_id']);

    }
}



function validarCampos() {
    let error = true;
    let Proyectos = obtenerListaProyectos();
    let regexNombreDelProyecto = /^[a-z A-ZáéíóúÁÉÍÓÚñÑ 1234567890]+$/;
    let regexCedulaJuridica = /^[1234567890 ]+$/;

    if (inputNombreProyecto.value == '' || (regexNombreDelProyecto.test(inputNombreProyecto.value) == false)) {
        inputNombreProyecto.classList.add('error_input');
        error = 1;
        inputNombreProyecto.classList.add('error_input');

    } else {
        for (let i = 0; i < Proyectos.length; i++) {

            if (Proyectos[i]['nombre_proyecto'] == inputNombreProyecto.value) {
                inputNombreProyecto.classList.add('error_input');
                error = 3;
                return error;
                break;

            } else {
                inputNombreProyecto.classList.remove('error_input');
                error = 2
            }

        }
    }

    if (selectNombreCliente.value == '' || selectNombreCliente.value == 'Seleccione un cliente') {
        selectNombreCliente.classList.add('error_input');
        error = 1;
    } else {

        selectNombreCliente.classList.remove('error_input');
        error = 2

    }

    if (inputIdentifiacionJuridica.value == '') {
        inputIdentifiacionJuridica.classList.add('error_input');
        error = true;
    } else {
        inputIdentifiacionJuridica.classList.remove('error_input');
        error = false
    }

    if (selectEstadoProyecto.value == '' || selectEstadoProyecto.value == 'defecto') {
        selectEstadoProyecto.classList.add('error_input');
        error = 1;
    } else {
        selectEstadoProyecto.classList.remove('error_input');
        error = 2;
    }
    if (dateFechaEntrega.value == '') {
        dateFechaEntrega.classList.add('error_input');
        error = 1;
    } else {
        dateFechaEntrega.classList.remove('error_input');
        error = 2;
    }

    if (txtaDescripcion.value == '') {
        txtaDescripcion.classList.add('error_input');
        error = 1;
    } else {
        txtaDescripcion.classList.remove('error_input');
        error = 2;
    }

    console.log(error);
    return error;


}

function agregarProyectoCliente() {
    let infoProyecto = [];





    let id = selectNombreCliente.value;
    let idP;
    let nombreProyecto = inputNombreProyecto.value;
    let fechaEntrega = dateFechaEntrega.value;
    let estadoProyecto = selectEstadoProyecto.value;

    let proyecto = obtenerListaProyectos();


    for (let i = 0; i < proyecto.length; i++) {

        if (proyecto[i]['nombre_proyecto'] == (inputNombreProyecto.value)) {
            idP = proyecto[i]['_id'];
        }


    }

    infoProyecto.push(id, idP, nombreProyecto, fechaEntrega, estadoProyecto);


    asignarProyectoC(id, idP, nombreProyecto, fechaEntrega, estadoProyecto);


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








// function llenarCedulaJuridica() {
//     let cedulaJuridica = listarClientes()['cedula_juridica'];
//     let inptCedulaJuridica = document.querySelector('#txtnombreCliente');
//     inptCedulaJuridica.value = cedulaJuridica;

// }