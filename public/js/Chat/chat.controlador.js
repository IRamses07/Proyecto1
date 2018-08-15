// 'use strict';
$(function(){
  console.log(sessionStorage.getItem("chatMin"));
  if (sessionStorage.getItem("chatMin")==0){
    document.querySelector('#chatContainer').hidden=false;
    console.log('entra hidden:0');
  } else {
    document.querySelector('#chatContainer').hidden=true;
    console.log('entra hidden:1');
  }
});

$(function(){

  socket = io.connect();
  $messageForm = $('#messageForm');
  $message = $('#message');
  // $chat = $('#chat');


let userslist = document.querySelector('#users');
let chatContainer = document.querySelector('#chatContainer');

//revisa si el chat estaba minimizado o estaba entero:



//minimizar el chat entero:
let minimizarChat = document.querySelector('#minimizarChat');
minimizarChat.addEventListener('click',function(){
  if($(document.querySelector('#chatContainer')).is(":hidden")){
    // document.querySelector('#ch'+elem.attributes[0].value).hidden=true;
    document.querySelector('#chatContainer').hidden=false;
    sessionStorage.setItem("chatMin", 0);
    console.log('cambia a abierto '+sessionStorage.getItem("chatMin"));
    // contador_chat_abierto-=1;
  }else{
    // document.querySelector('#ch'+elem.attributes[0].value).hidden=false;
    document.querySelector('#chatContainer').hidden=true;
    sessionStorage.setItem("chatMin", 1);
     console.log('cambia a cerrado '+sessionStorage.getItem("chatMin"));
    // contador_chat_abierto+=1;          
  }
});


let contador_chats = 0;
let contador_chat_abierto = 0;

// lista de usuarios conectados:
chatContainer.innerHTML+=`<div class="row">
                <div class="col-md-4">
                <div class="well">
                    <h3 class="titulo">Usuarios Conectados</h3>
                    <ul id="users" class="list-group"></ul>
                </div>
                </div>
                <div id="menuChat"></div>
                <div class="col-md-8">
                    <form class="form1Chat" id="messageForm" hidden>
                    </form>
                </div>
            </div>
            `

let menuChat = document.querySelector('#menuChat');
let messageForm = document.querySelector('#messageForm');

//pestanas de chat:
function agregarPestana(id, userDestinoNombre){
  menuChat.innerHTML+='<div class="entradatexto" id="'+'dad'+id+'"><div value="'+id+'" class="pestanaChat" id="'+'h'+id+'">'+userDestinoNombre+'</div><span class="closeTab" value="'+id+'" id="'+'x'+id+'"><i class="fas fa-times"></i></span></div>';
  agregarChatPrivado(id);
  addListerPestana();
  closePrivateChat();
  agregarRoomie(id,userDestinoNombre);
  listenerBotonesEnviar();
}

function agregarRoomie(id,userDestinoNombre){
  let roomArray = JSON.parse(sessionStorage.getItem("rommies"));
  let bandera=false;
  for(j=0;j<roomArray.length;j++){
    if(roomArray[j][0]==id){
      bandera=true;
    }
  }
  if(!bandera){
    roomArray.push([id,userDestinoNombre]);
    console.log('Array de Rooms:');
    console.log(roomArray);
    sessionStorage.setItem("rommies", JSON.stringify(roomArray));
  }
}

function removeRommie(id){
  console.log('EliminarRoom: '+id);
  let roomArray = JSON.parse(sessionStorage.getItem("rommies"));
  let roomiesTemp=[];
  for(j=0;j<roomArray.length;j++){
    if(roomArray[j][0] != id){
        console.log(roomArray[j][0]);
        roomiesTemp.push(roomArray[j]);
    }
  }
  console.log(roomiesTemp);
  console.log(roomArray);
  sessionStorage.setItem("rommies", JSON.stringify(roomiesTemp));
}



//chat, input y boton de enviar.
function agregarChatPrivado(id){
  messageForm.innerHTML+=`<div id="${'ch'+id}" class="form-group chatDesactivo activeChat">
                            <div class="chat" id="chat">
                              <div value="${id}" class="chatPrivado" id=${'chatin'+id}></div>
                            </div>
                            <div class="abajoChatPart">
                              <textarea class="form-control mytxtArea" id="${'message'+id}" placeholder="Nuevo mensaje">
                              </textarea>
                        
                              <button type="button" class="tbn tbn-primary subsub btnChat btnChatEnnviar" value="${id}"><i class="fas fa-arrow-circle-right"></i>
                            </div>
</button>
                          </div>`;
}

//agregar una funcion para poner un event listener a cada pestana;

        //Listener de la lista de conectados:
        listarOnline();
        function listarOnline(){
        let buttonslistausers = document.querySelectorAll('.listausers');
          buttonslistausers.forEach(function(elem){
            elem.addEventListener("click", function(){
              //funcion para abrir chat privado entre ambos users.
              //abir una nueva ventana en el html.
              
              //solo abre un chat si hay menos de 4;
              if(contador_chats < 4){
              contador_chat_abierto+=1;
              contador_chats+=1;
              let nombre = elem.textContent;
              socket.emit('joinroom', elem.value, nombre);
              document.querySelector('#messageForm').hidden=false;
              }
            })
          });
        }

  openOldChats();                                                    //Revisar porque cuando llama a agregarPestana, solo corre el  for 1 vrz.
  function openOldChats(){
    let roomArray = JSON.parse(sessionStorage.getItem("rommies")); 
    let room='';
    let destino='';
    for(j=0;j<roomArray.length;j++){
      room=roomArray[j][0];
      destino=roomArray[j][1];
      agregarPestana(room, destino);
      document.querySelector('#ch'+room).classList.add("hiddenChat");
      socket.emit('unir a room', room);
    }
    addListerPestana();
  //mandar a agregar a este socket
  }
        //Listener de las pestanas de los chats: Y ocultar -> sacar los chats.
        addListerPestana();
        function addListerPestana(){
        let buttonslistausers = document.querySelectorAll('.pestanaChat');
          buttonslistausers.forEach(function(elem){
            elem.addEventListener("click", function(){
              //esconde el chat que comparte el mismo value.
              if($(document.querySelector('#ch'+elem.attributes[0].value)).is(":visible")){
                document.querySelector('#ch'+elem.attributes[0].value).classList.add("hiddenChat");
                contador_chat_abierto-=1;
              }else{
                document.querySelector('#ch'+elem.attributes[0].value).classList.remove("hiddenChat");
                contador_chat_abierto+=1;
              }
              if(contador_chat_abierto==0){
                document.querySelector('#messageForm').hidden=true;
              }else{
                document.querySelector('#messageForm').hidden=false;
              }
            })
          });
        }
        


        //cierra un chat privado cuando le dan en la X
        closePrivateChat();
        function closePrivateChat(){
        let buttonCerrarChat = document.querySelectorAll('.closeTab');
            buttonCerrarChat.forEach(function(elem){
            elem.addEventListener("click", function(){
              //esconde todo el chat que comparte el mismo value.

              document.querySelector('#h'+elem.attributes[1].value).hidden=true;
              document.querySelector('#ch'+elem.attributes[1].value).hidden=true;
              document.querySelector('#x'+elem.attributes[1].value).hidden=true;
              document.querySelector('#dad'+elem.attributes[1].value).hidden=true;
              removeRommie(elem.attributes[1].value);
              //Guardarlo en la base de datos
              contador_chats-=1;
              contador_chat_abierto-=1;
              if(contador_chat_abierto==0){
                document.querySelector('#messageForm').hidden=true;
              }else{
                document.querySelector('#messageForm').hidden=false;
              }
            })
          });
        }

        

        // $messageForm.submit(function(e){
        //   e.preventDefault();
        //   let nombre = usuarioNombre();
        //   let time = String(new Date().getHours()+':'+new Date().getMinutes());
          
        //   socket.emit('send message', $message.val(), time, nombre);
        //   $message.val('');
        // });


        // socket.on('new message', function(mensaje, room){
          


        //   document.querySelector('#ch'+elem.attributes[1].value).append('<div class="well espanto">'+mandado.mand+': </div>');

        //   $chat.append('<div class="well espanto">'+mandado.mand+': </div>');
        //   $chat.append('<div class="well espanto">'+data.msg+'</div>');
        //   $chat.append('<div class="well espanto">'+time.tme+'</div>');
        // });

        // socket.on('list users', function(listaConectados, allConnectedClients){       //llena la lista de usuarios online.
        //     console.log('cuenta: '+listaConectados.length);
        //     $('#users')[0].innerHTML='';
        //     for(i=0;i<listaConectados.length;i++){
        //       let fila = document.createElement('span');
        //       fila.value = listaConectados[i][2];
        //       fila.innerHTML = listaConectados[i][1];
        //       fila.classList.add('listausers');
        //       document.querySelector('#users').appendChild(fila); 
        //     }
        //     listarOnline();
        // });

        socket.on('list users', function(listaConectados, allConnectedClients){       //llena la lista de usuarios online.
            let nombre = usuarioNombre();
            allConnectedClients
            $('#users')[0].innerHTML='';
            let contador=0;
            let bandera=false;
            let ids = [];
            console.log('llega facil');
            for(i=0;i<listaConectados.length;i++){

              bandera=false;
              for(j=0;j<allConnectedClients.length;j++){
                console.log(allConnectedClients);
                if(listaConectados[i][0]==allConnectedClients[j]){
                  // if(ids.indexOf(listaConectados[i][0])){'
                    console.log(allConnectedClients[j]);
                    console.log(listaConectados[i][1]);
                    bandera=true;
                    console.log('Bandera: '+listaConectados[i][1]);
                    console.log('esta activo');
                  
                    // for(n=0;n<ids.length;n++){
                  
                      // if(listaConectados[i][0]==ids[n]){
                      //   bandera=false;
                      //   console.log(listaConectados[i][1]);
                      //   console.log('repite');
                      //   console.log(ids);
                      // }
                    // }
                }
              }
               if(listaConectados[i][1]!=='xxx' && bandera){
                if(listaConectados[i][1]!==nombre){
                  ids.push(listaConectados[i][0]);
                  let fila = document.createElement('span');
                  fila.value = listaConectados[i][2];
                  fila.innerHTML = listaConectados[i][1]+'  <i class="fas fa-circle"></i>';
                  fila.classList.add('listausers');
                  document.querySelector('#users').appendChild(fila); 
                }else{
                  ids.push(listaConectados[i][0]);
                  let fila = document.createElement('span');
                  fila.value = listaConectados[i][2];
                  fila.innerHTML = listaConectados[i][1]+'  (yo) <i class="fas fa-circle"></i>';
                  fila.classList.add('listausersyo');
                  document.querySelector('#users').appendChild(fila); 
                }
              }
            }
              




            // for(i=0;i<listaConectados.length;i++){

              // socket.emit('limpiaLista');
              listarOnline();
          });


        // socket.on('envarMensajePrivadoChat', function(data){
        
        socket.on('agregarChat', function(id, userDestinoNombre) {
            agregarPestana(id, userDestinoNombre);
            //hacer qque se guarde en sessionStorage las rooms en las que voy a estar
        });

        //   document.querySelector('#h'+elem.attributes[1].value).hidden=true;


        //   $chat.append('<div class="well espanto">'+mandado.mand+': </div>');
        //   $chat.append('<div class="well espanto">'+data.msg+'</div>');
        //   $chat.append('<div class="well espanto">'+time.tme+'</div>');
        // });



        //submit del boton
        listenerBotonesEnviar();
        function listenerBotonesEnviar(){
        let buttonenviar = document.querySelectorAll('.subsub');
            buttonenviar.forEach(function(elem){
            elem.addEventListener("click", function(){
              //esconde todo el chat que comparte el mismo value.
              let nombre = usuarioNombre();
              let time = String(new Date().getHours()+':'+new Date().getMinutes());

              socket.emit('send message', $('#message'+elem.value)[0].value, time, nombre, elem.value);
              $('#message'+elem.value)[0].value='';
            })
          });
        }


        // socket.on('message', function(data, time, nombre, room) {
        //   console.log('44');
        //   // $('#chatin'+room).append('<div class="well espanto">'+nombre+': </div>');
        //   // $('#chatin'+room).append('<div class="well espanto">'+data+'</div>');
        //   // $('#chatin'+room).append('<div class="well espanto">'+time+'</div>');
        // });

        

        socket.on('custoMmessage', function(data, time, nombre, room) {
          //hacer que si estaba minimizada se regrese la pestana
          if(data!=''){
            $('#chatin'+room).append('<div class="well espanto espanto1">'+nombre+': </div>');
            $('#chatin'+room).append('<div class="well espanto espanto2">'+'\''+data+'\''+'</div>');
            $('#chatin'+room).append('<div class="well espanto espanto3">'+time+'</div>');
          }
          // $('#ch'+room)[0].appendChild('<div class="well espanto">'+data+': </div>');
          // $('#ch'+room)[0].appendChild('<div class="well espanto">'+data+': </div>');
          // console.log(data);
          // document.querySelector('#ch'+room.attributes[1].value).append('<div class="well espanto">'+data+': </div>');

          // $chat.append('<div class="well espanto">'+mandado.mand+': </div>');
          // $chat.append('<div class="well espanto">'+data.msg+'</div>');
          // $chat.append('<div class="well espanto">'+time.tme+'</div>');
          // document.querySelector('#h'+elem.attributes[1].value).hidden=true;
          // document.querySelector('#ch'+elem.attributes[1].value).hidden=true;
          // document.querySelector('#x'+elem.attributes[1].value).hidden=true;
          $('#chatin'+room).scrollTop($('#chatin'+room)[0].scrollHeight);


        });

        socket.on('nuevaPesnata', function(id, userDestinoNombre) {
          agregarPestana(id, userDestinoNombre);
          //funcion para agregar el chat y luego meter los mensajes ahi; los ids de los chat se pueden hacer como 'CC'+id
        });

        socket.on('new connection', function(id, listaConectados, allConnectedClients){          

          let meta = false;
          if(!JSON.parse(sessionStorage.getItem('currentUser'))){
            console.log('nulo');
          }else{
            let currentData = JSON.parse(sessionStorage.getItem('currentUser'));
            console.log(listaConectados);
            // if(listaConectados.length==0){
              // console.log('vacio');
              //agregar a la lista xq esta vacia
              let infoUser = [];
              infoUser.push(id.id,usuarioNombre(),(JSON.parse(sessionStorage.getItem('currentUser')))._id );
              socket.emit('agregar a lista', infoUser);
            // }
            // else{
            //   let idRep=0, paso;
            //   console.log('lleno');
            //   //revisar si ya existe uno asociado al user
            //   // for(i=0;i<listaConectados.length;i++){
            //   //   console.log(i);
            //   //   console.log(listaConectados[0][2]);
            //   //   if(listaConectados[i][2] == (JSON.parse(sessionStorage.getItem('currentUser')))._id){
            //   //     console.log('iguales, no hay que meterlo a la lista, solo actualizar');
            //   //     meta=true;
            //   //     paso=i;
            //   //     idRep=listaConectados[i][0];
            //   //     console.log(listaConectados[i][0]);
            //   //     break;
            //   //   } 
            //   // }
            //   // if(!meta){
            //   //   console.log('se agrega');
            //   //     let infoUser = [];
            //   //     infoUser.push(id.id,usuarioNombre(),(JSON.parse(sessionStorage.getItem('currentUser')))._id);
            //   //     socket.emit('agregar a lista', infoUser);
            //   // }else{
            //   //   console.log('no hago nada');
            //   //   if(id.id !== idRep){
            //   //     console.log('los ids son diferentes');
            //   //     //son diferentes y tengo que actualizar emitiendo al server.
            //   //     socket.emit('update socket lista', paso, id.id);
            //   //   }
            //   // }
            // }
          }
        });

    });
          
            // registrarChat('id123',currentData._id,'sp334455');         //guardar para un iniciar chat con persona.
            // aqui se pone en la lista de conectados.
            // let minidata = [];
            // minidata.push(currentData._id,id.id);
            // agregaConectado(minidata);
            // let tito = obtenerListaConectados();
            // console.log(tito);
          
            //cuando el user cierra session o cierra la pestana, se elimina de la lista de conectados.
            //imprimir el chat asociado a esos dos users.
            //llamar a la foto del ususario uy ponerlo junto al nombre ~ llamarlo desde sessionStorage
            //hacer una funcion desconectar que sea llamada desde el connect y desconnect para poner o no en la lista de conectados que esta en mongo
            //user sessionStorage para guardar si hay chats abiertos.
            //user un sweetalert para avisar que se le unio a un nuevo room (tiene un nuevo mensaje)
            //hacer que cuando toco a un user, s ya hay un chat abierto, mandarlo a ese.
            //poner una foto pequena en la pestana que habre el chat.
            //para pasar las rooms asociadas, las puedo meter en un storage o en un arreglo en el server, o actualizar un arreglo con los los room asociados pero a el _id en el server. (suena mejor)
            //poner me o yo en la lista de conectados cuando me lista al usuario actual.
            //hacer que diga que el user tal esta escribiendo. (investigar).
            //poner un X en la pestana del chat para cerrarlo y eliminar ese room o quitarlo de la lista de conectados.
            //cuando toca la X, que le ponga un hidden=true a la pestana en lugar de cerrar todo.
            //establecer la posicion dependiendo de cuantas tablas esten abiertas en la vara.
            

    

function usuarioNombre(){
  let currentData = JSON.parse(sessionStorage.getItem('currentUser'));
  if(currentData.rol=="administrador")
    return "Administrador";
  else if (currentData.rol=="estudiante")
    return currentData.Nombre1+' '+currentData.apellido1;
  else if (currentData.rol=="cliente")
    return currentData.nombre1+' '+currentData.primer_apellido;
  else
    return currentData.nombre1+' '+currentData.apellido1;
};