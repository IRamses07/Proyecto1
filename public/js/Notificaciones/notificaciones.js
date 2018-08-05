'user strict';

let rol = getCurrentUserData()['rol'];
let usuario = "";
let nombreUsuario = document.querySelector('#txtnombreCliente');



if (rol == "estudiante") {
    usuario = getCurrentUserData()['Nombre1'];
    nombreUsuario.value = usuario;
}
if (rol == "cliente") {
    usuario = getCurrentUserData()['nombre'];
    nombreUsuario.value = usuario;
}
if (rol == "profesor") {
    usuario = getCurrentUserData()['nombre1'];
    nombreUsuario.value = usuario;
} 
if (rol == "administrador") {
    usuario = "Administrador";
    nombreUsuario.value = usuario;
} 


let modal = document.querySelector('#modal');
let notificacion = document.querySelector('#notificacion');
notificacion.addEventListener( 'click', function () {
    modal.classList.remove('none');
    let notificaciones = mostrarNotificaciones();
});

 let cerrarModal = document.querySelector('#modal div a');
 cerrarModal.addEventListener('click', function  () {
    modal.classList.add('none');
});


// funcion en el controlador
function getNotificaciones() {
    let notificaciones = [];
    let listaTickets = listarTickets(); // traer lista en el servicio de tickets

    for (let i = listaTickets.length -1; i > 0 ; i--) {
        notificaciones.push(listaTickets[i]);
    }
    console.log(notificaciones)
    return notificaciones;
}

// funcion en el controlador
function mostrarNotificaciones() {
    // mostrar modal 
    document.querySelector("#modal").classList.remove("none");
    let notificaciones = getNotificaciones();

    let tbody = document.querySelector('#tblNotificacion tbody');
    tbody.innerHTML = '';
    for (let i = 0; i < notificaciones.length; i++) {
        // construir html notificaciones
        
   

        // for (let i = 0; i < nTamanno; i++) {


            let fila = tbody.insertRow();
            // let codigo = fila.insertCell();
            let cliente = fila.insertCell();
            // let urgencia = fila.insertCell();

        let texto = 'registró un nuevo ticket'

            // codigo.innerHTML = notificaciones[i]['codigo'];
            cliente.innerHTML = notificaciones[i]['nombre_cliente'] + ' ' + texto;
            // urgencia.innerHTML = notificaciones[i]['urgencia'];
        // }
    };

}

