'use strict';

const clientModel = require('./client.model');

module.exports.registrar = function (req, res) {

    let nuevoCliente = new clientModel({
        rol: req.body.rol,
        cedula_juridica: req.body.cedula_juridica,
        nombre: req.body.nombre,
        provincia: req.body.provincia,
        canton: req.body.canton,
        distrito: req.body.distrito,
        direccion_exacta: req.body.direccion_exacta,
        primer_nombre: req.body.primer_nombre,
        segundo_nombre: req.body.segundo_nombre,
        primer_apellido: req.body.primer_apellido,
        segundo_apellido: req.body.segundo_apellido,
        telefono: req.body.telefono,
        correo_electronico: req.body.correo_electronico,
        ubicacion: req.body.ubicacion,
        password: req.body.password,
        passwordChange: req.body.passwordChange,
        foto : req.body.foto
    });
    nuevoCliente.save(function (error) {
        if (error) {
            res.json({
                succes: false,
                msj: 'El cliente no pudo ser registrado, ocurrió el siguiente error' + error
            });
        } else {
            res.json({
                succes: true,
                msj: 'El cliente fue registrado con éxito'
            });
        }
    });
};

module.exports.listar = function (req, res) {
    clientModel.find().then(
        function (clientes) {
            res.send(clientes);
        });
};
module.exports.asignar_proyecto = function (req, res) {

    clientModel.update({
            _id: req.body._id
        }, {
            $push: {
                'proyectos': {
                    id: req.body.id,
                    nombre_proyecto: req.body.nombre_proyecto,
                    fecha_Entrega: req.body.fecha_Entrega,
                    estado_proyecto: req.body.estado_proyecto
                }
            }
        },
        function (error) {
            if (error) {
                res.json({
                    success: false,
                    msg: 'No se pudo Signar el proyecto, ocurrió el siguiente error' + error
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

module.exports.getInfoCliente = function (req, res) {
    clientModel.find({
        'cedula_juridica': req.query.cedula_juridica
    }).then(
        function (clientes) {
            res.send(clientes);
        });
};

module.exports.cambiarFoto = function(req, res){
    clientModel.findOneAndUpdate(
        {
            cedula_juridica: req.body.cedula_juridica
        },
        {  
            foto: req.body.foto
        }
        ).then(
        function(clientes){
            res.send(clientes);
    });
};

module.exports.cambiar_contrasenna_cliente = function(req, res){
    clientModel.findByIdAndUpdate(req.body._id, { $set: req.body }, 
        function(err) {
            if (err) {
                res.json({ success: false, msg: 'No se ha actualizado.'});
        
            } else {
            res.json({ success: true, msg: 'Se ha actualizado correctamente.' + res });
            }
      });
};