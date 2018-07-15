'use strict'
moveUser(true);
let tabla = elm('#tblProyectos');

function llenarTabla() {

    let lista = obtenerListaProyectos(),
        body = tabla.querySelector('tbody');
        body.innerHTML='';
    for (let i = 0; i < lista.length; i++) {
        if (lista[i]['nombre_cliente'].toLowerCase().includes(getCurrentUserData()._id.toLowerCase())) {
            let row = body.insertRow();
            let nombre = row.insertCell(),
                fecha = row.insertCell(),
                info = row.insertCell(),
                vermas = createElm('a');
            nombre.innerHTML = lista[i].nombre_proyecto;
            fecha.innerHTML = lista[i].fecha_Entrega;
            vermas.innerHTML = 'Ver más';
            info.appendChild(vermas);
        }
    }
}