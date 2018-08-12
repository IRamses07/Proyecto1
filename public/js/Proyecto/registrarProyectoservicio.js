'use strict';

function registrarProyecto(sNombreProyecto, cliente, nIdentifiacionJuridica, sEstadoProyecto, sFechaEntrega, sDescripcion, tecnologiasWed, tecnologiasMovil, tecologiasBd) {
    let respuesta = '';
    let peticion = $.ajax({
        url: 'http://localhost:4000/api/registrar',
        type: 'post',
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        dataType: 'json',
        async: false,
        data: {
            nombre_proyecto: sNombreProyecto,
            nombre_cliente: cliente,
            identificacion_juridica: nIdentifiacionJuridica,
            estado_proyecto: sEstadoProyecto,
            fecha_Entrega:sFechaEntrega,
            descripcion: sDescripcion,
            tecnologia_wed: JSON.stringify(tecnologiasWed),
            tecnologia_movil: JSON.stringify(tecnologiasMovil),
            tecnologia_bd:  JSON.stringify(tecologiasBd)


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

function obtenerListaProyectos() {
    let listaProyectos = [];

    let respuesta = '';
    let peticion = $.ajax({
        url: 'http://localhost:4000/api/listar_Proyectos',
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

    return listaProyectos;
}

function obtenerListaProyectosDesarrollo() {
    let listaProyectos = [];

    let respuesta = '';
    let peticion = $.ajax({
        url: 'http://localhost:4000/api/listar_Proyectos_desarrollo',
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

    return listaProyectos;
}

function obtenerListaProyectosDesarrollo() {
    let listaProyectos = [];

    let respuesta = '';
    let peticion = $.ajax({
        url: 'http://localhost:4000/api//listar_Proyectos_mantenimento',
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

    return listaProyectos;
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

function obtenerProyectoId(id){
    let persona = '';

    let peticion = $.ajax({
        url : 'http://localhost:4000/api/buscar_proyecto_id',
        type : 'post',
        contentType : 'application/x-www-form-urlencoded; charset=utf-8',
        dataType : 'json',
        async : false,
        data:{
            id : id
        }
      });
    
      peticion.done(function(response){
       persona = response;
      });
    
      peticion.fail(function(response){
       
      });
      return persona;
};




function modificarProyecto(id, sNombreProyecto, cliente, nIdentifiacionJuridica, sEstadoProyecto, sFechaEntrega, sDescripcion, tecnologiasWed, tecnologiasMovil, tecologiasBd){
    let respuesta = '';
    let peticion = $.ajax({
        url : 'http://localhost:4000/api//actualizar_proyecto',
        type : 'post',
        contentType : 'application/x-www-form-urlencoded; charset=utf-8',
        dataType : 'json',
        async : false,
        data:{
            _id : id,
            nombre_proyecto: sNombreProyecto,
            nombre_cliente: cliente,
            identificacion_juridica: nIdentifiacionJuridica,
            estado_proyecto: sEstadoProyecto,
            fecha_Entrega:sFechaEntrega,
            descripcion: sDescripcion,
            tecnologia_wed: JSON.stringify(tecnologiasWed),
            tecnologia_movil: JSON.stringify(tecnologiasMovil),
            tecnologia_bd:  JSON.stringify(tecologiasBd)
        }
      });
    
      peticion.done(function(response){
       respuesta = response;
      });
    
      peticion.fail(function(response){
       
      });

      return respuesta;
};



