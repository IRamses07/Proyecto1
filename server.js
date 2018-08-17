// Se exporta http dentro de la arquitectura
const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io').listen(http);

// Establecemos un puerto en el que el servidor se va a levantar
const port = 3000;
// Se exporta serveStatic que crea un servidor estático
const serveStatic = require('serve-static');
// Se exporta la conexión de nodejs
const connect = require('connect');
// se exporta nodemon, cuya tarea es crea el servidor del back end
const nodemon = require('nodemon');

let conectados = [];
let tempConectados = [];

    io.sockets.on('connection', function(socket){

        // socket.nickname = 'lola';                        //nickname = 
        // socket.join('some room');

        let allConnectedClients = Object.keys(io.sockets.connected);            //lista con todos los socket ids presentes
        let id = socket.id;
        socket.emit('new connection', {id}, conectados, allConnectedClients);
        console.log('Connected: sockets connected');

        socket.on('disconnect', function(data){     
          console.log('Disconnected: sockets disconnected');
          console.log('Socket.io: '+socket.id);
          tempConectados=[];
          for(j=0;j<conectados.length;j++){
            if(conectados[j][0]!==socket.id){
              // console.log('Es diferente: '+conectados[j]);
              tempConectados.push(conectados[j]);
            } else{
              // console.log('Es igual a: '+conectados[j]);
            }
          }
          conectados=tempConectados;
          console.log('lista de conectados: '+conectados);
          console.log(Object.keys(io.sockets.connected));

          io.sockets.emit( 'list users',conectados, Object.keys(io.sockets.connected));
          // averiguar como borrar de la lista
        });

        socket.on('limpiaLista', function(){
          let allConnectedClients = Object.keys(io.sockets.connected);
          // console.log('todos: '+allConnectedClients);
          let bandera=false;
          let i=0, j=0;
          let fila = [];

          for(i=0;i<conectados.length;i++){
            bandera=false;
            for(j=0;j<allConnectedClients.length;j++){
                if(conectados[i][0]==allConnectedClients[j]){
                  // console.log('esta activo');
                  bandera=true;
                }
            }
            // console.log(conectados);
            if(!bandera){
              if(conectados[i][1]!=='xxx'){
                // console.log('esta inactivo');
                conectados[i][0]='xxx';
                conectados[i][1]='xxx';
                conectados[i][2]='xxx';
              }
            }
            // console.log(conectados);
        }
        
        });

        socket.on('joinroom', function(destino, userDestinoNombre) {
          // console.log('User destino: '+userDestinoNombre);
          let room = Math.floor((Math.random() * 99999) + 10000);                    //generates a random id for the room;
          let socketDest = '';
          let nombreSender = '';
          //emit para crear chat en html;
          // console.log('entra, destino: ');
          // console.log(destino);
          // io.sockets.emit('nuevaPesnata', room, userDestinoNombre);
          // console.log(conectados.length);
          
          for(i=0;i<conectados.length;i++){
            if(conectados[i][2]==destino){
              socketDest=conectados[i][0];
            }
          }
          
          for(i=0;i<conectados.length;i++){
            // console.log(socket);
            // console.log(conectados[i]);
            if(conectados[i][0]==socket){
              // console.log('entra loop');
              nombreSender=conectados[i][1];
            }
          }
          console.log('Nombre destino: '+nombreSender);
          // socket.join(room);
          // console.log('Destino: '+socketDest);
          let socket2 = io.sockets.connected[socketDest];
          // socket.join(room);
          // socket2.join(room);

          // let socket2 = io.sockets.connected[socketDest];
          // console.log(socket2);
          socket.join(room);
          socket2.join(room);
          // let mio = io.clients().sockets;
          //  console.log(room);
          // console.log(socket);
          // console.log('-----------------------------------------------------');
          // console.log(socket2);
          
          //io.sockets.emit('nuevaPesnata', room, userDestinoNombre);
          io.in(room).emit('nuevaPesnata', room, userDestinoNombre);

          // console.log(io.sockets.connected[socket].rooms);
          // io.sockets.connected[socketDest].join(room);
          // console.log(io.sockets.connected[socket].rooms);
          
          
          //socket2 hacer que se abra el chat de este y destino.
          // socket2.agregarChat(room,'Nuevo Chat');
          // io.sockets.in(room).emit('message', 'what is going on, party people?', room);

          // io.in(room).emit('custoMmessage', 'the game will start soon');
          // socket.to('game').emit('nice game', "let's play a game");
          });

        // room = "abc123";

        socket.on('unir a room', function(room){
          // console.log('llega al room');
          socket.join(room);
        });

        socket.on('agregar a lista', function(data){
          conectados.push(data);

          io.sockets.emit( 'list users',conectados, allConnectedClients);
        });

        //mensaje viejo cargado al refrescar una imagen.
        socket.on('mensajeViejo', function(data,time,mandado,room){
          // console.log('custom message');
          socket.emit('custoMmessage2', data,time,mandado,room);
        });

        socket.on('update socket lista', function(paso, nuevoid){
          // console.log('Actualizando socket en lista');
          // console.log(conectados);
          // conectados[paso][0]=nuevoid;
          io.sockets.emit( 'list users',conectados, allConnectedClients);
        });

        socket.on('send message', function(data,time,mandado,room){
          // io.sockets.emit('new message',{msg: data},{tme: time},{mand: mandado});
          // io.sockets.in(room).emit('message', data, time, mandado, room);
          //io.in(room).emit('custoMmessage', 'the game will start soon');
          io.in(room).emit('custoMmessage', data,time,mandado,room);
        });
    });

app.use(serveStatic(__dirname));

http.listen(port, function(){
  console.log('listening on *:' + port);
});

nodemon({
  script: 'api/index.js',
  ext: 'js'
});