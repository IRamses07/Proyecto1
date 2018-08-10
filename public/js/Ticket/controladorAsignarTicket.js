'use strict';
getURLverTicket();
getCurrentUserData();

let optProy = document.querySelector('#proyecto');
let optUrg = document.querySelector('#urgencia');
let optEst = document.querySelector('#estado');
let optDesc = document.querySelector('#descripcion');
let img  = document.querySelector('#imgErr');
let codigo = document.querySelector('#cod');
let cliente = document.querySelector('#cliente');



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

console.log(tickDa[0]['nombre_cliente']);

let proyecto = tickDa[0]['proyecto'];
let urgencia = tickDa[0]['urgencia'];
// let referenciaTicket = tickDa[0]['referencia_ticket'];
let estado = tickDa[0]['estado'];
let descripcion = tickDa[0]['descripcion'];
let imgn = tickDa[0]['imagen_error'];
let codigot = tickDa[0]['codigo'];
let nombreCliente = tickDa[0]['nombre_cliente'];


optProy.value = proyecto;
optUrg.value = urgencia;
optEst.value = estado;
optDesc.value = descripcion;
codigo.value = codigot;
cliente.value = nombreCliente;

img.src = imgn;
 usuario = getCurrentUserData()['rol'];

 if(estado == "Activo"){
    optEst.classList.add("color");
 }


if( usuario == "profesor"){

}

if( usuario == "administrador" && estado == 'Activo'){
    // .hidden = false ;

}
