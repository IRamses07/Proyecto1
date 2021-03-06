
setAdmin1();

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
            document.querySelector('#txtIdentificacion').classList.remove('error_input');
            document.querySelector('#txtPassword').classList.remove('error_input');
            document.querySelector('#lblCredencialesError').classList.add('lblHide');
            limpiar();
            if (validarEstado(sId)) {
                setCurrentUser(sId);
                swal({
                    title: "Inicio de sesión exitoso",
                    text: "Será redirigido en 3 segundos.",
                    icon: "success",
                    button: "Ok",
                });

                let infoUser = getCurrentUserData();
                if (infoUser['passwordChange'] == 0) {
                    console.log("Primer inicio de sesión del usuario! Deberá cambiar su contraseña.");
                    window.setTimeout(function () {
                        window.location.href = "passwordChange.html";
                    }, 3000);
                } else {
                    window.setTimeout(function () {
                        if (getCurrentUserData()['rol'] == 'administrador') {
                            window.location.href = "listarProyectos.html";
                        }
                        if (getCurrentUserData()['rol'] == 'profesor') {
                            window.location.href = "listarProyectosProfesor.html";
                        }
                        if (getCurrentUserData()['rol'] == 'estudiante') {
                            window.location.href = "listarProyectosEstudiante.html";
                        }
                        if (getCurrentUserData()['rol'] == 'cliente') {
                            window.location.href = "listarProyectosCliente.html";
                        }
                    }, 3000);
                }
            } else {
                swal({
                    title: "Advertencia",
                    text: "Este usuario se encuentra suspendido.",
                    icon: "warning",
                    button: "Ok",
                });
            }
        } else {
            document.querySelector('#txtIdentificacion').classList.add('error_input');
            document.querySelector('#txtPassword').classList.add('error_input');
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
        bFound = true;
    } else {
        console.log("[startLogin] Se ingresó una contraseña incorrecta.");
    }
    return bFound;
}

function limpiar() {
    let inputs = document.querySelectorAll("input");
    for (let i = 0; i < inputs.length; i++) {
        inputs[i].value = '';
    }
}

function validarEstado(psId) {
    let userStatus = getUserStatus(psId);
    let bFound = false;

    if (userStatus == "Activo" || userStatus == "activo" || userStatus == 1) {
        bFound = true;
    } else if (userStatus == "Desactivo" || userStatus == "inactivo" || userStatus == 0) {
        bFound = false;
    }
    return bFound;
}

function setAdmin1() {
    if (getAdminData() == '') {
        setAdmin();
    }
}

let listaRooms=[];
sessionStorage.setItem("rommies", JSON.stringify(listaRooms));
sessionStorage.setItem("chatMin", 0);