'use strict';
document.querySelector('#btnRegistrar').addEventListener('click', registrarCliente);
let sltProvincia = document.querySelector("#sltProvincia").addEventListener('change', cargarCantones);
let sltCantones = document.querySelector("#sltCanton").addEventListener('change', cargarDistritos);
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
let distritos = {
    san_Jose: ["Carmen", "Merced", "Hospital", "Catedral", "Zapote", "San Francisco de Dos Ríos", "La Uruca", "Mata Redonda", "Pavas", "Hatillo", "San Sebastián"],
    escazu: ["Escazú Centro", "San Rafael", "San Antonio"],
    desamparados: ["Desamparados", "San Miguel", "San Juan de Dios", "San Rafael Arriba", "San Antonio", "Frailes", "Patarrá", "San Cristóbal", "Rosario", "Damas", "San Rafael Abajo", "Gravilias", "Los Guido"],
    puriscal: ["Santiago", "Mercedes Sur", "Barbacoas", "Grifo Alto", "San Rafael", "Candelarita", "Desamparaditos", "San Antonio", "Chires"],
    Asseri: ["Asserí", "Tarbaca", "Vuelta de Jorco", "San Gabriel", "Legua", "Monterrey", "Salitrillos"],
    Mora: ["Colón", "Guayabo", "Tabarcia", "Piedras Negras", "Picagres", "Jaris", "Quitirrisí"],
    Goicoechea: ["Guadalupe", "San Francisco", "Calle Blancos", "Mata de Plátano", "Ipís", "Rancho Redondo", "Purral"],
    Santa_Ana: ["Santa Ana", "Salitral", "Pozos", "Uruca", "Piedades", "Brasil"],
    Vasquez_de_Coronado: ["San Isidro", "San Rafael", "Dulce Nombre de Jesús", "Patalillo", "Cascajal"],
    Alajuelita: ["Alajuelita", "San Josecito", "San Antonio", "Concepción", "San Felipe", "Barrio Lámparas"],
    Acosta: ["San Ignacio", "Guaitil", "Palmichal", "Cangrejal", "Sabanillas"],
    Tibas: ["San Juan de Tibás", "Cinco Esquinas", "Anselmo Llorente", "León XIII", "Colima"],
    Moravia: ["San Vicente", "San Jerónimo", "La Trinidad"],
    Montes_de_Oca: ["San Pedro", "Sabanilla", "Mercedes", "San Rafael"],
    Turrubares: ["San Pablo", "San Pedro", "San Juan de Mata", "San Luis", "Carara"],
    Dota: ["Santa María", "Jardín", "Copey"],
    Curridabat: ["Curridabat", "Granadilla", "Sánchez", "Tirrases"],
    Perez_Zeledon: ["San Isidro de El General", "El General", "Daniel Flores", "Rivas", "San Pedro", "Platanares", "Pejibaye", "Cajón", "Barú", "Río Nuevo", "Páramo", "La Amistad"],
    Leon_Cortes: ["San Pablo", "San Andrés", "Llano Bonito", "San Isidro", "Santa Cruz", "San Antonio"],
    Alajuela: ["Alajuela", "San José", "Carrizal", "San Antonio", "Guácima", "San Isidro", "Sabanilla", "San Rafael de Ojo de Agua", "Río Segundo", "Desamparados", "Turrúcares", "Tambor", "La Garita", "Sarapiquí"],
    San_Ramon: ["San Ramón", "Santiago", "San Juan", "Piedades Norte", "Piedades Sur", "San Rafael", "San Isidro", "Ángeles", "Alfaro", "Volio", "Concepción", "Zapotal", "Peñas Blancas", "San Lorenzo"],
    Grecia: ["Grecia", "San Isidro", "San José", "San Roque", "Tacares", "Puente de Piedra", "Bolívar"],
    San_Mateo: ["San Mateo", "Desmonte", "Jesús María", "Labrador"],
    Atenas: ["Atenas", "Jesús", "Mercedes", "San Isidro", "Concepción: Río Grande", "San José: San José Sur", "Santa Eulalia", "Escobal"],
    Naranjo: ["Naranjo", "San Miguel", "San José", "Cirrí", "San Jerónimo", "San Juan", "Rosario", "Palmitos"],
    Palmares: ["Palmares", "Zaragoza", "Buenos Aires", "Santiago", "Candelaria", "Esquipulas", "La Granja"],
    Poas: ["San Pedro", "San Juan", "San Rafael", "Carrillos", "Sabana Redonda"],
    Orotina: ["Orotina", "El Mastate", "Hacienda Vieja", "Coyolar", "La Ceiba"],
    San_Carlos: ["Quesada", "Florencia", "Buenavista", "Aguas Zarcas", "Venecia", "Pital", "La Fortuna", "La Tigra", "La Palmera", "Venado", "Cutris", "Monterrey", "Pocosol"],
    Zarcero: ["Zarcero", "Laguna", "Tapezco", "Guadalupe", "Palmira", "Zapote", "Brisas"],
    Valverde_Vega: ["Sarchí Norte", "Sarchí Sur", "Toro Amarillo", "San Pedro", "Rodríguez"],
    Upala: ["Upala", "Aguas Claras", "San José", "Bijagua", "Delicias", "Dos Ríos", "Yolillal", "Canalete"],
    Los_Chiles: ["Los Chiles", "Caño Negro", "El Amparo", "San Jorge"],
    Guatuso: ["San Rafael", "Buenavista", "Cote", "Katira"],
    Rio_Cuarto: ["Ángeles Norte", "Bolaños", "Bosque Alegre", "Caño Negro", "El Carmen", "Carrizal", "Colonia del Toro", "Crucero", "La Flor", "Hule", "La Trinidad", "Laguna", "Los Lagos", "La Merced", "Montelirio", "Naranjales", "Palmar", "Palmera", "Pata de Gallo", "Peoresnada", "El Pinar", "Pueblo Nuevo", "San Fernando", "San Gerardo", "San Jorge", "San José", "San Rafael", "San Vicente", "Santa Isabel", "Santa Rita", "La Tabla", "La Victoria"],
    Cartago: ["Oriental", "Occidental", "Carmen", "San Nicolás(Taras){ ", "Agua Caliente(San Francisco){ ", "Guadalupe(Arenilla){ ", "Corralillo", "Tierra Blanca", "Dulce Nombre", "Llano Grande", "Quebradilla"],
    Paraiso: ["Paraíso", "Orosi", "Cachí", "Santiago", "Llanos de Santa Lucía"],
    La_Union: ["Tres Ríos", "San Diego", "San Juan", "San Rafael", "Concepción", "Dulce Nombre", "San Ramón", "Río Azul"],
    Jimenez: ["Juan Viñas", "Tucurrique", "Pejibaye"],
    Turrialba: ["Turrialba", "La Suiza", "Peralta", "Santa Cruz", "Teresita", "Pavones", "Tuis", "Tayutic", "Santa Rosa", "Tres Equis", "La Isabe", "Chirripó"],
    Alvarado: ["Villa de Pacayas", "Distrito Cervantes", "Santa Cruz", "Capellades"],
    Oreamuno: ["San Rafael", "Cot", "Potrero Cerrado", "Potrero Cerrado", "Santa Rosa"],
    El_Guarco: ["El Tejar", "San Isidro", "Tobosi", "Patio de Agua"],
    Limon: ["Limón", "Valle La Estrella", "Liverpool", "Matama"],
    Pococi: ["Guápiles", "Jiménez", "La Rita", "Roxana", "Cariari", "Colorado", "La Colonia"],
    Siquirres: ["Siquirres", "Pacuarito", "Florida", "Germania", "Cairo", "Alegría"],
    Talamanca: ["Bratsi", "Sixaola", "Cahuita", "Telire"],
    Matina: ["Matina", "Bataán", "Carrandí"],
    Guacimo: ["Guácimo", "Mercedes", "Pocora", "Río Jiménez", "Duacarí"],
    Puntarenas: ["Puntarenas", "Pitahaya", "Chomes", "Lepanto", "Paquera", "Manzanillo", "Guacimal", "Barranca", "Monteverde", "Isla del Coco", "Cóbano", "Chacarita", "Chira", "Acapulco", "El Roble", "Arancibia"],
    Esparza: ["Espíritu Santo", "San Juan Grande", "Macacona", "San Rafael", "San Jerónimo", "Caldera"],
    Buenos_Aires: ["Buenos Aires", "Volcán", "Potrero Grande", "Boruca", "Pilas", "Colinas", "Chánguena", "Biolley", "Brunka"],
    Montes_de_Oro: ["Miramar", "La Unión", "San Isidro"],
    Osa: ["Cortés", "Palmar", "Sierpe", "Bahía Ballena", "Piedras Blancas", "Bahía Drake"],
    Quepos: ["Quepos", "Savegre", "Naranjito"],
    Golfito: ["Golfito", "Puerto Jiménez", "Guaycará", "Pavón", "Puerto Jiménez", "Guaycará", "Pavón"],
    Coto_Brus: ["San Vito", "Sabalito", "Aguabuena", "Limoncito", "Pittier", "Gutiérrez Brown"],
    Parrita: ["Parrita"],
    Corredores: ["Corredor", "La Cuesta", "Paso Canoas", "Laurel", "Gutiérrez Brown"],
    Garabito: ["Jacó", "Tárcoles"],
    Heredia: ["Heredia", "Mercedes", "San Francisco", "Ulloa", "Vara Blanca"],
    Barva: ["Barva ", "San Pedro", "San Pablo", "San Roque", "Santa Lucía", "San José de la Montaña"],
    Santo_Domingo: ["Santo Domingo ", "San Vicente", "San Miguel", "Paracito", "Santo Tomás", "Santa Rosa", "Tures", "Pará"],
    San_Rafael: ["San Rafael ", "San Josecito", "Santiago", "Los Ángeles", "Concepción"],
    San_Isidro: ["San Isidro ", "San José", "Concepción", "San Francisco"],
    Belen: ["San Antonio ", "La Ribera", "La Asunción"],
    Flores: ["San Joaquín ", "Barrantes", "Llorente"],
    San_Pablo: ["San Pablo ", "Rincón de Sabanilla"],
    Sarapiqui: ["Puerto Viejo ", "La Virgen", "Horquetas", "Llanuras del Gaspar", "Cureña"],
    Liberia: ["Liberia", "Cañas Dulces", "Mayorga", "Nacascolo", "Curubandé"],
    Nicoya: ["Nicoya", "Mansión", "San Antonio", "Quebrada Honda", "Sámara", "Nosara", "Belén de Nosarita"],
    Santa_Cruz: ["Santa Cruz", "Bolsón", "Veintisiete de Abril", "Tempate", "Cartagena", "Cuajiniquil", "Diriá", "Cabo Velas", "Tamarindo"],
    Bagaces: ["Bagaces", "La Fortuna", "Mogote", "Río Naranjo"],
    Carrillo: ["Filadelfia", "Belén", "Palmira", "Sardinal"],
    Cañas: ["Cañas", "Palmira", "San Miguel", "Bebedero", "Porozal"],
    Abangares: ["Las Juntas", "Sierra", "San Juan", "Colorado"],
    Tilaran: ["Tilarán", "Quebrada Grande", "Tronadora", "Santa Rosa", "Líbano", "Tierras Morenas", "Arenal"],
    Nandayure: ["Carmona", "Santa Rita", "Zapotal", "San Pablo", "Porvenir", "Bejuco"],
    La_Cruz: ["La Cruz", "Santa Cecilia", "La Garita", "Santa Elena"],
    Hojancha: ["Hojancha", "Monte Romo", "Puerto Carrillo", "Huacas", "Matambú"]

};
function initMap() {
    let divMap = elm('#map'),
        map, marker, latLng;
    latLng = { lat: 9.9333, lng: -84.0833 };
    map = new google.maps.Map(divMap, { center: latLng, zoom: 8 });
    marker = new google.maps.Marker({
        map: map,
        draggable: true,
        position: new google.maps.LatLng(latLng.lat, latLng.lng)
    });
    marker.addListener('dragend', function (event) {
        elm('#place').innerHTML = 'Latitud: ' + this.getPosition().lat() + ', Longitud' + this.getPosition().lng();
        // console.log('Latitud: '+this.getPosition().lat()+', Longitud'+this.getPosition().lng())
    })
}
function registrarCliente() {

    // let aClientData = [];

    // let sRol = 'cliente';
    // let sCedulaJuridica = document.querySelector('#txtCedulaJuridica');
    // let sNombre = document.querySelector('#txtNombre');
    // let sProvincia = document.querySelector('#sltProvincia');
    // let sCanton = document.querySelector('#sltCanton');
    // let sDistrito = document.querySelector('#sltDistrito');
    // let sDireccion = document.querySelector('#txtDireccion');
    // let sPrimerNombre = document.querySelector('#txtPrimerNombre');
    // let sSegundoNombre = document.querySelector('#txtSegundoNombre');
    // let sPrimerApellido = document.querySelector('#txtPrimerApellido');
    // let sSegundoApellido = document.querySelector('#txtSegundoApellido');
    // let sTelefono = document.querySelector('#txtTelefono');
    // let eCorreo = document.querySelector('#txtCorreo');

    // aClientData.push(sRol, sCedulaJuridica, sNombre, sProvincia, sCanton, sDistrito,
    //     sDireccion, sPrimerNombre, sSegundoNombre, sPrimerApellido, sSegundoApellido,
    //     sTelefono, eCorreo);

    // setClient(aClientData);

    // //let requeridos = validarRequeridos();

    // if (!validarRequeridos()) {

    //     if (!validarCedula(sCedulaJuridica) || !validarCorreo(eCorreo)) {
    //         swal({
    //             type: 'success',
    //             title: 'Registro exitoso',
    //             text: 'Se ha registrado al cliente exitosamente.'
    //         });

    //         aclientData.push(sRol, sCedulaJuridica, sNombre, sProvincia, sCanton, sDistrito,
    //             sDireccion, sPrimerNombre, sSegundoNombre, sPrimerApellido, sSegundoApellido,
    //             sTelefono, eCorreo);
    //     }


    // } else {
    //     swal({
    //         type: 'warning',
    //         title: 'Advertencia',
    //         text: 'Por favor completar todos los espacios marcados en rojo.',
    //     });
    // }
}

function validarRequeridos() {

    // let aRequeridos = document.querySelectorAll('[required]');
    // let empty = false;

    // for (let i = 0; i < aRequeridos.length; i++) {
    //     if (aRequeridos[i].value == '') {
    //         aRequeridos[i].classList.add('empty_input');
    //         empty = true;
    //     } else {
    //         aRequeridos[i].classList.remove('empty_input');
    //     }
    // }
    // return empty;
}

function validarCedula(psCedulaJuridica) {

    // let repetido = false;

    // for (let i = 0; i < DELCLARARFUNCION().length; i++) {///////DECLARAR LA PUTA FUNCION DEL SERVICIO NO SE COMO NI CUANDO NI PORQUE SOLO TENGO QUE HACERLO Y BIEN PICHUDO...
    //     if (psCedulaJuridica == DECLARARFUNCION()[i]['cedula_juridica']) {
    //         repetido = true;
    //         document.querySelector('#lblCedulaError').classList.remove('hide');
    //     } else {
    //         document.querySelector('#lblCedulaError').classList.add('hide');
    //     }
    // }
}

function validarCorreo(peCorreo) {

    // let correoError = false;

    // if (peCorreo.includes('@')) {
    //     correoError = true;
    //     document.querySelector('#lblCorreoError').classList.remove('hide');
    // } else {
    //     document.querySelector('#lblCorreoError').classList.add('hide');

    // }

}

function limpiar() {
    // document.querySelector('#txtCedulaJuridica').value = '';
    // document.querySelector('#txtNombre').value = '';
    // document.querySelector('#sltProvincia').value = '';
    // document.querySelector('#sltCanton').value = '';
    // document.querySelector('#sltDistrito').value = '';
    // document.querySelector('#txtDireccion').value = '';
    // document.querySelector('#txtPrimerNombre').value = '';
    // document.querySelector('#txtSegundoNombre').value = '';
    // document.querySelector('#txtPrimerApellido').value = '';
    // document.querySelector('#txtSegundoApellido').value = '';
    // document.querySelector('#txtTelefono').value = '';
    // document.querySelector('#txtCorreo').value = '';

}
function obtenerCantones(provincia) {
    // let cantones = [];
    // if (provincia == "San José") {
    //     cantones = ["San José", "Escazú", "Desamparados", "Puriscal", "Tarrazú", "Asserí", "Mora", "Goicoechea", "Santa Ana", "Alajuelita", "Vásquez de Coronado", "Acosta", "Tibás", "Moravia", "Montes de Oca", "Turrubares", "Dota", "Curridabat", "Pérez Zeledón", "León Cortés"];
    // }
    // if (provincia == "Puntarenas") {
    //     cantones = ["Puntarenas", "Esparza", "Buenos Aires", "Montes de Oro", "Osa", "Quepos", "Golfito", "Coto Brus", "Parrita", "Corredores", "Garabito"]
    // }
    // if (provincia == "Alajuela") {
    //     cantones = ["Alajuela", "San Ramón", "Grecia", "San Mateo", "Atenas", "Naranjo", "Palmares",
    //         "Poás", "Orotina", "San Carlos", "Zarcero", "Valverde Vega", "Upala", "Los Chiles", "Guatuso", "Río Cuarto"]
    // }

    // if (provincia == "Cartago") {
    //     cantones = ["Cartago", "Paraíso", "La Unión", "Jiménez", "Turrialba", "Alvarado", "Oreamuno", "El Guarco"]
    // }

    // if (provincia == "Heredia") {
    //     cantones = ["Heredia", "Barva", "Santo Domingo", "Santa Bárbara", "San Rafael", "San Isidro", "Belén", "Flores",
    //         "San Pablo", "Sarapiquí"]
    // }

    // if (provincia == "Guanacaste") {
    //     cantones = ["Liberia", "Nicoya", "Santa Cruz", "Bagaces", "Carrillo", "Cañas", "Abangares", "Tilarán", "Nandayure", "La Cruz", "Hojancha"]
    // }

    // if (provincia == "Limón") {
    //     cantones = ["Limón", "Pococí", "Siquirres", "Talamanca", "Matina", "Guácimo"]
    // }
    // return cantones;
}

function obtenerDistritos(canton) {
    distritoEncontrado = false;
    let distritos = "";
    // if (canton == "San José") { distritos = ["Carmen", "Merced", "Hospital", "Catedral", "Zapote", "San Francisco de Dos Ríos", "La Uruca", "Mata Redonda", "Pavas", "Hatillo", "San Sebastián"]; }
    // if (canton == "Escazú") { distritos = ["Escazú Centro", "San Rafael", "San Antonio"]; }
    // if (canton == "Desamparados") { distritos = ["Desamparados", "San Miguel", "San Juan de Dios", "San Rafael Arriba", "San Antonio", "Frailes", "Patarrá", "San Cristóbal", "Rosario", "Damas", "San Rafael Abajo", "Gravilias", "Los Guido"]; }
    // if (canton == "Puriscal") { distritos = ["Santiago", "Mercedes Sur", "Barbacoas", "Grifo Alto", "San Rafael", "Candelarita", "Desamparaditos", "San Antonio", "Chires"]; } if (canton == "Tarrazú") { distritos = ["San Marcos", "San Lorenzo", "San Carlos"]; }
    // if (canton == "Asserí") { distritos = ["Asserí", "Tarbaca", "Vuelta de Jorco", "San Gabriel", "Legua", "Monterrey", "Salitrillos"]; }
    // if (canton == "Mora") { distritos = ["Colón", "Guayabo", "Tabarcia", "Piedras Negras", "Picagres", "Jaris", "Quitirrisí"]; }
    // if (canton == "Goicoechea") { distritos = ["Guadalupe", "San Francisco", "Calle Blancos", "Mata de Plátano", "Ipís", "Rancho Redondo", "Purral"]; }
    // if (canton == "Santa Ana") { distritos = ["Santa Ana", "Salitral", "Pozos", "Uruca", "Piedades", "Brasil"]; }
    // if (canton == "Vásquez de Coronado") { distritos = ["San Isidro", "San Rafael", "Dulce Nombre de Jesús", "Patalillo", "Cascajal"]; }
    // if (canton == "Alajuelita") { distritos = ["Alajuelita", "San Josecito", "San Antonio", "Concepción", "San Felipe", "Barrio Lámparas"]; }
    // if (canton == "Acosta") { distritos = ["San Ignacio", "Guaitil", "Palmichal", "Cangrejal", "Sabanillas"]; }
    // if (canton == "Tibás") { distritos = ["San Juan de Tibás", "Cinco Esquinas", "Anselmo Llorente", "León XIII", "Colima"]; }
    // if (canton == "Moravia") { distritos = ["San Vicente", "San Jerónimo", "La Trinidad"]; }
    // if (canton == "Montes de Oca") { distritos = ["San Pedro", "Sabanilla", "Mercedes", "San Rafael"]; }
    // if (canton == "Turrubares") { distritos = ["San Pablo", "San Pedro", "San Juan de Mata", "San Luis", "Carara"]; }
    // if (canton == "Dota") { distritos = ["Santa María", "Jardín", "Copey"]; }
    // if (canton == "Curridabat") { distritos = ["Curridabat", "Granadilla", "Sánchez", "Tirrases"]; }
    // if (canton == "Pérez Zeledón") { distritos = ["San Isidro de El General", "El General", "Daniel Flores", "Rivas", "San Pedro", "Platanares", "Pejibaye", "Cajón", "Barú", "Río Nuevo", "Páramo", "La Amistad"]; }
    // if (canton == "León Cortés") { distritos = ["San Pablo", "San Andrés", "Llano Bonito", "San Isidro", "Santa Cruz", "San Antonio"]; }
    // if (canton == "Alajuela") { distritos = ["Alajuela", "San José", "Carrizal", "San Antonio", "Guácima", "San Isidro", "Sabanilla", "San Rafael de Ojo de Agua", "Río Segundo", "Desamparados", "Turrúcares", "Tambor", "La Garita", "Sarapiquí"]; }
    // if (canton == "San Ramón") { distritos = ["San Ramón", "Santiago", "San Juan", "Piedades Norte", "Piedades Sur", "San Rafael", "San Isidro", "Ángeles", "Alfaro", "Volio", "Concepción", "Zapotal", "Peñas Blancas", "San Lorenzo"]; }
    // if (canton == "Grecia") { distritos = ["Grecia", "San Isidro", "San José", "San Roque", "Tacares", "Puente de Piedra", "Bolívar"]; }
    // if (canton == "San Mateo") { distritos = ["San Mateo", "Desmonte", "Jesús María", "Labrador"]; }
    // if (canton == "Atenas") { distritos = ["Atenas", "Jesús", "Mercedes", "San Isidro", "Concepción: Río Grande", "San José: San José Sur", "Santa Eulalia", "Escobal"]; }
    // if (canton == "Naranjo") { distritos = ["Naranjo", "San Miguel", "San José", "Cirrí", "San Jerónimo", "San Juan", "Rosario", "Palmitos"]; }
    // if (canton == "Palmares") { distritos = ["Palmares", "Zaragoza", "Buenos Aires", "Santiago", "Candelaria", "Esquipulas", "La Granja"]; }
    // if (canton == "Poás") { distritos = ["San Pedro", "San Juan", "San Rafael", "Carrillos", "Sabana Redonda"]; }
    // if (canton == "Orotina") { distritos = ["Orotina", "El Mastate", "Hacienda Vieja", "Coyolar", "La Ceiba"]; }
    // if (canton == "San Carlos") { distritos = ["Quesada", "Florencia", "Buenavista", "Aguas Zarcas", "Venecia", "Pital", "La Fortuna", "La Tigra", "La Palmera", "Venado", "Cutris", "Monterrey", "Pocosol"]; }
    // if (canton == "Zarcero") { distritos = ["Zarcero", "Laguna", "Tapezco", "Guadalupe", "Palmira", "Zapote", "Brisas"]; }
    // if (canton == "Valverde Vega") { distritos = ["Sarchí Norte", "Sarchí Sur", "Toro Amarillo", "San Pedro", "Rodríguez"]; }
    // if (canton == "Upala") { distritos = ["Upala", "Aguas Claras", "San José", "Bijagua", "Delicias", "Dos Ríos", "Yolillal", "Canalete"]; }
    // if (canton == "Los Chiles") { distritos = ["Los Chiles", "Caño Negro", "El Amparo", "San Jorge"]; }
    // if (canton == "Guatuso") { distritos = ["San Rafael", "Buenavista", "Cote", "Katira"]; }
    // if (canton == "Río Cuarto") { distritos = ["Ángeles Norte", "Bolaños", "Bosque Alegre", "Caño Negro", "El Carmen", "Carrizal", "Colonia del Toro", "Crucero", "La Flor", "Hule", "La Trinidad", "Laguna", "Los Lagos", "La Merced", "Montelirio", "Naranjales", "Palmar", "Palmera", "Pata de Gallo", "Peoresnada", "El Pinar", "Pueblo Nuevo", "San Fernando", "San Gerardo", "San Jorge", "San José", "San Rafael", "San Vicente", "Santa Isabel", "Santa Rita", "La Tabla", "La Victoria"]; }
    // if (canton == "Cartago") { distritos = ["Oriental", "Occidental", "Carmen", "San Nicolás(Taras){ ", "Agua Caliente(San Francisco){ ", "Guadalupe(Arenilla){ ", "Corralillo", "Tierra Blanca", "Dulce Nombre", "Llano Grande", "Quebradilla"]; }
    // if (canton == "Paraíso") { distritos = ["Paraíso", "Orosi", "Cachí", "Santiago", "Llanos de Santa Lucía"]; }
    // if (canton == "La Unión") { distritos = ["Tres Ríos", "San Diego", "San Juan", "San Rafael", "Concepción", "Dulce Nombre", "San Ramón", "Río Azul"]; }
    // if (canton == "Jiménez") { distritos = ["Juan Viñas", "Tucurrique", "Pejibaye"]; }
    // if (canton == "Turrialba") { distritos = ["Turrialba", "La Suiza", "Peralta", "Santa Cruz", "Teresita", "Pavones", "Tuis", "Tayutic", "Santa Rosa", "Tres Equis", "La Isabe", "Chirripó"]; }
    // if (canton == "Alvarado") { distritos = ["Villa de Pacayas", "Distrito Cervantes", "Santa Cruz", "Capellades"]; }
    // if (canton == "Oreamuno") { distritos = ["San Rafael", "Cot", "Potrero Cerrado", "Potrero Cerrado", "Santa Rosa"]; }
    // if (canton == "El Guarco") { distritos = ["El Tejar", "San Isidro", "Tobosi", "Patio de Agua"]; }
    // if (canton == "Limón") { distritos = ["Limón", "Valle La Estrella", "Liverpool", "Matama"]; }
    // if (canton == "Pococí") { distritos = ["Guápiles", "Jiménez", "La Rita", "Roxana", "Cariari", "Colorado", "La Colonia"]; }
    // if (canton == "Siquirres") { distritos = ["Siquirres", "Pacuarito", "Florida", "Germania", "Cairo", "Alegría"]; }
    // if (canton == "Talamanca") { distritos = ["Bratsi", "Sixaola", "Cahuita", "Telire"]; }
    // if (canton == "Matina") { distritos = ["Matina", "Bataán", "Carrandí"]; }
    // if (canton == "Guácimo") { distritos = ["Guácimo", "Mercedes", "Pocora", "Río Jiménez", "Duacarí"]; }
    // if (canton == "Puntarenas") { distritos = ["Puntarenas", "Pitahaya", "Chomes", "Lepanto", "Paquera", "Manzanillo", "Guacimal", "Barranca", "Monteverde", "Isla del Coco", "Cóbano", "Chacarita", "Chira", "Acapulco", "El Roble", "Arancibia"]; }
    // if (canton == "Esparza") { distritos = ["Espíritu Santo", "San Juan Grande", "Macacona", "San Rafael", "San Jerónimo", "Caldera"]; }
    // if (canton == "Buenos Aires") { distritos = ["Buenos Aires", "Volcán", "Potrero Grande", "Boruca", "Pilas", "Colinas", "Chánguena", "Biolley", "Brunka"]; }
    // if (canton == "Montes de Oro") { distritos = ["Miramar", "La Unión", "San Isidro"]; }
    // if (canton == "Osa") { distritos = ["Cortés", "Palmar", "Sierpe", "Bahía Ballena", "Piedras Blancas", "Bahía Drake"]; }
    // if (canton == "Quepos") { distritos = ["Quepos", "Savegre", "Naranjito"]; }
    // if (canton == "Golfito") { distritos = ["Golfito", "Puerto Jiménez", "Guaycará", "Pavón", "Puerto Jiménez", "Guaycará", "Pavón"]; }
    // if (canton == "Coto Brus") { distritos = ["San Vito", "Sabalito", "Aguabuena", "Limoncito", "Pittier", "Gutiérrez Brown"]; }
    // if (canton == "Parrita") { distritos = ["Parrita"]; }
    // if (canton == "Corredores") { distritos = ["Corredor", "La Cuesta", "Paso Canoas", "Laurel", "Gutiérrez Brown"]; }
    // if (canton == "Garabito") { distritos = ["Jacó", "Tárcoles"]; }
    // if (canton == "Heredia") { distritos = ["Heredia", "Mercedes", "San Francisco", "Ulloa", "Vara Blanca"]; }
    // if (canton == "Barva") { distritos = ["Barva ", "San Pedro", "San Pablo", "San Roque", "Santa Lucía", "San José de la Montaña"]; }
    // if (canton == "Santo Domingo") { distritos = ["Santo Domingo ", "San Vicente", "San Miguel", "Paracito", "Santo Tomás", "Santa Rosa", "Tures", "Pará"]; } if (canton == "Santa Bárbara") { distritos = ["Santa Bárbara ", "San Pedro", "San Juan", "Jesús", "Santo Domingo", "Purabá"]; }
    // if (canton == "San Rafael") { distritos = ["San Rafael ", "San Josecito", "Santiago", "Los Ángeles", "Concepción"]; }
    // if (canton == "San Isidro") { distritos = ["San Isidro ", "San José", "Concepción", "San Francisco"]; }
    // if (canton == "Belén") { distritos = ["San Antonio ", "La Ribera", "La Asunción"]; }
    // // if (canton == "Flores") { distritos = ["San Joaquín ", "Barrantes", "Llorente"]; }
    // if (canton == "San Pablo") { distritos = ["San Pablo ", "Rincón de Sabanilla"]; }
    // if (canton == "Sarapiquí") { distritos = ["Puerto Viejo ", "La Virgen", "Horquetas", "Llanuras del Gaspar", "Cureña"]; }
    // if (canton == "Liberia") { distritos = ["Liberia", "Cañas Dulces", "Mayorga", "Nacascolo", "Curubandé"]; }
    // if (canton == "Nicoya") { distritos = ["Nicoya", "Mansión", "San Antonio", "Quebrada Honda", "Sámara", "Nosara", "Belén de Nosarita"]; }
    // if (canton == "Santa Cruz") { distritos = ["Santa Cruz", "Bolsón", "Veintisiete de Abril", "Tempate", "Cartagena", "Cuajiniquil", "Diriá", "Cabo Velas", "Tamarindo"]; }
    // if (canton == "Bagaces") { distritos = ["Bagaces", "La Fortuna", "Mogote", "Río Naranjo"]; }
    // if (canton == "Carrillo") { distritos = ["Filadelfia", "Belén", "Palmira", "Sardinal"]; }
    // if (canton == "Cañas") { distritos = ["Cañas", "Palmira", "San Miguel", "Bebedero", "Porozal"]; }
    // if (canton == "Abangares") { distritos = ["Las Juntas", "Sierra", "San Juan", "Colorado"]; }
    // if (canton == "Tilarán") { distritos = ["Tilarán", "Quebrada Grande", "Tronadora", "Santa Rosa", "Líbano", "Tierras Morenas", "Arenal"]; }
    // if (canton == "Nandayure") { distritos = ["Carmona", "Santa Rita", "Zapotal", "San Pablo", "Porvenir", "Bejuco"]; }
    // if (canton == "La Cruz") { distritos = ["La Cruz", "Santa Cecilia", "La Garita", "Santa Elena"]; }
    // if (canton == "Hojancha") { distritos = ["Hojancha", "Monte Romo", "Puerto Carrillo", "Huacas", "Matambú"] };
    // if (distritos == "") {
    //     console.log("[ERROR] No se encontró el distrito para el cantón " + canton);
    // }
    // return distritos;
}

function cargarDistritos() {
    // let sltCantones = document.querySelector("#sltCanton");
    // let sltDistritos = document.querySelector("#sltDistrito");
    // let sltCanton = sltCantones.value;
    // if (sltCanton == "") { } else {
    //     let distritosPertenecientes = obtenerDistritos(sltCanton);
    //     sltDistritos.innerHTML = '';
    //     let optionSeleccione = document.createElement('option');
    //     optionSeleccione.value = "";
    //     optionSeleccione.innerHTML = "--Seleccione un distrito--";
    //     optionSeleccione.hidden = true;
    //     sltDistritos.appendChild(optionSeleccione);
    //     for (let i = 0; i < distritosPertenecientes.length; i++) {
    //         let nuevaOpcion = document.createElement('option');
    //         nuevaOpcion.value = distritosPertenecientes[i];
    //         nuevaOpcion.innerHTML = distritosPertenecientes[i];
    //         sltDistritos.appendChild(nuevaOpcion);
    //     }
    // }
}

function cargarCantones() {
    let sltProvincia = document.querySelector("#sltProvincia");
    let sltCantones = document.querySelector("#sltCanton");
    sltProv = sltProvincia.value;
    if (sltProv == "") { } else {
        let cantonesPertenecientes = obtenerCantones(sltProv);
        sltCantones.innerHTML = '';
        let optionSeleccione = document.createElement('option');
        optionSeleccione.value = "";
        optionSeleccione.innerHTML = "--Seleccione un cantón--";
        optionSeleccione.hidden = true;
        sltCantones.appendChild(optionSeleccione);
        for (let i = 0; i < cantonesPertenecientes.length; i++) {
            let nuevaOpcion = document.createElement('option');
            nuevaOpcion.value = cantonesPertenecientes[i];
            nuevaOpcion.innerHTML = cantonesPertenecientes[i];
            sltCantones.appendChild(nuevaOpcion);

        }
    }
}

