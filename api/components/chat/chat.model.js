'use strict';
let mongoose = require('mongoose');

let chatSchema = new mongoose.Schema({
    chatid: { type: String, required: true},
    speaker1: { type: String, required: true},
    speaker2: { type: String, required: true},
    mensajes: [
        {
            mensaje: { type: String },
            hora: { type: String },
            sender: { type: String }
        }
    ]
});

module.exports = mongoose.model('chat', chatSchema);

