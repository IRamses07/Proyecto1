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

/*router.route('/actualizar_usuario')
    .post(function(req, res){
    users.actualizar_usuario(req, res);
});*/

router.route('/getinfo_profesor')
    .get(function (req, res) {
        console.log('f7');
        profesores.getInfoProfesor(req, res);
    });

router.route('/asignar_proyecto')
    .post(function (req, res) {
        profesores.asignar_proyecto(req, res);
    });


module.exports = router;