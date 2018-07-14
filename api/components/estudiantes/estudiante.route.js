'use strict';
const express = require('express');
const router = express.Router();
const estudiantes = require('./estudiante.api');

router.route('/registrar_estudiante')
    .post(function(req, res){
    estudiantes.registrar(req, res);
});

router.route('/listar_estudiantes')
    .get(function(req, res){
    estudiantes.listar(req, res);
});

router.route('/filtrarnombre_estudiantes')
    .get(function(req, res){
        console.log('f7');
    estudiantes.filtrarNombre(req, res);
});

router.route('/getInfo_estudiantes')
    .get(function(req, res){
        console.log('f7');
    estudiantes.getInfoEstudiante(req, res);
});

router.route('/cambiarfoto_estudiantes')
    .put(function(req, res){
    estudiantes.cambiarFoto(req, res);
});

module.exports = router;