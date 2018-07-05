'use strict';
listarTicketsAdmin();
// listarTicketsProfe();
// listarTicketsEstudiante();
// listarTicketsCliente();

function listarTicketsAdmin (){
    let tickets = listarTickets();
    let nTamanno = tickets.length;
    canColumns = tickets[0].length;
    let tbody = document.querySelector('#tblTicketAdmin tbody');
    tbody.innerHTML = '';

    for(let i = 0; i < nTamanno; i++){

        if(tickets[i][0] == nombre ){}
        let fila = tbody.insertRow();
        // let codigo = fila.insertCell();
        let urgencia = fila.insertCell();
        let descripción = fila.insertCell();
        let verMas = fila.insertCell();

        let boton = document.createElement("input");
        boton.type = "button";
        boton.value = "Ver más";
        boton.id = tickets[i][0];
        // let nombreBoton = document.createTextNode("Ver más");
        // boton.appendChild(nombreBoton);

        urgencia.innerHTML = tickets[i]['urgencia'];
        descripción.innerHTML = tickets[i]['descripcion'];
        verMas.innerHTML = boton;
    }
};

// function mostrarDatosPlanetas(){
//     var listaCuerposCelestes = getCuerposCelestes(),
//         nTamanno = listaCuerposCelestes.length,
//         nCantColumnas = listaCuerposCelestes[0].length,
//         tbody = document.querySelector('#tblCuerposCelestes tbody');
//     tbody.innerHTML = '';
//       for (var i = 0; i < nTamanno; i++) {
//         if (listaCuerposCelestes[i][1] == "planeta") {
//           var fila = document.createElement('tr');
//           var celdaBotones = document.createElement('td');
//           var botonEditar  = document.createElement('input');
//           botonEditar.type = 'button';
//           botonEditar.value = 'Editar';
//           botonEditar.id = listaCuerposCelestes[i][0];
  
//         for (var j = 0; j < nCantColumnas; j++) {
//           var celda = fila.insertCell(j);
//           celda.innerHTML = listaCuerposCelestes[i][j];
//         }
  
//         botonEditar.addEventListener('click', mostrarDatosParaActuralizarPlanetas);
  
//         celdaBotones.appendChild(botonEditar);
//         fila.appendChild(celdaBotones);
//         tbody.appendChild(fila);
//       }
//     }
//   }