'use strict'
moveUser(true);
let eString = /[A-Za-záéíóúñÑÁÉÍÓÚ+-]+/,
    eNumber = /[0-9]+/,
    eSpace = /\s+/,
    eEmail = /([\w\.\-_]+)?\w+@[\w-_]+(\.\w+){1,}/,
    eDate = /^(0?[1-9]|1[0-2])[\/](0?[1-9]|[12]\d|3[01])[\/](19|20)\d{2}$/,
    ePhone = /^\s*(?:\+?(\d{1,3}))?([-. (]*(\d{3})[-. )]*)?((\d{3})[-. ]*(\d{2,4})(?:[-.x ]*(\d+))?)\s*$/;
let map, marker, gCoder;
/**
 * funcion que retorna un elemento html del documento
 * @param {String} id es la isntruccion para identificar el elemento que se desea extraer
 *  
 */
function elm(id) {
    return document.querySelector(id);
}
function createElm(tag) {
    return document.createElement(tag);
}
/**
 * agrega un evento a un elemento 
 * @param {*} element elemeto html que se le va a asignar un evento
 * @param {String} event el tipo de evento al que va a responder
 * @param {function} action la funcion que se va a ejecutar al detectar el evento
 */
function listener(element, event, action) {
    element.addEventListener(event, action);
}
/**
 * comprueba si un elemento html esta vacío
 * @param {*} element elemento html
 */
function blanck(element) {
    let valido = true;
    if (element != null) {
        if (element.value == '') {
            valido = false;
        }
    } else {
        valido = false;
    }
    return valido;
}
/**
 * funcion que valida el contenido de un campo de texto
 */
function registro(inputs) {
    console.log('entra');
    let valido = true;
    let labelCed = document.querySelector('#cedExt');
    for (let i = 0; i < inputs.length; i++) {
        let element = inputs[i];
        removeClass(element, 'error');
        switch (element.name) {
            case 'apellido1':
            case 'nombre1':
            case 'profesion':
            case 'primerApellido':
            case 'primerNombre':
                if (blanck(element)) {
                    if (test(eNumber, element) || test(eSpace, element)) {
                        addClass(element, 'error');
                        valido = false;
                    }
                } else {
                    addClass(element, 'error');
                    valido = false;
                }
                break;
            case 'telefono':
                if (blanck(element)) {
                    if (!test(ePhone, element)) {
                        valido = false;
                    }
                } else {
                    addClass(element, 'error');
                    valido = false;
                }
                break;
            case 'edad':
                if (blanck(element)) {
                    if (test(eString, element) || test(eSpace, element)) {
                        addClass(element, 'error');
                        valido = false;
                    }
                } else {
                    addClass(element, 'error');
                    valido = false;
                }
                break;

            case 'cedulaJuridica':
                if (blanck(element)) {
                    console.log('entra0');
                    labelCed.innerHTML = 'Cédula jurídica';
                    labelCed.classList.remove('cedRepetida');
                    if (validarCedulaRepetida(element.value)) {
                        addClass(element, 'error');
                        valido = false;
                        labelCed.innerHTML = 'Cédula jurídica --------> *Cédula Existente!';
                        labelCed.classList.add('cedRepetida');
                        console.log('entra1');
                    }
                } else {
                    addClass(element, 'error');
                    labelCed.innerHTML = 'Cédula jurídica';
                    labelCed.classList.remove('cedRepetida');
                    valido = false;
                    console.log('entra2');
                }
                break;




                // if (blanck(element)){
                //     addClass(element, 'error');
                //     valido = false;
                // } else if (validarCedulaRepetida(element)) {
                //     console.log('aqui estamos mop');
                //     addClass(element, 'error');
                //     labelCed.innerHTML = 'Cédula jurídica -> *Cédula Existente!';
                //     labelCed.addClass('cedRepetida');
                //     valido = false;
                //     //cosas que pasan si esta repetida -> labelCed
                // } else {
                //     classList.remove(element, 'error');
                // }
                // break;
            
            case 'correoElectronico':
                if (blanck(element)) {
                    if (!test(eEmail, element) || test(eSpace, element)) {
                        addClass(element, 'error');
                        valido = false;
                    }
                } else {
                    addClass(element, 'error');
                    valido = false;
                }
                break;
            case 'password':

                break;
            case 'cedula':
            case 'direccionExacta':
            case 'nombre':
            case 'canton':
            case 'provincia':
            case 'distrito':
                if (blanck(element)) {

                } else {
                    addClass(element, 'error');
                    valido = false;
                }
                break
            default:
                break;
        }
    }
    return valido;
}
function test(expresion, element) {
    if (expresion.test(element.value)) {
        return true;
    } else {
        return false;
    }
}
function addClass(element, clase) {
    element.classList.add(clase);
}
function removeClass(element, clase) {
    element.classList.remove(clase);
}
/**
 * Funcion necesaria para mostrar un mapa interactivo para seleccionar ubicaciones
 */
function initMap() {
    let divMap = elm('#map'),
        latLng;

    latLng = { lat: 9.9333, lng: -84.0833 };
    map = new google.maps.Map(divMap, { center: latLng, zoom: 8 });
    marker = new google.maps.Marker({
        map: map,
        draggable: true,
        position: new google.maps.LatLng(latLng.lat, latLng.lng)
    });
    // marker.addListener('dragend', function (event) {
    //     // elm('#btnRegistrar').dataset.ubucacion =  this.getPosition().lat()+','+ this.getPosition().lng();
    //     // console.log('Latitud: '+this.getPosition().lat()+', Longitud'+this.getPosition().lng())
    // })
    gCoder = new google.maps.Geocoder();
}
/**
 * Posiciona el marker y el mapa en la ubicacion seleccionada por el usuario
 * @param {*} geocoder objeto que hará de traductor de la direccion física a coordenadas
 * @param {*} resultsMap mapa que se centrará en la ubicación de la dirección
 */
function geocodeAddress(geocoder, resultsMap) {
    var address = 'Costa Rica' + ' ' + sltProvincia.value + ' ' + sltCantones.value + ' ' + sltDistrito.value;
    geocoder.geocode({ 'address': address }, function (results, status) {
        if (status === 'OK') {
            resultsMap.setCenter(results[0].geometry.location);
            marker.setPosition(results[0].geometry.location);
        } else {
            alert('Geocode was not successful for the following reason: ' + status);
        }
    });
}
/**
 * centra el mapa
 * @param {String} lat latitud
 * @param {String} lgn longitud
 */
function mapCenter(lat,lng){
    let position=new google.maps.LatLng(lat,lng);
    map.setCenter(position);
    marker.setPosition(position);
}
function showMap() {
    let mapContent=elm('#map'),
    latLng = { lat: 9.9333, lng: -84.0833 };
    map = new google.maps.Map(mapContent, { center: latLng, zoom: 17 });
    marker = new google.maps.Marker({
        map: map,
        draggable: false,
        position: new google.maps.LatLng(latLng.lat, latLng.lng)
    });
}