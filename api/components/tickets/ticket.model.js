'use strict';
let mongoose = require('mongoose');
//esquema que mongoose utiliza para mapear o establecer los tipos de los datos
let ticketSchema = new mongoose.Schema({
    nombre_cliente : {type : String, required : true},
    urgencia : {type : String, required : true },
    proyecto : {type : String, required : true},
    imagen_error : {type : String, required: true},
    referencia_ticket : {type : String},
    descripcion : {type : String, required : true},
    estado: {type: String, required: true},
    codigo: {type: String, required: true},
    comentarios : [
        {
            tipo : {type : String},
            autor : {type : String},
            texto : {type : String}
        }
    ]
});

module.exports = mongoose.model('Ticket', ticketSchema);