document.querySelector('#btnLogin').addEventListener('click', signIn);

function signIn(){

    let sId = document.querySelector('#txtIdentificacion').value;
    let sPassword = document.querySelector('#txtContrasenna').value;

    if(validarRequeridos){
        swal({
            title: "Advertencia",
            text: "Por favor llene los campos en rojo.",
            icon: "warning",
            button: "Ok",
        });
    }else{
        if(vaidarCredenciales(sId, sPassword)){
            
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

function vaidarCredenciales(psId, psPassword){
    let userPassword = getUserPassword(psId);
    let bFound = false;
    if(userPassword == psPassword){
        //Okay, usuario y contraseña correcta. Prosigue el sistema.
        setCurrentUser(id);
        bFound = true;
    }else{
        console.log("[startLogin] Se ingresó una contraseña incorrecta.");
    }
    return bFound;
}
