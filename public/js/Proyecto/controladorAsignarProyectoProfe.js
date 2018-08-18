moveUser(true);
listarSelectClientes();
listarSelectProfe1();
listarSelectProfe2();

let botonAgregar = document.querySelector('#btnAgregar');
botonAgregar.addEventListener('click', obtenerDatos);


let selectProyecto = document.querySelector('#slProyecto');
let selectProfe1 = document.querySelector('#slProfeLider');
let selectProfe2 = document.querySelector('#slProfesorTecnico');
let formulario = document.querySelector('#frmAP');





function listarSelectClientes() {
    let slProyecto = obtenerListaProyectos();
    let select = document.querySelector('#slProyecto');
    select.options[0] = new Option("Seleccione un proyecto", "");

    for (let i = 0; i < slProyecto.length; i++) {
        select.options[i + 1] = new Option(slProyecto[i]['nombre_proyecto'], slProyecto[i]['_id']);

    }
}

function listarSelectProfe1() {
    let selectProfe1 = getProfessorData();
    let select = document.querySelector('#slProfeLider');
    select.options[0] = new Option("Seleccione un profesor", );

    for (let i = 0; i < selectProfe1.length; i++) {
        select.options[i + 1] = new Option(selectProfe1[i]['nombre1'] + '  ' + selectProfe1[i]['apellido1'], selectProfe1[i]['_id']);

    }
}

function listarSelectProfe2() {
    let selectProfe2 = getProfessorData();
    let select = document.querySelector('#slProfesorTecnico');
    select.options[0] = new Option("Seleccione un profesor", );

    for (let i = 0; i < selectProfe2.length; i++) {
        select.options[i + 1] = new Option(selectProfe2[i]['nombre1'] + ' ' + selectProfe2[i]['apellido1'], selectProfe2[i]['_id']);

    }
}

function obtenerDatos() {

    let error = false;

    error = validarCampos();

    if (error == true) {

        console.log('No se pudo registrar el usuario');
    } else {




    }

    switch (error) {
        case 1:
            asignaraProfe1();
            asignaraProfe2();

            swal({
                type: 'success',
                title: 'Se asigno con éxito',
                text: 'Se han asignado los profesores a un proyecto',
                confirmButtonText: 'Entendido'
            });
            break;

        case 2:
            swal({
                type: 'warning',
                title: 'No se pudo asignar el proyecto',
                text: 'Por favor revisar que los profesores no sean iguales',
                confirmButtonText: 'Entendido'
            });
            break;

        case 3:
        swal({
            type: 'warning',
            title: 'No se pudo asignar el proyecto',
            text: 'Estos profesores ya tiene asignados este proyecto',
            confirmButtonText: 'Entendido'
        });

            break;

        default:
            break;
    }
}


function asignaraProfe1() {
    let infoProyecto = [];

    let proyecto = obtenerListaProyectos();


    let id = selectProfe1.value;
    let idProyecto;
    let rol = 'lider';
    let nombreProyecto;
    let fechaEntrega;
    let estadoProyecto;

    for (let i = 0; i < proyecto.length; i++) {

        if (proyecto[i]['_id'] == (selectProyecto.value)) {
            idProyecto = proyecto[i]['_id'];
        }
    }

    for (let i = 0; i < proyecto.length; i++) {

        if (proyecto[i]['_id'] == (selectProyecto.value)) {
            nombreProyecto = proyecto[i]['nombre_proyecto'];
        }
    }

    for (let i = 0; i < proyecto.length; i++) {

        if (proyecto[i]['_id'] == (selectProyecto.value)) {
            fechaEntrega = proyecto[i]['fecha_Entrega'];
        }
    }

    for (let i = 0; i < proyecto.length; i++) {

        if (proyecto[i]['_id'] == (selectProyecto.value)) {
            estadoProyecto = proyecto[i]['estado_proyecto'];
        }
    }




    infoProyecto.push(id, idProyecto, rol, nombreProyecto, fechaEntrega, estadoProyecto)

    asignarProyecto(infoProyecto);


}

function asignaraProfe2() {
    let infoProyecto = [];

    let proyecto = obtenerListaProyectos();

    let id = selectProfe2.value;
    let idProyecto;
    let rol = 'tecnico';
    let nombreProyecto;
    let fechaEntrega;
    let estadoProyecto;


    for (let i = 0; i < proyecto.length; i++) {

        if (proyecto[i]['_id'] == (selectProyecto.value)) {
            idProyecto = proyecto[i]['_id'];
        }
    }

    for (let i = 0; i < proyecto.length; i++) {

        if (proyecto[i]['_id'] == (selectProyecto.value)) {
            nombreProyecto = proyecto[i]['nombre_proyecto'];
        }
    }

    for (let i = 0; i < proyecto.length; i++) {

        if (proyecto[i]['_id'] == (selectProyecto.value)) {
            fechaEntrega = proyecto[i]['fecha_Entrega'];
        }
    }

    for (let i = 0; i < proyecto.length; i++) {

        if (proyecto[i]['_id'] == (selectProyecto.value)) {
            estadoProyecto = proyecto[i]['estado_proyecto'];
        }
    }

      

    infoProyecto.push(id, idProyecto, rol, nombreProyecto, fechaEntrega, estadoProyecto)

    asignarProyecto(infoProyecto);


}

function validarCampos() {
    let error = 1;
    let infoProfe = getProfessorData()[0].proyecto;

    if (selectProfe1.value == selectProfe2.value) {
        selectProfe1.classList.add('error_input');
        selectProfe2.classList.add('error_input');
        error = 2;
        return error;
    } else {
        selectProfe1.classList.remove('error_input');
        selectProfe2.classList.remove('error_input');
        error = 1;
    }

    for (let i = 0; i < infoProfe.length; i++) {

        if (infoProfe[i]['id'] == selectProyecto.value) {
            selectProyecto.classList.add('error_input');
            error = 3;


            return error;
        } else {

            selectProyecto.classList.remove('error_input');
            error = 1;
        }

    }



    return error;
}

// _id: infoProyecto[0],
//             id: infoProyecto[1],
//             rol: infoProyecto[2],
//             nombre_proyecto: infoProyecto[3],
//             fecha_Entrega: infoProyecto[4],
//             estado_proyecto: infoProyecto[5]

// function agregarProyectoCliente() {
//     let infoProyecto = [];

//     let id = selectNombreCliente.value;
//     let id1 = selectNombreCliente.value;
//     let nombreProyecto = inputNombreProyecto.value;
//     let fechaEntrega = dateFechaEntrega.value;
//     let estadoProyecto = selectEstadoProyecto.value;

//     let proyecto = obtenerListaProyectos();


//     for (let i = 0; i < proyecto.length; i++) {

//         if (proyecto[i]['nombre_proyecto'] == (nombreProyecto)) {
//             id1 = lista[i]['_id'];
//         }


//     }

//     infoProyecto.push(id, id1, nombreProyecto, fechaEntrega, estadoProyecto);


//     asignarProyecto(infoProyecto);