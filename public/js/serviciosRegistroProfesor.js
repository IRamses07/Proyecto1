'use strict';


function registrarProfesor(infoProfesor) {
    let respuesta = '';
    let peticion = $.ajax({
        url: 'http://localhost:4000/api/registrar_profesor',
        type: 'post',
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        dataType: 'json',
        async: false,
        data: {
            nombre1: infoProfesor.nombre1,
            nombre2: infoProfesor.nombre2,
            telefono: infoProfesor.telefono,
            apellido1: infoProfesor.apellido1,
            apellido2: infoProfesor.apellido2,
            cedula: infoProfesor.cedula,
            correo: infoProfesor.correo,
            telefono: infoProfesor.telefono,
            profesion: infoProfesor.profesion
        }
    });

    peticion.done(function (response) {
        respuesta = response;
    });

    peticion.fail(function (response) {

    });

    return respuesta;
}
function obtenerListaProfesores() {
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
}