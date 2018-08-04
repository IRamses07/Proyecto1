'use strict'
moveUser(true);
let datos = document.querySelector('#datosUsuario');
let extraDatos = document.querySelector('#infoUsuario');
let infoContacto2 = document.querySelector('#infoContacto2');




getInfo();

function getInfo(){
    let infoCliente = getInfoCliente();
    infoPersonal(infoCliente);
    infoContacto(infoCliente);

let dos = infoCliente[0]['ubicacion'];
let ubicacionMap = dos.split(",");

console.log('lat:  '+ubicacionMap[0]);
console.log('long: '+ubicacionMap[1]);
    
    showMap();
    mapCenter(ubicacionMap[0],ubicacionMap[1]);


};

function infoPersonal(infoCliente){
    let contenido ='';
    let contenido2 = '';
    document.querySelector('#perfiImagen').src = infoCliente[0]['foto'];
    
    contenido+='<h3>'+infoCliente[0]['nombre']+'</h3>';
    contenido+='<h4 class="secundario">'+infoCliente[0]['cedula_juridica']+'</h4>';

    datos.innerHTML=contenido;

    contenido2+='<h4> </h4>\n';
    contenido2+='<h4>Cédula Jurídica: '+infoCliente[0]['cedula_juridica']+'</h4>';
    contenido2+='<h4>'+infoCliente[0]['provincia']+', '+infoCliente[0]['canton']+', '+infoCliente[0]['distrito']+'</h4>';
    contenido2+='<h4>Dirección: '+infoCliente[0]['direccion_exacta']+'</h4>';

    extraDatos.innerHTML=contenido2;
}

function infoContacto(infoCliente){
    let contenido='';

    if(infoCliente[0]['segundo_apellido'] !== ''){
        contenido+='<h5>Nombre: '+infoCliente[0]['primer_nombre']+' '+infoCliente[0]['primer_apellido']+' '+infoCliente[0]['segundo_apellido']+'</h5>\n';
    }else{
        contenido+='<h5>Nombre: '+infoCliente[0]['primer_nombre']+' '+infoCliente[0]['primer_apellido']+'</h5>\n';
    }   

    contenido+='<hr class="list">\n';
    contenido+='<h5>Teléfono: '+infoCliente[0]['telefono']+'</h5>\n';
    contenido+='<hr class="list">\n';
    contenido+='<h5>Correo: '+infoCliente[0]['correo_electronico']+'</h5>\n';
    contenido+='<h4 class="subtitulo">Dirección:</h4>';
    contenido+='<h4 id="ubicacionMapa">'+infoCliente[0]['provincia']+', '+infoCliente[0]['canton']+', '+infoCliente[0]['distrito']+'</h4>';

    infoContacto2.innerHTML = contenido;
}