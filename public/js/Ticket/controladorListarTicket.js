'use strict';
moveUser(true);
listarTicketsAdmin();
// listarTicketsProfe();
// listarTicketsEstudiante();
// listarTicketsCliente();

function listarTicketsAdmin (){
    let tickets = listarTickets();
    let nTamanno = tickets.length;
    let tbody = document.querySelector('#tblTicketAdmin tbody');
    tbody.innerHTML = '';

    for(let i = 0; i < nTamanno; i++){

        let fila = tbody.insertRow();
        let cliente = fila.insertCell();
        let urgencia = fila.insertCell();
        let proyecto = fila.insertCell();
        let descripcion = fila.insertCell();
        let verMas = fila.insertCell();

        let boton = document.createElement("input");
        boton.type = "button";
        boton.value = "Ver más";
        // boton.id = tickets[i][0];
        boton.classList.add("btnLista");
      
        cliente.innerHTML = tickets[i]['nombre_cliente'];
        urgencia.innerHTML = tickets[i]['urgencia'];
        proyecto.innerHTML = tickets[i]['proyecto'];
        descripcion.innerHTML = tickets[i]['descripcion'];
        verMas.appendChild(boton);

        // boton.addEventListener('click',mostrarDatosTicketseleccionado);

        //         for (let j = 0; j < canColumns; j++) {
//           var celda = fila.insertCell(j);
//           celda.innerHTML = listaCuerposCelestes[i][j];
//         }
  
//         botonEditar.addEventListener('click', mostrarDatosParaActuralizarPlanetas);
  
//         celdaBotones.appendChild(botonEditar);
//         fila.appendChild(celdaBotones);
//         tbody.appendChild(fila);
        
    }
};
