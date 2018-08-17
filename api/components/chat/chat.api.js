'use strict';
const chatSchema = require('./chat.model');

module.exports.registrar = function (req, res) {
    console.log('llega al body');
    console.log(req.body);
    let chatNuevo = new chatSchema({
        chatid: req.body.chatid,
        speaker1: req.body.speaker1,
        speaker2: req.body.speaker2
    });

    chatNuevo.save(function (error) {
        if (error) {
            res.json({ success: false, msg: 'No se pudo registrar el chat, ocurrió el siguiente error' + error });
        } else {
            res.json({ success: true, msg: 'El chat se registró con éxito' });
        }
    });
};

module.exports.getInfoChat = function (req, res) {
    chatSchema.find({ 'chatid': req.query.chatid }).then(
        function (chats) {
            res.send(chats);
        });
};

module.exports.listar = function (req, res) {
    chatSchema.find().sort({ 'chatid': 'asc' }).then(
        function (chats) {
            res.send(chats);
        });
};

module.exports.agregarMensaje = function (req, res) {
    console.log('llega al api');
    chatSchema.update({
        chatid: req.body.chatid
    }, {
            $push: {
                'mensajes': {
                    mensaje: req.body.mensaje,
                    hora: req.body.hora,
                    sender: req.body.sender

                }
            }
        },
        function (error) {
            if (error) {
                res.json({
                    success: false,
                    msg: 'No se pudo asignar el proyecto, ocurrió el siguiente error' + error
                });
            } else {
                res.json({
                    success: true,
                    msg: 'El Proyecto se asignó con éxito'
                });
            }
        }
    )
};