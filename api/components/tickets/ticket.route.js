'use strict';
const express = require('express');
const router = express.Router();
const tickets = require('./ticket.api');

router.route('/registrar_ticket')
.post(function(req,res){
    tickets.registrar(req,res);
});

router.route('/listar_tickets')
.get(function(req,res){
    tickets.listarTicketAdmin(req,res);
})
module.exports = router;