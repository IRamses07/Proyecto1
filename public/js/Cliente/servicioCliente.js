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
            passwordChange: 0,
            foto : 'http://res.cloudinary.com/dtz8agoc3/image/upload/v1531452055/perfil.png'
        }
    });

    peticion.done(function (response) {
        respuesta = response;
    });

    peticion.fail(function (response) {

    });

    return respuesta;
}

function getInfoCliente() {
    let respuesta = 'respuesta';
    let cedJur = getCurrentUserData()['cedula_juridica'];
    let peticion = $.ajax({
        url: 'http://localhost:4000/api/getinfo_clientes',
        type: 'get',
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        dataType: 'json',
        async: false,
        data: {
            cedula_juridica: cedJur       
        }
    });

    peticion.done(function (response) {
        respuesta = response;
    });

    peticion.fail(function (response) {
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

function asignarProyectoC(id, id1, nombreProyecto, fechaEntrega, estadoProyecto) {
    let respuesta = '';
    // console.log(infoProyecto);
    let peticion = $.ajax({
        url: 'http://localhost:4000/api/asignar_proyecto_c',
        type: 'post',
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        dataType: 'json',
        async: false,

        data: {

            _id: id,
            id: id1,
            nombre_proyecto: nombreProyecto,
            fecha_Entrega: fechaEntrega,
            estado_proyecto: estadoProyecto
        }
    });

    peticion.done(function (response) {
        respuesta = response;
    });

    peticion.fail(function (response) {

    });

    return respuesta;
}

function cambiarFoto(imagenUrl){
    let respuesta = '';
    let cedJur = getCurrentUserData()['cedula_juridica'];
    let peticion = $.ajax({
        url : 'http://localhost:4000/api/cambiarfoto_clientes',
        type : 'put',
        contentType : 'application/x-www-form-urlencoded; charset=utf-8',
        dataType : 'json',
        async : false,
        data:{
            cedula_juridica : cedJur,
            foto : imagenUrl
        }
      });
    
      peticion.done(function(response){
       respuesta = response;
      });
    
      peticion.fail(function(response){
       
      });

      return respuesta;
}

function validarCedulaRepetida(cedulaJuridica){

    let listaDeClientes = listarClientes();
    for (let i = 0; i < listaDeClientes.length; i++) {
        if(listaDeClientes[i]['cedula_juridica']==cedulaJuridica){
            return true;
        }
    }
    return false;
}