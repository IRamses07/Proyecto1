'use strict';
getURLverTicket();
getCurrentUserData();

let optProy = document.querySelector('#proyecto');
let optUrg = document.querySelector('#urgencia');
let optEst = document.querySelector('#estado');
let optDesc = document.querySelector('#descripcion');
let img = document.querySelector('#imgErr');
let codigo = document.querySelector('#cod');
let cliente = document.querySelector('#cliente');
let descSolu = document.querySelector('#descrSolu');
let outDscSolucion = document.querySelector('#solucion');
let cajaSolu = document.querySelector('#cajaSolucion');

let btnAsignar = document.querySelector('#btnAsignar');
btnAsignar.hidden = true;


// let btnComentar = document.querySelector('#btnComentar');
// btnComentar.hidden = true;

let btnModificar = document.querySelector('#editar');
btnModificar.addEventListener('click', modificarTCicketSlt);
btnModificar.hidden = true;

let btnCerrar = document.querySelector('#btnCerrar');
btnCerrar.addEventListener('click', function () {
    let idparC = tickDa[0]['_id'];
    document.location.href = './cerrarTicket.html?_id=' + idparC;
});
btnCerrar.hidden = true;

let btnAprobar = document.querySelector('#btnAprobar');
btnAprobar.hidden = true;
btnAprobar.addEventListener('click', function () {
    if (estado == "Inactivo") {
        swal({
            title: 'Seguro que desea aprobar el ticket?',
            text: "El ticket estará activo",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Aprobar!'

        }).then((result) => {
            if (result.value) {
                aprobarTicket(),
                    swal(
                        'Ticket aprobado!',
                        'El ticket fue aprobado',
                        'success'
                    )
                btnAprobar.hidden = true;
            }
            else {
                cancelar();
            }
        })
    }
});

let btnrechazar = document.querySelector('#btnRechazar');
btnrechazar.hidden = 'true';
btnrechazar.addEventListener('click', function () {
    rechazoTicket();
});


function getURLverTicket() {
    // capturamos la url
    let loc = document.location.href;
    // si existe el interrogante
    if (loc.indexOf('?') > 0) {
        // cogemos la parte de la url que hay despues del interrogante
        let getString = loc.split('?')[1];
        // // obtenemos un array con cada clave=valor
        let GET = getString.split('&');
        let get = {};
        // // recorremos todo el array de valores
        for (let i = 0, l = GET.length; i < l; i++) {
            let tmp = GET[i].split('=');
            get[tmp[0]] = unescape(decodeURI(tmp[1]));

        }
        console.log(get);
        return get;
    }
};
let tickDa = mostrarTicket(getURLverTicket()._id);
console.log(tickDa);


let proyecto = tickDa[0]['proyecto'];
let urgencia = tickDa[0]['urgencia'];
// let referenciaTicket = tickDa[0]['referencia_ticket'];
let estado = tickDa[0]['estado'];
let descripcion = tickDa[0]['descripcion'];
let imgn = tickDa[0]['imagen_error'];
let codigot = tickDa[0]['codigo'];
let nombreCliente = tickDa[0]['nombre_cliente'];
btnModificar.dataset._id = tickDa[0]['_id'];
console.log(btnModificar);

optProy.value = proyecto;
optUrg.value = urgencia;
optEst.value = estado;
optDesc.value = descripcion;
codigo.value = codigot;
cliente.value = nombreCliente;

img.src = imgn;
usuario = getCurrentUserData()['rol'];

if (estado == "Activo") {
    optEst.classList.add("color");
    // btnComentar.hidden = false;
}
if (usuario == "administrador") {
    btnModificar.hidden = true;
    // btnComentar.hidden = false;
}
if (usuario == "administrador" && estado == 'Activo') {
    btnAsignar.hidden = false;
}
if (usuario == "profesor" && estado == 'Activo') {
    btnAsignar.hidden = false;
}

btnAsignar.addEventListener('click', function () {
    let parid = tickDa[0]['_id'];
    document.location.href = 'asignarTicket.html?_id=' + parid;
});


if (usuario == "estudiante") {
    btnModificar.hidden = true;
    btnCerrar.hidden = false;
}

if (usuario == "cliente") {
    btnModificar.hidden = false;
    btnCerrar.hidden = true;
    btnAprobar.hidden = true;

}

if (usuario == "administrador" && estado == 'Inactivo') {
    btnAprobar.hidden = false;
    btnModificar.hidden = true;
    btnrechazar.hidden = false;
}

if (estado == 'Rechazado') {
    btnModificar.hidden = true;
}

if (estado == 'Inactivo') {
    btnModificar.hidden =  true;
    btnCerrar.hidden = true;
}

function aprobarTicket() {
    estado = "Activo";
    let idpar = tickDa[0]['_id'];
    let correo = '';
    optEst.value = estado;
    optEst.classList.add("color");
    cambiarEstadoTicket(idpar, estado, correo);
    document.location.href = "asignarTicket.html?_id=" + idpar;
}

function cancelar() {
    let estado = tickDa[0]['estado'];
    optEst.value = estado;
}


function modificarTCicketSlt() {

    let _id = this.dataset._id;
    console.log(_id);
    let ticketslct = idTicketModificar(_id);
    console.log(ticketslct);
    localStorage.setItem('ticketLS', JSON.stringify(ticketslct));
    document.location.href = 'modificarTicket.html';
}

function rechazoTicket() {
    estado = "Rechazado";
    let idpar = tickDa[0]['_id'];
    optEst.value = estado;
    optEst.classList.add("color");
    cambiarEstadoTicket(idpar, estado);
    document.location.href = 'asignarTicket.html?_id=' + idpar;
}

//estados del ticket:  Inactivo (cuando lo cierran, cuando lo registran y no lo ha aprobado)
// Estado Activo (cuando lo aprueban)
// estado Rechazado, cuando es rechazado xD

// function mostrarSolucion() {
//     let ticket = listarTickets();
//     let comentarioTick;
//     let idTick = tickDa[0]['_id'];
//     for (let i = 0; i < ticket.length; i++) {
//         // for(let j = 0; j < comentarioTick.length; j++){
//             if (idTick == ticket[i]['_id']) {
//                 comentarioTick = ticket[i].comentarios;
//             if (comentarioTick[0]['tipo'] == 'descripción solución') {
//                 outDscSolucion.value = comentarioTick[0]['texto'];
//                 // }
//             }
//         }
//     }
// }

function validarAsignacion(){
    
}