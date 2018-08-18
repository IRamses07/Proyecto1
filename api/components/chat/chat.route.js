'use strict';
const express = require('express');
const router = express.Router();
const chat = require('./chat.api');

router.route('/crear_chat')
    .post(function(req, res){
        console.log('llega al route');
    chat.registrar(req, res);
});

router.route('/listar_Chats')
    .get(function (req, res) {
        chat.listar(req, res);
    });

router.route('/agregar_mensaje')
    .post(function (req, res) {
        chat.agregarMensaje(req, res);
    });

router.route('/getInfo_chat')
    .get(function (req, res) {
        chat.getInfoChat(req, res);
    });

module.exports = router;