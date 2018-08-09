'use strict';

const proyectoModel = require('./proyecto.model');

module.exports.registrar = function (req, res) {

    let nuevoProyecto = new proyectoModel({

        nombre_proyecto: req.body.nombre_proyecto,
        nombre_cliente: req.body.nombre_cliente,
        identificacion_juridica: req.body.identificacion_juridica,
        estado_proyecto: req.body.estado_proyecto,
        fecha_Entrega: req.body.fecha_Entrega,
        descripcion: req.body.descripcion,
        tecnologia_wed: req.body.tecnologia_wed,
        tecnologia_movil: req.body.tecnologia_movil,
        tecnologia_bd: req.body.tecnologia_bd


    });

    nuevoProyecto.save(function (error) {

        if (error) {

            res.json({ success: false, msg: 'No se pudo registrar el usuario, ocurrió el siguiente error' + error });

        } else {

            res.json({ success: true, msg: 'El usuario se registró con éxito' });
            
        }

    });

}

module.exports.listar = function(req, res){
    proyectoModel.find().then(
        function(proyecto){
            res.send(proyecto);
        });
};

module.exports.buscarPorId = function(req, res){
    proyectoModel.find({_id:req.body._id}).then(
        function(proyecto){
            res.send(proyecto);
        })
};


module.exports.listarDesarrollo = function(req, res){
    proyectoModel.find({estado_proyecto :"desarrollo"}).then(
        function(proyecto){
            res.send(proyecto);
        });
};


module.exports.buscar_proyecto_id = function (req, res) {
    proyectoModel.findById({ _id: req.body.id }).then(
        function (proyecto) {
            res.send(proyecto);
        });
};


module.exports.actualizarProyecto = function (req, res) {
    proyectoModel.findByIdAndUpdate(req.body._id, { $set: req.body },
        function (err, user) {
            if (err) {
                res.json({ success: false, msg: 'No se ha actualizado.' + handleError(err) });

            } else {
                res.json({ success: true, msg: 'Se ha actualizado correctamente.' + res });
            }
        });
};

module.exports.listaMantenimento = function(req, res){
    proyectoModel.find({estado_proyecto :"mantenimento"}).then(
        function(proyecto){
            res.send(proyecto);
        });
};




