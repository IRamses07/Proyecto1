
document.querySelector('#btnChange').addEventListener('click', passwordRecovery);

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

let userId = getParameterByName('id');
let allUsers = getUsers();

function findUser() {
    let thisUser = '';
    let encontrado = false;

    for (let i = 0; i < allUsers.length && !encontrado; i++) {
        for (let j = 0; j < allUsers[i].length && !encontrado; j++) {
            if (allUsers[i][j]['_id'] == userId) {
                thisUser = allUsers[i][j];
                encontrado = true;
            }
        }
    }
    return thisUser
}

function passwordRecovery() {

    let newPassword = document.querySelector('#txtNewPassword').value;
    let confirmPassword = document.querySelector('#txtConfirmPassword').value;
    let bError = false;

    if (validarRequeridos()) {
        swal({
            title: "Advertencia",
            text: "Por favor llene los campos en rojo.",
            icon: "warning",
            button: "Ok",
        });
    } else {

        if (!(newPassword.length > 5 && newPassword.length < 12) || findUser()['password'] == newPassword) {
            document.querySelector('#txtNewPassword').classList.add('error_input');
            bError = true;
        } else {
            document.querySelector('#txtNewPassword').classList.remove('error_input');
        }

        if (findUser()['password'] == newPassword) {
            document.querySelector('#divHide').classList.add('hide');
            document.querySelector('#lblNewPasswordError2').classList.add('hide');
            document.querySelector('#lblNewPasswordError').classList.remove('lblHide');
            document.querySelector('#lblNewPasswordError').classList.remove('hide');
            bError = true;

        } else {
            if (newPassword.length > 5 && newPassword.length < 12) {
                document.querySelector('#divHide').classList.add('hide');
                document.querySelector('#lblNewPasswordError2').classList.add('hide');
                document.querySelector('#lblNewPasswordError').classList.add('lblHide');
                document.querySelector('#lblNewPasswordError').classList.add('hide');
            } else {
                document.querySelector('#divHide').classList.remove('hide');
                document.querySelector('#lblNewPasswordError2').classList.remove('hide');
                document.querySelector('#lblNewPasswordError').classList.add('lblHide');
                document.querySelector('#lblNewPasswordError').classList.add('hide');
                bError = true;
            }
        }

        if (newPassword == confirmPassword) {
            document.querySelector('#txtConfirmPassword').classList.remove('error_input');
            document.querySelector('#lblConfirmacionError').classList.add('lblHide');
        } else {
            document.querySelector('#txtConfirmPassword').classList.add('error_input');
            document.querySelector('#lblConfirmacionError').classList.remove('lblHide');
            bError = true;
        }

        if (!bError) {
            swal({
                title: "Cambio exitoso",
                text: "Se ha cambiado su contraseña exitosamente.",
                icon: "success",
                button: "Ok",
            });
            setNewPassword(findUser()['_id'], confirmPassword, findUser()['rol']);
            limpiar();
            window.setTimeout(function () {
                window.location.href = "login.html";
            }, 3000);

        }
    }

}

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

function limpiar() {
    let inputs = document.querySelectorAll("input");
    for (let i = 0; i < inputs.length; i++) {
        inputs[i].value = '';
    }
}