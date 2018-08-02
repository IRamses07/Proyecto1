'use strict';
const adminModel = require('./administrador.model');

//Función para registrar un usuario
module.exports.registrar = function (req, res) {
    //Crea una variable nuevoProfesor utilizando como plantilla el userModel
    let nuevoAdmin = new adminModel({
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
    });

    nuevoAdmin.save(function (error) {
        if (error) {
            res.json({ success: false, msg: 'No se pudo registrar el usuario, ocurrió el siguiente error' + error });
        } else {
            res.json({ success: true, msg: 'El usuario se registró con éxito'});
        }

    });

};

module.exports.getInfoAdmin = function (req, res) {
    adminModel.find().then(
        function (administrador) {
            res.send(administrador);
        });
};

module.exports.cambiar_contrasenna_admin = function(req, res){
    adminModel.findByIdAndUpdate(req.body._id, { $set: req.body }, 
        function(err) {
            if (err) {
                res.json({ success: false, msg: 'No se ha actualizado.'});
        
            } else {
            res.json({ success: true, msg: 'Se ha actualizado correctamente.' + res });
            }
      });
};