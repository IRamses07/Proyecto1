'use strict';
const estudianteSchema = require('./estudiante.model');

module.exports.registrar = function(req, res){
    console.log(req.body);
    let estudianteNuevo = new estudianteSchema({
        cedula : req.body.cedula,
        Nombre1 : req.body.Nombre1,
        Nombre2 : req.body.Nombre2,
        apellido1 : req.body.apellido1,
        apellido2 : req.body.apellido2,
        telefono : req.body.apellido2,
        correo : req.body.correo,
        direccion : req.body.direccion,
        provincia : req.body.provincia,
        canton : req.body.canton,
        distrito : req.body.distrito,
        carrera : req.body.carrera,
        cursosAprobados: req.body.cursosAprobados,
        contNombre1 : req.body.contNombre1,
        contNombre2 : req.body.contNombre2,
        contApellido1 : req.body.contApellido1,
        contApellido2 : req.body.contApellido2,
        contTelefono : req.body.contTelefono,
        contCorreo : req.body.contCorreo
    });

    estudianteNuevo.save(function(error){
        if(error){
            res.json({success : false, msg : 'No se pudo registrar el estudiante, ocurrió el siguiente error' + error});
        }else{
            res.json({success : true, msg : 'El estudiante se registró con éxito'});
        }

    });
    
};

module.exports.listar = function(req, res){
    estudianteSchema.find().then(
        function(estudiantes){
            res.send(estudiantes);
        });
};