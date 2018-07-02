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
        lugarTrabajo:'',
        annosExperiencia:'',
        cursosImpartidos: [],
        informacionAcademica: []
    });

    nuevoProfesor.save(function (error) {
        if (error) {
            res.json({ success: false, msg: 'No se pudo registrar el usuario, ocurrió el siguiente error' + error });
        } else {
            res.json({ success: true, msg: 'El usuario se registró con éxito' });
        }

    });

};

module.exports.listar = function (req, res) {
    profesorModel.find().then(
        function (profesores) {
            res.send(profesores);
        });
};