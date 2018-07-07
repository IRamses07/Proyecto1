document.querySelector('#btnLogin').addEventListener('click', signIn);

function signIn() {

    let sId = document.querySelector('#txtIdentificacion').value;
    let sPassword = document.querySelector('#txtPassword').value;

    if (validarRequeridos()) {
        swal({
            title: "Advertencia",
            text: "Por favor llene los campos en rojo.",
            icon: "warning",
            button: "Ok",
        });
    } else {
        if (validarCredenciales(sId, sPassword)) {

            document.querySelector('#lblCredencialesError').classList.add('lblHide');

            resultadoLogin.classList.remove('esconder');

            let infoUser = getCurrentUserData();
            if (infoUser['password_changed'] == 0) {
                console.log("Primer inicio de sesión del usuario! Deberá cambiar su contraseña.");
                /*window.setTimeout(function(){*/
                window.location.href = "changePassword.html";
                /*}, 5000);*/
            } else {
                /*window.setTimeout(function(){*/
                window.location.href = ".html"; //DONDE MANDAR A LA GENTE CUANDO SE LOGEA??????????
                /*}, 5000);}*/

                swal({
                    title: "Inicio de sesión exitoso",
                    text: "Se ha iniciado sesión correctamente.",
                    icon: "success",
                    button: "Ok",
                });
            }
        } else {
            document.querySelector('#lblCredencialesError').classList.remove('lblHide');

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

function validarCredenciales(psId, psPassword) {
    let userPassword = getUserPassword(psId);
    let bFound = false;
    if (userPassword == psPassword) {
        //Usuario y contraseña correcta.
        setCurrentUser(id);
        bFound = true;
    } else {
        console.log("[startLogin] Se ingresó una contraseña incorrecta.");
    }
    return bFound;
}