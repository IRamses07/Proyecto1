'use strict';
let mongoose = require('mongoose');

let estudianteSchema = new mongoose.Schema({
    cedula : {type: String, required: true},
    Nombre1 : {type: String, required: true},
    Nombre2 : {type: String, required: false},
    apellido1 : {type : String, required : true},
    apellido2 : {type : String, required : false},
    telefono : {type : String, required : true},
    correo : {type : String, required : true},
    direccion : {type : String, required : true},
    provincia : {type : Number, required : true},
    canton : {type : Number, required : true},
    distrito : {type : Number, required : true},
    carrera : {type : String, required : true},
    cursosAprobados: { type: String, required : true},
    contNombre1 : {type : String, required : true},
    contNombre2 : {type : String, required : false},
    contApellido1 : {type : String, required : true},
    contApellido2 : {type : String, required : false},
    contTelefono : {type : String, required : true},
    contCorreo : {type : String, required : true},
    estado : {type : String, required : true},
    password: {type: String, required: true},
    passwordChange: {type: Number, required: true}
});

module.exports = mongoose.model('Estudiante', estudianteSchema);