document.querySelector('#btnAgregar').addEventListener('click', extraData);
function extraData() {

    let sTrabajo = document.querySelector('#txtTrabajo').value;
    let nAnno = document.querySelector('#nAnno').value;
    let sltCursos = document.querySelector('#sltCursos');
    let sCursos = sltCursos.options[sltCursos.selectedIndex].text;
    sltCursos.options[sltCursos.selectedIndex].value = sltCursos.options[sltCursos.selectedIndex].text;
    let sltGrado = document.querySelector('#sltGrado');
    let sGrado = sltGrado.options[sltGrado.selectedIndex].text;
    sltGrado.options[sltGrado.selectedIndex].value = sltGrado.options[sltGrado.selectedIndex].text;
    let dTitulo = document.querySelector('#dTitulo').value;
    let sCarrera = document.querySelector('#txtCarrera').value;

    if (validarRequeridos()) {
        swal({
            title: "Advertencia",
            text: "Por favor llene los campos en rojo.",
            icon: "warning",
            button: "Ok",
        });
    } else {
        swal({
            title: "Registro exitoso",
            text: "El profesor se ha registrado exitosamente.\n Contraseña temporal: "+password,
            icon: "success",
            button: "Ok",
        });
        setExtraData(sTrabajo, nAnno, sCursos, sGrado, dTitulo, sCarrera);
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