'use strict'

let datos = document.querySelector('#datosUsuario');
let extraDatos = document.querySelector('#infoUsuario');
// let infoContacto2 = document.querySelector('#infoContacto2');

getInfo();

function getInfo(){
    let infoProfe = getInfoProfesor();
    console.log(infoProfe);
    infoPersonal(infoProfe);
    // infoContacto(infoProfe)
};

function infoPersonal(infoProfe){
    let contenido ='';
    let contenido2 = '';
    document.querySelector('#perfiImagen').src = infoProfe[0]['foto'];
    
   if(infoProfe[0]['apellido2'] !== ''){
        contenido+='<h3>'+infoProfe[0]['nombre1']+' '+infoProfe[0]['apellido1']+' '+infoProfe[0]['apellido2']+'</h3>';
    }else{
        contenido+='<h3>'+infoProfe[0]['nombre1']+' '+infoProfe[0]['apellido1']+'</h3>';
    }

    contenido+='<h4 class="secundario">'+infoProfe[0]['profesion']+'</h4>';

    datos.innerHTML=contenido;

    contenido2+='<h4></h4\n>';
    contenido2+='<h4>Cédula: '+infoProfe[0]['cedula']+'</h4>';
    contenido2+='<h4>Teléfono: '+infoProfe[0]['telefono']+'</h4>';
    contenido2+='<h4>Correo: '+infoProfe[0]['correo']+'</h4>';

    extraDatos.innerHTML=contenido2;
}