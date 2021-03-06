'use strict';
moveUser(true);

listarTicketsAdmin();

let inptBuscarCliente = document.querySelector('#filtrocliente');
let btnFiltro = document.querySelector('#btnFiltrar');
btnFiltro.addEventListener('click', function () {
    listarTicketsAdmin(inptBuscarCliente.value);

    let radioSelected = document.querySelector('input[type="radio"]:checked');
   
    let desc = document.querySelector('#desc');

    let selectUrgencia = document.querySelector('#sltUrgencia').value;
    listarTicketsAdmin(inptBuscarCliente.value, selectUrgencia, radioSelected.value);

})

function listarTicketsAdmin(pinptBuscarCliente, selectUrgencia, radioSelected) {
    let tickets = listarTickets();
    let nTamanno = tickets.length;
    let tbody = document.querySelector('#tblTicketAdmin tbody');
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
            let estado = fila.insertCell();
            let verMas = fila.insertCell();

            let boton = document.createElement("input");
            boton.type = "button";
            boton.value = "Ver más";
            boton.classList.add("btnLista");
        
            // codigo.innerHTML = tickets[i]['codigo'];
            cliente.innerHTML = tickets[i]['nombre_cliente'];
            urgencia.innerHTML = tickets[i]['urgencia'];
            proyecto.innerHTML = tickets[i]['proyecto'];
            estado.innerHTML = tickets[i]['estado'];
            verMas.appendChild(boton);

            boton.addEventListener('click',function(){
                mostrarDatosTicketseleccionado(tickets[i]['_id'])
            });
        }

    }
};




function mostrarDatosTicketseleccionado(par){
    document.location.href = './verTicket.html?_id='+par ;
    //del url para tomar parametro que envié para q busque el ticket que debe mostrar
    }