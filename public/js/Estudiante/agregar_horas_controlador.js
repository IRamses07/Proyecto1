'use strict';
llenarSelectEstudiantes();

let botonRegistrar = document.querySelector('#btnHoras');
botonRegistrar.addEventListener('click',optenerDatos);
let selectNombreProyecto = document.querySelector('#nombreProyecto');

let inputHoras = document.querySelector('#cantHoras');



function llenarSelectEstudiantes() {

    let listaProyecto = getCurrentUserData()['proyectos'];;

    let select = document.querySelector('#nombreProyecto');
    select.options[0] = new Option("Seleccione un Proyecto", );

    for (let i = 0; i < listaProyecto.length; i++) {
        // if (listaProyecto[i]['estado_proyecto'] == 'desarrollo' || listaProyecto[i]['estado_proyecto'] == 'desarrollo') {
        select.options[i + 1] = new Option(listaProyecto[i]['nombre_proyecto'], listaProyecto[i]['nombre_proyecto']);
    }


}



function optenerDatos() {
    let id = selectNombreProyecto.value;
    let horas = inputHoras.value;

    agregarHorasProyecto(id,horas);





}




