moveUser(true);
document.querySelector('#btnChange').addEventListener('click', passwordChange);

function passwordChange() {

    let newPassword = document.querySelector('#txtNewPassword').value;
    let oldPassword = document.querySelector('#txtOldPassword').value;
    let confirmPassword = document.querySelector('#txtConfirmPassword').value;
    let bError = false;

    if (validarRequeridos()) {
        swal({
            title: "Advertencia",
            text: "Por favor llene los campos en rojo.",
            icon: "warning",
            button: "Ok",
        });
    }else{
        if (getCurrentUserData()['password'] == oldPassword) {
            document.querySelector('#txtOldPassword').classList.remove('error_input');
            document.querySelector('#lblOldPasswordError').classList.add('lblHide');
        } else {
            document.querySelector('#txtOldPassword').classList.add('error_input');
            document.querySelector('#lblOldPasswordError').classList.remove('lblHide');
            bError = true;
        }

        if (getCurrentUserData()['password'] == newPassword) {
            document.querySelector('#txtNewPassword').classList.add('error_input');
            document.querySelector('#lblNewPasswordError').classList.remove('lblHide');
        } else {
            document.querySelector('#txtNewPassword').classList.remove('error_input');
            document.querySelector('#lblNewPasswordError').classList.add('lblHide');
            bError = true;
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
            setNewPassword(getCurrentUserData()['cedula'], confirmPassword);
            limpiar();
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