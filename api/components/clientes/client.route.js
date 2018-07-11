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

router.route('/asignar_proyecto')
.post(function(req,res){
    clients.asignar_proyecto(req,res);
});
module.exports = router;