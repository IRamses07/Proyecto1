'use strict';
getURLverTicket();
getCurrentUserData();

let optProy = document.querySelector('#proyecto');
let optUrg = document.querySelector('#urgencia');
let optEst = document.querySelector('#estado');
let img = document.querySelector('#imgErr');
let codigo = document.querySelector('#cod');
let cliente = document.querySelector('#cliente');
let sltEstudiantes = document.querySelector('#sltEstudiante');
let sEst = sltEstudiantes.options[sltEstudiantes.selectedIndex].text;
let sltProfes = document.querySelector('#sltProfesor');
console.log(sEst);

let form1 = document.querySelector('#form1');
let form2 = document.querySelector('#form2');


let panelE = document.querySelector('#panelE'); //paneles con info
let panelP = document.querySelector('#panelP');

let tab1 = document.querySelector('#tab1');
let tab2 = document.querySelector('#tab2');

let btnAgregar = document.querySelector('#asignarE');
btnAgregar.addEventListener('click', function () {
    llenarTablaEstudiantes()
});

let btnFinalizarAsignacion = document.querySelector('#asignarDatos');
btnFinalizarAsignacion.addEventListener('click', asignarTickets);

panelE.classList.remove('activePanel');
panelP.classList.add('activePanel');
tab1.classList.remove('activeTab');
tab2.classList.add('activeTab');
panelP.hidden = true;

llenarSltEstudiantes();
llenarSltProfes();

function getURLverTicket() {
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
};
let tickDa = mostrarTicket(getURLverTicket()._id);
console.log(tickDa);


let proyecto = tickDa[0]['proyecto'];
let urgencia = tickDa[0]['urgencia'];
let referenciaTicket = tickDa[0]['referencia_ticket'];
let estado = tickDa[0]['estado'];
let imgn = tickDa[0]['imagen_error'];
let codigot = tickDa[0]['codigo'];
let nombreCliente = tickDa[0]['nombre_cliente'];
let descripcionErr = tickDa[0]['descripcion'];

optProy.value = proyecto;
optUrg.value = urgencia;
optEst.value = estado;
codigo.value = codigot;
cliente.value = nombreCliente;

usuario = getCurrentUserData()['rol'];

if (estado == "Activo") {
    optEst.classList.add("color");
}


if (usuario == "profesor") {

}

if (usuario == "administrador") {
    // .hidden = false ;

}


function llenarSltEstudiantes() {
    let estudiantes = obtenerListaEstudiantes();

    for (let i = 0; i < estudiantes.length; i++) {
        sltEstudiantes.options[i + 1] = new Option(estudiantes[i]['Nombre1'] + estudiantes[i]['apellido1'], estudiantes[i]['_id'])
    }
}



function llenarSltProfes() {
    let profesores = getProfessorData();

    for (let i = 0; i < profesores.length; i++) {
        sltProfes.options[i + 1] = new Option(profesores[i]['nombre1'] + profesores[i]['apellido1'], profesores[i]['nombre1'] + profesores[i]['apellido1'])
    }
}

let estudiantesIds = [];

function llenarTablaEstudiantes() {

    let estudiantes = obtenerListaEstudiantes();
    let estudiante = sltEstudiantes.value;
    estudiantesIds.push(estudiante);

    let tbody = document.querySelector('#tblAsignacionE tbody');
    tbody.innerHTML = '';
    for (let i = 0; i < estudiantesIds.length; i++) {
        for (let j = 0; j < estudiantes.length; j++) {
            if (estudiantesIds[i] == estudiantes[j]['_id']) {


                let fila = tbody.insertRow();
                let NombreE = fila.insertCell();
                let rol = fila.insertCell();
                let ver = fila.insertCell();

                let boton = document.createElement("a");
                // boton.type = "";
                //<i class="far fa-trash-alt"></i>
                boton.classList.add("far");
                boton.classList.add("fa-trash-alt");

                NombreE.innerHTML = estudiantes[j]['Nombre1'] + estudiantes[j]['apellido1'];;

                rol.innerHTML = estudiantes[j]['rol'];

                ver.appendChild(boton);

                boton.addEventListener('click', function () {
                    boton.dataset.id = estudiantes[j]['_id'];
                    if (estudiantesIds[i] == estudiantes[j]['_id']) {
                        estudiantesIds.splice(i, 1);
                        document.querySelector('#tblAsignacionE tbody').deleteRow(i);
                    }
                });
            }
        }
    }

}

function asignarTickets() {
    let error = false;
    estudiantesIds;
    console.log(estudiantesIds);

    for (let i = 0; i < estudiantesIds.length; i++) {
        let id = estudiantesIds[i];
        let idTicket = tickDa[0]['_id'];
        asignarTicketEstudiante(id, idTicket, codigot, nombreCliente, proyecto, urgencia, referenciaTicket, estado, imgn,descripcionErr);

       
    }
    if (error == true) {
        console.log('aquí va un sweet alert xD ');
        swal({
            title: "La asignación falló",
            text: "El ticket no se ha podido asignar a los estudiantes",
            icon: "error",
            button: "Ok",
        });
    } else {
       
        // notificacion()  
        // aquí mando el id del emisor y el rol, los datos del receptor, tipo = 'ticket',referencia: id (del ticket), verTicket.html
        swal({
            title: "Ticket asignado correctamente",
            text: "El ticket se ha asignado correctamente",
            icon: "success",
            button: "Ok",
        });
    }
   
}