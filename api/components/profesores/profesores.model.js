'use strict';
let mongoose = require('mongoose');

let profesorSchema = new mongoose.Schema({
    nombre1: { type: String, required: false },
    nombre2: { type: String, required: false },
    apellido1: { type: String, required: false },
    apellido2: { type: String, required: false },
    cedula: { type: String, required: false },
    correo: { type: String, required: false },
    telefono: { type: String, required: false },
    profesion: { type: String, required: false },
    rol: { type: String, required: false },
    password: { type: String, required: true },
    passwordChange: { type: String, required: true },
    trabajo_anterior: { type: String },
    experiencia_docente: { type: Number },
    cursos_impartidos: { type: String },
    preparacion_academica: [{
        grado_academico: { type: String },
        titulo_fecha: { type: String },
        carrera: { type: String }
    }],
    proyecto: [
        {
            id: { type: String },
            rol: { type: String },
            nombre_proyecto: { type: String },
            fecha_Entrega: { type: String },
            estado_proyecto: { type: String }
        }
    ],
    foto: { type: String },
    estado: { type: String }


});

module.exports = mongoose.model('Profesor', profesorSchema);