'use strict';

const express = require('express');
const router = express.Router();
const proyecto = require('./proyecto.api');

router.route('/registrar')
    .post(function (req, res) {
        proyecto.registrar(req, res);
    });

    module.exports = router;
