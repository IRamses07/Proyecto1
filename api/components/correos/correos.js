'use strict'
const nodeMailer = require('nodemailer');
const transporter = nodeMailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'codeanalytics79@gmail.com',
        pass: 'sincontrasenna'
    }
});
let mailOptions = {
    from: 'codeanalytics79@gmail.com',
    to: '',
    subject: '',
    html: ''
};

module.exports.envio=function(datos) {

    mailOptions.to = datos.to;
    mailOptions.subject = datos.subject;
    mailOptions.html =
        `<html>
            <head>
                ${datos.head}
            </head>
            <body>
                ${datos.body} 
            </body>
        </html>`;
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
};

// function envioEspecial(datos) {

//     let mailOptions = {
//         from: 'codeanalytics79@gmail.com',
//         to: datos.to,
//         subject: datos.subject,
//         html: `
//         <html>
//             <head>
//                 ${datos.head}
//             </head>
//             <body>
//                 ${datos.body} 
//             </body>
//         </html>
//         `
//     };
//     transporter.sendMail(mailOptions, function (error, info) {
//         if (error) {
//             console.log(error);
//         } else {
//             console.log('Email sent: ' + info.response);
//         }
//     });
// }