'use strict';
let mongoose = require('mongoose');

let proyectoSchema = new mongoose.Schema({
    nombre_proyecto: { type: String, required: true },
    nombre_cliente: { type: String, required: true },
    identificacion_juridica: { type: String, required: true },
    estado_proyecto: { type: String, required: true },
    fecha_Entrega: { type: String, required: true },
    descripcion: { type: String, required: true },
    tecnologias:{ type:String ,required: true}


});

module.exports = mongoose.model('Proyecto', proyectoSchema);