'use strict';
const nodeMailer = require('nodemailer');
const clientModel = require('./client.model');

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
        foto: req.body.foto,
        estado: 1
    });

    nuevoCliente.save(function (error) {
        if (error) {
            res.json({
                succes: false,
                msj: 'El cliente no pudo ser registrado, ocurrió el siguiente error' + error
            });
        } else {
			
			    let mailOptions2 = {
                from: 'codeanalytics79@gmail.com',
                to: nuevoCliente.correo_electronico,
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
                            <h1 class='tituloPrincipal'>Bienvenido ${nuevoCliente.nombre}</h1>
                            <p>Usted ha sido registrado en la plataforma de Cenfotec Software House como ${nuevoCliente.rol}, para acceder le brindaremos su respectiva contraseña e identificación a continuación, esta contraseña es provisional por lo tanto deberá ser cambiada lo antes posible.</p>
                            <p>Identificación: ${nuevoCliente.cedula_juridica} </p>
                            <p>Contraseña: ${nuevoCliente.password}</p>
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
                    console.log('Email sent: ' + info.response+error);
                }
            });
			
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

module.exports.cambiarFoto = function (req, res) {
    clientModel.findOneAndUpdate(
        {
            cedula_juridica: req.body.cedula_juridica
        },
        {
            foto: req.body.foto
        }
    ).then(
        function (clientes) {
            res.send(clientes);
        });
};
module.exports.cambiar_contrasenna_cliente = function (req, res) {
    clientModel.findByIdAndUpdate(req.body._id, { $set: req.body },
        function (err) {
            if (err) {
                res.json({ success: false, msg: 'No se ha actualizado.' });

            } else {
                res.json({ success: true, msg: 'Se ha actualizado correctamente.' + res });
            }
        });
};
module.exports.actualizar = function (req, res) {
    clientModel.where({
        cedula_juridica: req.body.cedula_juridica
    }).update({ $set: req.body }).then(
        function (err, clientes) {
            if (err) {
                res.json({ success: false, msg: 'No se ha actualizado.' + JSON.stringify(err)});
            } else {
                res.json({ success: true, msg: 'Se ha actualizado correctamente.' + err });
            }
        }
    )
}
module.exports.buscar = function (req, res) {
    clientModel.find(
        req.query
    ).then(
        function (clientes) {
            res.send(clientes);
        });
};

module.exports.reset_client_password = function(req,res){
    clientModel.findById(req.body._id).then(function(client){

            let mailOptions = {
                from: 'codeanalytics79@gmail.com',
                to: client.correo_electronico,
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
                    <h1 class='tituloPrincipal'>Bienvenido ${client.nombre}</h1>
                    <p>Puedes restablecer tu contraseña de Cenfotec Software House haciendo clic en el enlace de abajo:</p>
                    <a href='http://localhost:3000/public/passwordRecovery.html?id=${client._id}'>Recuperación de la contraseña</a>
                    <p>Si no solicitaste restablecer tu contraseña, no dudes en eliminar este mensaje. </p>
                </body>
            </html>
                        `
            };

            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                } else {
                    console.log('Email sent: ' + info.response+error);
                }
            });

            res.json({ success: true, msg: 'El usuario se registró con éxito' });
    })
    
}