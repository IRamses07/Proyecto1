'use strict';

function registrar_notificacion() {
    let respuesta = '';
    let peticion = $.ajax({
        url: 'http://localhost:4000/api/registrar_notificacion',
        type: 'post',
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        dataType: 'json',
        async: false,
        data: {
            emisor: {
                id: _id,
                rol: '',
            },
            receptor: {
                id: _id,
                rol: '',
            },
            tipo: '', //'ticket' || 'proyecto' || 'mensaje',
            referecia: '' //a la página que lo envía
        }
    });

    peticion.done(function (response) {
        respuesta = response;
    });

    peticion.fail(function (response) {
        console.log(response);
    });

    return respuesta;
}
