/*document.querySelector('#btnAgregar').addEventListener('click', preparacionAcademica);*/

document.querySelector('#btnAgregarPrepAcademica').addEventListener('click', preparacionAcademica);
document.querySelector('#btnCursosImpartidos').addEventListener('click', cursosImpartidos);

function preparacionAcademica() {

    let dTitulo = document.querySelector('#dTitulo').value;
    let sCarrera = document.querySelector('#txtCarrera').value;
    let sltGrado = document.querySelector('#sltGrado');
    let sGrado = sltGrado.options[sltGrado.selectedIndex].text;

    if (sltGrado.options[sltGrado.selectedIndex].index == 0) {
        sltGrado.options[sltGrado.selectedIndex].value = '';
    }else{
        sltGrado.options[sltGrado.selectedIndex].value = sltGrado.options[sltGrado.selectedIndex].text;
    }

    if (validarPrepAcademica()) {
        swal({
            title: "Advertencia",
            text: "Por favor llene los campos en rojo.",
            icon: "warning",
            button: "Ok",
        });
    }else{
        setPreparacionAcademica(getCurrentUserData()['_id'], sGrado, dTitulo, sCarrera);
        limpiarPrepAcademica();
    }

    function validarPrepAcademica(){

        let aRequeridos = document.querySelectorAll('[name=prepAcademica');
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
}

function cursosImpartidos(){
    /*let sTrabajo = document.querySelector('#txtTrabajo').value;
    let nAnno = document.querySelector('#nAnno').value;*/

    let sltCursos = document.querySelector('#sltCursos');
    let sCursos = sltCursos.options[sltCursos.selectedIndex].text;

    if (sltCursos.options[sltCursos.selectedIndex].index == 0) {
        sltCursos.options[sltCursos.selectedIndex].value = '';
    } else {
        sltCursos.options[sltCursos.selectedIndex].value = sltCursos.options[sltCursos.selectedIndex].text;
    }

    if (validarCursosImpartidos()) {
        swal({
            title: "Advertencia",
            text: "Por favor llene los campos en rojo.",
            icon: "warning",
            button: "Ok",
        });
    }else{
        setCursosImpartidos(getCurrentUserData()['_id'], sCursos);
        limpiarCursosImpartidos();
    }

    function validarCursosImpartidos() {
        let aRequeridos = document.querySelectorAll('[name=cursosImpartidos');
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

function limpiarPrepAcademica() {
    let inputs = document.querySelectorAll("[name=prepAcademica]");
    for (let i = 0; i < inputs.length; i++) {
        inputs[i].value = '';
    }
}

function limpiarCursosImpartidos(){
    let inputs = document.querySelectorAll("[name=cursosImpartidos]");
    for (let i = 0; i < inputs.length; i++) {
        inputs[i].value = '';
    }
}

/*swal({
    title: "Actualización exitosa",
    text: "Los datos se han agregado a su perfil exitosamente.",
    icon: "success",
    button: "Ok",
});*/