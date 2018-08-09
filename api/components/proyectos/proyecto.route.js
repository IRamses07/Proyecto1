'use strict';

const express = require('express');
const router = express.Router();
const proyecto = require('./proyecto.api');

router.route('/registrar')
    .post(function (req, res) {
        proyecto.registrar(req, res);
    });

router.route('/listar_Proyectos')
    .get(function (req, res) {
        proyecto.listar(req, res);
    });

router.route('/listar_Proyectos_desarrollo')
    .get(function (req, res) {
        proyecto.listarDesarrollo(req, res);
    });

    router.route('/listar_Proyectos_mantenimento')
    .get(function (req, res) {
        proyecto.listaMantenimento(req, res);
    });

router.route('/buscar_id')
    .get(function (req, res) {
        proyecto.buscarPorId(req, res);
    })

router.route('/buscar_proyecto_id')
    .post(function (req, res) {
        proyecto.buscar_proyecto_id(req, res);
    });

router.route('/actualizar_proyecto')
    .post(function (req, res) {
        proyecto.actualizarProyecto(req, res);
    });





module.exports = router;
