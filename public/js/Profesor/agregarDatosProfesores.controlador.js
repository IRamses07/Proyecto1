
document.querySelector('#btnAgregarPrepAcademica').addEventListener('click', preparacionAcademica);
document.querySelector('#btnCursosImpartidos').addEventListener('click', cursosImpartidos);
document.querySelector('#btnAgregar').addEventListener('click', extraProfessorData);

listadoCursosImpartidos();

let sTrabajo = document.querySelector('#txtTrabajo').value;
let nAnno = document.querySelector('#nAnno').value;

document.querySelector('#txtTrabajo').value = getCurrentUserData()['trabajo_anterior'];
nAnno = document.querySelector('#nAnno').value = getCurrentUserData()['experiencia_docente'];

function preparacionAcademica() {

    let sltGrado = document.querySelector('#sltGrado');
    let sGrado = sltGrado.options[sltGrado.selectedIndex].text;

    if (sltGrado.options[sltGrado.selectedIndex].index == 0) {
        sltGrado.options[sltGrado.selectedIndex].value = '';
    } else {
        sltGrado.options[sltGrado.selectedIndex].value = sltGrado.options[sltGrado.selectedIndex].text;
    }

    if (validarPrepAcademica()) {
        swal({
            title: "Advertencia",
            text: "Por favor llene los campos en rojo.",
            icon: "warning",
            button: "Ok",
        });
    } else {
        setPreparacionAcademica(getCurrentUserData()['_id'], sGrado, dTitulo, sCarrera);
        limpiarPrepAcademica();
    }

    function validarPrepAcademica() {

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

function cursosImpartidos() {

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
    } else {
        setCursosImpartidos(getCurrentUserData()['_id'], sCursos);
        limpiarCursosImpartidos();
        listadoCursosImpartidos()
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

function extraProfessorData() {


    if (validarExtraData()) {
        swal({
            title: "Advertencia",
            text: "Por favor llene los campos en rojo.",
            icon: "warning",
            button: "Ok",
        });
    } else {
        swal({
            title: "Actualización exitosa",
            text: "Los datos se han agregado a su perfil exitosamente.",
            icon: "success",
            button: "Ok",
        });
        setExtraData(getCurrentUserData()['_id'], sTrabajo, nAnno);
        limpiarExtraData();

    }

    function validarExtraData() {
        let aRequeridos = document.querySelectorAll('[name=extraData');
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

function limpiarPrepAcademica() {
    let inputs = document.querySelectorAll("[name=prepAcademica]");
    for (let i = 0; i < inputs.length; i++) {
        inputs[i].value = '';
    }
}

function limpiarCursosImpartidos() {
    let inputs = document.querySelectorAll("[name=cursosImpartidos]");
    for (let i = 0; i < inputs.length; i++) {
        inputs[i].value = '';
    }
}

function limpiarExtraData() {
    let inputs = document.querySelectorAll("[name=extraData]");
    for (let i = 0; i < inputs.length; i++) {
        inputs[i].value = '';
    }
}

function listadoCursosImpartidos() {

    if (JSON.parse(getCurrentUserData()['cursos_impartidos']).length == 0) {
        document.querySelector('#thCursosImpartidos').classList.remove('.lblHide');
    }

        let tbody = document.querySelector('#tblCursosImpartidos tbody');
        tbody.innerHTML = '';

        for (let i = 0; i < JSON.parse(getCurrentUserData()['cursos_impartidos']).length; i++) {
            let fila = tbody.insertRow();

            fila.insertCell().innerHTML = JSON.parse(getCurrentUserData()['cursos_impartidos'])[i];
        }
}

function listadoPrepAcademica() {

    if (getCurrentUserData()['preparacion_academica']['carrera'] == ''&&
    getCurrentUserData()['preparacion_academica']['grado_academico'] == '') {
        document.querySelector('#thCursosImpartidos').classList.remove('.lblHide');
    }

        let tbody = document.querySelector('#tblCursosImpartidos tbody');
        tbody.innerHTML = '';

        for (let i = 0; i < JSON.parse(getCurrentUserData()['cursos_impartidos']).length; i++) {
            let fila = tbody.insertRow();

            fila.insertCell().innerHTML = JSON.parse(getCurrentUserData()['cursos_impartidos'])[i];
        }
    
}
