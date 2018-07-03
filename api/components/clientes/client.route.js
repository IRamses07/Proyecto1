'use strict';

const express = require('express');
const router = express.Router();
const clients = require('./users/clients.api');

router.route('/registrar_cliente')
.post(function(req,res){
    clients.registrar(req,res);
});

module.exports = router;