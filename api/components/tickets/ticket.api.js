'use strict';
const ticketModel = require('./ticket.model');

module.exports.registrar = function (req, res) {
    let nuevoTicket = new ticketModel({
        nombre_cliente : req.body.nombre_cliente,
        urgencia : req.body.urgencia,
        proyecto : req.body.proyecto,
        imagen_error : req.body. imgUrl,
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

module.exports.listarTicketAdmin = function(req, res){
    ticketModel.find().then(
        function(ticket){
            res.send(ticket);
        });
};