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

    error = validar();
    if (error == true) {
        console.log('aquí va un sweet alert xD ');
    } else {
        registrarTicket(ticket);
        swal({
            title: "Registro exitoso",
            text: "El usuario se ha registrado correctamente",
            icon: "success",
            button: "Ok",
          });
        console.log('aquí va otro sweet alert xDD');
        // listaTickets();
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
    if (inptPantallazoError.value == '') {
        inptPantallazoError.classList.add('error');
        console.log(inptPantallazoError);

        error = true;
    } else {
        console.log(inptPantallazoError);
        inptPantallazoError.classList.remove('error');
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
    inptPantallazoError = '';
    inptReferenciaTicket = '';
    inptDescripcionError = '';
}