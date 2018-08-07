'use strict';
//moveUser(true);

let datos = document.querySelector('#datosUsuario');
let extraDatos = document.querySelector('#infoUsuario');
let infoContacto2 = document.querySelector('#infoContacto2');

getInfo();
document.querySelector('#btnContrasenna').addEventListener('click', function () { document.location.href = 'passwordChange.html' });

function getInfo(){
    let thisStudent = [];
    let infoEstudiante = getInfoEstudiante();
    if (getCurrentUserData()['rol'] == "estudiante") {
        document.querySelector('#btnContrasenna').classList.remove('lblHide');
        thisStudent.push(getCurrentUserData());
        infoPersonal(thisStudent);
    } else {
        document.querySelector('#btnContrasenna').classList.add('lblHide');
        infoPersonal(infoEstudiante);
    }
    infoContacto(infoEstudiante);
    imprimirListaCursos (infoEstudiante)
}


function infoPersonal(infoEstudiante){
    let contenido ='';
    let contenido2 = '';
    document.querySelector('#perfiImagen').src = infoEstudiante[0]['foto'];
    
    if(infoEstudiante[0]['apellido2'] !== ''){
        contenido+='<h3>'+infoEstudiante[0]['Nombre1']+' '+infoEstudiante[0]['apellido1']+' '+infoEstudiante[0]['apellido2']+'</h3>';
    }else{
        contenido+='<h3>'+infoEstudiante[0]['Nombre1']+' '+infoEstudiante[0]['apellido1']+'</h3>';
    }
    contenido+='<h4 class="secundario">'+infoEstudiante[0]['carrera']+'</h4>';

    datos.innerHTML=contenido;

    contenido2+='<h4>Cédula: '+infoEstudiante[0]['cedula']+'</h4>';
    contenido2+='<h4>'+infoEstudiante[0]['provincia']+', '+infoEstudiante[0]['canton']+', '+infoEstudiante[0]['distrito']+'</h4>';
    contenido2+='<h4>Teléfono: '+infoEstudiante[0]['telefono']+'</h4>';
    contenido2+='<h4>Correo: '+infoEstudiante[0]['correo']+'</h4>';

    extraDatos.innerHTML=contenido2;
}

function infoContacto(infoEstudiante){
    let contenido='';

    if(infoEstudiante[0]['contApellido2'] !== ''){
        contenido+='<h5>Nombre: '+infoEstudiante[0]['contNombre1']+' '+infoEstudiante[0]['contApellido1']+' '+infoEstudiante[0]['contApellido2']+'</h5>\n';
    }else{
        contenido+='<h5>Nombre: '+infoEstudiante[0]['contNombre1']+' '+infoEstudiante[0]['contApellido1']+'</h5>\n';
    }   

    contenido+='<hr class="list">\n';
    contenido+='<h5>Teléfono: '+infoEstudiante[0]['contTelefono']+'</h5>\n';
    contenido+='<hr class="list">\n';
    contenido+='<h5>Correo: '+infoEstudiante[0]['contCorreo']+'</h5>\n';
    infoContacto2.innerHTML = contenido;
}

function imprimirListaCursos (infoEstudiante){
    let CursosString = infoEstudiante[0]['cursosAprobados'];
    let listaCursos = JSON.parse(CursosString);

    let tbody = document.querySelector('#tblCursos tbody');
    tbody.innerHTML = '';
         
    for(let i = 0; i < listaCursos.length; i++){
        let fila = tbody.insertRow();

        let cNomCurso = fila.insertCell();
   
        cNomCurso.innerHTML = listaCursos[i][0];
    }
}