'use strict';
const notificacionModel = require('./notificacion.model');

module.exports.registrar = function(req, res) {
    let nuevaNotificacion = new notificacionModel({
        emisor: {
            id: _id,
            rol: '',
        },
        receptor: {
            id: _id,
            rol: '',
        },
        tipo: 'ticket' || 'proyecto' || 'mensaje',
        referecia: ''
    });

    nuevaNotificacion.save(function (error) {
        if (error) {
            res.jason({ success: false, msg: 'La notificación no se pudo registrar, debido al error' + error}); 
        }else{
            res.jason({ success: true, msg: 'La notificación se envió con éxito'});
        }
    })
};

// module.exports.listarNotificaciones = function(req, res){
//     notificacionModel.find().then(
//         function(notificacion){
//             res.send(ticket);
//         });
// };