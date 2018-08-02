'use strict';

const express = require('express');
const router = express.Router();
const clients = require('./client.api');

router.route('/registro_cliente')
.post(function(req,res){
    clients.registrar(req,res);
});
router.route('/listar_clientes')
.get(function(req,res){
    clients.listar(req,res);
});

router.route('/getinfo_clientes')
    .get(function(req, res){
    clients.getInfoCliente(req, res);
});

router.route('/asignar_proyecto_c')
.post(function(req,res){
    clients.asignar_proyecto(req,res);
});

router.route('/cambiarfoto_clientes')
    .put(function(req, res){
    clients.cambiarFoto(req, res);
});

router.route('/cambiar_contrasenna_cliente')
    .post(function(req, res){
    clients.cambiar_contrasenna_cliente(req, res);
});

module.exports = router;