'use strict';

function registrarProyecto(paInfoProyecto) {
    let respuesta = '';
    let peticion = $.ajax({
        url: 'http://localhost:4000/api/registrar_proyecto',
        type: 'post',
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        dataType: 'json',
        async: false,
        data: {
            nombre_proyecto: paInfoProyecto[0],
            nombre_cliente: paInfoProyecto[1],
            identificacion_juridica: paInfoProyecto[2],
            estado_proyecto: paInfoProyecto[3],
            fecha_Entrega: paInfoProyecto[4],
            descripcion: paInfoProyecto[5]


        }
    });

    peticion.done(function (response) {
        respuesta = response;
    });

    peticion.fail(function (response) {

    });

    return respuesta;
}


