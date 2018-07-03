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


module.exports = router;