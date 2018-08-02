'use strict';
/**
 * Exportamos todas las dependencias necesarias para establecer la conexión
 */
const express = require('express'),
      app = express(),
      path = require('path'),
      bodyParser = require('body-parser'),
      morgan =  require('morgan'),
      mongoose = require('mongoose');
/**
 * Se definen las variables necesarias para la conexión con MongoDB
 */
let db = mongoose.connection,

    dburl = 'mongodb://koffee:abc123@ds163330.mlab.com:63330/db_koffee_developers',


    port = 4000;

/**
 * Se le indica que cree un servidor extra dentro del puerto 4000 y escuche los cambios que se le hagan a esos archivos
 */
let server = app.listen(port,_server());
/**
 * Se define la conexión con Mongoose, enviándole como parámetro la url de la base de datos
 */
mongoose.connect(dburl);
/**
 * Si la conexión falla, imprime en consola el error
 */
db.on('error', console.error.bind(console, 'Error de conexión: '));

/**
 * Si la conexión es exitosa nos imprime en la consola que se ha establecido conexión con Mongo
 */
db.once('open', function () {
  console.log('Base de datos conectada correctamente');
});
/**
 * Le indicamos a express que envíe las respuestas a la carpeta "public"
 */
app.use(express.static(path.join(__dirname, 'public')));

/**
 * Le indicamos a la aplicación que el formato de los datos va a ser JSON
 */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(morgan('dev'));

app.use( function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, X-Response-Time, X-PINGOTHER, X-CSRF-Token,Authorization');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});
/**
 * Exportams todas las rutas dentro del index.js
 */
const profesores = require('./components/profesores/profesores.route');

const clientes= require('./components/clientes/client.route')
const proyectos = require('./components/proyectos/proyecto.route');

const estudiantes = require('./components/estudiantes/estudiante.route');

const tickets = require('./components/tickets/ticket.route');
const administrador = require('./components/admin/administrador.route');
/**
 * Le indicamos que le de acceso externo a las rutas inicializadas
 */
app.use('/api', profesores);
//app.use('/api', usuarios); **Ejemplo**
app.use('/api',clientes);

app.use('/api', estudiantes);

app.use('/api', administrador)

app.use('/api', proyectos );
app.use('/api', tickets);
// Se guarda todo lo que se ha realizado
module.exports = app;

function _server(){
  console.log('Conexión con el back-end establecida en el puerto ' + port);
};