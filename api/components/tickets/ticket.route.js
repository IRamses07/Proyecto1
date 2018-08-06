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
});

router.route('/mostrar_ticket')
.get(function(req,res){
    tickets.mostrarDatosTicketSlt(req,res);
});

router.route('/buscar_id_modificar_ticket')
.post(function(req,res){
    tickets.buscarTicketModificar(req,res);
});

router.route('/modificar_ticket')
.post(function(req,res){
    tickets.modificarTicket(req,res);
});


module.exports = router;