'user strict';


//  function  () {
//     addClass(notificacion, 'none');
// };


let notificacion = document.querySelector('#notificacion');
notificacion.addEventListener( 'click', function () {
    notificacion.classList.remove('none');
    let notificaciones = mostrarNotificaciones();
});


// funcion en el controlador
function getNotificaciones() {
    let notificaciones = [];
    let listaTickets = listarTickets(); // traer lista en el servicio de tickets

    for (let i = 0; i < listaTickets.length; i++) {
        notificaciones.unshift(listaTickets[i]);
    }

    return notificaciones;
}

// funcion en el controlador
function mostrarNotificaciones() {
    // mostrar modal 
    document.querySelector("#modal").classList.remove("notificaciones");
    let notificaciones = getNotificaciones();

    for (let i = 0; i < notificaciones.length; i++) {
        // construir html notificaciones
        let nTamanno = tickets.length;
        let tbody = document.querySelector('#tblNotificacion tbody');
        tbody.innerHTML = '';

        for (let i = 0; i < nTamanno; i++) {


            let fila = tbody.insertRow();
            // let codigo = fila.insertCell();
            let cliente = fila.insertCell();
            let urgencia = fila.insertCell();


            // codigo.innerHTML = tickets[i]['codigo'];
            cliente.innerHTML = tickets[i]['nombre_cliente'];
            urgencia.innerHTML = tickets[i]['urgencia'];
        }
    };

}

