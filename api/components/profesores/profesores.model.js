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
    rol: {type: String, required: false},
    lugarTrabajo: { type: String},
    annosExperiencia: { type: Number},
    cursosImpartidos: { type: Array},
    informacionAcademica: { type: Array},
    password: {type: String, required: true}
});

module.exports = mongoose.model('Profesor', profesorSchema);