'use strict'

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