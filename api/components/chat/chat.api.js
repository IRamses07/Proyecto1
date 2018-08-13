'use strict';
const chatSchema = require('./chat.model');

module.exports.registrar = function (req, res) {
    console.log(req.query);
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

