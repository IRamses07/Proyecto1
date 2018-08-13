'use strict';
const express = require('express');
const router = express.Router();
const chat = require('./chat.api');

router.route('/crear_chat')
    .post(function(req, res){
    chat.registrar(req, res);
});

module.exports = router;

