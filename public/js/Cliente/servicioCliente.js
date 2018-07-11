'use strict';
/**
 * Llama al servio que registra al cliente dentro de la base de datos
 * @param {JSON} infoCliente información del cliente
 */
function registrarCliente(infoCliente) {
    console.log(infoCliente);
    let respuesta = '';
    let peticion = $.ajax({
        url: 'http://localhost:4000/api/registro_cliente',
        type: 'post',
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        dataType: 'json',
        async: false,
        data: {
            rol: 'cliente',
            cedula_juridica: infoCliente.cedula_juridica,
            nombre: infoCliente.nombre,
            provincia: infoCliente.provincia,
            canton: infoCliente.canton,
            distrito: infoCliente.distrito,
            direccion_exacta: infoCliente.direccion_exacta,
            primer_nombre: infoCliente.primer_nombre,
            segundo_nombre: infoCliente.segundo_nombre,
            primer_apellido: infoCliente.primer_apellido,
            segundo_apellido: infoCliente.segundo_apellido,
            telefono: infoCliente.telefono,
            correo_electronico: infoCliente.correo_electronico,
            ubicacion: infoCliente.ubicacion,
            password: (function () {
                let pw = Math.random().toString(36).substring(2, 10);
                return pw;
            }),
            passwordChange: 0
        }
    });

    peticion.done(function (response) {
        respuesta = response;
    });

    peticion.fail(function (response) {

    });

    return respuesta;
}

function getInfoCliente(){
    let respuesta = 'respuesta';
    let peticion = $.ajax({
        url : 'http://localhost:4000/api/getinfo_clientes',
        type : 'get',
        contentType : 'application/x-www-form-urlencoded; charset=utf-8',
        dataType : 'json',
        async : false,
        data:{
            cedula_juridica : '15515154'
        }
      });
    
      peticion.done(function(response){
          respuesta = response;
      });
    
      peticion.fail(function(response){
      });

    return respuesta;
}

function listarClientes() {
    let respuesta = '';
    let peticion = $.ajax({
        url: 'http://localhost:4000/api/listar_clientes',
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
function asignarProyecto(infoProyecto) {
    let respuesta = '';
    let peticion = $.ajax({
        url: 'http://localhost:4000/api/listar_clientes',
        type: 'get',
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        dataType: 'json',
        async: false,
        data: {
            _id: infoProyecto._id,
            id: infoProyecto.id,
            nombre_proyecto: infoProyecto.nombre_proyecto,
            fecha_Entrega: infoProyecto.fecha_Entrega,
            estado_proyecto: infoProyecto.estado_proyecto
        }
    });

    peticion.done(function (response) {
        respuesta = response;
    });

    peticion.fail(function (response) {

    });

    return respuesta;
}