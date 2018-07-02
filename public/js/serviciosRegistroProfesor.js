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
            apellido1: infoProfesor[3],
            apellido2: infoProfesor[4],
            cedula: infoProfesor[5],
            correo: infoProfesor[6],
            telefono: infoProfesor[7],
            profesion: infoProfesor[8],
            rol: infoProfesor[9]
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
/*function obtenerListaProfesores() {
    let respuesta = '';
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
}*/