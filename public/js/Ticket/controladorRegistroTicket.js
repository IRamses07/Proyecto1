'use strict';

let botonRegistrarTicket = document.querySelector('#btnRegistrarTicket');
botonRegistrarTicket.addEventListener('click', obtenerDatosTicket);



let inptNombreCliente = document.querySelector('#txtnombreCliente');
let inptUrgencia = document.querySelector('#sltUrgencia');
let inptProyecto = document.querySelector('#sltProyecto');
let inptPantallazoError = document.querySelector('#imgPantallazoError');
let inptReferenciaTicket = document.querySelector('#sltTicket');
let inptDescripcionError = document.querySelector('#txtdescripcion');

function obtenerDatosTicket() {
    let ticket = [];
    let error = false;

    let nombreCliente = inptNombreCliente.value;
    let urgencia = inptUrgencia.value;
    let proyecto = inptProyecto.value;
    let pantallazoError = inptPantallazoError.value;
    let referenciaTicket = inptReferenciaTicket.value;
    let descripcionError = inptDescripcionError.value;

    ticket.push(nombreCliente, urgencia, proyecto, pantallazoError, referenciaTicket, descripcionError);

    // error = validar();
    if (error == true) {
        console.log('aquí va un sweet alert xD ');
    } else {
        registrarTicket(ticket);
        swal({
            title: "Good job!",
            text: "You clicked the button!",
            icon: "success",
            button: "Aww yiss!",
          });
        console.log('aquí va otro sweet alert xDD');
        // listaTickets();
        limpiarFormulario();
    }

};

function validar() {
    let error = false;

    if (inptNombreCliente.value == '') {
        inptNombreCliente.classList.add('error_input');
        error = true;
    } else {
        inptNombreCliente.classList.remove('error_input');
    }
    if (inptUrgencia.value == '') {
        inptUrgencia.classList.add('error_input');
        error = true;
    } else {
        inptUrgencia.classList.remove('error_input');
    }
    if (inptProyecto.value == '') {
        inptProyecto.classList.add('error_input');
        error = true;
    } else {
        inptProyecto.classList.remove('error_input');
    }
    if (inptPantallazoError.value == '') {
        inptPantallazoError.classList.add('error_input');
        console.log(inptPantallazoError);

        error = true;
    } else {
        console.log(inptPantallazoError);
        inptPantallazoError.classList.remove('error_input');
    }

    if (inptDescripcionError.value == '') {
        inptDescripcionError.classList.add('error_input');
        error = true;
    } else {
        inptDescripcionError.classList.remove('error_input');
    }
}


function limpiarFormulario() {
    inptNombreCliente.value = '';
    inptUrgencia.value = '';
    inptProyecto.value = '';
    inptPantallazoError = '';
    inptReferenciaTicket = '';
    inptDescripcionError = '';
}