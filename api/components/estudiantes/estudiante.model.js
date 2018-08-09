'use strict';
let mongoose = require('mongoose');

let estudianteSchema = new mongoose.Schema({
    cedula: { type: String, required: true },
    Nombre1: { type: String, required: true },
    Nombre2: { type: String, required: false },
    apellido1: { type: String, required: true },
    apellido2: { type: String, required: false },
    telefono: { type: String, required: true },
    correo: { type: String, required: true },
    direccion: { type: String, required: true },
    provincia: { type: String, required: true },
    canton: { type: String, required: true },
    distrito: { type: String, required: true },
    carrera: { type: String, required: true },
    cursosAprobados: { type: String, required: true },
    contNombre1: { type: String, required: true },
    contNombre2: { type: String, required: false },
    contApellido1: { type: String, required: true },
    contApellido2: { type: String, required: false },
    contTelefono: { type: String, required: true },
    contCorreo: { type: String, required: true },
    estado: { type: String, required: true },
    password: { type: String, required: true },
    passwordChange: { type: Number, required: true },
    foto: { type: String },
    proyectos: [
        {
            id: { type: String },
            nombre_proyecto: { type: String },
            fecha_Entrega: { type: String },
            estado_proyecto: { type: String },
            horas: {type:String}
        
        }

    ],
    rol : {type : String, required : true}
});

module.exports = mongoose.model('Estudiante', estudianteSchema);