'use strict';
const express = require('express');
const router = express.Router();
const profesores = require('./profesores.api');


router.route('/registrar_profesor')
    .post(function (req, res) {
        profesores.registrar(req, res);
    });

router.route('/listar_profesores')
    .get(function (req, res) {
        profesores.listar(req, res);
    });

//Agregado por Esteban:
router.route('/getinfo_profesor')
    .get(function(req, res){
    profesores.getInfoProfesor(req, res);
});

module.exports = router;