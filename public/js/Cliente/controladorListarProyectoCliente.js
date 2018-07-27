'use strict'
moveUser(true);
let tabla = elm('#tblProyectos');
llenarTabla();
function llenarTabla() {

    let lista = obtenerListaProyectos(),
        body = tabla.querySelector('tbody');
    body.innerHTML = '';
    let proyectos = getCurrentUserData().proyectos;
    console.log(proyectos, lista)
    for (let i = 0; i < lista.length; i++) {
        for (let j = 0; j < proyectos.length; j++) {
            console.log(lista[i]['_id'], proyectos[j]._id)
            if (lista[i]['_id'].toLowerCase() == proyectos[j].id) {
                let row = body.insertRow(),
                    nombre = row.insertCell(),
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
}