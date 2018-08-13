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
let descSolucion = document.querySelector('#txtsolucion');
let btnCerrar = document.querySelector('#btnCerrar');
validaDescripcion();

descSolucion.addEventListener('keyup', function(){
validaDescripcion();

})

btnCerrar.addEventListener('click', function(){
    if(estado == "Activo"){
    swal({
        title: 'Seguro que desea cerrar el ticket?',
        text: "El ticket se cerrará y no se podrán realizar cambios ni comentarios",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Cerrar!'
        
      }).then((result) => {
        if (result.value) {
            cerrarTicket(),
          swal(
            'Cerrado!',
            'El ticket fue cerrado',
            'success'
          )
          btnCerrar.hidden = true;
        }
        else{
        cancelar();
    }
      })
    }
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

 function validaDescripcion(){
let desc = descSolucion.value;
console.log(desc);
if(desc == ""){
    
    btnCerrar.disabled = true;
    btnCerrar.classList.toggle("btnRegistro");
    btnCerrar.classList.add("disabled");
}else{
    btnCerrar.disabled = false;
    btnCerrar.classList.add("btnRegistro");
    btnCerrar.classList.remove("disabled");

}
};

 function cerrarTicket(){
    estado = "Inactivo";
    let idpar =   tickDa[0]['_id']  ;
    optEst.value = estado;
    optEst.classList.add("color");
    cambiarEstadoTicket(idpar, estado);
}

function cancelar(){
    let estado = tickDa[0]['estado'];
    optEst.value = estado;
}