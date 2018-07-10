'use strict';
moveUser(true);

let botonRegistrarTicket = document.querySelector('#btnRegistrarTicket');
botonRegistrarTicket.addEventListener('click', obtenerDatosTicket);



let inptNombreCliente = document.querySelector('#txtnombreCliente');
let inptUrgencia = document.querySelector('#sltUrgencia');
let inptProyecto = document.querySelector('#sltProyecto');
let inptimagenErr = document.querySelector('#file-upload');
let inptReferenciaTicket = document.querySelector('#sltTicket');

let inptDescripcionError = document.querySelector('#txtdescripcion');
listarSelectProyectos();


function obtenerDatosTicket() {
    let ticket = [];
    let error = false;
    error = validar();
    let nombreCliente = inptNombreCliente.value;
    let urgencia = inptUrgencia.value;
    let proyecto = inptProyecto.value;
    let imagenErr = imgUrl;
    let referenciaTicket = inptReferenciaTicket.value;
    let descripcionError = inptDescripcionError.value;
    ticket.push(nombreCliente, urgencia, proyecto, imagenErr, referenciaTicket, descripcionError);
    // imagenErr   en caso de no servir la prueba sin este dato va dentro del parentesis del push

  
    if (error == true) {
        console.log('aquí va un sweet alert xD ');
        swal({
            title: "Registro fallido",
            text: "El ticket no se ha podido registrar",
            icon: "error",
            button: "Ok",
          });
    } else {
        registrarTicket(ticket);
        swal({
            title: "Registro exitoso",
            text: "El ticket se ha registrado correctamente",
            icon: "success",
            button: "Ok",
          });
        console.log('aquí va otro sweet alert xDD');
        limpiarFormulario();
    }

};

function validar() {
    let error = false;

    if (inptNombreCliente.value == '') {
        inptNombreCliente.classList.add('error');
        error = true;
    } else {
        inptNombreCliente.classList.remove('error');
    }
    if (inptUrgencia.value == '') {
        inptUrgencia.classList.add('error');
        error = true;
    } else {
        inptUrgencia.classList.remove('error');
    }
    if (inptProyecto.value == '') {
        inptProyecto.classList.add('error');
        error = true;
    } else {
        inptProyecto.classList.remove('error');
    }
    if (inptimagenErr.value == '') {
        inptimagenErr.classList.add('error');
        console.log(inptimagenErr);

        error = true;
    } else {
        console.log(inptimagenErr);
        inptimagenErr.classList.remove('error');
    }

    if (inptDescripcionError.value == '') {
        inptDescripcionError.classList.add('error');
        error = true;
    } else {
        inptDescripcionError.classList.remove('error');
    }
    return error;
} 


function limpiarFormulario() {
    inptNombreCliente.value = '';
    inptUrgencia.value = '';
    inptProyecto.value = '';
    inptimagenErr.value = '';
    inptReferenciaTicket.value = '';
    inptDescripcionError.value = '';

}

function listarSelectProyectos(){
    let sltproyectos = listarProyectos();
    let select =  document.querySelector('#sltProyecto');
    select.options[0] = new Option("Seleccione un proyecto...", "");

    for(let i = 0; i < sltproyectos.length; i++){
        select.options[i+1] = new Option(sltproyectos[i]['nombre_proyecto'], sltproyectos[i]['nombre_proyecto']);

    }
}

// function ticketsViejos(){
//     let sltTickets = listarTickets();
//     let sltReferenciaTicket =  document.querySelector('#sltTicket');

//     for(let i = 0; i < sltTickets.length; i++){
//         sltReferenciaTicket.options[i] = new Option (sltTickets[i]['codigo'], sltTickets[i]['codigo'])
//     }
// }