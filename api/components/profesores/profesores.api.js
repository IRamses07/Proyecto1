'use strict';
const nodeMailer = require('nodemailer');
const profesorModel = require('./profesores.model');
/*const smtp = require('nodemailer-smtp-transport');*/

const transporter = nodeMailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'codeanalytics79@gmail.com',
        pass: 'sincontrasenna'
    },
    tls: {
        rejectUnauthorized: false
    }
});

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
        experiencia_docente: req.body.experiencia_docente,
        cursos_impartidos: req.body.cursos_impartidos,
        foto: req.body.foto,
        estado: req.body.estado

    });

    nuevoProfesor.save(function (error) {
        if (error) {
            res.json({
                success: false,
                msg: 'No se pudo registrar el usuario, ocurrió el siguiente error' + error
            });
        } else {

            let mailOptions2 = {
                from: 'codeanalytics79@gmail.com',
                to: nuevoProfesor.correo,
                subject: 'Bievenido a Cenfo App',
                html: 
                        `
                <html>
                <head>
                    <style>
                        .tituloPrincipal{
                            text-decoration: underline;                          
                        }
                    </style>
                </head>
                <body>
                    <h1 class='tituloPrincipal'>Bienvenido ${nuevoProfesor.nombre1} ${nuevoProfesor.apellido1}</h1>
                    <p>Usted ha sido registrado en la plataforma de Cenfotec Software House como ${nuevoProfesor.rol}, 
                    para acceder le brindaremos su respectiva contraseña e identificación a continuación, esta contraseña es 
                    provisional por lo tanto deberá ser cambiada lo antes posible.</p>
                    <p>Identificación: ${nuevoProfesor.cedula}</p>
                    <p>Contraseña: ${nuevoProfesor.password}</p>
                    <p>Saludos cordiales.</p>
                    <p>Cenfotec Software House</p>
                </body>
            </html>
                        `
            };


            transporter.sendMail(mailOptions2, function (error, info) {
                if (error) {
                    console.log(error);
                } else {
                    console.log('Email sent: ' + info.response);
                }
            });
            res.json({ success: true, msg: 'El usuario se registró con éxitooo' });
        }
    });

};

module.exports.listar = function (req, res) {
    profesorModel.find().then(
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

module.exports.agregar_preparacion_academica = function (req, res) {

    profesorModel.update({ _id: req.body._id },
        {
            $push:
            {
                'preparacion_academica':
                {
                    grado_academico: req.body.grado_academico,
                    titulo_fecha: req.body.titulo_fecha,
                    carrera: req.body.carrera
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

module.exports.agregar_cursos_impartidos = function (req, res) {
    profesorModel.findByIdAndUpdate(req.body._id, { $set: req.body },
        function (err) {
            if (err) {
                res.json({ success: false, msg: 'No se ha actualizado.' + handleError(err) });

            } else {
                res.json({ success: true, msg: 'Se ha actualizado correctamente.' + res });
            }
        });
};

module.exports.agregar_info_extra_profesor = function (req, res) {
    profesorModel.findByIdAndUpdate(req.body._id, { $set: req.body },
        function (err) {
            if (err) {
                res.json({ success: false, msg: 'No se ha actualizado.' + handleError(err) });

            } else {
                res.json({ success: true, msg: 'Se ha actualizado correctamente.' + res });
            }
        });
};

module.exports.cambiar_foto_profesores = function (req, res) {
    console.log('aqui esta2');

    profesorModel.findOneAndUpdate(
        {
            cedula: req.body.cedula
        },
        {
            foto: req.body.foto
        }
    ).then(
        function (profe) {
            res.send(profe);
        });
};

module.exports.cambiar_contrasenna_profesor = function (req, res) {
    profesorModel.findByIdAndUpdate(req.body._id, { $set: req.body },
        function (err) {
            if (err) {
                res.json({ success: false, msg: 'No se ha actualizado.' });

            } else {
                res.json({ success: true, msg: 'Se ha actualizado correctamente.' + res });
            }
        });
};

module.exports.getProfessorById = function (req, res) {
    profesorModel.find({
        '_id': req.query._id
    }).then(
        function (profesores) {
            res.send(profesores);
        });
};

module.exports.actualizar_profesor = function (req, res) {
    profesorModel.findByIdAndUpdate(req.body._id, { $set: req.body },
        function (err, profe) {
            if (err) {
                res.json({ success: false, msg: 'No se ha actualizado.' + handleError(err) });

            } else {
                res.json({ success: true, msg: 'Se ha actualizado correctamente.' + res });
            }
        });
};

module.exports.cambiar_estado_profesor = function (req, res) {
    profesorModel.findByIdAndUpdate(req.body._id, { $set: req.body },
        function (err, profe) {
            if (err) {
                res.json({ success: false, msg: 'No se ha actualizado.' + handleError(err) });

            } else {
                res.json({ success: true, msg: 'Se ha actualizado correctamente.' + res });
            }
        });
};


module.exports.reset_professor_password = function (req, res) {
    profesorModel.findById(req.body._id).then(function (profe) {

        let mailOptions = {
            from: 'codeanalytics79@gmail.com',
            to: profe.correo,
            subject: 'Bievenido a Cenfo App',
            html: `
                <html>
                <head>
                    <style>
                        .tituloPrincipal{
                            background: #6c5ce7;
                        }
                    </style>
                </head>
                <body>
                    <h1 class='tituloPrincipal'>Bienvenido ${profe.nombre1} ${profe.apellido1}</h1>
                    <p>Puedes restablecer tu contraseña de Cenfotec Software House haciendo clic en el enlace de abajo:</p>
                    <a href='http://localhost:3000/public/passwordRecovery.html?id=${profe._id}'>Recuperación de la contraseña</a>
                    <p>Si no solicitaste restablecer tu contraseña, no dudes en eliminar este mensaje. </p>
                </body>
            </html>
                        `
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });

        res.json({ success: true, msg: 'El usuario se registró con éxito' });
    })

}

module.exports.asignar_ticket_p = function (req, res) {

    profesorModel.update({
        _id: req.body._id
    }, {
            $push: {
                'tickets': {
                    id: req.body.id,
                    codigo: req.body.codigo,
                    cliente: req.body. nombre_cliente,
                    proyecto: req.body.proyecto,
                    urgencia: req.body.urgencia,
                    tick_referencia: req.body.referencia_ticket,
                    estado_ticket: req.body.estado,
                    imagen_error: req.body.imagen_error,
                    descripcion: req.body.descripcion 
                }
            
            }
        },
        function (error) {
            if (error) {
                res.json({
                    success: false,
                    msg: 'No se pudo asignar el ticket, ocurrió el siguiente error' + error
                });
            } else {
                res.json({
                    success: true,
                    msg: 'El tiket se asignó con éxito'
                });
            }
        }
    )
};

