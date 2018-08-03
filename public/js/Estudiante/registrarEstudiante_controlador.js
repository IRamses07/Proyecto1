'use strict';
moveUser(true);

window.onbeforeunload = function(){                       //temporal! revisar <->
    if(sessionStorage.getItem("update")==1){
        sessionStorage.setItem('update', 0);
        document.location.href = 'listarEstudiante.html';
    }
};

//Funcion para pestanas superiores del cuadro con validación
(function(d){
    let tabs = Array.prototype.slice.apply(d.querySelectorAll('.tabs__item'));
    let pannels = Array.prototype.slice.apply(d.querySelectorAll('.panels__item'));
    let pasa = false;
    d.querySelector('#tabs').addEventListener('click', function(e){
        pasa = false;
        if(e.target.classList.contains('tabs__item')){            
            let i = tabs.indexOf(e.target);
            if(i>0){
                if(i==1){
                    if(!validaInfoPersonal())
                        pasa=true;
                }else{
                    if(!validaInfoContacto())
                        pasa=true;
                }
            }else{
                pasa=true;
            }
            if(pasa){
                tabs.map(tab => tab.classList.remove('activeTab'));
                tabs[i].classList.add('activeTab');
                pannels.map(panel => panel.classList.remove('activePanel'));
                pannels[i].classList.add('activePanel');
            }
        }
    }); 
})(document);

let panelN1 = document.querySelector('#panelN1'); //paneles con info
let panelN2 = document.querySelector('#panelN2');
let panelN3 = document.querySelector('#panelN3');

let tab1 = document.querySelector('#tab1');
let tab2 = document.querySelector('#tab2');
let tab3 = document.querySelector('#tab3');

let siguiente1 = document.querySelector('#siguiente1'); //botones siguiente
siguiente1.addEventListener('click', function(){
    if(!validaInfoPersonal()){    
        panelN1.classList.remove('activePanel');
        panelN2.classList.add('activePanel');
        tab1.classList.remove('activeTab');
        tab2.classList.add('activeTab');
    }
});

let siguiente2 = document.querySelector('#siguiente2');
siguiente2.addEventListener('click', function(){
    if(!validaInfoContacto()){
    panelN2.classList.remove('activePanel');
    panelN3.classList.add('activePanel');
    tab2.classList.remove('activeTab');
    tab3.classList.add('activeTab');
    }
});

let atras1 = document.querySelector('#atras1'); //bonones para atras
atras1.addEventListener('click', function(){
    panelN2.classList.remove('activePanel');
    panelN1.classList.add('activePanel');
    tab2.classList.remove('activeTab');
    tab1.classList.add('activeTab');
});

let atras2 = document.querySelector('#atras2');
atras2.addEventListener('click', function(){
    panelN3.classList.remove('activePanel');
    panelN2.classList.add('activePanel');
    tab3.classList.remove('activeTab');
    tab2.classList.add('activeTab');
});

//Boton Registrar Estudiante
let buttonRegistrar = document.querySelector('#butRegistrar');
buttonRegistrar.addEventListener('click', getDatos);

//Boton 'Agregar' Seleccionar Curso
let buttonAgregarCurso = document.querySelector('#butAgregar');
buttonAgregarCurso.addEventListener('click',getCurso);                 

//Seleccionar provincia
let selecccionProvincia = document.querySelector('#selecProvincia');
selecccionProvincia.addEventListener('click', function(){
    selecccionProvincia = document.querySelector('#selecProvincia');
    if(selecccionProvincia.value.length !== 0 && selecccionProvincia.value !== '-Seleccione una provincia-'){
        seleccionarCanton(selecccionProvincia.value);
    }
});


let seleccionCanton = document.querySelector('#selectCanton');
seleccionCanton.addEventListener('click', function(){
    if( seleccionCanton.value.length !== 0 && selecccionProvincia.value !== '-Seleccione una provincia-' && seleccionCanton.value !== '-Seleccione un cantón-' ){
        seleccionarDistrito(seleccionCanton.value,selecccionProvincia.value);
    }
});

//SeleccionarCarrera
let seleccionCarrera = document.querySelector('#selectCarrera');
seleccionCarrera.addEventListener('click', function(){
    if(seleccionCarrera.value.length !== 0){
        cursosPorCarrera(seleccionCarrera.value);;
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
let selectDistrito = document.querySelector('#selectDistrito');
//DatosCurso
let selectCurso = document.querySelector('#selectCurso');
//DatosContacto
let inputConNombre1 = document.querySelector('#conNombre1');
let inputConNombre2 = document.querySelector('#conNombre2');
let inputConApellido1 = document.querySelector('#conApellido1');
let inputConApellido2 = document.querySelector('#conApellido2');
let inputConTelefono = document.querySelector('#conTelefono');
let inputConCorreo = document.querySelector('#conCorreo');
let cursoExt = document.querySelector('#cursoExt');
let labelCed = document.querySelector('#labelCed');
let form1 = document.querySelector('#form1');
let form2 = document.querySelector('#form2');
let form3 = document.querySelector('#form3');
let tbodyCursos = document.querySelector('#tblCursos tbody');
let cedDiv = document.querySelector('#cedDiv');
let tittleReg = document.querySelector('#tittleReg');
let h1reg = document.querySelector('#h1reg');


//boton de cancerlar para modificar
let btnCancelar = document.querySelector('#btnCancelar');
btnCancelar.hidden = true;
btnCancelar.addEventListener('click', function(){
    sessionStorage.setItem('update', 0);
    document.location.href = 'listarEstudiante.html';
});
let btnActualizar = document.querySelector('#btnActualizar');
btnActualizar.hidden=true;
btnActualizar.addEventListener('click', function(){
    //trigger del actualizar boton.
    getDatosActualizar();
});

function getDatos(){
    let infoEstudiante=[];
    let sError = false;
    infoEstudiante.push(inputCedula.value,inputNombre1.value,inputNombre2.value,inputApellido1.value,inputApellido2.value,inputTelefono.value,inputCorreo.value,inputDireccion.value,$("#selecProvincia option:selected" ).text(),$("#selectCanton option:selected").text(),$("#selectDistrito option:selected").text(),selectCarrera.value,inputConNombre1.value,inputConNombre2.value,inputConApellido1.value,inputConApellido2.value,inputConTelefono.value,inputConCorreo.value,'Activo');

    sError = validaCarrera();
    if(sError==true){
        swal({
            title: "Advertencia",
            text: "Por favor revisar los campos marcados con rojo",
            icon: "warning",
            button: "Ok",
        });
    }else{
        registrarEstudiante(infoEstudiante);
        swal({
            type : 'Success',
            title : 'Registro exitoso',
            text: 'El estudiante se registró exitosamente',
            icon: 'success',
            confirmButtonText : 'OK'
        });
        form1.reset();
        form2.reset();
        form3.reset();
        tbodyCursos.innerHTML='';

        // document.location.href = 'listarEstudiante.html';

        tab3.classList.remove('activeTab');
        tab1.classList.add('activeTab');
        panelN3.classList.remove('activePanel');
        panelN1.classList.add('activePanel');

    }
}

function validaInfoPersonal(){
    let sError = false;
    let checkSoloLetras = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]+$/;
    let checkFormatoNumeral = /^[0-9 -]+$/;
    let checkFormatoEmail = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if( sessionStorage.getItem("update")!=1 ){
        if(inputCedula.value == '' || (checkFormatoNumeral.test(inputCedula.value)==false) ){
            inputCedula.classList.add('error_input');
            sError = true;
        } else if (validarCedulaRepetida(inputCedula.value)){
            inputCedula.classList.add('error_input');
            labelCed.classList.remove('lblHide');
            sError = true;
        } else{
            inputCedula.classList.remove('error_input');
            labelCed.classList.add('lblHide');
        }
    }
    if(inputNombre1.value == '' || (checkSoloLetras.test(inputNombre1.value)==false) ){
        inputNombre1.classList.add('error_input');
        sError = true;
    }else{
        inputNombre1.classList.remove('error_input');
        labelNom.classList.add('lblHide');
    } 
    if(inputApellido1.value == '' || (checkSoloLetras.test(inputApellido1.value)==false) ){
        inputApellido1.classList.add('error_input');
        sError = true;
    }else{
        inputApellido1.classList.remove('error_input');
    }
    if(inputTelefono.value == '' ){
        inputTelefono.classList.add('error_input');
        sError = true;
    }else{
        inputTelefono.classList.remove('error_input');
    }
    if(inputCorreo.value == '' || (checkFormatoEmail.test(inputCorreo.value)==false) ){
        inputCorreo.classList.add('error_input');
        sError = true;
    }else{
        inputCorreo.classList.remove('error_input');
    }
    if(inputDireccion.value == '' ){
        inputDireccion.classList.add('error_input');
        sError = true;
    }else{
        inputDireccion.classList.remove('error_input');
    }
    if(selecProvincia.value == '-Seleccione una provincia-' ){
        selecProvincia.classList.add('error_input');
        sError = true;
    }else{
        selecProvincia.classList.remove('error_input');
    }
    if(selectCanton.value == '-Seleccione un cantón-' ){
        selectCanton.classList.add('error_input');
        sError = true;
    }else{
        selectCanton.classList.remove('error_input');
    }
    if(selectDistrito.value == '-Seleccione un distrito-'){
        selectDistrito.classList.add('error_input');
        sError = true;
    }else{
        selectDistrito.classList.remove('error_input');
    };
    if(sError==true){
        swal({
            title: "Advertencia",
            text: "Por favor revisar los campos marcados con rojo",
            icon: "warning",
            button: "Ok",
        });
    }
    return sError;
}

function validaInfoContacto(){
    let sError = false;
    let checkSoloLetras = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]+$/;
    let checkFormatoNumeral = /^[0-9 -]+$/;
    let checkFormatoEmail = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

    if(inputConNombre1.value == '' || (checkSoloLetras.test(inputConNombre1.value)==false) ){
        inputConNombre1.classList.add('error_input');
        sError = true;
    }else{
        inputConNombre1.classList.remove('error_input');
    }
    if(inputConApellido1.value == '' || (checkSoloLetras.test(inputConApellido1.value)==false) ){
        inputConApellido1.classList.add('error_input');
        sError = true;
    }else{
        inputConApellido1.classList.remove('error_input');
    }
    if(inputConTelefono.value == '' ){
        inputConTelefono.classList.add('error_input');
        sError = true;
    }else{
        inputConTelefono.classList.remove('error_input');
    }
    if(inputConCorreo.value == '' || (checkFormatoEmail.test(inputConCorreo.value)==false) ){
        inputConCorreo.classList.add('error_input');
        sError = true;
    }else{
        inputConCorreo.classList.remove('error_input');
    }
    if(sError==true && !validaInfoPersonal()){
        swal({
            title: "Advertencia",
            text: "Por favor revisar los campos marcados con rojo",
            icon: "warning",
            button: "Ok",
        });
    }
    return sError;
}

function validaCarrera(){
    let sError = false;
    let checkSoloLetras = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]+$/;
    let checkFormatoNumeral = /^[0-9 -]+$/;
    let checkFormatoEmail = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

    if(selectCarrera.value == '-Seleccione una carrera-'){
        selectCarrera.classList.add('error_input');
        sError = true;
    }else{
        selectCarrera.classList.remove('error_input');
    }
    if(sError==true){
        swal({
            title: "Advertencia",
            text: "Por favor llene los campos en rojo.",
            icon: "warning",
            button: "Ok",
        });
    }
    return sError;
}

function cursosPorCarrera(carrera){
    let content = '<option>-Seleccione un curso-</option>\n';

    if(carrera=='Desarrollo de Software'){
        content+= '<option value="Fundamentos de programación">Fundamentos de programación</option>\n';
        content+= '<option value="Fundamentos de bases de datos">Fundamentos de bases de datos</option>\n';
        content+= '<option value="Programación orientada a objetos">Programación orientada a objetos</option>\n';
        content+= '<option value="Proyecto de ingenieria del software 1">Proyecto de ingenieria del software 1</option>\n';
    } else if(carrera=='Tecnologías de la Información y Comunicacines'){
        content+= '<option value="Sistemas operativos 1">Sistemas operativos 1</option>\n';
        content+= '<option value="Redes de computadoras">Redes de computadoras</option>\n';
        content+= '<option value="Estructuras discretas">Estructuras discretas</option>\n';
        content+= '<option value="Proyecto de integración de tecnologías 1">Proyecto de integración de tecnologías 1</option>\n';
    } else {
        content+= '<option value="Diseño web 1">Diseño web 1</option>\n';
        content+= '<option value="Fundamentos de programación web">Fundamentos de programación web</option>\n';
        content+= '<option value="Programación web dinámica">Programación web dinámica</option>\n';
        content+= '<option value="Comunicación de información en la web">Comunicación de información en la web</option>\n';
    }
    selectCurso.innerHTML= content;
}

function getCurso(){
    let infoCurso=[];
    let sError = 0;

    infoCurso.push(selectCurso.value);

    if(validarCurso()){
        swal({
            type : 'warning',
            title : 'No se pudo agregar el curso',
            text: 'Por favor revise los campos en rojo',
            icon: 'warning',
            confirmButtonText : 'OK'
        });
    } else{
        agregaCurso(infoCurso);
        imprimirListaCursos();
    }
}

function validarCurso(){
    let listaCursos = obtenerListaCursos();
    let sError=false;

    if(selectCurso.value == '-Seleccione un curso-'){
        selectCurso.classList.add('error_input');
        sError=true;
    }else{
        selectCurso.classList.remove('error_input');
    }
    if(selectCarrera.value == '-Seleccione una carrera-'){
        selectCarrera.classList.add('error_input');
        sError=true;
    }else{
        selectCarrera.classList.remove('error_input');
    }
    for(let i = 0; i < listaCursos.length; i++){
        if (selectCurso.value == listaCursos[i][0]){
            sError = true;
            selectCurso.classList.add('error_input');
            cursoExt.classList.remove('lblHide');
            return sError;
        }else{
            cursoExt.classList.add('lblHide');
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
        let cNomCurso = fila.insertCell();
        cNomCurso.innerHTML = listaCursos[i][0];
    }
}

function seleccionarCanton(value){
    let lista;

    switch(value) {
        
        case '0':
            lista=['Acosta','Alajuelita','Aserrí','Curridabat','Desamparados','Dota','Escazú','Goicochea','León Cortés','Montes de Oca','Mora','Moravia','Pérez Zeledon','Puriscal','San Jose','Santa Ana','Tarrazú','Tibás','Turrubares','Vásquez de Coronado'];
            break;
        case '1':
            lista=['Alajuela','Atenas','Grecia','Guatuso','Los Chiles','Naranjo','Orotina','Palmares','Poás','Río Cuarto','San Carlos','San Mateo','San Ramón','Upala','Valverde Vega','Zarcero'];
        break;
        case '2':    
            lista=['Alvarado','Cartago','El Guarco','Jiménez','La Unión','Oreamuno','Paraíso','Turrialba'];
        break;
        case '3':
            lista=['Barva','Belén','Flores','Heredia','San Isidro','San Pablo','San Rafae','Santa Bárbara','Santo Domingo','Sarapiquí'];
        break;
        case '4':
            lista=['Abangares','Bagaces','Cañas','Carrillo','Nicoya','Hojancha','La Cruz','Liberia','Nandayure','Santa Cruz','Tilarán'];
        break;
        case '5':
            lista=['Buenos Aires','Corredores','Coto Brus','Esparza','Garabito','Golfito','Montes de Oro','Osa','Parrita','Puntarenas','Quepos'];
        break;
        default:
            lista=['Guácimo','Limón','Matina','Pococí','Siquirres','Talamanca'];
    }

    let output = '';
    output += '<option class="letraItalic">-Seleccione un cantón-</option>\n';
    for(let i = 0; i < lista.length; i++){
        output += '<option value="'+ i +'">'+ lista[i] +'</option> \n';
    }
    selectCanton.innerHTML = output;
}

function seleccionarDistrito(canton,provincia){
    let lista;

    switch(provincia){
        case '0':
            lista = [['San Ignacio','Guaitil','Palmichal','Cangrejal','Sabanillas'],['Alajuelita','San Josecito','San Antonio','Concepción','San Felipe'],['Aserrí','Tarbaca','Vuelta de Jorco','San Gabriel','Legua','Monterrey','Salitrillos'],['Curridabat','Granadilla','Sánchez','Tirrases'],['Desamparados','San Miguel','San Juan de Dios','San Rafael Arriba','San Antonio','Frailes','Patarrá','San Cristóbal','Rosario','Rosario','Damas','San Rafael Abajo','Gravillias','Los Guido'],['Santa María','Jardín','Copey'],['Escazú','San Antonio','San Rafael'],['Guadalupe','San Francisco','Calle Blancos','Mata de Plátano','Ipís','Rancho Redondo','Purral'],['San Pablo','San Andrés','Llano Bonito','San Isidro','Santa Cruz','San Antonio'],['San Pedro','Sabanilla','Mercedes','San Rafael'],['Ciudad Colón','Guayabo','Tabarcia','Piedras Negras','Picagres','Jaris','Quitirrisí'],['San Vicente','San Jerónimo','Trinidad'],['San Isidro de El General','El General','Daniel Flores','Rivas','San Pedro','Platanares','Pejibaye','Cajón','Barú','Río Nuevo','Páramo','La Amistad'],['Santiago','Mercedes Sur','Barbacoas','Grifo Alto','San Rafael','Candelarita','Desamparados','San Antonio','Chires','La Cangreja'],['Carmen','Merced','Hospital','Catedral','Zapote','San Francisco de Dos Ríos','Uruca','Mata Redonda','Pavas','Hatillo'], ['Santa Ana','Salitral','Pozos','Uruca','Piedades','Brasil'], ['San Marcos','San Lorenzo','San Carlos'], ['San Juan','Cinco Esquinas','Anselmo Llorente','León XIII','Colima'], ['San Pablo','San Pedro','San Luis','Carara','San Juan de Mata'], ['San Isidro','San Rafael','Dulce Nombre de Jesús','Patalillo','Cascajal']];
            break;
        case '1':
            lista = [['Alajuela','San José','Carrizal','San Antonio','Guácima','San Antonio','Guácima','San Isidro','Sabanilla','San Rafael','Río Segundo','Desamparados','Turrúcares','Tambor','Garita','Sarapiquí'], ['Atenas','Jesús','Mercedes','San Isidro','Concepción','San José','SantaEulalia','Escobal'], ['Grecia','San Isidro','San José','San Roque','Tacares','Puente de Piedra','Bolíbar'], ['San Rafael','Buenavista','Cote','Katira'], ['Los Chiles','Caño Negro','El Amparo','San Jorge'], ['Naranjo','San Miguel','San José','Cirrí','San Jerónimo','San Juan','El Rosario','Palmitos'], ['Orotina','Mastate','Hacienda Vieja','Coyolar','La Ceiba'], ['Palmares','Zaragoza','Buenos Aires','Santiago','Candelaria','Esquipulas','La Granja'], ['San Pedro','San Juan','San Rafael','Carrillos','Sabana Redonda'], ['rio Cuarto'], ['Quesada','Florencia','Buenavista','Aguas Zarcas','Venecia','Pital','La Fortuna','La Tigra','La Palmera','Venado','Cutris','Monterrey','Pocosol'], ['San Mateo','Desmonte','Jesús María','Labrador'], ['San Ramón','Santiago','San Juan','Piedades Norte','Piedades Sur','San Rafael','San Isidro','Ángeles','Alfaro','Volio','Concepción','Zapotal','Peñas Blancas','San Lorenzo'], ['Upala','Aguas Claras','San José','Bijagua','Delicias','Dos Ríos','Yolillal','Canalete'], ['Sarchí Norte','Sarchí Sur','Toro Amarillo','San Pedro','Rodríguez'], ['Zarcero','Laguna','Tapezco','Guadalupe','Palmira','Zapote','Brisas']];
            break;
        case '2':
            lista = [['Pacayas','Cervantes','Capellades'], ['Oriental','Occidental','Carmen','San Nicolás','Agua Caliente','Guadalupe','Corralillo','Tierra Blanca','Dulce Nombre','Llano Grande','Quebradilla'], ['Tejar','San Isidro','Tobosi','Patio de Agua'], ['Juan viñas','Tucurrique','Pejibaye','Turrialba'], ['Tres Ríos','San Diego','San Juan','San Rafael','Concepción','Dulce Nombre','San Ramón','Río Azul'], ['San Rafael','Cot','Potrero Cerrado','Cipreses','Santa Rosa'], ['Paraíso','Santiago de Paraiso','Orosi','Cachí','Llanos de Santa Lucía'], ['Turrialba','La Suiza','Peralta','Santa Cruz','Santa Teresita','Pavones','Tuis','Tayutic','Santa Rosa','Tres Equis','La Isabel','Chirripó']];
            break;
        case '3':
            lista = [['Barva','San Pedro','San Pablo','San Roque','Santa Lucía','San José de la Montaña'], ['San Antonio','La Ribera','La Asunción'], ['San Joaquím','Barrantes','Llorente'], ['Heredia','Mercedes','San Francisco','Ulloa','Vara Blanca'], ['San Isidro','San José','Concepción','San Francisco'], ['San Pablo','Rincón de Sabanilla'], ['San Rafael','San Josecito','Santiago','Concepción'], ['Santa Bárbara','San Pedro','San Juan','Jesús','Santo Domingo','Purabá'], ['Santo Domingo','San Vicente','San Miguel','Paracito','Santo Tomás','Santa Rosa','Tures','Pará'], ['Puerto Viejo','La Virgen','Horquetas','Llanuras de Gaspar','Cureña']];
            break;
        case '4':
            lista = [['Las Juntas','Sierra','San Juan','Colorado'], ['Bagaces','La Fortuna','Mogote','Río Naranjo'], ['Cañas','Palmira','San Miguel','Bebedero','Porozal'], ['Filadelfia','Palmiral','Sardinal','Belén'], ['Nicoya','Mansión','San Antonio','Quebrada Honda','Sámara','Nosara','Belén de Nosarita'], ['Hojancha','Monte Romo','Puerto Carrillo','Huacas','Matambú'], ['La Cruz','Santa Cecilia','La Garita','Santa Elena'], ['Liberia','Cañas Dulces','Mayorga','Nacascolo','Curubandé'], ['Carmona','Santa Rita','Zapotal','San Pablo','Porvenir','Bejuco'], ['Santa Cruz','Bolsón','Veintisiete de Abril','Tempate','Cartagena','Cuajiniquil','Diriá','Cabo Velas','Tamarindo'], ['Tilarán','Quebrada Grande','Tronadora','Santa Rosa','Libano','Tierras Morenas','Arenal']];
            break;
        case '5':
            lista = [['Buenos Aires','Volcán','Potrero Grande','Boruca','Pilas','Colinas','Chánguena','Biolley','Brunka'],['Corredor','LaCuesta','Paso Canoas','Laurel'],['San Vito','Sabalito','Aguabuena','Limoncito','Pittier','Gutiérrez Brown'],['Espíritu Santo','San Juan Grande','Macacona','San Rafael','San Jerónimo','Caldera'],['Jacó','Tárcoles'],['Golfito','Puerto Jiménez','Guaycará','Pavón'],['Miramar','La Unión','San Isidro',],['Cortés','Palmar','Sierpe','Bahía Ballena','Piedras Blancas','Bahía Drake'],['Parrita'],['Pauntarenas','Pitahaya','Chomes','Lepanto','Paquera','Manzanillo','Guacimal','Barranca','Monteverde','Isla del Coco','Cóbano','Chacarita','Chira','Acapulco','El Roble','Arancibia'],['Quepos','Savegre','Naranjito']];
            break;
        case '6':
            lista = [['Guácimo','Mercedes','Pocora','Rio Jimenéz','Duacari'],['Limón','Valle La Estrella','Río Blanco','Matama'],['Matina','Batán','Carrandi'],['Guápiles','Jimenéz','La Rita','Roxana','Cariari','Colorado','La Colonia'],['Siquirres','Pacuarito','Florida','Germania','Cairo','Alegría'],['Bratsi','Sixaola','Cahuita','Telire']];
            break;
    }
    let output = '';

    output += '<option class="letraItalic">-Seleccione un distrito-</option>\n';
    for(let i = 0; i < lista[canton].length; i++){
        output += '<option value='+ i +'>'+ lista[canton][i] +'</option> \n';
    }
    selectDistrito.innerHTML = output;
};

(function(d){
    if( sessionStorage.getItem("update")==1 ){
        llenarDatosFormulario();
    };
})(document);

function llenarDatosFormulario(){
    btnCancelar.hidden = false;
    btnActualizar.hidden=false;
    butRegistrar.hidden=true;

    let estudiante = getInfoEstudiante()[0];

    tittleReg.innerHTML = 'Actualizar Estudiante';
    h1reg.innerHTML = 'Información del estudiante: '+estudiante['Nombre1']+' '+estudiante['apellido1'];
    inputCedula.disabled=true;
    inputCedula.classList.add('disablesInput');

    inputCedula.value = estudiante['cedula'];
    inputNombre1.value = estudiante['Nombre1'];
    inputNombre2.value = estudiante['Nombre2'];
    inputApellido1.value = estudiante['apellido1'];
    inputApellido2.value = estudiante['apellido2'];
    inputTelefono.value = estudiante['telefono'];
    inputCorreo.value = estudiante['correo'];
    inputDireccion.value = estudiante['direccion'];
    selectCarrera.value = estudiante['carrera'];

    let CursosString = estudiante['cursosAprobados'];
    let listaCursos = JSON.parse(CursosString);

    let tbody = document.querySelector('#tblCursos tbody');
    tbody.innerHTML = '';
    
    document.getElementById('selectCarrera').click();
    for(let i = 0; i < listaCursos.length; i++){
        let fila = tbody.insertRow();

        let cNomCurso = fila.insertCell();
        let ls = []
        ls.push(listaCursos[i][0]);
        agregaCurso(ls);
        cNomCurso.innerHTML = listaCursos[i][0];
    }

    document.getElementById('selecProvincia').click();
    $('select[id="selecProvincia"]').find('option:contains("'+estudiante['provincia']+'")').attr("selected",true);
    document.getElementById('selecProvincia').click();
    $('select[id="selectCanton"]').find('option:contains("'+estudiante['canton']+'")').attr("selected",true);
    document.getElementById('selectCanton').click();
    $('select[id="selectDistrito"]').find('option:contains("'+estudiante['distrito']+'")').attr("selected",true);
    document.getElementById('selectDistrito').click();

    inputConNombre1.value = estudiante['contNombre1'];
    inputConNombre2.value = estudiante['contNombre2'];
    inputConApellido1.value = estudiante['contApellido1'];
    inputConApellido2.value = estudiante['contApellido2'];
    inputConTelefono.value = estudiante['contTelefono'];
    inputConCorreo.value = estudiante['contCorreo'];
};

function getDatosActualizar(){

    let infoEstudiante=[];
    let sError = false;
    infoEstudiante.push(inputCedula.value,inputNombre1.value,inputNombre2.value,inputApellido1.value,inputApellido2.value,inputTelefono.value,inputCorreo.value,inputDireccion.value,$("#selecProvincia option:selected" ).text(),$("#selectCanton option:selected").text(),$("#selectDistrito option:selected").text(),selectCarrera.value,inputConNombre1.value,inputConNombre2.value,inputConApellido1.value,inputConApellido2.value,inputConTelefono.value,inputConCorreo.value);
    let infoUser = getInfoEstudiante()[0];

    sError = validaCarrera();
    if(sError==true){
        swal({
            title: "Advertencia",
            text: "Por favor revisar los campos marcados con rojo",
            icon: "warning",
            button: "Ok",
        });
    }else{
        actualizarEstudianteId(infoUser['_id'],infoEstudiante);
        swal({
            type : 'Success',
            title : 'Registro exitoso',
            text: 'La información del estudiante '+inputNombre1.value+' fue actualizada exitosamente',
            icon: 'success',
            confirmButtonText : 'OK'
        });
        form1.reset();
        form2.reset();
        form3.reset();
        tbodyCursos.innerHTML='';
        sessionStorage.setItem('update', 0);

        tab3.classList.remove('activeTab');
        tab1.classList.add('activeTab');
        panelN3.classList.remove('activePanel');
        panelN1.classList.add('activePanel');

    }
}