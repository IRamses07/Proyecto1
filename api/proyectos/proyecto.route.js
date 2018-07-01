'use strict';

const express = require('express');
const router = express.Router();
const users = require('./proyecto.api');

router.route('/registrar_proyecto')
    .post(function (req, res) {
        proyecto.registrar(req, res);
    });

