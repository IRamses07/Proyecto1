'use strict';
llenarSelectEstudiantes();

let botonRegistrar = document.querySelector('#btnHoras');
botonRegistrar.addEventListener('click', optenerDatos);


let selectNombreProyecto = document.querySelector('#nombreProyecto');

let inputHoras = document.querySelector('#cantHoras');

let dtfecha = document.querySelector('#dtFecha');

let fromulario = document.querySelector('#frmHoras');


function llenarSelectEstudiantes() {

    let listaProyecto = getCurrentUserData()['proyectos'];;

    let select = document.querySelector('#nombreProyecto');
    select.options[0] = new Option("Seleccione un Proyecto");

    for (let i = 0; i < listaProyecto.length; i++) {
        // if (listaProyecto[i]['estado_proyecto'] == 'desarrollo' || listaProyecto[i]['estado_proyecto'] == 'desarrollo') {
        select.options[i + 1] = new Option(listaProyecto[i]['nombre_proyecto'], listaProyecto[i]['_id']);
    }
}



function optenerDatos() {

    let error;

    let idE = getCurrentUserData()['_id'];
    let id = selectNombreProyecto.value;
    let horas = inputHoras.value;
    let fecha = dtfecha.value;

    error = validar();

    switch (error) {
        case 1:


            break;

        case 2:

            agregarHorasProyecto(idE, id, horas, fecha);
            swal({
                type: 'success',
                title: 'Registro exitoso',
                text: 'El Proyecto se registró adecuadamente',
                confirmButtonText: 'Entendido'
            });

            fromulario.reset();

            break;

        default:
            break;
    }

}



function validar() {

    let error;

    if (selectNombreProyecto.value == '' || selectNombreProyecto.value == 'Seleccione un Proyecto') {
        selectNombreProyecto.classList.add('error_input');
        error = 1;
    } else {
        selectNombreProyecto.classList.remove('error_input');
        error = 2;
    }

    if (inputHoras.value == '') {
        inputHoras.classList.add('error_input');
        error = 1;
    } else {
        inputHoras.classList.remove('error_input');
        error = 2;
    }

    if (dtfecha.value == '') {
        dtfecha.classList.add('error_input');
        error = 1;
    } else {
        dtfecha.classList.remove('error_input');
        error = 2;
    }

    return error;


}






