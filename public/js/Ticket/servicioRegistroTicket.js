'use strict';

function registrarTicket(paticket){
    let respuesta = '' ;
    let peticion = $.ajax({
        url: 'http://localhost:4000/api/registrar_ticket',
        type: 'post',
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        dataType : 'json',
        async : false,
        data:{
            nombre_cliente : paticket[0],
            urgencia : paticket[1],
            proyecto : paticket[2],
            pantallazo_error : paticket[3],
            referencia_ticket : paticket[4],
            descripcion : paticket[5]
        }
    });
    peticion.done(function(response){
        respuesta = response;
       });
     
       peticion.fail(function(response){
        
       });
 
       return respuesta;
}