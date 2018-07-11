'use strict';
// moveUser(true);

listarTicketsAdmin();

let inptBuscarCliente = document.querySelector('#filtrocliente');
let btnFiltro = document.querySelector('#btnFiltrar');
btnFiltro.addEventListener('click', function(){
    listarTicketsAdmin(inptBuscarCliente.value);

    let radioSelected = document.querySelector('input[type="radio"]:checked');
    getEntrada(radioSelected);

        // let selectUrgencia = document.querySelector('#sltUrgencia').value;
        // if (selectUrgencia.value == 'Alta') {
        //     listarTicketsAdmin(selectUrgencia.value = 'Alta');
    
        //     console.log("a ver que pasa xD");
        // } else {
        //     if (selectUrgencia.value == 'Media') {
                
        //     } else {
        //         if (selectUrgencia.value == 'Baja') { }
        //     }
        // } 
    
}) 

function listarTicketsAdmin(pinptBuscarCliente) {
    let tickets = listarTickets();
    let nTamanno = tickets.length;
    let tbody = document.querySelector('#tblTicketAdmin tbody');
    tbody.innerHTML = '';

    if(!pinptBuscarCliente){
        pinptBuscarCliente = '';
    }
    for (let i = 0; i < nTamanno; i++) {
        if(tickets[i]['nombre_cliente'].toLowerCase().includes(pinptBuscarCliente.toLowerCase())){

        let fila = tbody.insertRow();
        let cliente = fila.insertCell();
        let urgencia = fila.insertCell();
        let proyecto = fila.insertCell();
        let descripcion = fila.insertCell();
        let verMas = fila.insertCell();

        let boton = document.createElement("input");
        boton.type = "button";
        boton.value = "Ver más";
        boton.classList.add("btnLista");

        cliente.innerHTML = tickets[i]['nombre_cliente'];
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