'use strict';

const express = require('express');
const router = express.Router();
const clients = require('./client.api');

router.route('/registrar_cliente')
.post(function(req,res){
    clients.registrar(req,res);
});
router.route('/listar_clientes')
.get(function(req,res){
    clients.listar(req,res);
});
module.exports = router;