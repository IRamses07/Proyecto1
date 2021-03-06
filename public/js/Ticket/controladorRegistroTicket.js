'use strict';
moveUser(true);

let tickets = listarTickets();
let id = '';

const botonRegistrarTicket = document.querySelector('#btnRegistrarTicket');
botonRegistrarTicket.addEventListener('click', obtenerDatosTicket);


let codigo = '';
let fechaRegistro = '';
let fechaCierre = '';
let inptNombreCliente = document.querySelector('#txtnombreCliente');
let inptUrgencia = document.querySelector('#sltUrgencia');
let inptProyecto = document.querySelector('#sltProyecto');
let inptimagenErr = document.querySelector('#file-upload');
let inptReferenciaTicket = document.querySelector('#sltTicket');
let inptDescripcionError = document.querySelector('#txtdescripcion');

inptProyecto.addEventListener('change', listarTicketsReferencia);

listarSelectProyectos();

llenarNombreCliente();
addControl();


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
    let estado = "Inactivo";
    let codigoT = codigo;
    ticket.push(nombreCliente, urgencia, proyecto, imagenErr, referenciaTicket, descripcionError, estado, codigoT);


    if (error == true) {
        console.log('aquí va un sweet alert xD ');
        swal({
            title: "Registro fallido",
            text: "El ticket no se ha podido registrar",
            icon: "error",
            button: "Ok",
        });
    } else {
        registrarTicket(nombreCliente, urgencia, proyecto, imagenErr, referenciaTicket, descripcionError, estado, codigoT);
        // notificacion()  
        // aquí mando el id del emisor y el rol, los datos del receptor, tipo = 'ticket',referencia: id (del ticket), verTicket.html
        swal({
            title: "Registro exitoso",
            text: "El ticket se ha registrado correctamente",
            icon: "success",
            button: "Ok",
        });

        document.location.href = './listarTicketsCliente.html';
        console.log('aquí va otro sweet alert xDD');
        limpiarFormulario();
    }

};




function validar() {
    let error = false;


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

function listarSelectProyectos() {
    let cliente = buscar({_id: getCurrentUserData()._id})[0];
    let proyectosCliente = cliente.proyectos;
    let listaProycts = obtenerListaProyectos();
    let selectProy = listaProycts;
    let select = document.querySelector('#sltProyecto');
    select.options[0] = new Option("Seleccione un proyecto...", '');
    let listaSlt = [];
    for (let i = 0; i < selectProy.length; i++) {
        for (let j = 0; j < proyectosCliente.length; j++) {
            if (selectProy[i]['nombre_proyecto'] == proyectosCliente[j]['nombre_proyecto']) {
                if (selectProy[i]['estado_proyecto'] == 'mantenimiento') {
                    listaSlt.push(selectProy[i]);
                }
            }
        }
    }
    for (let i = 0; i < listaSlt.length; i++) {
        select.options[i + 1] = new Option(listaSlt[i]['nombre_proyecto'], listaSlt[i]['nombre_proyecto']);
      
    }
}


function llenarNombreCliente() {
    let nombreUsuario = getCurrentUserData()['nombre'];
    let inptNombreCliente = document.querySelector('#txtnombreCliente');
    inptNombreCliente.value = nombreUsuario;

}

function listarTicketsReferencia() {
    // let nombreUsuario = buscar({_id: getCurrentUserData()._id})[0];
    let tickets = listarTickets();
    let sltReferencia = [];
    let ticketReferencia = document.querySelector('#sltTicket');
    for (let i = 0; i < tickets.length; i++) {
        if (inptProyecto.value == tickets[i]['proyecto']) {
            sltReferencia.push(inptProyecto[i]);
        }
    }
    for (let i = 0; i < sltReferencia.length; i++) {
        ticketReferencia.options[i+1] = new Option("código" +" "+ tickets[i]['codigo'], tickets[i]['codigo']);        
    }

}



// Código de cada ticket registrado
function addZero(x, n) {
    while (x.toString().length < n) {
        x = "0" + x;
    }
    return x;
}

//   // Añadir control al elemento "p" principal de la página.
function addControl() {
    let d = new Date();
    let x = document.getElementById("demo");
    let f = addZero(d.getDay(), 2);
    let ms = addZero(d.getMonth(), 2);
    let h = addZero(d.getHours(), 2);
    let m = addZero(d.getMinutes(), 2);
    // x.innerHTML += "<p id='" + h + m + "'>ID: " + h + m + "</p>";
    codigo = f + h + m;
    let dia = d;


    console.log(dia);
    console.log(codigo);
    let fecha = Date.parse(f);
    console.log(fecha);
} 