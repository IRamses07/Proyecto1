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
        passwordChange: req.body.passwordChange
    });

    nuevoCliente.save(function (error) {
        if (error) {
            res.json({ succes: false, msj: 'El cliente no pudo ser registrado, ocurrió el siguiente error' + error });
        } else {
            res.json({ succes: true, msj: 'El cliente fue registrado con éxito' });
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
    module.exports.agregar_titulo = function (req, res) {

        userModel.update(
            { _id: req.body._id },
            {
                $push:
                {
                    'proyectos':
                    {
                        titulo: req.body.titulo,
                        institucion: req.body.institucion,
                        anno: req.body.anno
                    }
                }
            },
            function (error) {
                if (error) {
                    res.json({ success: false, msg: 'No se pudo registrar el título, ocurrió el siguiente error' + error });
                } else {
                    res.json({ success: true, msg: 'El título se registró con éxito' });
                }
            }
        )
    };
}

