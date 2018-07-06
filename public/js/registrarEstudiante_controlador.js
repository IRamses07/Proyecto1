'use strict';
//Boton Registrar Estudiante
let buttonRegistrar = document.querySelector('#butRegistrar');
buttonRegistrar.addEventListener('click', getDatos);

//Boton 'Agregar' Seleccionar Curso
let buttonAgregarCurso = document.querySelector('#butAgregar');
buttonAgregarCurso.addEventListener('click',getCurso);

//Seleccionar provincia
let selecccionProvincia = document.querySelector('#selecProvincia');
selecccionProvincia.addEventListener('click', function(){
    if(selecccionProvincia.value.length !== 0){
        seleccionarCanton(selecccionProvincia.value);;
    }
});

//Seleccionar Canton
let seleccionCanton = document.querySelector('#selectCanton');
seleccionCanton.addEventListener('click', function(){
    console.log(selecccionProvincia.value);
    console.log(seleccionCanton.value);
    if(seleccionCanton.value.length !== 0){
        seleccionarDistrito(seleccionCanton.value,selecccionProvincia.value);
    }
});

//DatosEstudiante
let inputCedula = document.querySelector('#estCedula');
let inputNombre1 = document.querySelector('#estnombre1');
let inputNombre2 = document.querySelector('#estnombre2');
let inputApellido1 = document.querySelector('#estapellido1');
let inputApellido2 = document.querySelector('#estapellido2');
let inputTelefono = document.querySelector('#esttelefono');
let inputCorreo = document.querySelector('#estcorreo');
let inputDireccion = document.querySelector('#estDireccion');
let selectCanton = document.querySelector('#selectCanton');
let selectDistrito = document.querySelector('#selectDistrito');
let selectProvincia = document.querySelector('#selecProvincia');

//DatosCurso
let selectCarrera = document.querySelector('#selectCarrera');
let selectCiclo = document.querySelector('#selectCiclo');
let selectCurso = document.querySelector('#selectCurso');

//DatosContacto
let inputConNombre1 = document.querySelector('#conNombre1');
let inputConNombre2 = document.querySelector('#conNombre2');
let inputConApellido1 = document.querySelector('#conApellido1');
let inputConApellido2 = document.querySelector('#conApellido2');
let inputConTelefono = document.querySelector('#conTelefono');
let inputConCorreo = document.querySelector('#conCorreo');

function getDatos(){
    let infoEstudiante=[];
    let sError = false;

    infoEstudiante.push(inputCedula.value,inputNombre1.value,inputNombre2.value,inputApellido1.value,inputApellido2.value,inputTelefono.value,inputCorreo.value,inputDireccion.value,selecccionProvincia.value,selectCanton.value,selectDistrito.value,selectCarrera.value,inputConNombre1.value,inputConNombre2.value,inputConApellido1.value,inputConApellido2.value,inputConTelefono.value,inputConCorreo.value);
    
    console.log(infoEstudiante);

    sError = validar();
    if(sError==true){
        swal({
            type : 'warning',
            title : 'No se pudo registrar el estudiante',
            text: 'Por favor revise los campos en rojo',
            confirmButtonText : 'OK'
        });
        console.log('No se pudo registrar el usuario');
    }else{
        registrarEstudiante(infoEstudiante);
        swal({
            type : 'success',
            title : 'Registro exitoso',
            text: 'El estudiante se registró exitosamente',
            confirmButtonText : 'OK'
        });
    }
}

function validar(){
    let sError = false;

    let checkSoloLetras = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]+$/;
    let checkFormatoNumeral = /^[0-9 -]+$/;
    let checkFormatoEmail = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

    //Inicio validacion Datos Estudiante:
    //Validar Cedula
    if(inputCedula.value == '' || (checkFormatoNumeral.test(inputCedula.value)==false) ){
        inputCedula.classList.add('error_input');
        sError = true;
    }else{
        inputCedula.classList.remove('error_input');
    }
    //Validar Nombre1
    if(inputNombre1.value == '' || (checkSoloLetras.test(inputNombre1.value)==false) ){
        inputNombre1.classList.add('error_input');
        sError = true;
    }else{
        inputNombre1.classList.remove('error_input');
    } 
    //Validar Nombre2
    if(inputNombre2.value == '' || (checkSoloLetras.test(inputNombre2.value)==false) ){
        inputNombre2.classList.add('error_input');
        sError = true;
    }else{
        inputNombre2.classList.remove('error_input');
    }
    //Validar Apellido1
    if(inputApellido1.value == '' || (checkSoloLetras.test(inputApellido1.value)==false) ){
        inputApellido1.classList.add('error_input');
        sError = true;
    }else{
        inputApellido1.classList.remove('error_input');
    }
    //Validar Apellido2
    if(inputApellido2.value == '' || (checkSoloLetras.test(inputApellido2.value)==false) ){
        inputApellido2.classList.add('error_input');
        sError = true;
    }else{
        inputApellido2.classList.remove('error_input');
    }
    //Validar Telefono
    if(inputTelefono.value == '' ){
        inputTelefono.classList.add('error_input');
        sError = true;
    }else{
        inputTelefono.classList.remove('error_input');
    }
    //Validar Correo
    if(inputCorreo.value == '' || (checkFormatoEmail.test(inputCorreo.value)==false) ){
        inputCorreo.classList.add('error_input');
        sError = true;
    }else{
        inputCorreo.classList.remove('error_input');
    }
    //Validar Direccion
    if(inputDireccion.value == '' ){
        inputDireccion.classList.add('error_input');
        sError = true;
    }else{
        inputDireccion.classList.remove('error_input');
    }
    if(selectProvincia.value == '' ){
        selectProvincia.classList.add('error_input');
        sError = true;
    }else{
        selectProvincia.classList.remove('error_input');
    }
    //Validar Seleccion de Canton
    if(selectCanton.value == '' ){
        selectCanton.classList.add('error_input');
        sError = true;
    }else{
        selectCanton.classList.remove('error_input');
    }
    //Validar Seleccion de Distrito
    if(selectDistrito.value == '' ){
        selectDistrito.classList.add('error_input');
        sError = true;
    }else{
        selectDistrito.classList.remove('error_input');
    }
    //Inicio Validacion Datos Contacto:
    //Validar Nombre1 Contacto:
    if(inputConNombre1.value == '' || (checkSoloLetras.test(inputConNombre1.value)==false) ){
        inputConNombre1.classList.add('error_input');
        sError = true;
    }else{
        inputConNombre1.classList.remove('error_input');
    }
    //Validar Nombre2 Contacto:
    if(inputConNombre2.value == '' || (checkSoloLetras.test(inputConNombre2.value)==false) ){
        inputConNombre2.classList.add('error_input');
        sError = true;
    }else{
        inputConNombre2.classList.remove('error_input');
    }
    //Validar Apellido1 Contacto:
    if(inputConApellido1.value == '' || (checkSoloLetras.test(inputConApellido1.value)==false) ){
        inputConApellido1.classList.add('error_input');
        sError = true;
    }else{
        inputConApellido1.classList.remove('error_input');
    }
    //Validar Apellido2 Contacto:
    if(inputConApellido2.value == '' || (checkSoloLetras.test(inputConApellido2.value)==false) ){
        inputConApellido2.classList.add('error_input');
        sError = true;
    }else{
        inputConApellido2.classList.remove('error_input');
    }
    //Validar Telefono Contacto:
    if(inputConTelefono.value == '' ){
        inputConTelefono.classList.add('error_input');
        sError = true;
    }else{
        inputConTelefono.classList.remove('error_input');
    }
    //Validar Correo Contacto:
    if(inputConCorreo.value == '' || (checkFormatoEmail.test(inputConCorreo.value)==false) ){
        inputConCorreo.classList.add('error_input');
        sError = true;
    }else{
        inputConCorreo.classList.remove('error_input');
    }
    //Validar Carrera:
    if(selectCarrera.value == ''){
        selectCarrera.classList.add('error_input');
        sError = true;
    }else{
        selectCarrera.classList.remove('error_input');
    }

    return sError;
}

function getCurso(){
    let infoCurso=[];
    let sError = 0;

    let sCiclo = selectCiclo.value;
    let sCurso = selectCurso.value;
    let sNomCurso;

    switch(sCurso){
        case 'cu01': 
            sNomCurso='Fundamentos de programación'; 
            break;
        case 'cu02': 
            sNomCurso='Proyecto de ingenieria del software 1';
            break;
        case 'cu03': 
            sNomCurso='Fundamentos de bases de datos';
            break;
        case 'cu04': 
            sNomCurso='Sistemas operativos 1';
            break;
        case 'cu05': 
            sNomCurso='Programación orientada a objetos';
            break;
        case 'cu06': 
            sNomCurso='Estructuras discretas';
            break;
        case 'cu07': 
            sNomCurso='Redes de computadoras';
            break;
    }

    infoCurso.push(sCurso,sCiclo,sNomCurso);
    sError = validarCurso();
    console.log(sError);
    if(sError==1){
        swal({
            type : 'warning',
            title : 'No se pudo agregar el curso',
            text: 'Por favor revise los campos en rojo',
            confirmButtonText : 'OK'
        });
        console.log('No se pudo registrar el curso');
    } else if (sError==3){
        swal({
            type : 'warning',
            title : 'No se pudo agregar el curso',
            text: 'El Curso ingresado ya fue agregado anteriormente',
            confirmButtonText : 'OK'
        });
        console.log('No se pudo registrar el curso');
    } else{
        //poner un agregar a la lista definitiva para luego meter en la DB con el registrar total.
        agregaCurso(infoCurso);
        swal({
            type : 'success',
            title : 'Registro exitoso',
            text: 'El Curso se agregó correctamente',
            confirmButtonText : 'OK'
        });
        imprimirListaCursos();
    }
}

function validarCurso(){
    let sError=0;

    if(selectCiclo.value == ''){
        selectCiclo.classList.add('error_input');
        sError = 1;
    }else{
        selectCiclo.classList.remove('error_input');
    }

    if(selectCurso.value == ''){
        selectCurso.classList.add('error_input');
        sError = 1;
    }else{
        selectCurso.classList.remove('error_input');
    }
    if(selectCarrera.value == ''){
        selectCarrera.classList.add('error_input');
        sError = 1;
    }else{
        selectCarrera.classList.remove('error_input');
    }
    //Valida si el curso ya fue asignado anteriormente
    let listaCursos = obtenerListaCursos();
    for(let i = 0; i < listaCursos.length; i++){
        console.log(selectCurso.value);
        console.log(listaCursos[i][0]);
        if (selectCurso.value == listaCursos[i][0]){
            sError = 3;
        }
    }

    return sError;

}

function imprimirListaCursos (){
    let listaCursos = obtenerListaCursos();
    let tbody = document.querySelector('#tblCursos tbody');
    tbody.innerHTML = '';
         
    for(let i = 0; i < listaCursos.length; i++){
        let fila = tbody.insertRow();

        let cCurso = fila.insertCell();
        let cCiclo = fila.insertCell();
        let cNomCurso = fila.insertCell();
        let cEliminar = fila.insertCell();
   
        cCurso.innerHTML = listaCursos[i][0];
        cCiclo.innerHTML = listaCursos[i][1];
        cNomCurso.innerHTML = listaCursos[i][2];
        cEliminar.innerHTML = '=';

    }
}

function seleccionarCanton(value){
    console.log(value);
    let entrada=value;
    let list;

    let listaCantones1=['Acosta','Alajuelita','Aserrí','Curridabat','Desamparados','Dota','Escazú','Goicochea','León Cortés','Montes de Oca','Mora','Moravia','Pérez Zeledon','Puriscal','San Jose','Santa Ana','Tarrazú','Tibás','Turrubares','Vásquez de Coronado'];
    let listaCantones2=['Alajuela','Atenas','Grecia','Guatuso','Los Chiles','Naranjo','Orotina','Palmares','Poás','Río Cuarto','San Carlos','San Mateo','San Ramón','Upala','Valverde Vega','Zarcero'];
    let listaCantones3=['Alvarado','Cartago','El Guarco','Jiménez','La Unión','Oreamuno','Paraíso','Turrialba'];
    let listaCantones4=['Barva','Belén','Flores','Heredia','San Isidro','San Pablo','San Rafae','Santa Bárbara','Santo Domingo','Sarapiquí'];
    let listaCantones5=['Abangares','Bagaces','Cañas','Carrillo','Nicoya','Hojancha','La Cruz','Liberia','Nandayure','Santa Cruz','Tilarán'];
    let listaCantones6=['Buenos Aires','Corredores','Coto Brus','Esparza','Garabito','Golfito','Montes de Oro','Osa','Parrita','Puntarenas','Quepos'];
    let listaCantones7=['Guácimo','Limón','Matina','Pococí','Siquirres','Talamanca'];
       
    switch(entrada){
        case '0':
            list=listaCantones1;
            break;
        case '1':
            list=listaCantones2;
            break;
        case '2':
            list=listaCantones3;
            break;
        case '3':
            list=listaCantones4;
            break;
        case '4':
            list=listaCantones5;
            break;
        case '5':
            list=listaCantones6;
            break;
        case '6':
            list=listaCantones7;
            break;
    }

    let output = '';
    for(let i = 0; i < list.length; i++){
        output += '<option value='+ i +'>'+ list[i] +'</option> \n';
    }
    selectCanton.innerHTML = output;
}

function seleccionarDistrito(canton,provincia){
    console.log('provincia:' + provincia);
    console.log('canton:' + canton);
    let list;
    //el value 123455 del primer [] es el value del canton

    let distritos1 = [['San Ignacio','Guaitil','Palmichal','Cangrejal','Sabanillas'],['Alajuelita','San Josecito','San Antonio','Concepción','San Felipe'],['Aserrí','Tarbaca','Vuelta de Jorco','San Gabriel','Legua','Monterrey','Salitrillos'],['Curridabat','Granadilla','Sánchez','Tirrases'],['Desamparados','San Miguel','San Juan de Dios','San Rafael Arriba','San Antonio','Frailes','Patarrá','San Cristóbal','Rosario','Rosario','Damas','San Rafael Abajo','Gravillias','Los Guido'],['Santa María','Jardín','Copey'],['Escazú','San Antonio','San Rafael'],['Guadalupe','San Francisco','Calle Blancos','Mata de Plátano','Ipís','Rancho Redondo','Purral'],['San Pablo','San Andrés','Llano Bonito','San Isidro','Santa Cruz','San Antonio'],['San Pedro','Sabanilla','Mercedes','San Rafael'],['Ciudad Colón','Guayabo','Tabarcia','Piedras Negras','Picagres','Jaris','Quitirrisí'],['San Vicente','San Jerónimo','Trinidad'],['San Isidro de El General','El General','Daniel Flores','Rivas','San Pedro','Platanares','Pejibaye','Cajón','Barú','Río Nuevo','Páramo','La Amistad'],['Santiago','Mercedes Sur','Barbacoas','Grifo Alto','San Rafael','Candelarita','Desamparados','San Antonio','Chires','La Cangreja'],['Carmen','Merced','Hospital','Catedral','Zapote','San Francisco de Dos Ríos','Uruca','Mata Redonda','Pavas','Hatillo'], ['Santa Ana','Salitral','Pozos','Uruca','Piedades','Brasil'], ['San Marcos','San Lorenzo','San Carlos'], ['San Juan','Cinco Esquinas','Anselmo Llorente','León XIII','Colima'], ['San Pablo','San Pedro','San Luis','Carara','San Juan de Mata'], ['San Isidro','San Rafael','Dulce Nombre de Jesús','Patalillo','Cascajal']];
    let distritos2 = [['Alajuela','San José','Carrizal','San Antonio','Guácima','San Antonio','Guácima','San Isidro','Sabanilla','San Rafael','Río Segundo','Desamparados','Turrúcares','Tambor','Garita','Sarapiquí'], ['Atenas','Jesús','Mercedes','San Isidro','Concepción','San José','SantaEulalia','Escobal'], ['Grecia','San Isidro','San José','San Roque','Tacares','Puente de Piedra','Bolíbar'], ['San Rafael','Buenavista','Cote','Katira'], ['Los Chiles','Caño Negro','El Amparo','San Jorge'], ['Naranjo','San Miguel','San José','Cirrí','San Jerónimo','San Juan','El Rosario','Palmitos'], ['Orotina','Mastate','Hacienda Vieja','Coyolar','La Ceiba'], ['Palmares','Zaragoza','Buenos Aires','Santiago','Candelaria','Esquipulas','La Granja'], ['San Pedro','San Juan','San Rafael','Carrillos','Sabana Redonda'], ['rio Cuarto'], ['Quesada','Florencia','Buenavista','Aguas Zarcas','Venecia','Pital','La Fortuna','La Tigra','La Palmera','Venado','Cutris','Monterrey','Pocosol'], ['San Mateo','Desmonte','Jesús María','Labrador'], ['San Ramón','Santiago','San Juan','Piedades Norte','Piedades Sur','San Rafael','San Isidro','Ángeles','Alfaro','Volio','Concepción','Zapotal','Peñas Blancas','San Lorenzo'], ['Upala','Aguas Claras','San José','Bijagua','Delicias','Dos Ríos','Yolillal','Canalete'], ['Sarchí Norte','Sarchí Sur','Toro Amarillo','San Pedro','Rodríguez'], ['Zarcero','Laguna','Tapezco','Guadalupe','Palmira','Zapote','Brisas']];
    let distritos3 = [['Pacayas','Cervantes','Capellades'], ['Oriental','Occidental','Carmen','San Nicolás','Agua Caliente','Guadalupe','Corralillo','Tierra Blanca','Dulce Nombre','Llano Grande','Quebradilla'], ['Tejar','San Isidro','Tobosi','Patio de Agua'], ['Juan viñas','Tucurrique','Pejibaye','Turrialba'], ['Tres Ríos','San Diego','San Juan','San Rafael','Concepción','Dulce Nombre','San Ramón','Río Azul'], ['San Rafael','Cot','Potrero Cerrado','Cipreses','Santa Rosa'], ['Paraíso','Santiago de Paraiso','Orosi','Cachí','Llanos de Santa Lucía'], ['Turrialba','La Suiza','Peralta','Santa Cruz','Santa Teresita','Pavones','Tuis','Tayutic','Santa Rosa','Tres Equis','La Isabel','Chirripó']];
    let distritos4 = [['Barva','San Pedro','San Pablo','San Roque','Santa Lucía','San José de la Montaña'], ['San Antonio','La Ribera','La Asunción'], ['San Joaquím','Barrantes','Llorente'], ['Heredia','Mercedes','San Francisco','Ulloa','Vara Blanca'], ['San Isidro','San José','Concepción','San Francisco'], ['San Pablo','Rincón de Sabanilla'], ['San Rafael','San Josecito','Santiago','Concepción'], ['Santa Bárbara','San Pedro','San Juan','Jesús','Santo Domingo','Purabá'], ['Santo Domingo','San Vicente','San Miguel','Paracito','Santo Tomás','Santa Rosa','Tures','Pará'], ['Puerto Viejo','La Virgen','Horquetas','Llanuras de Gaspar','Cureña']];
    let distritos5 = [['Las Juntas','Sierra','San Juan','Colorado'], ['Bagaces','La Fortuna','Mogote','Río Naranjo'], ['Cañas','Palmira','San Miguel','Bebedero','Porozal'], ['Filadelfia','Palmiral','Sardinal','Belén'], ['Nicoya','Mansión','San Antonio','Quebrada Honda','Sámara','Nosara','Belén de Nosarita'], ['Hojancha','Monte Romo','Puerto Carrillo','Huacas','Matambú'], ['La Cruz','Santa Cecilia','La Garita','Santa Elena'], ['Liberia','Cañas Dulces','Mayorga','Nacascolo','Curubandé'], ['Carmona','Santa Rita','Zapotal','San Pablo','Porvenir','Bejuco'], ['Santa Cruz','Bolsón','Veintisiete de Abril','Tempate','Cartagena','Cuajiniquil','Diriá','Cabo Velas','Tamarindo'], ['Tilarán','Quebrada Grande','Tronadora','Santa Rosa','Libano','Tierras Morenas','Arenal']];
    let distritos6 = [['Buenos Aires','Volcán','Potrero Grande','Boruca','Pilas','Colinas','Chánguena','Biolley','Brunka'],['Corredor','LaCuesta','Paso Canoas','Laurel'],['San Vito','Sabalito','Aguabuena','Limoncito','Pittier','Gutiérrez Brown'],['Espíritu Santo','San Juan Grande','Macacona','San Rafael','San Jerónimo','Caldera'],['Jacó','Tárcoles'],['Golfito','Puerto Jiménez','Guaycará','Pavón'],['Miramar','La Unión','San Isidro',],['Cortés','Palmar','Sierpe','Bahía Ballena','Piedras Blancas','Bahía Drake'],['Parrita'],['Pauntarenas','Pitahaya','Chomes','Lepanto','Paquera','Manzanillo','Guacimal','Barranca','Monteverde','Isla del Coco','Cóbano','Chacarita','Chira','Acapulco','El Roble','Arancibia'],['Quepos','Savegre','Naranjito']];
    let distritos7 = [['Guácimo','Mercedes','Pocora','Rio Jimenéz','Duacari'],['Limón','Valle La Estrella','Río Blanco','Matama'],['Matina','Batán','Carrandi'],['Guápiles','Jimenéz','La Rita','Roxana','Cariari','Colorado','La Colonia'],['Siquirres','Pacuarito','Florida','Germania','Cairo','Alegría'],['Bratsi','Sixaola','Cahuita','Telire']];
    //selectDistrito

    switch(provincia){
        case '0':
            list=distritos1;
            break;
        case '1':
            list=distritos2;
            break;
        case '2':
            list=distritos3;
            break;
        case '3':
            list=distritos4;
            break;
        case '4':
            list=distritos5;
            break;
        case '5':
            list=distritos6;
            break;
        case '6':
            list=distritos7;
            break;
    }
    console.log('largo'+list[canton].length);
    let output = '';
    for(let i = 0; i < list[canton].length; i++){
        output += '<option value='+ i +'>'+ list[canton][i] +'</option> \n';
    }
    selectDistrito.innerHTML = output;
};