'use strict'

function registrarChat(id,sp1,sp2){
    let respuesta = '';

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