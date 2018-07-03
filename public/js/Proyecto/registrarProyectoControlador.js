"use strict";
<<<<<<< HEAD
imprimirListaPersonas();
=======
>>>>>>> stable

//declaracion del boton y declaracion del event listener para dicho boton

let botonRegistrar = document.querySelector('#btnRegistrar');

botonRegistrar.addEventListener('click', obtenerDatos);

<<<<<<< HEAD
//declaracion de elementos
let inputNombreProyecto = document.querySelector('#txtNombreProyecto');

let selectNombreCliente = document.querySelector('#slNombredelCliente');

let inputIdentifiacionJuridica = document.querySelector('#txtIdentifiacionJuridica');

let selectEstadoProyecto = document.querySelector('#sltEstado');

let dateFechaEntrega = document.querySelector('#dtEntregaEstimada');

let inputDescripcion = document.querySelector('#txtDescripcion');
=======

>>>>>>> stable

function obtenerDatos() {


    let infoProyecto = [];
    let error = false;

<<<<<<< HEAD
    let sNombreProyecto = inputNombreProyecto.value;

    let sNombreCliente = selectNombreCliente.value;

    let nIdentifiacionJuridica = inputIdentifiacionJuridica.value;

    let sEstadoProyecto = selectEstadoProyecto.value;

    let sFechaEntrega = dateFechaEntrega.value;

    let sDescripcion = inputDescripcion.value;

    infoProyecto.push(sNombreProyecto, sNombreCliente, nIdentifiacionJuridica, sEstadoProyecto, sFechaEntrega, sDescripcion);
    
    registrarProyecto(infoProyecto);


    error = validarCampos();



}

function imprimirListaPersonas(){
    let listarProyectos = obtenerListaProyectos();
    let tbody = document.querySelector('#tblProyectos tbody');
    tbody.innerHTML = '';

    for(let i = 0; i < listarProyectos.length; i++){
        let fila = tbody.insertRow();

        let cCedulaJuridica = fila.insertCell();
        let cNombreProyecto = fila.insertCell();
        let cNombreCliente = fila.insertCell();
        let cFechaEntrega = fila.insertCell();

        cCedulaJuridica.innerHTML = listarProyectos[i]['identificacion_juridica'];
        cNombreProyecto.innerHTML = listarProyectos[i]['nombre_proyecto'];
        cNombreCliente.innerHTML = listarProyectos[i]['nombre_cliente'];
        cFechaEntrega.innerHTML = listarProyectos[i]['fecha_Entrega'];
    }

};

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


=======
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




    function validarCampos() {
        let error = true;

        let regexNombreDelProyecto = /^[a-z A-ZáéíóúÁÉÍÓÚñÑ 1234567890]+$/;

        if (sNombreProyecto == '' || (regexNombreDelProyecto.test(sNombreProyecto.value) == false)) {
            inputNombreProyecto.classList.remove('error_input');
            error = true;

        } else {
            inputNombreProyecto.classList.add('error_input');
        }


        if (sEstadoProyecto == '') {
            sEstadoProyecto.classList.add('error_input');
            error = true;
            
        }

      //  return error;


    }


}

>>>>>>> stable




