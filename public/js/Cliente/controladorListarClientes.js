'use strict'
moveUser(true);
let modalMapa = elm('#modalMapa');
listener(modalMapa.querySelector('a'), 'click', function () {
    addClass(modalMapa, 'none');
});
listener(elm('#btnBuscar'), 'click', function () {
    llenarTabla(elm('#filtro').value);
})
let tablaLista = elm('#tablaLista');
llenarTabla()
function llenarTabla(filro) {
    let busqueda = elm('#busqueda input[type="radio"]:checked').value;
    let lista = listarClientes();
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
            contacto.innerHTML = `${lista[i]['primer_nombre']}  ${lista[i]['primer_apellido']}`;
            // proyectos.innerHTML = 'Comming soon';
            let verUbicacion = createElm('a'),
                btnModificar = createElm('button'),
                btnEstado = createElm('button'),
                verMas = createElm('a');
            verMas.innerHTML = 'Ver más';
            verMas.dataset.cedulaJuridica = lista[i].cedula_juridica;
            verUbicacion.dataset.ubicacion = lista[i].ubicacion; 
            proyectos.appendChild(verMas);
            verUbicacion.innerHTML = 'Ver ubicación';
            listener(verUbicacion, 'click', function () {
                modalMapa.classList.remove('none');
                let ubicacion = verUbicacion.dataset.ubicacion.split(',');
                mapCenter(ubicacion[0], ubicacion[1]);
            });
            btnModificar.classList.add('btnFiltro');
            btnModificar.innerHTML = 'Modificar';
            listener(btnModificar, 'click', function () {
                window.location.href = `./modificarCliente.html?cedula_juridica=${lista[i]['cedula_juridica']}`;
            });
            btnEstado.classList.add('btnFiltro');
            if (lista[i].estado!=0) {
                btnEstado.innerHTML = 'Desactivar';
            }else{
                btnEstado.innerHTML = 'Activar';
            }
            listener(btnEstado,'click',function () {
                if (lista[i].estado!=0) {
                    actualizarCliente({cedula_juridica:lista[i].cedula_juridica,estado:0});
                }else{
                    actualizarCliente({cedula_juridica:lista[i].cedula_juridica,estado:1});
                }
                llenarTabla(elm('#filtro').value);
            });
            ubicacion.appendChild(verUbicacion);
            config.appendChild(btnModificar);
            config.appendChild(btnEstado);
        }

    }
}