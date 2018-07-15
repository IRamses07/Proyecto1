'use strict'
moveUser(true);
let modal = elm('#modal');
listener(modal.querySelector('a'), 'click', function () {
    addClass(modal, 'none');
});
listener(elm('#btnBuscar'), 'click', function () {
    llenarTabla(elm('#filtro').value);
})
let tablaLista = elm('#tablaLista');
llenarTabla()
function llenarTabla(filro) {
    let busqueda = elm('#busqueda input[type="radio"]:checked').value;
    let lista=listarClientes();
    if (!filro) {
        filro = '';
    }
    let tbody = tablaLista.querySelector('tbody');
    tbody.innerHTML = '';
    for (let i = 0; i < lista.length; i++) {
        if (lista[i][busqueda].toLowerCase().includes(filro.toLowerCase())) {

            let row = tbody.insertRow(),
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
            verUbicacion.innerHTML = 'Ver ubicación';
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
}