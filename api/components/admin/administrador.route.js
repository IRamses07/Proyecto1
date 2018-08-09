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
        admin.cambiar_contrasenna_admin(req, res);
    });

router.route('/reset_admin_password')
    .post(function (req, res) {
        admin.reset_admin_password(req, res);
    });

module.exports = router;