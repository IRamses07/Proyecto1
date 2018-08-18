'use strict'

function registrarChat(id,sp1,sp2){
    let respuesta = '';
    console.log('llega al service');
    console.log(id,sp1,sp2);
    let peticion = $.ajax({
        url: 'http://localhost:4000/api/crear_chat',          
        type: 'post',
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        dataType: 'json',
        async: false,
        data: {
            chatid: id,
            speaker1: sp1,
            speaker2: sp2
        }
    });

    peticion.done(function (response) {
        respuesta = response;
    });

    peticion.fail(function (response) {

    });

    return respuesta;
}


function obtenerListaChats() {

    let respuesta = 'respuesta';
    let peticion = $.ajax({
        url: 'http://localhost:4000/api/listar_Chats',
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


function agregarMensajeChat(chatid, sender1, mensaje1, hora1) {
    console.log('llega al serviceChat '+sender1);


    let respuesta = '';
    let peticion = $.ajax({
        url: 'http://localhost:4000/api/agregar_mensaje',
        type: 'post',
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        dataType: 'json',
        async: false,
        data: {

            chatid: chatid,
            mensaje: mensaje1,
            hora: hora1,
            sender:sender1



        }
    });

    peticion.done(function (response) {
        respuesta = response;
    });

    peticion.fail(function (response) {

    });
    return respuesta;
};







function getInfoChat(room) {
    let respuesta = 'respuesta';

    let peticion = $.ajax({
        url: 'http://localhost:4000/api/getInfo_chat',
        type: 'get',
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        dataType: 'json',
        async: false,
        data: {
            chatid: room
        }
    });

    peticion.done(function (response) {
        respuesta = response;
    });

    peticion.fail(function (response) {
    });
    return respuesta;
}

