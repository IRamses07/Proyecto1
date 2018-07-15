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
        trabajo_anterior: req.body.trabajo_anterior,
        experiencia_docente: req.body.experinecia_docente,
        cursos_aprobados: req.body.cursos_aprobados
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

/*module.exports.getInfoProfesor = function (req, res) {
    profesorModel.find({
        'cedula': req.query.cedula
    }).then(
        function (profesores) {
            res.send(profesores);
        });
};*/

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

module.exports.agregar_preparacion_academica = function(req, res){
    
    profesorModel.update({_id: req.body._id}, 
        {$push: 
            {'preparacion_academica':
                {
                    grado_academico: req.body.grado_academico,
                    titulo_fecha: req.body.titulo_fecha,
                    carrera: req.body.carrera
                }
            }
        },
        function(error){
            if(error){
                res.json({success : false, msg : 'No se pudo registrar el título, ocurrió el siguiente error' + error});
            }else{
                res.json({success : true, msg : 'El título se registró con éxito'});
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

/*module.exports.agregar_info_profesor = function(req, res){
    
    profesorModel.update({_id: req.body._id}, 
        {$push: 
            {'preparacion_academica':
                {
                    trabajo: req.body.trabajo,
                    anno: req.body.anno,
                    cursos: req.body.cursos,
                    grado: req.body.grado,
                    titulo: req.body.titulo,
                    carrera: req.body.carrera
                }
            }
        },
        function(error){
            if(error){
                res.json({success : false, msg : 'No se pudo registrar el título, ocurrió el siguiente error' + error});
            }else{
                res.json({success : true, msg : 'El título se registró con éxito'});
            }
        }
    )
};*/
