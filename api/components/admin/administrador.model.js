'use strict';
let mongoose = require('mongoose');

let adminSchema = new mongoose.Schema({
    nombre1: { type: String, required: true },
    nombre2: { type: String, required: false },
    apellido1: { type: String, required: true },
    apellido2: { type: String, required: false },
    cedula: { type: String, required: true },
    correo: { type: String, required: true },
    telefono: { type: String, required: true },
    profesion: { type: String, required: false },
    rol: { type: String, required: true },
    password: { type: String, required: true },
    passwordChange: { type: String, required: true },

});

module.exports = mongoose.model('Admin', adminSchema);