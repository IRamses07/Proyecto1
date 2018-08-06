'use strict';
const ticketModel = require('./ticket.model');

module.exports.registrar = function (req, res) {
    let nuevoTicket = new ticketModel({
        nombre_cliente : req.body.nombre_cliente,
        urgencia : req.body.urgencia,
        proyecto : req.body.proyecto,
        imagen_error : req.body. imagen_error,
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

module.exports.mostrarDatosTicketSlt = function(req, res){
    ticketModel.find({
        '_id':req.query._id
    }).then(
        function(ticket){
            res.send(ticket);
        });
};

module.exports.buscarTicketModificar = function(req, res){
    ticketModel.findById({
        _id : req.body._id
    }).then(
        function(ticket){
            res.send(ticket);
        });
};


module.exports.modificarTicket = function(req, res){
    ticketModel.findByIdAndUpdate(req.body._id, {$set: req.body},
        function(error, ticket){
            if (error) {
                res.json({ success: false, msg: 'No se pudo modificar el usuario, ocurrió el siguiente error' + handleError(error) });
            } else {
                res.json({ success: true, msg: 'El usuario se modificó con éxito' + res });
            }
        });
};
