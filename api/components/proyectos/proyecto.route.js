'use strict';

const express = require('express');
const router = express.Router();
const proyecto = require('./proyecto.api');

router.route('/registrar')
    .post(function (req, res) {
        proyecto.registrar(req, res);
    });

    router.route('/listar_Proyectos')
    .get(function(req, res){
    proyecto.listar(req, res);
});

    module.exports = router;
