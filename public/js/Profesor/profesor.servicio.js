'use strict';

function setLocalProfes() {
    let listaProfes = getProfessorData();
    localStorage.setItem('listaProfesLS', JSON.stringify(listaProfes));
}

function getLocalProfes() {

    let listaProfes = JSON.parse(localStorage.getItem('listaProfesLS'));

    if (listaProfes == null) {
        listaProfes = localStorage.setItem('listaProfesLS', JSON.stringify(getProfessorData()));;
    }
    return listaProfes;
}

function setVerMasLS(pI, pProfesFiltrados) {
    let profileData = pProfesFiltrados[pI];
    localStorage.setItem('professorDataLS', JSON.stringify(profileData));
    document.location.href = 'perfilProfesor.html';
}

function getVerMasLS() {
    return JSON.parse(localStorage.getItem('professorDataLS'));
}

function setProfessorData(infoProfesor) {
    let respuesta = '';
    let peticion = $.ajax({
        url: 'http://localhost:4000/api/registrar_profesor',
        type: 'post',
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        dataType: 'json',
        async: false,
        data: {
            nombre1: infoProfesor[0],
            nombre2: infoProfesor[1],
            apellido1: infoProfesor[2],
            apellido2: infoProfesor[3],
            cedula: infoProfesor[4],
            correo: infoProfesor[5],
            telefono: infoProfesor[6],
            profesion: infoProfesor[7],
            rol: infoProfesor[8],
            password: infoProfesor[9],
            passwordChange: infoProfesor[10],
            trabajo_anterior: '',
            experiencia_docente: '',
            cursos_impartidos: ''
        }
    });

    peticion.done(function (response) {
        console.log('Registro bien');
        respuesta = response;
    });

    peticion.fail(function (response) {
        console.log('Registro mal');
    });

    return respuesta;
}

function getProfessorData() {

    let respuesta = [];
    let peticion = $.ajax({
        url: 'http://localhost:4000/api/listar_profesores',
        type: 'get',
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        dataType: 'json',
        async: false,
        data: {

        }
    });

    peticion.done(function (response) {
        respuesta = response;
    });

    peticion.fail(function (response) {

    });

    return respuesta;
}

function validarCedula(psCedula) {

    let aProfesorData = getProfessorData();

    for (let i = 0; i < aProfesorData.length; i++) {
        if (aProfesorData[i]['cedula'] == psCedula) {
            return true;
        } else {
            return false;
        }
    }
}

function generateRandomPassword() {
    let pw = Math.random().toString(36).substring(2, 10);
    return pw;
}

/*function getInfoProfesor(){
    let respuesta = 'respuesta';
    let peticion = $.ajax({
        url: 'http://localhost:4000/api/getinfo_profesor',
        type: 'get',
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        dataType: 'json',
        async: false,
        data: {
            cedula: '03586123'
        }
    });
    peticion.done(function (response) {
        respuesta = response;
    });
    peticion.fail(function (response) {});
    return respuesta;
}*/

function asignarProyecto(infoProyecto) {
    let respuesta = '';
    console.log(infoProyecto);
    let peticion = $.ajax({
        url: 'http://localhost:4000/api/asignar_proyecto',
        type: 'post',
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        dataType: 'json',
        async: false,
        data: {
            _id: infoProyecto[0],
            id: infoProyecto[1],
            rol: infoProyecto[2],
            nombre_proyecto: infoProyecto[3],
            fecha_Entrega: infoProyecto[4],
            estado_proyecto: infoProyecto[5]
        }
    });
    peticion.done(function (response) {
        respuesta = response;
    });
    peticion.fail(function (response) {
    });
    return respuesta;
}

/*function setExtraData(pId, sTrabajo,nAnno,sCursos,sGrado,dTitulo,sCarrera){
    let respuesta = '';
    let peticion = $.ajax({
        url : 'http://localhost:4000/api/agregar_info_profesor',
        type : 'post',
        contentType : 'application/x-www-form-urlencoded; charset=utf-8',
        dataType : 'json',
        async : false,
        data:{
            _id: pId,
            trabajo: sTrabajo,
            anno: nAnno,
            cursos: sCursos,
            grado: sGrado,
            titulo: dTitulo,
            carrera: sCarrera    
        }
      });
    
      peticion.done(function(response){        
          respuesta = response;
      });
    
      peticion.fail(function(response){
      });

    return respuesta;
}*/

function setPreparacionAcademica(pId, sGrado, dTitulo, sCarrera) {
    let respuesta = '';
    let peticion = $.ajax({
        url: 'http://localhost:4000/api/agregar_preparacion_academica',
        type: 'post',
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        dataType: 'json',
        async: false,
        data: {
            _id: pId,
            grado_academico: sGrado,
            titulo_fecha: dTitulo,
            carrera: sCarrera
        }
    });

    peticion.done(function (response) {
        respuesta = response;
    });

    peticion.fail(function (response) {
    });
    updateCurrentUser(pId);
    return respuesta;
}

function setCursosImpartidos(pId, psCursos) {
    let listaCursos = getCurrentUserData()['cursos_impartidos'];
    if (listaCursos == "") {
        listaCursos = [];
    } else {
        listaCursos = JSON.parse(listaCursos);
    }
    listaCursos.push(psCursos);
    let respuesta = '';
    let peticion = $.ajax({
        url: 'http://localhost:4000/api/agregar_cursos_impartidos',
        type: 'post',
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        dataType: 'json',
        async: false,
        data: {
            _id: pId,
            cursos_impartidos: JSON.stringify(listaCursos),
        }
    });

    peticion.done(function (response) {
        respuesta = response;
    });

    peticion.fail(function (response) {
    });

    updateCurrentUser(pId);

    return respuesta;
}

function setExtraData(pId, sTrabajo, nAnno) {
    /*let sTrabajoAnterior = getCurrentUserData()['trabajo_anterior'];
    let nAnnosExperiencia = getCurrentUserData()['experiencia_docente'];*/

    let respuesta = '';
    let peticion = $.ajax({
        url: 'http://localhost:4000/api/agregar_info_extra_profesor',
        type: 'post',
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        dataType: 'json',
        async: false,
        data: {
            _id: pId,
            trabajo_anterior: sTrabajo,
            experiencia_docente: nAnno
        }
    });

    peticion.done(function (response) {
        console.log('Registro bien');
        respuesta = response;
    });

    peticion.fail(function (response) {
        console.log('registro mal');
    });

    updateCurrentUser(pId);

    return respuesta;
}

