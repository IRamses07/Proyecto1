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

function validarCredenciales(asId, asPassword){

    let founded = false;

    if(getUserPassword(asId) == asPassword){
        setCurrentUser(asId);
        founded = true;
    }
    return founded;
}