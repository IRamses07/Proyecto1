'use strict'

let datos = document.querySelector('#datosUsuario');
let extraDatos = document.querySelector('#infoUsuario');
// let infoContacto2 = document.querySelector('#infoContacto2');

getInfo();

function getInfo(){
    let infoProfe = getVerMasLS();
    console.log(infoProfe);
    infoPersonal(infoProfe);
};

function infoPersonal(infoProfe){
    let contenido ='';
    let contenido2 = '';
    
   if(infoProfe['apellido2'] != ''){
        contenido+='<h3>'+infoProfe['nombre1']+' '+infoProfe['apellido1']+' '+infoProfe['apellido2']+'</h3>';
    }else{
        contenido+='<h3>'+infoProfe['nombre1']+' '+infoProfe['apellido1']+'</h3>';
    }

    contenido+='<h4 class="secundario">'+infoProfe['profesion']+'</h4>';

    datos.innerHTML=contenido;

    contenido2+='<h4></h4\n>';
    contenido2+='<h4>Cédula: '+infoProfe['cedula']+'</h4>';
    contenido2+='<h4>Teléfono: '+infoProfe['telefono']+'</h4>';
    contenido2+='<h4>Correo: '+infoProfe['correo']+'</h4>';

    extraDatos.innerHTML=contenido2;
}

document.querySelector('#btnPerfil').addEventListener('click', function(){document.location.href = 'agregarDatosProfesor.html'});
