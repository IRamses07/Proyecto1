'use strict';
moveUser(true);

let botonRegistrarTicket = document.querySelector('#btnRegistrarTicket');
botonRegistrarTicket.addEventListener('click', obtenerDatosTicket);



// let codigo = '';
// let fechaReg = getDate();
let inptNombreCliente = document.querySelector('#txtnombreCliente');
let inptUrgencia = document.querySelector('#sltUrgencia');
let inptProyecto = document.querySelector('#sltProyecto');
let inptimagenErr = document.querySelector('#file-upload');
let inptReferenciaTicket = document.querySelector('#sltTicket');
let inptDescripcionError = document.querySelector('#txtdescripcion');

listarSelectProyectos();
llenarNombreCliente();
listarTicketsReferencia();


function obtenerDatosTicket() {
    let ticket = [];
    let error = false;
    error = validar();
    
    let nombreCliente = inptNombreCliente.value;
    let urgencia = inptUrgencia.value;
    let proyecto = inptProyecto.value;
    let imagenErr = imgUrl;
    let referenciaTicket = inptReferenciaTicket.value;
    let descripcionError = inptDescripcionError.value;
    ticket.push(nombreCliente, urgencia, proyecto, imagenErr, referenciaTicket, descripcionError);
    // imagenErr   en caso de no servir la prueba sin este dato va dentro del parentesis del push


    if (error == true) {
        console.log('aquí va un sweet alert xD ');
        swal({
            title: "Registro fallido",
            text: "El ticket no se ha podido registrar",
            icon: "error",
            button: "Ok",
        });
    } else {
        registrarTicket(nombreCliente, urgencia, proyecto, imagenErr, referenciaTicket, descripcionError);
        // regitroNotificacion()  
        //aquí mando el id del emisor y el rol, los datos del receptor, tipo = 'ticket',referencia: id (del ticket), verTicket.html
        // swal({
        //     title: "Registro exitoso",
        //     text: "El ticket se ha registrado correctamente",
        //     icon: "success",
        //     button: "Ok",
        // });
        alertify.error('El ticket se registró correctamente'); 
        document.location.href = './listarTicketsCliente.html';
        console.log('aquí va otro sweet alert xDD');
        limpiarFormulario();
    }

};

function validar() {
    let error = false;


    if (inptUrgencia.value == '') {
        inptUrgencia.classList.add('error');
        error = true;
    } else {
        inptUrgencia.classList.remove('error');
    }
    if (inptProyecto.value == '') {
        inptProyecto.classList.add('error');
        error = true;
    } else {
        inptProyecto.classList.remove('error');
    }

    if (inptDescripcionError.value == '') {
        inptDescripcionError.classList.add('error');
        error = true;
    } else {
        inptDescripcionError.classList.remove('error');
    }
    return error;
}


function limpiarFormulario() {
    inptNombreCliente.value = '';
    inptUrgencia.value = '';
    inptProyecto.value = '';
    inptimagenErr.value = '';
    inptReferenciaTicket.value = '';
    inptDescripcionError.value = '';

}

function listarSelectProyectos() {
    let proyectoUsuario = getCurrentUserData()['proyectos'];
    let sltproyectos = listarProyectos();
    let select = document.querySelector('#sltProyecto');
    select.options[0] = new Option("Seleccione un proyecto...", "");
    let proyectos = [];
    for (let i = 0; i < sltproyectos.length; i++) {
        for (let j = 0; j < proyectoUsuario.length; j++) {
            if (sltproyectos[i]['nombre_proyecto'] == proyectoUsuario[j]['nombre_proyecto']) {
                proyectos.push(sltproyectos[i]);
                
            }

        }
    }
    for(let i = 0; i < proyectos.length; i++){
        select.options[i + 1] = new Option(proyectos[i]['nombre_proyecto'], proyectos[i]['nombre_proyecto']);
    }
}


function llenarNombreCliente() {
    let nombreUsuario = getCurrentUserData()['nombre'];
    let inptNombreCliente = document.querySelector('#txtnombreCliente');
    inptNombreCliente.value = nombreUsuario;

}

function listarTicketsReferencia() {
    let nombreUsuario = getCurrentUserData()['nombre'];
    let sltTickets = listarTickets();
    let sltReferenciaTicket = document.querySelector('#sltTicket');

    for (let i = 0; i < sltTickets.length; i++) {
        if(inptProyecto.value == sltTickets[i]['proyecto']){
        sltReferenciaTicket.options[i] = new Option(sltTickets[i]['proyecto'], sltTickets[i]['proyecto'])
    }
}
    
}
// Código de cada ticket registrado
// function addZero(x, n) {
//     while (x.toString().length < n) {
//       x = "0" + x;
//     }
//     return x;
//   }
  
//   // Añadir control al elemento "p" principal de la página.
//   function addControl() {
//     let d = new Date();
//     let x = document.getElementById("demo");
//     let h = addZero(d.getHours(), 2);
//     let m = addZero(d.getMinutes(), 2);
//     let s = addZero(d.getSeconds(), 2);
//     let ms = addZero(d.getMilliseconds(), 3);
//     x.innerHTML += "<p id='" + h + m + s + ms + "'>ID: " + h + m + s + ms + "</p>";
//   }

//esto va en el html
{/* <p>
  <i>En el div de abajo, usted encontrará elementos<br/>
HTML de tipo "p" con valores de identificación únicos:</i>
</p>
<p>
  <button onclick="addControl()">Agregar control</button>
</p>


<p id="demo"></p> */}