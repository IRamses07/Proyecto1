'use strict'
moveUser(true);
let modal = elm('#modal');
listener(modal.querySelector('a'), 'click', function () {
    modal.classList.add('none')
});
let tablaLista = elm('#tablaLista');
llenarTabla()
function llenarTabla(filro) {
    let lista;
    if (filro != undefined) {

    } else {
        lista = listarClientes();
    }
    let tbody = tablaLista.querySelector('tbody');
    tbody.innerHTML = '';
    for (let i = 0; i < lista.length; i++) {
        let row = tbody.insertRow(i),
            cedula_juridica = row.insertCell(0),
            nombre = row.insertCell(1),
            contacto = row.insertCell(2),
            proyectos = row.insertCell(3),
            ubicacion = row.insertCell(4),
            config = row.insertCell(5);
        cedula_juridica.innerHTML = lista[i]['cedula_juridica'];
        nombre.innerHTML = lista[i]['nombre'];
        contacto.innerHTML = lista[i]['primer_nombre'] + ' ' + lista[i]['primer_apellido'];
        proyectos.innerHTML = 'Comming soon';
        let verUbicacion = createElm('a'),
            btnModificar = createElm('button'),
            btnEstado = createElm('button');
        verUbicacion.dataset.ubicacion = lista[i].ubicacion;
        verUbicacion.innerHTML = 'Ver ubicacion';
        listener(verUbicacion, 'click', function () {
            modal.classList.remove('none');
            let ubicacion = verUbicacion.dataset.ubicacion.split(',');
            mapCenter(ubicacion[0], ubicacion[1]);
        });
        btnModificar.classList.add('btnFiltro');
        btnModificar.innerHTML = 'Modificar';
        btnEstado.classList.add('btnFiltro');
        btnEstado.innerHTML = 'Desactivar';
        ubicacion.appendChild(verUbicacion);
        config.appendChild(btnModificar);
        config.appendChild(btnEstado);

    }
}