moveUser(true);
document.querySelector('#btnAgregarPrepAcademica').addEventListener('click', preparacionAcademica);
document.querySelector('#btnCursosImpartidos').addEventListener('click', cursosImpartidos);
document.querySelector('#btnAgregar').addEventListener('click', extraProfessorData);

listadoCursosImpartidos();
listadoPrepAcademica();

/*let sTrabajo = document.querySelector('#txtTrabajo').value;
let nAnno = document.querySelector('#nAnno').value;*/

document.querySelector('#txtTrabajo').value = getCurrentUserData()['trabajo_anterior'];
nAnno = document.querySelector('#nAnno').value = getCurrentUserData()['experiencia_docente'];

function preparacionAcademica() {

    let sltGrado = document.querySelector('#sltGrado');
    let sGrado = sltGrado.options[sltGrado.selectedIndex].text;
    let fechaTitulo = document.querySelector('#dTitulo').value
    let sCarrera = document.querySelector('#txtCarrera').value;
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
        setPreparacionAcademica(getCurrentUserData()['_id'], sGrado, fechaTitulo, sCarrera);
        limpiarPrepAcademica();
        listadoPrepAcademica();
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
        setExtraData(getCurrentUserData()['_id'], document.querySelector('#txtTrabajo').value, document.querySelector('#nAnno').value);
        limpiarExtraData();
        window.setTimeout(function(){
            window.location.href = "perfilProfesor.html";
            }, 3000);
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

    acomodarEspacios();

    if (getCurrentUserData()['cursos_impartidos'] == "") {
        document.querySelector('#tblCursosImpartidos').classList.add('hide');

    } else {
        document.querySelector('#tblCursosImpartidos').classList.remove('hide');
        let tbody = document.querySelector('#tblCursosImpartidos tbody');
        tbody.innerHTML = '';

        for (let i = 0; i < JSON.parse(getCurrentUserData()['cursos_impartidos']).length; i++) {
            let fila = tbody.insertRow();

            fila.insertCell().innerHTML = JSON.parse(getCurrentUserData()['cursos_impartidos'])[i];
        }
    }
}

function acomodarEspacios(){
    if (getCurrentUserData()['preparacion_academica'].length == 0) {
        document.querySelector('#tblPrepAcademica').classList.add('hide');
        if(getCurrentUserData()['cursos_impartidos'] == ""){
            document.querySelector('#tblPrepAcademica').classList.remove('tamannoMaxR');
            document.querySelector('#tblPrepAcademica').classList.add('tamannoMinR');
            document.querySelector('#tblCursosImpartidos').classList.remove('tamannoMaxL');
            document.querySelector('#tblCursosImpartidos').classList.add('tamannoMinL');
        }else{
            document.querySelector('#tblPrepAcademica').classList.remove('tamannoMaxR');
            document.querySelector('#tblPrepAcademica').classList.add('tamannoMinR');
            document.querySelector('#tblCursosImpartidos').classList.add('tamannoMaxL');
            document.querySelector('#tblCursosImpartidos').classList.remove('tamannoMinL');
        }
    } else {
        if(getCurrentUserData()['cursos_impartidos'] == ""){
            document.querySelector('#tblPrepAcademica').classList.add('tamannoMaxR');
            document.querySelector('#tblPrepAcademica').classList.remove('tamannoMinR');
            document.querySelector('#tblCursosImpartidos').classList.remove('tamannoMaxL');
            document.querySelector('#tblCursosImpartidos').classList.add('tamannoMinL');
        }else{
            document.querySelector('#tblPrepAcademica').classList.remove('tamannoMaxR');
            document.querySelector('#tblPrepAcademica').classList.add('tamannoMinR');
            document.querySelector('#tblCursosImpartidos').classList.remove('tamannoMaxL');
            document.querySelector('#tblCursosImpartidos').classList.add('tamannoMinL');
        }
    }
}

function listadoPrepAcademica() {

    acomodarEspacios();

    if (getCurrentUserData()['preparacion_academica'].length == 0) {
        document.querySelector('#tblPrepAcademica').classList.add('hide');
    } else {
        document.querySelector('#tblPrepAcademica').classList.remove('hide');
        let tbody = document.querySelector('#tblPrepAcademica tbody');
        tbody.innerHTML = '';

        for (let i = 0; i < getCurrentUserData()['preparacion_academica'].length; i++) {
            let fila = tbody.insertRow();

            fila.insertCell().appendChild(document.createTextNode(getCurrentUserData()['preparacion_academica'][i]['carrera']));
            fila.insertCell().appendChild(document.createTextNode(getCurrentUserData()['preparacion_academica'][i]['grado_academico']));
            fila.insertCell().appendChild(document.createTextNode(getCurrentUserData()['preparacion_academica'][i]['titulo_fecha']));
        }
    }
}
