'use strict'
let minimizarChat = document.querySelector('#listChat');

imprimirListaChats();
function imprimirListaChats() {
    let listaChatsH = obtenerListaChats();
    console.log('Lita belpow');
    console.log(listaChatsH);

    let tbody = document.querySelector('#tableContainerChat tbody');
    tbody.innerHTML = '';

    for (let i = 0; i < listaChatsH.length; i++) {

        let fila = tbody.insertRow();

        let btnModificar = document.createElement('button');
        btnModificar.type = "button";
        btnModificar.classList.add('btnRegistro');
        btnModificar.classList.add('btnControl');
        btnModificar.value = listaChatsH[i]['chatid'];
        btnModificar.innerHTML = "Ver más";

        let cId = fila.insertCell();
        let cNombre = fila.insertCell();
        let cNombre2 = fila.insertCell();
        let buttonVerMas = fila.insertCell();

        cId.innerHTML = listaChatsH[i]['chatid'];
        cNombre.innerHTML = listaChatsH[i]['speaker1'];
        cNombre2.innerHTML = listaChatsH[i]['speaker2'];
        buttonVerMas.appendChild(btnModificar);
        

    }
};


vermasChat();
function vermasChat(){
    let buttonsVermas = document.querySelectorAll('.btnControl');
    buttonsVermas.forEach(function(elem){
        elem.addEventListener("click", function(){
            
            imprimirChatHistorial(getInfoChat(elem.value));
            //pasarle esto a otra funcion que lo imprima en pantalla.

        })
    });
}



function imprimirChatHistorial(infoChat){
    document.querySelector('#showChat').innerHTML='';
    console.log(infoChat[0]);
    console.log('Speaker1: '+infoChat[0]['speaker1']);
    console.log('Speaker2: '+infoChat[0]['speaker2']);
    let mensajes = infoChat[0]['mensajes'];
    console.log(mensajes);

    for(i=0;i<mensajes.length;i++){

        $(showChat).append('<div class="well espanto espanto1">' + mensajes[i]['sender'] + ': </div>');
        $(showChat).append('<div class="well espanto espanto2">' + '\'' + mensajes[i]['mensaje'] + '\'' + '</div>');
        $(showChat).append('<div class="well espanto espanto3">' + mensajes[i]['hora'] + '</div>');
    //$('#chatin' + room).scrollTop($('#chatin' + room)[0].scrollHeight);

    }
}
