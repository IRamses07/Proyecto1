'use strict';
// moveUser(true);

listarTicketsCliente();

let inptBuscar = document.querySelector('#filtro');
let btnFiltro = document.querySelector('#btnFiltrar');
btnFiltro.addEventListener('click', function(){
        let selectUrgencia = document.querySelector('#sltUrgencia');
        listarTicketsCliente(inptBuscar.value,selectUrgencia.value);
}); 

function listarTicketsCliente(pinptBuscar, selectUrgencia) {
    let tickets = listarTickets();
    let nTamanno = tickets.length;
    let tbody = document.querySelector('#tblTicketCliente tbody');
    tbody.innerHTML = '';

    if(!pinptBuscar){
        pinptBuscar = '';
    }

    if (!selectUrgencia) {
        selectUrgencia = '';
    }

    for (let i = 0; i < nTamanno; i++) {
        if(tickets[i]['proyecto'].toLowerCase().includes(pinptBuscar.toLowerCase())&&
        tickets[i]['urgencia'].includes(selectUrgencia)){

        let fila = tbody.insertRow();
        let urgencia = fila.insertCell();
        let proyecto = fila.insertCell();
        let descripcion = fila.insertCell();
        let verMas = fila.insertCell();

        let boton = document.createElement("input");
        boton.type = "button";
        boton.value = "Ver más";
        boton.classList.add("btnLista");

        urgencia.innerHTML = tickets[i]['urgencia'];
        proyecto.innerHTML = tickets[i]['proyecto'];
        descripcion.innerHTML = tickets[i]['descripcion'];
        verMas.appendChild(boton);

        // boton.addEventListener('click',mostrarDatosTicketseleccionado);
    }

    }
};





// function mostrarDatosTicketseleccionado(){

// }