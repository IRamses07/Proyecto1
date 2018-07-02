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
            aRequeridos[i].classList.add('empty_input');
            empty = true;
        } else {
            aRequeridos[i].classList.remove('empty_input');
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
    let sCorreo = document.querySelector('#txtTelefono').value;
    let sTelefono = document.querySelector('#txtProfesion').value;
    let sProfesion = document.querySelector('#txtCorreo').value;
    let sRol = 'profesor';

    let bError = false;

    let infoProfesor = [];

    if (validarRequeridos()) {
        swal({
            title: "Advertencia",
            text: "Por favor llene los campos en rojo.",
            icon: "warning",
            button: "Ok",
        });
    } else {

        if (!eEmail.test(sCorreo) || eSpace.test(sCorreo)) {
            //AHORITA LO DEFINO la clase para agregar el label
            sCorreo.classList.remove('error_input');
            document.querySelector('#lblCorreoError').classList.add('hide');
            bError = true;
        }else{
            document.querySelector('#lblCorreoError').classList.remove('hide');
            sCorreo.classList.add('error_input');
        }

        if (!ePhone.test(sTelefono)) {
            sTelefono.classList.remove('error_input');
            document.querySelector('#lblTelError').classList.add('hide');
            bError = true;
        }else{
            document.querySelector('#lblTelError').classList.remove('hide');
            sTelefono.classList.remove('error_input');
        }

        if (eString.test(sProfesion)) {
            sProfesion.classList.remove('error_input');
            document.querySelector('#lblProfesionError').classList.add('hide');
            bError = true;
        }else{
            document.querySelector('#lblProfesionError').classList.remove('hide');
            sProfesion.classList.add('error_input');
        }

        if (!bError) {
            swal({
                title: "Registro exitoso",
                text: "El profesor se ha registrado exitosamente.",
                icon: "success",
                button: "Ok",
            });
            infoProfesor.push(sNombre1, sNombre2, sApellido1, sApellido2, sCedula, sCorreo, sTelefono, sProfesion, sRol);
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


