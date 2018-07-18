'use strict';
const express = require('express');
const router = express.Router();
const tickets = require('./notificaciones.api');

    router.route('registrar_notificacion')
    .post(function(req,res){
        notificacion.registrar(req,res);
    });

    router.route('/listar_notificaciones')
    .get(function(req,res){
        notificacion.listarNotificaciones(req,res);
    })
    module.exports = router;