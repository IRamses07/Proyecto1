'use strict';

let datos = document.querySelector('#datosUsuario');
let extraDatos = document.querySelector('#infoUsuario');
let infoContacto2 = document.querySelector('#infoContacto2');

getInfo();

function getInfo(){
    let infoEstudiante = getInfoEstudiante();
    infoPersonal(infoEstudiante);
    infoContacto(infoEstudiante);
    imprimirListaCursos (infoEstudiante)
};

function infoPersonal(infoEstudiante){
    let contenido ='';
    let contenido2 = '';
    document.querySelector('#perfiImagen').src = infoEstudiante[0]['foto'];
    
    if(infoEstudiante[0]['apellido2'] !== ''){
        contenido+='<h3>'+infoEstudiante[0]['Nombre1']+' '+infoEstudiante[0]['apellido1']+' '+infoEstudiante[0]['apellido2']+'</h3>';
    }else{
        contenido+='<h3>'+infoEstudiante[0]['Nombre1']+' '+infoEstudiante[0]['apellido1']+'</h3>';
    }
    contenido+='<h4 class="secundario">'+infoEstudiante[0]['carrera']+'</h4>';

    datos.innerHTML=contenido;

    contenido2+='<h4>Cédula: '+infoEstudiante[0]['cedula']+'</h4>';
    contenido2+='<h4>'+seleccionarProvincia(infoEstudiante[0]['provincia'])+', '+seleccionarCanton(infoEstudiante[0]['provincia'],infoEstudiante[0]['canton'])+', '+seleccionarDistrito(infoEstudiante[0]['canton'],infoEstudiante[0]['provincia'],infoEstudiante[0]['distrito'])+'</h4>';
    contenido2+='<h4>Teléfono: '+infoEstudiante[0]['telefono']+'</h4>';
    contenido2+='<h4>Correo: '+infoEstudiante[0]['correo']+'</h4>';

    extraDatos.innerHTML=contenido2;
}

function infoContacto(infoEstudiante){
    let contenido='';

    if(infoEstudiante[0]['contApellido2'] !== ''){
        contenido+='<h5>Nombre: '+infoEstudiante[0]['contNombre1']+' '+infoEstudiante[0]['contApellido1']+' '+infoEstudiante[0]['contApellido2']+'</h5>\n';
    }else{
        contenido+='<h5>Nombre: '+infoEstudiante[0]['contNombre1']+' '+infoEstudiante[0]['contApellido1']+'</h5>\n';
    }   

    contenido+='<hr class="list">\n';
    contenido+='<h5>Teléfono: '+infoEstudiante[0]['contTelefono']+'</h5>\n';
    contenido+='<hr class="list">\n';
    contenido+='<h5>Correo: '+infoEstudiante[0]['contCorreo']+'</h5>\n';
    infoContacto2.innerHTML = contenido;
}

function imprimirListaCursos (infoEstudiante){
    let CursosString = infoEstudiante[0]['cursosAprobados'];
    let listaCursos = JSON.parse(CursosString);
    console.log(listaCursos);

    //[["cu01","2-2017","Fundamentos de programación"],["cu02","2-2017","Proyecto de ingenieria del software 1"]]

    let tbody = document.querySelector('#tblCursos tbody');
    tbody.innerHTML = '';
         
    for(let i = 0; i < listaCursos.length; i++){
        let fila = tbody.insertRow();

        let cCurso = fila.insertCell();
        let cCiclo = fila.insertCell();
        let cNomCurso = fila.insertCell();
   
        cCurso.innerHTML = listaCursos[i][0];
        cCiclo.innerHTML = listaCursos[i][1];
        cNomCurso.innerHTML = listaCursos[i][2];
    }
}

function seleccionarProvincia(numero){
    let provincia = ['San José','Alajuela','Cartago','Heredia','Guanacaste','Puntarenas','Limon'];
    console.log(provincia[numero]);
    return provincia[numero];
};

function seleccionarCanton(numero,numero2){
    let entrada=numero;
    let list;

    let listaCantones1=['Acosta','Alajuelita','Aserrí','Curridabat','Desamparados','Dota','Escazú','Goicochea','León Cortés','Montes de Oca','Mora','Moravia','Pérez Zeledon','Puriscal','San Jose','Santa Ana','Tarrazú','Tibás','Turrubares','Vásquez de Coronado'];
    let listaCantones2=['Alajuela','Atenas','Grecia','Guatuso','Los Chiles','Naranjo','Orotina','Palmares','Poás','Río Cuarto','San Carlos','San Mateo','San Ramón','Upala','Valverde Vega','Zarcero'];
    let listaCantones3=['Alvarado','Cartago','El Guarco','Jiménez','La Unión','Oreamuno','Paraíso','Turrialba'];
    let listaCantones4=['Barva','Belén','Flores','Heredia','San Isidro','San Pablo','San Rafae','Santa Bárbara','Santo Domingo','Sarapiquí'];
    let listaCantones5=['Abangares','Bagaces','Cañas','Carrillo','Nicoya','Hojancha','La Cruz','Liberia','Nandayure','Santa Cruz','Tilarán'];
    let listaCantones6=['Buenos Aires','Corredores','Coto Brus','Esparza','Garabito','Golfito','Montes de Oro','Osa','Parrita','Puntarenas','Quepos'];
    let listaCantones7=['Guácimo','Limón','Matina','Pococí','Siquirres','Talamanca'];
       
    switch(entrada){
        case 0:
            list=listaCantones1;
            break;
        case 1:
            list=listaCantones2;
            break;
        case 2:
            list=listaCantones3;
            break;
        case 3:
            list=listaCantones4;
            break;
        case 4:
            list=listaCantones5;
            break;
        case 5:
            list=listaCantones6;
            break;
        case 6:
            list=listaCantones7;
            break;
    }
    return list[numero2];
}

function seleccionarDistrito(canton,provincia,distrito){
    let list;

    let distritos1 = [['San Ignacio','Guaitil','Palmichal','Cangrejal','Sabanillas'],['Alajuelita','San Josecito','San Antonio','Concepción','San Felipe'],['Aserrí','Tarbaca','Vuelta de Jorco','San Gabriel','Legua','Monterrey','Salitrillos'],['Curridabat','Granadilla','Sánchez','Tirrases'],['Desamparados','San Miguel','San Juan de Dios','San Rafael Arriba','San Antonio','Frailes','Patarrá','San Cristóbal','Rosario','Rosario','Damas','San Rafael Abajo','Gravillias','Los Guido'],['Santa María','Jardín','Copey'],['Escazú','San Antonio','San Rafael'],['Guadalupe','San Francisco','Calle Blancos','Mata de Plátano','Ipís','Rancho Redondo','Purral'],['San Pablo','San Andrés','Llano Bonito','San Isidro','Santa Cruz','San Antonio'],['San Pedro','Sabanilla','Mercedes','San Rafael'],['Ciudad Colón','Guayabo','Tabarcia','Piedras Negras','Picagres','Jaris','Quitirrisí'],['San Vicente','San Jerónimo','Trinidad'],['San Isidro de El General','El General','Daniel Flores','Rivas','San Pedro','Platanares','Pejibaye','Cajón','Barú','Río Nuevo','Páramo','La Amistad'],['Santiago','Mercedes Sur','Barbacoas','Grifo Alto','San Rafael','Candelarita','Desamparados','San Antonio','Chires','La Cangreja'],['Carmen','Merced','Hospital','Catedral','Zapote','San Francisco de Dos Ríos','Uruca','Mata Redonda','Pavas','Hatillo'], ['Santa Ana','Salitral','Pozos','Uruca','Piedades','Brasil'], ['San Marcos','San Lorenzo','San Carlos'], ['San Juan','Cinco Esquinas','Anselmo Llorente','León XIII','Colima'], ['San Pablo','San Pedro','San Luis','Carara','San Juan de Mata'], ['San Isidro','San Rafael','Dulce Nombre de Jesús','Patalillo','Cascajal']];
    let distritos2 = [['Alajuela','San José','Carrizal','San Antonio','Guácima','San Antonio','Guácima','San Isidro','Sabanilla','San Rafael','Río Segundo','Desamparados','Turrúcares','Tambor','Garita','Sarapiquí'], ['Atenas','Jesús','Mercedes','San Isidro','Concepción','San José','SantaEulalia','Escobal'], ['Grecia','San Isidro','San José','San Roque','Tacares','Puente de Piedra','Bolíbar'], ['San Rafael','Buenavista','Cote','Katira'], ['Los Chiles','Caño Negro','El Amparo','San Jorge'], ['Naranjo','San Miguel','San José','Cirrí','San Jerónimo','San Juan','El Rosario','Palmitos'], ['Orotina','Mastate','Hacienda Vieja','Coyolar','La Ceiba'], ['Palmares','Zaragoza','Buenos Aires','Santiago','Candelaria','Esquipulas','La Granja'], ['San Pedro','San Juan','San Rafael','Carrillos','Sabana Redonda'], ['rio Cuarto'], ['Quesada','Florencia','Buenavista','Aguas Zarcas','Venecia','Pital','La Fortuna','La Tigra','La Palmera','Venado','Cutris','Monterrey','Pocosol'], ['San Mateo','Desmonte','Jesús María','Labrador'], ['San Ramón','Santiago','San Juan','Piedades Norte','Piedades Sur','San Rafael','San Isidro','Ángeles','Alfaro','Volio','Concepción','Zapotal','Peñas Blancas','San Lorenzo'], ['Upala','Aguas Claras','San José','Bijagua','Delicias','Dos Ríos','Yolillal','Canalete'], ['Sarchí Norte','Sarchí Sur','Toro Amarillo','San Pedro','Rodríguez'], ['Zarcero','Laguna','Tapezco','Guadalupe','Palmira','Zapote','Brisas']];
    let distritos3 = [['Pacayas','Cervantes','Capellades'], ['Oriental','Occidental','Carmen','San Nicolás','Agua Caliente','Guadalupe','Corralillo','Tierra Blanca','Dulce Nombre','Llano Grande','Quebradilla'], ['Tejar','San Isidro','Tobosi','Patio de Agua'], ['Juan viñas','Tucurrique','Pejibaye','Turrialba'], ['Tres Ríos','San Diego','San Juan','San Rafael','Concepción','Dulce Nombre','San Ramón','Río Azul'], ['San Rafael','Cot','Potrero Cerrado','Cipreses','Santa Rosa'], ['Paraíso','Santiago de Paraiso','Orosi','Cachí','Llanos de Santa Lucía'], ['Turrialba','La Suiza','Peralta','Santa Cruz','Santa Teresita','Pavones','Tuis','Tayutic','Santa Rosa','Tres Equis','La Isabel','Chirripó']];
    let distritos4 = [['Barva','San Pedro','San Pablo','San Roque','Santa Lucía','San José de la Montaña'], ['San Antonio','La Ribera','La Asunción'], ['San Joaquím','Barrantes','Llorente'], ['Heredia','Mercedes','San Francisco','Ulloa','Vara Blanca'], ['San Isidro','San José','Concepción','San Francisco'], ['San Pablo','Rincón de Sabanilla'], ['San Rafael','San Josecito','Santiago','Concepción'], ['Santa Bárbara','San Pedro','San Juan','Jesús','Santo Domingo','Purabá'], ['Santo Domingo','San Vicente','San Miguel','Paracito','Santo Tomás','Santa Rosa','Tures','Pará'], ['Puerto Viejo','La Virgen','Horquetas','Llanuras de Gaspar','Cureña']];
    let distritos5 = [['Las Juntas','Sierra','San Juan','Colorado'], ['Bagaces','La Fortuna','Mogote','Río Naranjo'], ['Cañas','Palmira','San Miguel','Bebedero','Porozal'], ['Filadelfia','Palmiral','Sardinal','Belén'], ['Nicoya','Mansión','San Antonio','Quebrada Honda','Sámara','Nosara','Belén de Nosarita'], ['Hojancha','Monte Romo','Puerto Carrillo','Huacas','Matambú'], ['La Cruz','Santa Cecilia','La Garita','Santa Elena'], ['Liberia','Cañas Dulces','Mayorga','Nacascolo','Curubandé'], ['Carmona','Santa Rita','Zapotal','San Pablo','Porvenir','Bejuco'], ['Santa Cruz','Bolsón','Veintisiete de Abril','Tempate','Cartagena','Cuajiniquil','Diriá','Cabo Velas','Tamarindo'], ['Tilarán','Quebrada Grande','Tronadora','Santa Rosa','Libano','Tierras Morenas','Arenal']];
    let distritos6 = [['Buenos Aires','Volcán','Potrero Grande','Boruca','Pilas','Colinas','Chánguena','Biolley','Brunka'],['Corredor','LaCuesta','Paso Canoas','Laurel'],['San Vito','Sabalito','Aguabuena','Limoncito','Pittier','Gutiérrez Brown'],['Espíritu Santo','San Juan Grande','Macacona','San Rafael','San Jerónimo','Caldera'],['Jacó','Tárcoles'],['Golfito','Puerto Jiménez','Guaycará','Pavón'],['Miramar','La Unión','San Isidro',],['Cortés','Palmar','Sierpe','Bahía Ballena','Piedras Blancas','Bahía Drake'],['Parrita'],['Pauntarenas','Pitahaya','Chomes','Lepanto','Paquera','Manzanillo','Guacimal','Barranca','Monteverde','Isla del Coco','Cóbano','Chacarita','Chira','Acapulco','El Roble','Arancibia'],['Quepos','Savegre','Naranjito']];
    let distritos7 = [['Guácimo','Mercedes','Pocora','Rio Jimenéz','Duacari'],['Limón','Valle La Estrella','Río Blanco','Matama'],['Matina','Batán','Carrandi'],['Guápiles','Jimenéz','La Rita','Roxana','Cariari','Colorado','La Colonia'],['Siquirres','Pacuarito','Florida','Germania','Cairo','Alegría'],['Bratsi','Sixaola','Cahuita','Telire']];

    switch(provincia){
        case 0:
            list=distritos1;
            break;
        case 1:
            list=distritos2;
            break;
        case 2:
            list=distritos3;
            break;
        case 3:
            list=distritos4;
            break;
        case 4:
            list=distritos5;
            break;
        case 5:
            list=distritos6;
            break;
        case 6:
            list=distritos7;
            break;
    }
   return list[canton][distrito];
};