'use strict'
let listaCursos = [];
      
function registrarEstudiante(infoEstudiante){
    let respuesta = '';
    console.log("servicelist: "+infoEstudiante);
    let peticion = $.ajax({
        url : 'http://localhost:4000/api/registrar_estudiante',          //los defino en users.route.js
        type : 'post',
        contentType : 'application/x-www-form-urlencoded; charset=utf-8',
        dataType : 'json',
        async : false,
        data:{
                cedula : infoEstudiante[0],
                Nombre1 : infoEstudiante[1],
                Nombre2 : infoEstudiante[2],
                apellido1 : infoEstudiante[3],
                apellido2 : infoEstudiante[4],
                telefono : infoEstudiante[5],
                correo : infoEstudiante[6],
                direccion : infoEstudiante[7],
                provincia : infoEstudiante[8],
                canton : infoEstudiante[9],
                distrito : infoEstudiante[10],
                carrera : infoEstudiante[11],
                scursosAprobados: listaCursos,
                contNombre1 : infoEstudiante[12],
                contNombre2 : infoEstudiante[13],
                contApellido1 : infoEstudiante[14],
                contApellido2 : infoEstudiante[15],
                contTelefono : infoEstudiante[16],
                contCorreo : infoEstudiante[17]
        }
      });
    
      peticion.done(function(response){
       respuesta = response;
      });
    
      peticion.fail(function(response){
       
      });

      return respuesta;
}
function agregaCurso(infoCurso){
    listaCursos.push(infoCurso);
}
function obtenerListaCursos(){
    return listaCursos;
}

function obtenerListaEstudiantes(){

    let respuesta = 'respuesta';
    let peticion = $.ajax({
        url : 'http://localhost:4000/api/listar_estudiantes',
        type : 'get',
        contentType : 'application/x-www-form-urlencoded; charset=utf-8',
        dataType : 'json',
        async : false,
        data:{
            
        }
      });
    
      peticion.done(function(response){
          respuesta = response;
      });
    
      peticion.fail(function(response){
      });

      //console.log(listaEstudiantes);

      return respuesta;
    
   //return listaEstudiantes;
}