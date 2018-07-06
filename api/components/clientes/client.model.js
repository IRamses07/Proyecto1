'use strict';

let mongoose = require('mongoose');

let clientSchema = new mongoose.Schema({
    rol : {type: String, required: true},
    cedula_juridica: {type:String, required: true},
    nombre: {type: String, required: true},
    provincia: {type: String, required: true},
    canton: {type: String, required: true},
    distrito: {type: String, require: true},
    direccion_exacta: {type:String, required:false},
    primer_nombre:{type:String, required:true},
    segundo_nombre:{type:String, required:false},
    primer_apellido:{type:String, required:true },
    segundo_apellido:{type:String, required:false},
    telefono: {type:String, required:true},
    correo_electronico:{type:String, required:true},
    ubicacion:{type: Array,required:true}
});
module.exports = mongoose.model('Cliente', clientSchema);