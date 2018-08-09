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
    estudiantes.filtrarNombre(req, res);
});

router.route('/getInfo_estudiantes')
    .get(function(req, res){
    estudiantes.getInfoEstudiante(req, res);
});

router.route('/cambiarfoto_estudiantes')
    .put(function(req, res){
    estudiantes.cambiarFoto(req, res);
});

router.route('/asignar_proyecto_e')
    .post(function(req, res){
    estudiantes.asignar_proyecto(req, res);
});

router.route('/cambiarestado_estudiantes')
    .put(function(req, res){
    estudiantes.cambiarEstado(req, res);
});

router.route('/actualizar_estudiantes')
    .post(function(req, res){
    estudiantes.actualizar(req, res);
});
router.route('/cambiar_contrasenna_estudiante')
    .post(function(req, res){
    estudiantes.cambiar_contrasenna_estudiante(req, res);
});
router.route('/agregar_horas')
    .post(function(req, res){
    estudiantes.agregarHoras(req, res);
});



module.exports = router;