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

router.route('/cambiar_contrasenna_admin')
    .post(function (req, res) {
        admin.cambiar_contrasenna(req, res);
    });

module.exports = router;