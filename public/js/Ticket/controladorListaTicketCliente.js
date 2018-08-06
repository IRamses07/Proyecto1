'use strict';
moveUser(true);
let tickets = listarTickets();
let idTicket = '';

listarTicketsCliente();


let inptBuscar = document.querySelector('#filtro');
let btnFiltro = document.querySelector('#btnFiltrar');
btnFiltro.addEventListener('click', function(){
        let selectUrgencia = document.querySelector('#sltUrgencia');
        listarTicketsCliente(inptBuscar.value,selectUrgencia.value);
}); 

function listarTicketsCliente(pinptBuscar, selectUrgencia) {
    let tickets = listarTickets();
    let usuarioLog = getCurrentUserData()['nombre'];
    let nTamanno = tickets.length;
    let tbody = document.querySelector('#tblTicketCliente tbody');
    tbody.innerHTML = '';

    if(!pinptBuscar){
        pinptBuscar = '';
    }

    if (!selectUrgencia) {
        selectUrgencia = '';
    }
    // for(let n = 0; n < getCurrentUserData()['proyectos'].length; n++){
    for (let i = 0; i < nTamanno; i++) {
        if (usuarioLog == tickets[i]['nombre_cliente']){
        if(tickets[i]['proyecto'].toLowerCase().includes(pinptBuscar.toLowerCase())&&
        tickets[i]['urgencia'].includes(selectUrgencia)){

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


        boton.addEventListener('click',function(){
            mostrarDatosTicketseleccionado(tickets[i]['_id']);
        });

        btnEditar.addEventListener('click', modificarTCicketSlt);
            // 
            // console.log(id);
            // // modificarTicketSlt(id);
            
        
    }
}

    }
};





function mostrarDatosTicketseleccionado(par){
    document.location.href = './verTicket.html?_id='+par ;
    //del url para tomar parametro que envié para q busque el ticket que debe mostrar
    }

function modificarTCicketSlt(){

    let _id = this.dataset._id;
    console.log(_id);
  let ticketslct = idTicketModificar(_id);
    console.log(ticketslct);
    // ticketslct.forEach( function(elem){
        // let ticketLS = elem.value;
        localStorage.setItem('ticketLS',JSON.stringify(ticketslct));
        // sessionStorage.setItem('update', 1);
        document.location.href = 'modificarTicket.html';
}
