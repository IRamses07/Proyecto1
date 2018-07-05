'use strict';
listarTicketsAdmin();
// listarTicketsProfe();
// listarTicketsEstudiante();
// listarTicketsCliente();

function listarTicketsAdmin (){
    let tickets = listarTickets();

    let tbody = document.querySelector('#tblTicketAdmin tbody');
    tbody.innerHTML = '';

    for(let i = 0; i < tickets.length; i++){
        let fila = tbody.insertRow();

        
        // let codigo = fila.insertCell();

        let urgencia = fila.insertCell();
        let descripción = fila.insertCell();
        let verMas = fila.insertCell();

        let boton = document.createElement("button");
        boton.type = "button";
        boton.innerText = "Ver más";
        // let nombreBoton = document.createTextNode("Ver más");
        // boton.appendChild(nombreBoton);
        


        urgencia.innerHTML = tickets[i]['urgencia'];
        descripción.innerHTML = tickets[i]['descripcion'];
        verMas.innerHTML = boton;

        

    }
};