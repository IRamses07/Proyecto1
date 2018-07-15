'use strict';
const profesorModel = require('./profesores.model');

//Función para registrar un usuario
module.exports.registrar = function (req, res) {
    //Crea una variable nuevoProfesor utilizando como plantilla el userModel
    let nuevoProfesor = new profesorModel({
        nombre1: req.body.nombre1,
        nombre2: req.body.nombre2,
        apellido1: req.body.apellido1,
        apellido2: req.body.apellido2,
        cedula: req.body.cedula,
        correo: req.body.correo,
        telefono: req.body.telefono,
        profesion: req.body.profesion,
        rol: req.body.rol,
        password: req.body.password,
        passwordChange: req.body.passwordChange,
        lugarTrabajo: '',
        annosExperiencia: '',
        cursosImpartidos: [],
        informacionAcademica: [],
        foto : req.body.foto
    });

    nuevoProfesor.save(function (error) {
        if (error) {
            res.json({
                success: false,
                msg: 'No se pudo registrar el usuario, ocurrió el siguiente error' + error
            });
        } else {
            res.json({
                success: true,
                msg: 'El usuario se registró con éxito'
            });
        }

    });

};

module.exports.listar = function (req, res) {
    profesorModel.find().then(
        function (profesores) {
            res.send(profesores);
        });
};

module.exports.getInfoProfesor = function (req, res) {
    profesorModel.find({
        'cedula': req.query.cedula
    }).then(
        function (profesores) {
            res.send(profesores);
        });
};

module.exports.asignar_proyecto = function (req, res) {

    profesorModel.update({
            _id: req.body._id
        }, {
            $push: {
                'proyecto': {

                    id: req.body.id,
                    rol: req.body.rol,
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

/*module.exports.actualizar_usuario = function(req, res){
    userModel.findByIdAndUpdate(req.body._id, { $set: req.body }, 
        function(err) {
            if (err) {
                res.json({ success: false, msg: 'No se ha actualizado.' + handleError(err) });
        
            } else {
            res.json({ success: true, msg: 'Se ha actualizado correctamente.' + res });
            }
      });
};*/

module.exports.cambiarFoto = function(req, res){

    profesorModel.findOneAndUpdate(
        {
            cedula: req.body.cedula
        },
        {  
            foto: req.body.foto
        }
        ).then(
        function(profesores){
            res.send(profesores);
    });
};