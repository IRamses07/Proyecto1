'use strict'
let listaCursos = [];

function registrarEstudiante(infoEstudiante) {
    let respuesta = '';
    let cursos = JSON.stringify(listaCursos);
    let peticion = $.ajax({
        url: 'http://localhost:4000/api/registrar_estudiante',          //los defino en users.route.js
        type: 'post',
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        dataType: 'json',
        async: false,
        data: {
            cedula: infoEstudiante[0],
            Nombre1: infoEstudiante[1],
            Nombre2: infoEstudiante[2],
            apellido1: infoEstudiante[3],
            apellido2: infoEstudiante[4],
            telefono: infoEstudiante[5],
            correo: infoEstudiante[6],
            direccion: infoEstudiante[7],
            provincia: infoEstudiante[8],
            canton: infoEstudiante[9],
            distrito: infoEstudiante[10],
            carrera: infoEstudiante[11],
            cursosAprobados: cursos,
            contNombre1: infoEstudiante[12],
            contNombre2: infoEstudiante[13],
            contApellido1: infoEstudiante[14],
            contApellido2: infoEstudiante[15],
            contTelefono: infoEstudiante[16],
            contCorreo: infoEstudiante[17],
            estado: infoEstudiante[18],
            password: (function () {
                let pw = Math.random().toString(36).substring(2, 10);
                return pw;
            }),
            passwordChange: 0 ,
            foto : 'http://res.cloudinary.com/dtz8agoc3/image/upload/v1531452055/perfil.png',
            rol : 'estudiante'
        }
    });

    peticion.done(function (response) {
        respuesta = response;
    });

    peticion.fail(function (response) {

    });

    return respuesta;
}
function agregaCurso(infoCurso) {
    listaCursos.push(infoCurso);
}
function obtenerListaCursos() {
    return listaCursos;
}

function obtenerListaEstudiantes() {

    let respuesta = 'respuesta';
    let peticion = $.ajax({
        url: 'http://localhost:4000/api/listar_estudiantes',
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

function validarCedulaRepetida(cedula){

    let listaEstudiantes = obtenerListaEstudiantes();
    for (let i = 0; i < listaEstudiantes.length; i++) {
        if(listaEstudiantes[i]['cedula']==cedula){
            return true;
        }
    }
    return false;
}

function filtrarNombreEstudiantes(inputDatoBuscar) {
    let respuesta = 'respuesta';
    let peticion = $.ajax({
        url: 'http://localhost:4000/api/filtrarnombre_estudiantes',
        type: 'get',
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        dataType: 'json',
        async: false,
        data: {
            Nombre1: inputDatoBuscar.value
        }
    });

    peticion.done(function (response) {
        respuesta = response;
    });

    peticion.fail(function (response) {
    });

    return respuesta;
}

function getInfoEstudiante() {
    let respuesta = 'respuesta';
    let ced = '';
    if (getCurrentUserData()['rol']=='estudiante'){
        ced = getCurrentUserData()['cedula'];
    } else {
        ced = localStorage.getItem('ced');
    }
    let peticion = $.ajax({
        url : 'http://localhost:4000/api/getInfo_estudiantes',
        type : 'get',
        contentType : 'application/x-www-form-urlencoded; charset=utf-8',
        dataType : 'json',
        async : false,
        data:{
            cedula : ced
            //let datos = getCurrentUserData()['cedula'];
            //cedula : '304870951'
        }
    });

    peticion.done(function (response) {
        respuesta = response;
    });

    peticion.fail(function (response) {
    });
    return respuesta;
}

function cambiarFoto(imagenUrl) {
    let respuesta = '';
    let ced = '';
    if (getCurrentUserData()['rol']=='estudiante'){
        ced = getCurrentUserData()['cedula'];
    } else {
        ced = localStorage.getItem('ced');
    }

    let peticion = $.ajax({
        url: 'http://localhost:4000/api/cambiarfoto_estudiantes',
        type: 'put',
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        dataType: 'json',
        async: false,
        data: {
            cedula: ced,
            foto: imagenUrl
        }
    });

    peticion.done(function (response) {
        respuesta = response;
    });

    peticion.fail(function (response) {

    });

    return respuesta;
}

   
function asignarProyecto(id, idProyecto, nombreProyecto, fechaEntrega, estadoProyecto) {
    let respuesta = '';
    
    let peticion = $.ajax({
        url: 'http://localhost:4000/api/asignar_proyecto_e',
        type: 'post',
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        dataType: 'json',
        async: false,

        data: {

            _id: id,
            id: idProyecto,
            nombre_proyecto:nombreProyecto,
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

function cambiarEstadoS(ced,estadoEnt) {
    let respuesta = '';

    let peticion = $.ajax({
        url: 'http://localhost:4000/api/cambiarestado_estudiantes',
        type: 'put',
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        dataType: 'json',
        async: false,
        data: {
            cedula: ced,
            estado: estadoEnt
        }
    });

    peticion.done(function (response) {
        respuesta = response;
    });

    peticion.fail(function (response) {

    });

    return respuesta;
}

function actualizarEstudianteId(pid,infoEstudiante){
    let respuesta = '';
    let cursos = JSON.stringify(listaCursos);
    let peticion = $.ajax({
        url : 'http://localhost:4000/api/actualizar_estudiantes',
        type : 'post',
        contentType : 'application/x-www-form-urlencoded; charset=utf-8',
        dataType : 'json',
        async : false,
        data:{
            _id : pid,
            Nombre1: infoEstudiante[1],
            Nombre2: infoEstudiante[2],
            apellido1: infoEstudiante[3],
            apellido2: infoEstudiante[4],
            telefono: infoEstudiante[5],
            correo: infoEstudiante[6],
            direccion: infoEstudiante[7],
            provincia: infoEstudiante[8],
            canton: infoEstudiante[9],
            distrito: infoEstudiante[10],
            carrera: infoEstudiante[11],
            cursosAprobados: cursos,
            contNombre1: infoEstudiante[12],
            contNombre2: infoEstudiante[13],
            contApellido1: infoEstudiante[14],
            contApellido2: infoEstudiante[15],
            contTelefono: infoEstudiante[16],
            contCorreo: infoEstudiante[17],
        }
      });
    
      peticion.done(function(response){
       respuesta = response;
      });
    
      peticion.fail(function(response){
       
      });
      return respuesta;
};


function agregarHorasProyecto(idE, id,horas){
    let respuesta = '';
  
    let peticion = $.ajax({
        url : 'http://localhost:4000/api/agregar_horas',
        type : 'post',
        contentType : 'application/x-www-form-urlencoded; charset=utf-8',
        dataType : 'json',
        async : false,
        data:{
            _id : idE,
            id: id,
            horas :horas
        
        }
      });
    
      peticion.done(function(response){
       respuesta = response;
      });
    
      peticion.fail(function(response){
       
      });
      return respuesta;
};

























