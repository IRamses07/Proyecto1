'use strict';
const express = require('express');
const router = express.Router();
const admin = require('./administrador.api');


router.route('/registrar_admin')
    .post(function (req, res) {
        admin.registrar(req, res);
    });

router.route('/get_info_admin')
    .get(function (req, res) {
        admin.getInfoAdmin(req, res);
    });

module.exports = router;