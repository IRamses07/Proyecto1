'use strict';
// moveUser(true);

listarTicketsEstudiante();

let inptBuscarCliente = document.querySelector('#filtrocliente');
let btnFiltro = document.querySelector('#btnFiltrar');
btnFiltro.addEventListener('click', function () {
    listarTicketsEstudiante(inptBuscarCliente.value);

    let radioSelected = document.querySelector('input[type="radio"]:checked');
   

    let selectUrgencia = document.querySelector('#sltUrgencia').value;
    listarTicketsEstudiante(inptBuscarCliente.value, selectUrgencia, radioSelected.value);

})

function listarTicketsEstudiante(pinptBuscarCliente, selectUrgencia, radioSelected) {
    let tickets = listarTickets();
    let nTamanno = tickets.length;
    let tbody = document.querySelector('#tblTicketEstudiante tbody');
    tbody.innerHTML = '';

    if (!pinptBuscarCliente) {
        pinptBuscarCliente = '';
    }
    if (!selectUrgencia) {
        selectUrgencia = '';
    }
    if (!radioSelected) {
        radioSelected = 'nombre_cliente';
    }
    for (let i = 0; i < nTamanno; i++) {
        if (tickets[i][radioSelected].toLowerCase().includes(pinptBuscarCliente.toLowerCase())&&
        tickets[i]['urgencia'].includes(selectUrgencia)) {

            let fila = tbody.insertRow();
            // let codigo = fila.insertCell();
            let cliente = fila.insertCell();
            let urgencia = fila.insertCell();
            let proyecto = fila.insertCell();
            let descripcion = fila.insertCell();
            let verMas = fila.insertCell();

            let boton = document.createElement("input");
            boton.type = "button";
            boton.value = "Ver más";
            boton.classList.add("btnLista");

            // codigo.innerHTML = tickets[i]['codigo'];
            cliente.innerHTML = tickets[i]['nombre_cliente'];
            urgencia.innerHTML = tickets[i]['urgencia'];
            proyecto.innerHTML = tickets[i]['proyecto'];
            descripcion.innerHTML = tickets[i]['descripcion'];
            verMas.appendChild(boton);

            boton.addEventListener('click',mostrarDatosTicketseleccionado);
        }

    }
};





function mostrarDatosTicketseleccionado(){
document.location(href='verTicket.html');

}