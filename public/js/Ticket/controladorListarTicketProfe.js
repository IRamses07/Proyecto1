'use strict';
moveUser(true);

listarTicketsProfe();

let inptBuscarCliente = document.querySelector('#filtrocliente');
let btnFiltro = document.querySelector('#btnFiltrar');
btnFiltro.addEventListener('click', function () {
    listarTicketsProfe(inptBuscarCliente.value);

    let radioSelected = document.querySelector('input[type="radio"]:checked');


    let selectUrgencia = document.querySelector('#sltUrgencia').value;
    listarTicketsProfe(inptBuscarCliente.value, selectUrgencia, radioSelected.value);

})

function listarTicketsProfe(pinptBuscarCliente, selectUrgencia, radioSelected) {
    let tickets = listarTickets();
    let nTamanno = tickets.length;
    // let tbody = document.querySelector('#tblTicketprofe tbody'); 
    let tbody = document.querySelector('#tbody2');
    console.log(tbody);
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
        if (tickets[i][radioSelected].toLowerCase().includes(pinptBuscarCliente.toLowerCase()) &&
            tickets[i]['urgencia'].includes(selectUrgencia)) {

            let fila = tbody.insertRow();
            // let codigo = fila.insertCell();
            let urgencia = fila.insertCell();
            let proyecto = fila.insertCell();
            let descripcion = fila.insertCell();
            let verMas = fila.insertCell();
            let editar = fila.insertCell();

            let boton = document.createElement("input");
            boton.type = "button";
            boton.value = "Ver más";
            boton.classList.add("btnLista");
            let btnEditar = document.createElement("input");
            btnEditar.type = "button";
            btnEditar.value = "Modificar";
            btnEditar.classList.add("btnLista");
            btnEditar.dataset._id = tickets[i]['_id'];

            // codigo.innerHTML = tickets[i]['codigo'];
            urgencia.innerHTML = tickets[i]['urgencia'];
            proyecto.innerHTML = tickets[i]['proyecto'];
            descripcion.innerHTML = tickets[i]['descripcion'];
            verMas.appendChild(boton);
            editar.appendChild(btnEditar);


            boton.addEventListener('click', function () {
                mostrarDatosTicketseleccionado(tickets[i]['_id']);
            });

            btnEditar.addEventListener('click', function () {
                let id = this.dataset._id;
                console.log(id);
                modificarTicketSlt(tickets[i]['_id'], id);

            })
        }
    }

};

function mostrarDatosTicketseleccionado(par) {
    document.location.href = './verTicket.html?_id=' + par;
    //del url para tomar parametro que envié para q busque el ticket que debe mostrar
}

function modificarTicketSlt(par, id) {
    document.location.href = './registroTicket.html?_id=' + par;
}
