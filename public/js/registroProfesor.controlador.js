'use strict';
let eString = /[A-Za-záéíóúñÑÁÉÍÓÚ+-]+/,
    eNumber = /[0-9]+/,
    eSpace = /\s+/,
    eEmail = /([\w\.\-_]+)?\w+@[\w-_]+(\.\w+){1,}/,
    eDate = /^(0?[1-9]|1[0-2])[\/](0?[1-9]|[12]\d|3[01])[\/](19|20)\d{2}$/,
    ePhone = /^\s*(?:\+?(\d{1,3}))?([-. (]*(\d{3})[-. )]*)?((\d{3})[-. ]*(\d{2,4})(?:[-.x ]*(\d+))?)\s*$/;

document.querySelector('#btnRegistro').addEventListener('click', registrarProfe);

function validarRequeridos() {

    let aRequeridos = document.querySelectorAll('[required]');
    let empty = false;

    for (let i = 0; i < aRequeridos.length; i++) {
        if (aRequeridos[i].value == '') {
            aRequeridos[i].classList.add('error_input');
            empty = true;
        } else {
            aRequeridos[i].classList.remove('error_input');
        }
    }
    return empty;
}

function registrarProfe() {

    let sNombre1 = document.querySelector('#txtNombre1').value;
    let sNombre2 = document.querySelector('#txtNombre2').value;
    let sApellido1 = document.querySelector('#txtApellido1').value;
    let sApellido2 = document.querySelector('#txtApellido2').value;
    let sCedula = document.querySelector('#txtCedula').value;
    let sCorreo = document.querySelector('#txtCorreo').value;
    let sTelefono = document.querySelector('#txtTelefono').value;
    let sProfesion = document.querySelector('#txtProfesion').value;
    let sRol = 'profesor';

    let bError = false;

    let infoProfesor = [];

   /* let listaProfes = getProfessorData();*/

    if (validarRequeridos()) {
        swal({
            title: "Advertencia",
            text: "Por favor llene los campos en rojo.",
            icon: "warning",
            button: "Ok",
        });
    } else {
       /* for (let i = 0; i < listaProfes.length; i++) {*/
            if (!validarCedula(sCedula)) {
                document.querySelector('#txtCedula').classList.remove('error_input');
                document.querySelector('#lblCedulaError').classList.add('lblHide');
            } else {
                document.querySelector('#txtCedula').classList.add('error_input');
                document.querySelector('#lblCedulaError').classList.remove('lblHide');
                bError = true;
            }
       
        if (eEmail.test(sCorreo) && !eSpace.test(sCorreo)) {
            document.querySelector('#txtCorreo').classList.remove('error_input');
            document.querySelector('#lblCorreoError').classList.add('lblHide');

        } else {
            document.querySelector('#txtCorreo').classList.add('error_input');
            document.querySelector('#lblCorreoError').classList.remove('lblHide');
            bError = true;
        }

        if (ePhone.test(sTelefono)) {
            document.querySelector('#txtTelefono').classList.remove('error_input');
            document.querySelector('#lblTelError').classList.add('lblHide');

        } else {
            document.querySelector('#txtTelefono').classList.add('error_input');
            document.querySelector('#lblTelError').classList.remove('lblHide');
            bError = true;
        }

        if (eString.test(sProfesion)) {
            document.querySelector('#txtProfesion').classList.remove('error_input');
            document.querySelector('#lblProfesionError').classList.add('lblHide');

        } else {
            document.querySelector('#txtProfesion').classList.add('error_input');
            document.querySelector('#lblProfesionError').classList.remove('lblHide');
            bError = true;
        }

        if (!bError) {
            let password = generateRandomPassword();
            swal({
                title: "Registro exitoso",
                text: "El profesor se ha registrado exitosamente.\n Contraseña temporal: "+password,
                icon: "success",
                button: "Ok",
            });
            infoProfesor.push(sNombre1, sNombre2, sApellido1, sApellido2, sCedula, sCorreo, sTelefono, sProfesion, sRol, password);
            setProfessorData(infoProfesor);
            limpiar();
        }
    }
}

function limpiar() {
    let inputs = document.querySelectorAll("input");
    for (let i = 0; i < inputs.length; i++) {
        inputs[i].value = '';
    }
}


