'use strict';


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
            password: infoProfesor[9]
            /*profesion: infoProfesor.profesion*/
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

function validarCedula(psCedula){

    let aProfesorData = getProfessorData();

    for (let i = 0; i < aProfesorData.length; i++) {
        if(aProfesorData[i]['cedula']==psCedula){
            return true;
        }else{
            return false;
        }  
    }
}
function generateRandomPassword(){
	let pw = Math.random().toString(36).substring(2, 10);
	return pw;
}