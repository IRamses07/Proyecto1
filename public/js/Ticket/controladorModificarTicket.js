'use strict';
moveUser(true);



let tickets = listarTickets();


const btnActualizar = document.querySelector('#btnActualizar');
btnActualizar.addEventListener('click', function(){ 
    datosActualizarTicket();
});

// btnActualizar.disabled = 'true';

let ticket = JSON.parse(localStorage.getItem('ticketLS'));

// let codigo = '';
// let fechaReg = getDate();
const inptNombreCliente = document.querySelector('#txtnombreCliente');
const inptUrgencia = document.querySelector('#sltUrgencia');
const inptProyecto = document.querySelector('#sltProyecto');
const btntimagenErr = document.querySelector('#file-upload');
const inptReferenciaTicket = document.querySelector('#sltTicket');
const inptDescripcionError = document.querySelector('#txtdescripcion');
const inptId = document.querySelector('#id');
const imagen = document.querySelector('#imgErr');

listarSelectProyectos();
llenarNombreCliente();
listarTicketsReferencia();
llenarDatosFormulario();


function datosActualizarTicket() {
    let error = false;

    let id =  inptId.value;
    let nombreCliente = inptNombreCliente.value;
    let urgencia = inptUrgencia.value;
    let proyecto = inptProyecto.value;
    let urlImagenErr = imgUrl;
    let referenciaTicket = inptReferenciaTicket.value;
    let descripcionError = inptDescripcionError.value;
    console.log(urlImagenErr);
    console.log(imgUrl);

    if (error == true) {
        console.log('aquí va un sweet alert xD ');
        swal({
            title: "Algo salió mal",
            text: "El ticket no se ha podido modificar",
            icon: "error",
            button: "Ok",
        });
    } else {
        actualizarTicket(id, nombreCliente, urgencia, proyecto, urlImagenErr, referenciaTicket, descripcionError );
        swal({
            title: "Modificación exitosa",
            text: "El ticket se ha modificado correctamente",
            icon: "success",
            button: "Ok",
        });
        document.location.href = './listarTicketsCliente.html';

    }

};


function llenarDatosFormulario(){

    let ticket = JSON.parse(localStorage.getItem('ticketLS'));
    console.log(ticket);

    inptId.value = ticket['_id'];
    console.log(id);

    document.querySelector('#sltUrgencia').value = ticket['urgencia'];
    // document.querySelector('#sltProyecto').options[0].value= ticket['proyecto'];
    // document.querySelector('#sltProyecto').options[0].text= ticket['proyecto'];
// $('select[id="sltProyecto"]').find('option:contains("'+ticketslct['proyecto']+'")').attr("selected",true);
document.querySelector('#sltTicket').value = ticket['referencia_ticket'];
document.querySelector('#txtdescripcion').value = ticket['descripcion'];
imagen.src = ticket['imagen_error'];

console.log(imagen); 
};






function listarSelectProyectos() {
    let selectProy = getCurrentUserData()['proyectos'];
    let select = document.querySelector('#sltProyecto');
  
     select.options[0] = new Option(ticket['proyecto']);
     select.options[0].hidden = true;
     select.options[0].value = ticket['proyecto'];
    for (let i = 0; i < selectProy.length; i++) {
        select.options[i+1] = new Option(selectProy[i]['nombre_proyecto'], selectProy[i]['nombre_proyecto']);
    }

    
}


function llenarNombreCliente() {
    let nombreUsuario = getCurrentUserData()['nombre'];
    let inptNombreCliente = document.querySelector('#txtnombreCliente');
    inptNombreCliente.value = nombreUsuario;

}

function listarTicketsReferencia() {
    let nombreUsuario = getCurrentUserData()['nombre'];
    let sltTickets = listarTickets();
    let sltReferenciaTicket = document.querySelector('#sltTicket');

    for (let i = 0; i < sltTickets.length; i++) {
        if(inptProyecto.value == sltTickets[i]['proyecto']){
        sltReferenciaTicket.options[i] = new Option(sltTickets[i]['proyecto'], sltTickets[i]['proyecto'])
    }
}
    
}
