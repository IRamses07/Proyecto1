'use strict';
const nodeMailer = require('nodemailer');
const estudianteSchema = require('./estudiante.model');

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

module.exports.registrar = function (req, res) {
    let estudianteNuevo = new estudianteSchema({
        cedula: req.body.cedula,
        Nombre1: req.body.Nombre1,
        Nombre2: req.body.Nombre2,
        apellido1: req.body.apellido1,
        apellido2: req.body.apellido2,
        telefono: req.body.telefono,
        correo: req.body.correo,
        direccion: req.body.direccion,
        provincia: req.body.provincia,
        canton: req.body.canton,
        distrito: req.body.distrito,
        carrera: req.body.carrera,
        cursosAprobados: req.body.cursosAprobados,
        contNombre1: req.body.contNombre1,
        contNombre2: req.body.contNombre2,
        contApellido1: req.body.contApellido1,
        contApellido2: req.body.contApellido2,
        contTelefono: req.body.contTelefono,
        contCorreo: req.body.contCorreo,
        estado: req.body.estado,
        password: req.body.password,
        passwordChange: req.body.passwordChange,
        foto: req.body.foto,
        rol: req.body.rol
    });

    estudianteNuevo.save(function (error) {
        if (error) {
            res.json({ success: false, msg: 'No se pudo registrar el estudiante, ocurrió el siguiente error' + error });
        } else {
			let mailOptions2 = {
                from: 'codeanalytics79@gmail.com',
                to: estudianteNuevo.correo,
                subject: 'Bievenido a Cenfo App',
                html: `
                <html>
                <head>
                    <style>
                        .tituloPrincipal{
                            text-decoration: underline;                          
                        }
                    </style>
                </head>
                <body>
                    <h1 class='tituloPrincipal'>Bienvenido ${estudianteNuevo.Nombre1} ${estudianteNuevo.apellido1}</h1>
                    <p>Usted ha sido registrado en la plataforma de Cenfotec Software House como ${estudianteNuevo.rol}, 
                    para acceder le brindaremos su respectiva contraseña e identificación a continuación, esta contraseña es 
                    provisional por lo tanto deberá ser cambiada lo antes posible.</p>
                    <p>Identificación: ${estudianteNuevo.cedula}</p>
                    <p>Contraseña: ${estudianteNuevo.password}</p>
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
            res.json({ success: true, msg: 'El estudiante se registró con éxito' });
        }

    });
};

module.exports.listar = function (req, res) {
    estudianteSchema.find().sort({ Nombre1: 'asc' }).then(
        function (estudiantes) {
            res.send(estudiantes);
        });
};

module.exports.filtrarNombre = function (req, res) {
    estudianteSchema.find({ 'Nombre1': req.query.Nombre1 }).then(
        function (estudiantes) {
            res.send(estudiantes);
        });
};

module.exports.getInfoEstudiante = function (req, res) {
    estudianteSchema.find({ 'cedula': req.query.cedula }).then(
        function (estudiantes) {
            res.send(estudiantes);
        });
};

module.exports.cambiarFoto = function (req, res) {
    estudianteSchema.findOneAndUpdate(
        {
            cedula: req.body.cedula
        },
        {
            foto: req.body.foto
        }
    ).then(
        function (estudiantes) {
            res.send(estudiantes);
        });
};

module.exports.asignar_proyecto = function (req, res) {
    estudianteSchema.update({
        _id: req.body._id
    }, {
            $push: {
                'proyectos': {
                    id: req.body.id,
                    nombre_proyecto: req.body.nombre_proyecto,
                    fecha_Entrega: req.body.fecha_Entrega,
                    estado_proyecto: req.body.estado_proyecto,
                }
            }
        },
        function (error) {
            if (error) {
                res.json({
                    success: false,
                    msg: 'No se pudo asignar el proyecto, ocurrió el siguiente error' + error
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


module.exports.cambiarEstado = function (req, res) {
    estudianteSchema.findOneAndUpdate(
        {
            cedula: req.body.cedula
        },
        {
            estado: req.body.estado
        }
    ).then(
        function (estudiantes) {
            res.send(estudiantes);
        });
};

module.exports.actualizar = function (req, res) {
    estudianteSchema.findByIdAndUpdate(req.body._id, { $set: req.body },
        function (err, estudiante) {        //revisar estudiante entrante
            if (err) {
                res.json({ success: false, msg: 'No se ha actualizado.' + handleError(err) });

            } else {
                res.json({ success: true, msg: 'Se ha actualizado correctamente.' + res });
            }
        });
};

module.exports.cambiar_contrasenna_estudiante = function (req, res) {
    estudianteSchema.findByIdAndUpdate(req.body._id, { $set: req.body },
        function (err) {
            if (err) {
                res.json({ success: false, msg: 'No se ha actualizado.' });

            } else {
                res.json({ success: true, msg: 'Se ha actualizado correctamente.' + res });
            }
        });
};


// module.exports.agregarHoras = function (req, res) {
//     estudianteSchema.where({
//         _id: req.body._id,
//         horas: [{
//             _id: req.body.id
//         }]
//     }).insertOne()({

//     }).then(
//         function (err, user) {
//             if (err) {
//                 res.json({ success: false, msg: 'No se actualizo'+ err });
//       console.log(err.toString());

//             } else {
//                 res.json({ success: true, msg: 'Se ha actualizado correctamente.' + res });
//             }
//         });
// };

module.exports.agregarHoras = function (req, res) {
    estudianteSchema.update({
        _id: req.body._id
    }, {
            $push: {
                'horas': {
                    id: req.body.id,
                    tiempo: req.body.horas,
                    fecha: req.body.fecha

                }
            }
        },
        function (error) {
            if (error) {
                res.json({
                    success: false,
                    msg: 'No se pudo asignar el proyecto, ocurrió el siguiente error' + error
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

module.exports.reset_student_password = function (req, res) {
    estudianteSchema.findById(req.body._id).then(function (student) {

        let mailOptions = {
            from: 'codeanalytics79@gmail.com',
            to: student.correo,
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
                    <h1 class='tituloPrincipal'>Bienvenido ${student.Nombre1} ${student.apellido1}</h1>
                    <p>Puedes restablecer tu contraseña de Cenfotec Software House haciendo clic en el enlace de abajo:</p>
                    <a href='http://localhost:3000/public/passwordRecovery.html?id=${student._id}'>Recuperación de la contraseña</a>
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


module.exports.asignar_ticket_e = function (req, res) {
    estudianteSchema.update({
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
