'use strict';
const express = require('express');
const router = express.Router();
const estudiantes = require('./estudiante.api');

router.route('/registrar_estudiante')
    .post(function(req, res){
    estudiantes.registrar(req, res);
});

router.route('/listar_estudiante')
    .get(function(req, res){
    estudiantes.listarEstudiantes(req, res);
});

module.exports = router;