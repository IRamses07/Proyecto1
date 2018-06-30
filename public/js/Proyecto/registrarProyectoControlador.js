"use strict";

//declaracion del boton y declaracion del event listener para dicho boton

let botonRegistrar = document.querySelector('#btnRegistrar');

botonRegistrar.addEventListener('click', obtenerDatos);



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
            .classList.add('error_input');
            error = true;
            
        }

      //  return error;


    }


}





