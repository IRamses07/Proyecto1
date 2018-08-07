'use strict'
moveUser(true);
let datos = document.querySelector('#datosUsuario');
let extraDatos = document.querySelector('#infoUsuario');
let infoContacto2 = document.querySelector('#infoContacto2');
getInfo();
document.querySelector('#btnContrasenna').addEventListener('click', function () { document.location.href = 'passwordChange.html' });

function getInfo() {
    let infoCliente = getInfoCliente();
    let thisClient = [];
    if (getCurrentUserData()['rol'] == "cliente") {
        document.querySelector('#btnContrasenna').classList.remove('lblHide');
        thisClient.push(getCurrentUserData());
        infoPersonal(thisClient);
    } else {
        document.querySelector('#btnContrasenna').classList.add('lblHide');
        infoPersonal(infoCliente);
    }

    infoContacto(infoCliente);

    let dos = infoCliente[0]['ubicacion'];
    let ubicacionMap = dos.split(",");

    console.log('lat:  ' + ubicacionMap[0]);
    console.log('long: ' + ubicacionMap[1]);

    showMap();
    mapCenter(ubicacionMap[0], ubicacionMap[1]);
};

function infoPersonal(infoCliente) {
    let contenido = '';
    let contenido2 = '';
    document.querySelector('#perfiImagen').src = infoCliente[0]['foto'];

    contenido += '<h3>' + infoCliente[0]['nombre'] + '</h3>';
    contenido += '<h4 class="secundario">' + infoCliente[0]['cedula_juridica'] + '</h4>';

    datos.innerHTML = contenido;

    contenido2 += '<h4> </h4>\n';
    contenido2 += '<div class="icono"><i class="fas fa-id-badge"></i><h4>Cédula Jurídica: ' + infoCliente[0]['cedula_juridica'] + '</h4></div>';
    contenido2 += '<div class="icono"><i class="fas fa-map-marker-alt"></i><h4>' + infoCliente[0]['provincia'] + ', ' + infoCliente[0]['canton'] + ', ' + infoCliente[0]['distrito'] + '</h4></div>';
    contenido2 += '<div class="icono" id="littleMargin"><i class="fas fa-thumbtack"></i><h4>' + infoCliente[0]['direccion_exacta'] + '</h4></div>';

    extraDatos.innerHTML = contenido2;
}

function infoContacto(infoCliente) {
    let contenido = '';

    if (infoCliente[0]['segundo_apellido'] !== '') {
        contenido += '<div class="icono2"><i class="fas fa-id-card"></i><h5>Nombre: ' + infoCliente[0]['primer_nombre'] + ' ' + infoCliente[0]['primer_apellido'] + ' ' + infoCliente[0]['segundo_apellido'] + '</h5></div>\n';
    } else {
        contenido += '<div class="icono2"><i class="fas fa-id-card"></i><h5>Nombre: ' + infoCliente[0]['primer_nombre'] + ' ' + infoCliente[0]['primer_apellido'] + '</h5></div>\n';
    }

    contenido += '<hr class="list">\n';
    contenido += '<div class="icono2"><i class="fas fa-phone-square"></i><h5>Teléfono: ' + infoCliente[0]['telefono'] + '</h5></div>\n';
    contenido += '<hr class="list">\n';
    contenido += '<div class="icono2"><i class="far fa-envelope"></i><h5>Correo: ' + infoCliente[0]['correo_electronico'] + '</h5></div>\n';
    contenido += '<h4 class="subtitulo">Dirección:</h4>';
    contenido += '<h4 id="ubicacionMapa">' + infoCliente[0]['provincia'] + ', ' + infoCliente[0]['canton'] + ', ' + infoCliente[0]['distrito'] + '</h4>';

    infoContacto2.innerHTML = contenido;
}