'use strict';

function registrarTicket(nombreCliente, urgencia, proyecto, imagenErr, referenciaTicket, descripcionError,estado, codigoT ){
    console.log(nombreCliente, urgencia, proyecto, imagenErr, referenciaTicket, descripcionError, estado, codigoT );
    let respuesta = '' ;
    let peticion = $.ajax({
        url: 'http://localhost:4000/api/registrar_ticket',
        type: 'post',
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        dataType : 'json',
        async : false,
        data:{
            nombre_cliente : nombreCliente,
            urgencia : urgencia,
            proyecto : proyecto,
            imagen_error : imagenErr,
            referencia_ticket : referenciaTicket,
            descripcion :descripcionError,
            estado : estado,
            codigo : codigoT
        }
    });
    peticion.done(function(response){
        respuesta = response;
       
       });
     
       peticion.fail(function(response){
           
        
       });
 
       return respuesta;
}

function listarTickets(){
    let tickets = [];

    let respuesta = '';
    let peticion = $.ajax({
        url : 'http://localhost:4000/api/listar_tickets',
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
 
       return respuesta;
     //    listaTickets
     console.log(response);
     console.log(tickets);
    return tickets;
}




function mostrarTicket(id){
    let tickets = [];

    let respuesta = '';
    let peticion = $.ajax({
        url : 'http://localhost:4000/api/mostrar_ticket',
        type : 'get',
        contentType : 'application/x-www-form-urlencoded; charset=utf-8',
        dataType : 'json',
        async : false,
        data:{
            _id : id
        }
    });

    peticion.done(function(response){
        respuesta = response;
       });
     
       peticion.fail(function(response){
        
       });
 
       return respuesta;

    return proyectos;
}

function idTicketModificar(pid){
    let ticket = '';

    let peticion = $.ajax({
        url : 'http://localhost:4000/api/buscar_id_modificar_ticket',
        type : 'post',
        contentType : 'application/x-www-form-urlencoded; charset=utf-8',
        dataType : 'json',
        async : false,
        data:{
            _id : pid
        }
      });
    
      peticion.done(function(response){
       ticket = response;
      });
    
      peticion.fail(function(response){
       
      });
      return ticket;
};

function actualizarTicket(id, nombreCliente, urgencia, proyecto, imagenErr, referenciaTicket, descripcionError){
    console.log(id, nombreCliente, urgencia, proyecto, imagenErr, referenciaTicket, descripcionError);
    let respuesta = '' ;
    let peticion = $.ajax({
        url: 'http://localhost:4000/api/modificar_ticket',
        type: 'post',
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        dataType : 'json',
        async : false,
        data:{
            _id : id,
            nombre_cliente : nombreCliente,
            urgencia : urgencia,
            proyecto : proyecto,
            imagen_error : imagenErr,
            referencia_ticket : referenciaTicket,
            descripcion :descripcionError
        }
    });
    peticion.done(function(response){
        respuesta = response;
       
       });
     
       peticion.fail(function(response){
           
        
       });
 
       return respuesta;
}

function cambiarEstadoTicket (id, estado){
    console.log(id, estado);
    let respuesta = '' ;
    let peticion = $.ajax({
        url: 'http://localhost:4000/api/cambiar_estado',
        type: 'post',
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        dataType : 'json',
        async : false,
        data:{
            _id : id,
           estado : estado
        }
    });
    peticion.done(function(response){
        respuesta = response;
       
       });
     
       peticion.fail(function(response){
           
        
       });
 
       return respuesta;
}

function guardar_comentario (id, tipo, autor, comentario){
    let respuesta = '' ;
    let peticion = $.ajax({
        url: 'http://localhost:4000/api/comentar_ticket',
        type: 'post',
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        dataType : 'json',
        async : false,
        data:{
            _id : id,
           tipo : tipo,
           autor : autor,
           texto : comentario
        }
    });
    peticion.done(function(response){
        respuesta = response;
       
       });
     
       peticion.fail(function(response){ 
       });
 
       return respuesta;
}