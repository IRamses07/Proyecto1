'use strict'
moveUser(true);
let datos = document.querySelector('#datosUsuario');
let extraDatos = document.querySelector('#infoUsuario');
// let infoContacto2 = document.querySelector('#infoContacto2');
let thisProfessor = "";
if (getCurrentUserData()['rol'] == "profesor") {
    document.querySelector('#btnPerfil').classList.remove('lblHide');
    thisProfessor = getCurrentUserData();
    infoPersonal(thisProfessor);
} else {
    document.querySelector('#btnPerfil').classList.add('lblHide');
    thisProfessor = getVerMasLS();
    getInfo();
}

showExtraData();
listadoCursosImpartidos();
listadoPrepAcademica();
function getInfo() {
    let infoProfe = getVerMasLS();
    console.log(infoProfe);
    infoPersonal(infoProfe);
};

function infoPersonal(infoProfe) {
    let contenido = '';
    let contenido2 = '';

    document.querySelector('#perfiImagen').src = thisProfessor['foto'];

    if (infoProfe['apellido2'] != '') {
        contenido += '<h3>' + infoProfe['nombre1'] + ' ' + infoProfe['apellido1'] + ' ' + infoProfe['apellido2'] + '</h3>';
    } else {
        contenido += '<h3>' + infoProfe['nombre1'] + ' ' + infoProfe['apellido1'] + '</h3>';
    }

    contenido += '<h4 class="secundario">' + infoProfe['profesion'] + '</h4>';

    datos.innerHTML = contenido;

    contenido2 += '<h4></h4\n>';
    contenido2 += '<h4>Cédula: ' + infoProfe['cedula'] + '</h4>';
    contenido2 += '<h4>Teléfono: ' + infoProfe['telefono'] + '</h4>';
    contenido2 += '<h4>Correo: ' + infoProfe['correo'] + '</h4>';

    extraDatos.innerHTML = contenido2;
}

document.querySelector('#btnPerfil').addEventListener('click', function () { document.location.href = 'agregarDatosProfesores.html' });


function showExtraData(){
    let extraDataContainer = document.querySelector('#extraDataContainer');

    let trabajoAnterior = document.createElement('label');
    let annosExperiencia = document.createElement('label');

    trabajoAnterior.innerHTML = "Trabajo anterior: " + thisProfessor['trabajo_anterior'];
    trabajoAnterior.id = "lblTrabajoAnterior";
    annosExperiencia.innerText = "Años de experiencia: " + thisProfessor['experiencia_docente'];
    annosExperiencia.id="lblAnnosExperiencia";

    extraDataContainer.appendChild(trabajoAnterior);
    extraDataContainer.appendChild(annosExperiencia);
}

function listadoCursosImpartidos() {

    acomodarEspacios();

    if (thisProfessor['cursos_impartidos'] == "") {
        document.querySelector('#tblCursosImpartidos').classList.add('hide');

    } else {
        document.querySelector('#tblCursosImpartidos').classList.remove('hide');
        let tbody = document.querySelector('#tblCursosImpartidos tbody');
        tbody.innerHTML = '';

        for (let i = 0; i < JSON.parse(thisProfessor['cursos_impartidos']).length; i++) {
            let fila = tbody.insertRow();

            fila.insertCell().innerHTML = JSON.parse(thisProfessor['cursos_impartidos'])[i];
        }
    }
}

function acomodarEspacios() {
    if (thisProfessor['preparacion_academica'].length == 0) {
        if (thisProfessor['cursos_impartidos'] == "") {
            document.querySelector('#tblPrepAcademica').classList.remove('tamannoMaxR');
            document.querySelector('#tblPrepAcademica').classList.add('tamannoMinR');
            document.querySelector('#tblCursosImpartidos').classList.remove('tamannoMaxL');
            document.querySelector('#tblCursosImpartidos').classList.add('tamannoMinL');
        } else {
            document.querySelector('#tblPrepAcademica').classList.remove('tamannoMaxR');
            document.querySelector('#tblPrepAcademica').classList.add('tamannoMinR');
            document.querySelector('#tblCursosImpartidos').classList.add('tamannoMaxL');
            document.querySelector('#tblCursosImpartidos').classList.remove('tamannoMinL');
        }
    } else {
        if (thisProfessor['cursos_impartidos'] == "") {
            document.querySelector('#tblPrepAcademica').classList.add('tamannoMaxR');
            document.querySelector('#tblPrepAcademica').classList.remove('tamannoMinR');
            document.querySelector('#tblCursosImpartidos').classList.remove('tamannoMaxL');
            document.querySelector('#tblCursosImpartidos').classList.add('tamannoMinL');
        } else {
            document.querySelector('#tblPrepAcademica').classList.remove('tamannoMaxR');
            document.querySelector('#tblPrepAcademica').classList.add('tamannoMinR');
            document.querySelector('#tblCursosImpartidos').classList.remove('tamannoMaxL');
            document.querySelector('#tblCursosImpartidos').classList.add('tamannoMinL');
        }
    }
}

function listadoPrepAcademica() {

    acomodarEspacios();

    if (thisProfessor['preparacion_academica'].length == 0) {
        document.querySelector('#tblPrepAcademica').classList.add('hide');
    } else {
        document.querySelector('#tblPrepAcademica').classList.remove('hide');
        let tbody = document.querySelector('#tblPrepAcademica tbody');
        tbody.innerHTML = '';

        for (let i = 0; i < thisProfessor['preparacion_academica'].length; i++) {
            let fila = tbody.insertRow();

            fila.insertCell().appendChild(document.createTextNode(thisProfessor['preparacion_academica'][i]['carrera']));
            fila.insertCell().appendChild(document.createTextNode(thisProfessor['preparacion_academica'][i]['grado_academico']));
            fila.insertCell().appendChild(document.createTextNode(thisProfessor['preparacion_academica'][i]['titulo_fecha']));
        }
    }
}
