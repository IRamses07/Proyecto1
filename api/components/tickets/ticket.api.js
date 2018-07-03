'use strict';
const ticketModel = require('./ticket.model');

module.exports.registrar = function (req, res) {
    let nuevoTicket = new ticketModel({
        nombre_cliente : req.body.nombre_cliente,
        urgencia : req.body.urgencia,
        proyecto : req.body.proyecto,
        pantallazo_error : req.body.pantallazo_error,
        referencia_ticket : req.body.referencia_ticket,
        descripcion : req.body.descripcion
    });

    nuevoTicket.save(function (error) {
        if (error) {
            res.json({ success: false, msg: 'No se pudo registrar el usuario, ocurrió el siguiente error' + error });
        } else {
            res.json({ success: true, msg: 'El usuario se registró con éxito' });
        }
    })
};