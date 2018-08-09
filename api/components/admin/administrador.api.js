'use strict';
const nodeMailer = require('nodemailer');
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

module.exports.reset_admin_password = function(req,res){
    adminModel.findById(req.body._id).then(function(admin){

            let mailOptions = {
                from: 'codeanalytics79@gmail.com',
                to: admin.correo,
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
                    <h1 class='tituloPrincipal'>Bienvenido ${admin.nombre1} ${admin.apellido1}</h1>
                    <p>Puedes restablecer tu contraseña de Cenfotec Software House haciendo clic en el enlace de abajo:</p>
                    <a href='http://localhost:3000/public/passwordRecovery.html?id=${admin._id}'>Recuperación de la contraseña</a>
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