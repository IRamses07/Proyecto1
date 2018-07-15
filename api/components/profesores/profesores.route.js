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

router.route('/agregar_preparacion_academica')
    .post(function (req, res) {
        profesores.agregar_preparacion_academica(req, res);
    });
router.route('/cambiarfoto_profesor')
    .put(function(req, res){
    profesores.cambiarFoto(req, res);
});

router.route('/agregar_cursos_impartidos')
    .post(function(req, res){
        profesores.agregar_cursos_impartidos(req, res);
});

router.route('/agregar_info_extra_profesor')
    .post(function(req, res){
    profesores.agregar_info_extra_profesor(req, res);
});

module.exports = router;