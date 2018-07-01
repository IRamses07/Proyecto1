'use strict';

const proyectoModel = require('./proyecto.model');

module.exports.registrar = function (req, res) {

    let nuevoProyecto = new proyectoModel({

        nombre_completo: req.body.nombre_completo,
        nombre_cliente: req.body.nombre_cliente,
        identificacion_juridica: req.body.identificacion_juridica,
        estado_proyecto: req.body.estado_proyecto,
        fecha_Entrega: req.body.fecha_Entrega,
        descripcion: req.body.descripcion

    });

    nuevoProyecto.save(function (error) {

        if (error) {

            res.json({ success: false, msg: 'No se pudo registrar el usuario, ocurrió el siguiente error' + error });

        } else {

            res.json({ success: true, msg: 'El usuario se registró con éxito' });
            
        }

    });

}