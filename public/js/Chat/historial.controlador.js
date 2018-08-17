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
            console.log(getInfoChat(elem.value));
            //pasarle esto a otra funcion que lo imprima en pantalla.

        })
    });
}

