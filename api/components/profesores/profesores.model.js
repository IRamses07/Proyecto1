'use strict';
let mongoose = require('mongoose');

let profesorSchema = new mongoose.Schema({
    nombre1: { type: String, required: true },
    nombre2: { type: String, required: false },
    apellido1: { type: String, required: true },
    apellido2: { type: String, required: false },
    cedula: { type: String, required: true },
    correo: { type: String, required: true },
    telefono: { type: String, required: true },
    profesion: { type: String, required: true },
    lugarTrabajo: { type: String},
    annosExperiencia: { type: Number},
    cursosImpartidos: { type: Array},
    informacionAcademica: { type: Array}
});

module.exports = mongoose.model('Profesor', profesorSchema);