'use strict';
let mongoose = require('mongoose');
let notificiaconSchema = new mongoose.Schema({
    emisor: {
        id: {type: String, required: true},
        rol: {type: String, required: true}
    },
    receptor: {
        id: {type: String, required: true},
        rol: {type: String, required: true}
    },
    tipo: {type: String, required: true},
    referecia: {type: String, required: true}
});

module.exports = mongoose.model('Notificacion',notificiaconSchema );
