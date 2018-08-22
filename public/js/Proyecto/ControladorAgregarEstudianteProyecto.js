moveUser(true);
llenarSelecProyectos();

let selectProyecto = document.querySelector('#slProyecto');
let selectEstudiante = document.querySelector('#slEstudiante');
let formulario = document.querySelector('#estudiantes');

let botonAgregar = document.querySelector('#btnAgregar');
botonAgregar.addEventListener('click', obtenrDatos);

selectProyecto.addEventListener('change', llenarSelectEstudiantes);

function llenarSelecProyectos() {
    let infoPrfeIL = getCurrentUserData()['proyecto'];
    let lista = obtenerListaProyectos();

    let select = document.querySelector('#slProyecto');
    select.options[0] = new Option("Seleccione un proyectos");

    for (let i = 0; i < infoPrfeIL.length; i++) {
        // for (let j = 0; j < lista.length; j++) {
        //     if (infoPrfeIL[i]['_id'] == lista[i]['_id']) {
        select.options[i + 1] = new Option(infoPrfeIL[i]['nombre_proyecto'], infoPrfeIL[i]['id']);
    }

}

function llenarSelectEstudiantes() {

    let infoEstudiante = obtenerListaEstudiantes();

    let select = document.querySelector('#slEstudiante');
    select.options[0] = new Option("Seleccione un estudiantes");
    let lista = [];

    // for (let j = 0; j < infoEstudiante[j].proyectos.length; j++) {
    //     for (let i = 0; i < infoEstudiante.length; i++) {

    //         if (infoEstudiante[i].proyectos.length > 0) {
    //             if (infoEstudiante[i].proyectos[j]['id'] != selectProyecto.value) {
    //                 lista.push(infoEstudiante[i])
    //             }
    //         } else {
    //             lista.push(infoEstudiante[i])
    //         }
    //     }

    // }
    for (let i = 0; i < infoEstudiante.length; i++) {
        select.options[i + 1] = new Option(infoEstudiante[i]['Nombre1'] + ' ' + infoEstudiante[i]['apellido1'], infoEstudiante[i]['_id']);
    }
}

function obtenrDatos() {


    let error = false;

        // error = validar();

    if (error == true) {
        swal({
            type: 'warning',
            title: 'No se puedo agregar el Estudiante',
            text: 'Ya se encuentra asignado en este proyecto',
            confirmButtonText: 'Entendido'
        });
    } else {
        if (error == false) {

            agregarProyectoE();
            swal({
                type: 'success',
                title: 'Se asigno correctamente',
                text: 'El estudiante se asigno al proyecto',
                confirmButtonText: 'Entendido'

            });

            formulario.reset();
        }
    }



}

function agregarProyectoE() {
    let infoProyecto = [];
    let listaProyectos = obtenerListaProyectos();
    let infoCliente = listarClientes();


    let id = selectEstudiante.value;
    let idProyecto = selectProyecto.value;
    let nombreProyecto;
    let fechaEntrega;
    let estadoProyecto;
    let nombreCliente;

    for (let i = 0; i < listaProyectos.length; i++) {

        if (listaProyectos[i]['_id'] == (idProyecto)) {
            nombreProyecto = listaProyectos[i]['nombre_proyecto'];
        }
    }

    for (let i = 0; i < listaProyectos.length; i++) {

        if (listaProyectos[i]['_id'] == (idProyecto)) {
            fechaEntrega = listaProyectos[i]['fecha_Entrega'];
        }
    }

    for (let i = 0; i < listaProyectos.length; i++) {

        if (listaProyectos[i]['_id'] == (idProyecto)) {
            estadoProyecto = listaProyectos[i]['estado_proyecto'];
        }
    }
    // infoProyecto.push(id, idProyecto, nombreProyecto, fechaEntrega, estadoProyecto)

    asignarProyecto(id, idProyecto, nombreProyecto, fechaEntrega, estadoProyecto);

}

// function validar() {

// let error = false;
//     let info = obtenerListaEstudiantes()[0].proyectos;

//     for (let i = 0; i < info.length; i++) {

//         if (info[i]['id'] == selectProyecto.value) {
//             selectProyecto.classList.add('error_input');
//             error = true;


//             return error;
//         } else {

//             selectProyecto.classList.remove('error_input');
//             error = false;
//         }

//     }

//     return error;

// }
