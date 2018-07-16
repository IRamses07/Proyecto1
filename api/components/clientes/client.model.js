'use strict';

let mongoose = require('mongoose');

let clientSchema = new mongoose.Schema({
    rol: { type: String, required: true },
    cedula_juridica: { type: String, required: true },
    nombre: { type: String, required: true },
    provincia: { type: String, required: true },
    canton: { type: String, required: true },
    distrito: { type: String, require: true },
    direccion_exacta: { type: String, required: false },
    primer_nombre: { type: String, required: true },
    segundo_nombre: { type: String, required: false },
    primer_apellido: { type: String, required: true },
    segundo_apellido: { type: String, required: false },
    telefono: { type: String, required: true },
    correo_electronico: { type: String, required: true },
    ubicacion: { type: String, required: true },
    password: { type: String, required: true },
    passwordChange: { type: Number, required: true },
    proyectos: [
        {
            id: { type: String },
             nombre_proyecto: { type: String },
            fecha_Entrega: { type: String },
            estado_proyecto: { type: String }
        }
    ],
    foto : {type : String}
});
module.exports = mongoose.model('Cliente', clientSchema);