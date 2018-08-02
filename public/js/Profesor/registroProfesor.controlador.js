'use strict';
moveUser(true);
let eString = /[A-Za-záéíóúñÑÁÉÍÓÚ+-]+/,
    eNumber = /[0-9]+/,
    eSpace = /\s+/,
    eEmail = /([\w\.\-_]+)?\w+@[\w-_]+(\.\w+){1,}/,
    eDate = /^(0?[1-9]|1[0-2])[\/](0?[1-9]|[12]\d|3[01])[\/](19|20)\d{2}$/,
    ePhone = /^\s*(?:\+?(\d{1,3}))?([-. (]*(\d{3})[-. )]*)?((\d{3})[-. ]*(\d{2,4})(?:[-.x ]*(\d+))?)\s*$/;


if (getProfessorUpdate() != '') {
    document.querySelector('#btnRegistro').hidden = true;
    document.querySelector('#btnUpdate').hidden = false;
    document.querySelector('#tituloPrincipal').innerHTML = 'Información del profesor: '+getProfessorUpdate()[0]['nombre1']+" "+
    getProfessorUpdate()[0]['apellido1']+' - '+'Ced: '+getProfessorUpdate()[0]['cedula'];
    document.querySelector('#txtCedula').disabled = true;
    fillInputs(getProfessorUpdate());
} else {
    document.querySelector('#tituloPrincipal').innerHTML = 'Nuevo profesor';
    document.querySelector('#btnRegistro').hidden = false;
    document.querySelector('#btnUpdate').hidden = true;
    document.querySelector('#txtCedula').disabled = false;
}

document.querySelector('#btnRegistro').addEventListener('click', registrarProfe);
document.querySelector('#btnUpdate').addEventListener('click', registrarProfe);

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
    let passwordChange = 0;

    let bError = false;

    let infoProfesor = [];

    /*let listaProfes = getProfessorData();*/

    if (validarRequeridos()) {
        swal({
            title: "Advertencia",
            text: "Por favor llene los campos en rojo.",
            icon: "warning",
            button: "Ok",
        });
    } else {
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
            if (getProfessorUpdate()!='') {
                swal({
                    title: "Modificación exitosa",
                    text: "El profesor se ha modificado exitosamente.",
                    icon: "success",
                    button: "Ok",
                });
                infoProfesor.push(getProfessorUpdate()[0]['_id'], sNombre1, sNombre2, sApellido1, sApellido2, sCorreo, sTelefono, sProfesion);
                updateProfessor(infoProfesor);
                window.setTimeout(function () {
                    window.location.href = "listarProfesores.html";
                }, 3000);
            } else {
                let password = generateRandomPassword();
                swal({
                    title: "Registro exitoso",
                    text: "El profesor se ha registrado exitosamente.\n Contraseña temporal: " + password,
                    icon: "success",
                    button: "Ok",
                });
                infoProfesor.push(sNombre1, sNombre2, sApellido1, sApellido2, sCedula, sCorreo, sTelefono, sProfesion, sRol, password, passwordChange);
                setProfessorData(infoProfesor);
            }

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

function fillInputs(pProfe) {
    let inputs = document.querySelectorAll("input");
    let miProfe = [pProfe[0]["nombre1"],pProfe[0]["apellido1"],pProfe[0]["cedula"],
    pProfe[0]["telefono"],pProfe[0]["nombre2"],pProfe[0]["apellido2"],pProfe[0]["correo"],pProfe[0]["profesion"]];

    for (let i = 0; i<inputs.length; i++) {
        inputs[i].value = miProfe[i];
    }
}


