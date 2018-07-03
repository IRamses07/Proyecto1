'use strict';
let mongoose = require('mongoose');
//esquema que mongoose utiliza para mapear o establecer los tipos de los datos
let ticketSchema = new mongoose.Schema({
    nombre_cliente : {type : String, required : true},
    urgencia : {type : String, required : true },
    proyecto : {type : String},
    pantallazo_error : {type : String},
    referencia_ticket : {type : String},
    descripcion : {type : String, required : true}
});

module.exports = mongoose.model('Ticket', ticketSchema);