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
/**
 * variable de tipo json que guarda la informacion de los cantones de cada provincia
 */
let cantones = {
    san_jose: ["San José", "Escazú", "Desamparados", "Puriscal", "Tarrazú", "Asserí", "Mora", "Goicoechea", "Santa Ana", "Alajuelita", "Vásquez de Coronado", "Acosta", "Tibás", "Moravia", "Montes de Oca", "Turrubares", "Dota", "Curridabat", "Pérez Zeledón", "León Cortés"],
    alajuela: ["Alajuela", "San Ramón", "Grecia", "San Mateo", "Atenas", "Naranjo", "Palmares",
        "Poás", "Orotina", "San Carlos", "Zarcero", "Valverde Vega", "Upala", "Los Chiles", "Guatuso", "Río Cuarto"],
    heredia: ["Heredia", "Barva", "Santo Domingo", "Santa Bárbara", "San Rafael", "San Isidro", "Belén", "Flores",
        "San Pablo", "Sarapiquí"],
    cartago: ["Cartago", "Paraíso", "La Unión", "Jiménez", "Turrialba", "Alvarado", "Oreamuno", "El Guarco"],
    puntarenas: ["Puntarenas", "Esparza", "Buenos Aires", "Montes de Oro", "Osa", "Quepos", "Golfito", "Coto Brus", "Parrita", "Corredores", "Garabito"],
    limon: ["Limón", "Pococí", "Siquirres", "Talamanca", "Matina", "Guácimo"],
    guanacaste: ["Liberia", "Nicoya", "Santa Cruz", "Bagaces", "Carrillo", "Cañas", "Abangares", "Tilarán", "Nandayure", "La Cruz", "Hojancha"]
};
/**
 * variable de tipo json que guarda la informacion de los distritos de cada canton
 */
let distritos = {
    san_jose: ["Carmen", "Merced", "Hospital", "Catedral", "Zapote", "San Francisco de Dos Ríos", "La Uruca", "Mata Redonda", "Pavas", "Hatillo", "San Sebastián"],
    escazu: ["Escazú Centro", "San Rafael", "San Antonio"],
    desamparados: ["Desamparados", "San Miguel", "San Juan de Dios", "San Rafael Arriba", "San Antonio", "Frailes", "Patarrá", "San Cristóbal", "Rosario", "Damas", "San Rafael Abajo", "Gravilias", "Los Guido"],
    puriscal: ["Santiago", "Mercedes Sur", "Barbacoas", "Grifo Alto", "San Rafael", "Candelarita", "Desamparaditos", "San Antonio", "Chires"],
    asseri: ["Asserí", "Tarbaca", "Vuelta de Jorco", "San Gabriel", "Legua", "Monterrey", "Salitrillos"],
    mora: ["Colón", "Guayabo", "Tabarcia", "Piedras Negras", "Picagres", "Jaris", "Quitirrisí"],
    goicoechea: ["Guadalupe", "San Francisco", "Calle Blancos", "Mata de Plátano", "Ipís", "Rancho Redondo", "Purral"],
    santa_ana: ["Santa Ana", "Salitral", "Pozos", "Uruca", "Piedades", "Brasil"],
    vasquez_de_coronado: ["San Isidro", "San Rafael", "Dulce Nombre de Jesús", "Patalillo", "Cascajal"],
    alajuelita: ["Alajuelita", "San Josecito", "San Antonio", "Concepción", "San Felipe", "Barrio Lámparas"],
    acosta: ["San Ignacio", "Guaitil", "Palmichal", "Cangrejal", "Sabanillas"],
    tibas: ["San Juan de Tibás", "Cinco Esquinas", "Anselmo Llorente", "León XIII", "Colima"],
    moravia: ["San Vicente", "San Jerónimo", "La Trinidad"],
    montes_de_oca: ["San Pedro", "Sabanilla", "Mercedes", "San Rafael"],
    turrubares: ["San Pablo", "San Pedro", "San Juan de Mata", "San Luis", "Carara"],
    dota: ["Santa María", "Jardín", "Copey"],
    curridabat: ["Curridabat", "Granadilla", "Sánchez", "Tirrases"],
    perez_zeledon: ["San Isidro de El General", "El General", "Daniel Flores", "Rivas", "San Pedro", "Platanares", "Pejibaye", "Cajón", "Barú", "Río Nuevo", "Páramo", "La Amistad"],
    leon_cortes: ["San Pablo", "San Andrés", "Llano Bonito", "San Isidro", "Santa Cruz", "San Antonio"],
    alajuela: ["Alajuela", "San José", "Carrizal", "San Antonio", "Guácima", "San Isidro", "Sabanilla", "San Rafael de Ojo de Agua", "Río Segundo", "Desamparados", "Turrúcares", "Tambor", "La Garita", "Sarapiquí"],
    san_ramon: ["San Ramón", "Santiago", "San Juan", "Piedades Norte", "Piedades Sur", "San Rafael", "San Isidro", "Ángeles", "Alfaro", "Volio", "Concepción", "Zapotal", "Peñas Blancas", "San Lorenzo"],
    grecia: ["Grecia", "San Isidro", "San José", "San Roque", "Tacares", "Puente de Piedra", "Bolívar"],
    san_mateo: ["San Mateo", "Desmonte", "Jesús María", "Labrador"],
    atenas: ["Atenas", "Jesús", "Mercedes", "San Isidro", "Concepción: Río Grande", "San José: San José Sur", "Santa Eulalia", "Escobal"],
    naranjo: ["Naranjo", "San Miguel", "San José", "Cirrí", "San Jerónimo", "San Juan", "Rosario", "Palmitos"],
    palmares: ["Palmares", "Zaragoza", "Buenos Aires", "Santiago", "Candelaria", "Esquipulas", "La Granja"],
    poas: ["San Pedro", "San Juan", "San Rafael", "Carrillos", "Sabana Redonda"],
    orotina: ["Orotina", "El Mastate", "Hacienda Vieja", "Coyolar", "La Ceiba"],
    san_carlos: ["Quesada", "Florencia", "Buenavista", "Aguas Zarcas", "Venecia", "Pital", "La Fortuna", "La Tigra", "La Palmera", "Venado", "Cutris", "Monterrey", "Pocosol"],
    zarcero: ["Zarcero", "Laguna", "Tapezco", "Guadalupe", "Palmira", "Zapote", "Brisas"],
    valverde_vega: ["Sarchí Norte", "Sarchí Sur", "Toro Amarillo", "San Pedro", "Rodríguez"],
    upala: ["Upala", "Aguas Claras", "San José", "Bijagua", "Delicias", "Dos Ríos", "Yolillal", "Canalete"],
    los_chiles: ["Los Chiles", "Caño Negro", "El Amparo", "San Jorge"],
    guatuso: ["San Rafael", "Buenavista", "Cote", "Katira"],
    rio_cuarto: ["Ángeles Norte", "Bolaños", "Bosque Alegre", "Caño Negro", "El Carmen", "Carrizal", "Colonia del Toro", "Crucero", "La Flor", "Hule", "La Trinidad", "Laguna", "Los Lagos", "La Merced", "Montelirio", "Naranjales", "Palmar", "Palmera", "Pata de Gallo", "Peoresnada", "El Pinar", "Pueblo Nuevo", "San Fernando", "San Gerardo", "San Jorge", "San José", "San Rafael", "San Vicente", "Santa Isabel", "Santa Rita", "La Tabla", "La Victoria"],
    cartago: ["Oriental", "Occidental", "Carmen", "San Nicolás(Taras){ ", "Agua Caliente(San Francisco){ ", "Guadalupe(Arenilla){ ", "Corralillo", "Tierra Blanca", "Dulce Nombre", "Llano Grande", "Quebradilla"],
    paraiso: ["Paraíso", "Orosi", "Cachí", "Santiago", "Llanos de Santa Lucía"],
    la_union: ["Tres Ríos", "San Diego", "San Juan", "San Rafael", "Concepción", "Dulce Nombre", "San Ramón", "Río Azul"],
    jimenez: ["Juan Viñas", "Tucurrique", "Pejibaye"],
    turrialba: ["Turrialba", "La Suiza", "Peralta", "Santa Cruz", "Teresita", "Pavones", "Tuis", "Tayutic", "Santa Rosa", "Tres Equis", "La Isabe", "Chirripó"],
    alvarado: ["Villa de Pacayas", "Distrito Cervantes", "Santa Cruz", "Capellades"],
    oreamuno: ["San Rafael", "Cot", "Potrero Cerrado", "Potrero Cerrado", "Santa Rosa"],
    el_Guarco: ["El Tejar", "San Isidro", "Tobosi", "Patio de Agua"],
    limon: ["Limón", "Valle La Estrella", "Liverpool", "Matama"],
    pococi: ["Guápiles", "Jiménez", "La Rita", "Roxana", "Cariari", "Colorado", "La Colonia"],
    siquirres: ["Siquirres", "Pacuarito", "Florida", "Germania", "Cairo", "Alegría"],
    talamanca: ["Bratsi", "Sixaola", "Cahuita", "Telire"],
    matina: ["Matina", "Bataán", "Carrandí"],
    guacimo: ["Guácimo", "Mercedes", "Pocora", "Río Jiménez", "Duacarí"],
    puntarenas: ["Puntarenas", "Pitahaya", "Chomes", "Lepanto", "Paquera", "Manzanillo", "Guacimal", "Barranca", "Monteverde", "Isla del Coco", "Cóbano", "Chacarita", "Chira", "Acapulco", "El Roble", "Arancibia"],
    esparza: ["Espíritu Santo", "San Juan Grande", "Macacona", "San Rafael", "San Jerónimo", "Caldera"],
    buenos_aires: ["Buenos Aires", "Volcán", "Potrero Grande", "Boruca", "Pilas", "Colinas", "Chánguena", "Biolley", "Brunka"],
    montes_de_oro: ["Miramar", "La Unión", "San Isidro"],
    osa: ["Cortés", "Palmar", "Sierpe", "Bahía Ballena", "Piedras Blancas", "Bahía Drake"],
    quepos: ["Quepos", "Savegre", "Naranjito"],
    golfito: ["Golfito", "Puerto Jiménez", "Guaycará", "Pavón", "Puerto Jiménez", "Guaycará", "Pavón"],
    coto_brus: ["San Vito", "Sabalito", "Aguabuena", "Limoncito", "Pittier", "Gutiérrez Brown"],
    parrita: ["Parrita"],
    corredores: ["Corredor", "La Cuesta", "Paso Canoas", "Laurel", "Gutiérrez Brown"],
    garabito: ["Jacó", "Tárcoles"],
    heredia: ["Heredia", "Mercedes", "San Francisco", "Ulloa", "Vara Blanca"],
    barva: ["Barva ", "San Pedro", "San Pablo", "San Roque", "Santa Lucía", "San José de la Montaña"],
    santo_domingo: ["Santo Domingo ", "San Vicente", "San Miguel", "Paracito", "Santo Tomás", "Santa Rosa", "Tures", "Pará"],
    san_rafael: ["San Rafael ", "San Josecito", "Santiago", "Los Ángeles", "Concepción"],
    san_isidro: ["San Isidro ", "San José", "Concepción", "San Francisco"],
    belen: ["San Antonio ", "La Ribera", "La Asunción"],
    flores: ["San Joaquín ", "Barrantes", "Llorente"],
    san_pablo: ["San Pablo ", "Rincón de Sabanilla"],
    sarapiqui: ["Puerto Viejo ", "La Virgen", "Horquetas", "Llanuras del Gaspar", "Cureña"],
    liberia: ["Liberia", "Cañas Dulces", "Mayorga", "Nacascolo", "Curubandé"],
    nicoya: ["Nicoya", "Mansión", "San Antonio", "Quebrada Honda", "Sámara", "Nosara", "Belén de Nosarita"],
    santa_cruz: ["Santa Cruz", "Bolsón", "Veintisiete de Abril", "Tempate", "Cartagena", "Cuajiniquil", "Diriá", "Cabo Velas", "Tamarindo"],
    bagaces: ["Bagaces", "La Fortuna", "Mogote", "Río Naranjo"],
    carrillo: ["Filadelfia", "Belén", "Palmira", "Sardinal"],
    cannas: ["Cañas", "Palmira", "San Miguel", "Bebedero", "Porozal"],
    abangares: ["Las Juntas", "Sierra", "San Juan", "Colorado"],
    tilaran: ["Tilarán", "Quebrada Grande", "Tronadora", "Santa Rosa", "Líbano", "Tierras Morenas", "Arenal"],
    nandayure: ["Carmona", "Santa Rita", "Zapotal", "San Pablo", "Porvenir", "Bejuco"],
    la_cruz: ["La Cruz", "Santa Cecilia", "La Garita", "Santa Elena"],
    hojancha: ["Hojancha", "Monte Romo", "Puerto Carrillo", "Huacas", "Matambú"],
    tarrazu: ["San Marcos", "San Lorenzo", "San Carlos"]
};
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
            case 'nombre':
                if (buscar({ nombre: element.value }).length > 0) {
                    valido = false;
                }
                break;
            case 'cedula':
            case 'direccionExacta':
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
function mapCenter(lat, lng) {
    let position = new google.maps.LatLng(lat, lng);
    map.setCenter(position);
    marker.setPosition(position);
}
function showMap() {
    let mapContent = elm('#map'),
        latLng = { lat: 9.9333, lng: -84.0833 };
    map = new google.maps.Map(mapContent, { center: latLng, zoom: 17 });
    marker = new google.maps.Marker({
        map: map,
        draggable: false,
        position: new google.maps.LatLng(latLng.lat, latLng.lng)
    });
}
function getParam() {
    // capturamos la url
    let loc = document.location.href;
    // si existe el interrogante
    if (loc.indexOf('?') > 0) {
        // cogemos la parte de la url que hay despues del interrogante
        let getString = loc.split('?')[1];
        // // obtenemos un array con cada clave=valor
        let GET = getString.split('&');
        let get = {};
        // // recorremos todo el array de valores
        for (let i = 0, l = GET.length; i < l; i++) {
            let tmp = GET[i].split('=');
            get[tmp[0]] = unescape(decodeURI(tmp[1]));
        }
        console.log(get);
        return get;
    }
}