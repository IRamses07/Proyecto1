moveUser(true);
llenarSelecProyectos();
llenarSelectEstudiantes();

let selectProyecto = document.querySelector('#slProyecto');
let selectEstudiante = document.querySelector('#slEstudiante');

let botonAgregar = document.querySelector('#btnAgregar');
botonAgregar.addEventListener('click', obtenrDatos);

function llenarSelecProyectos() {
    let infoPrfeIL = getCurrentUserData()['proyecto'];
    let lista = obtenerListaProyectos();

    let select = document.querySelector('#slProyecto');
    select.options[0] = new Option("Seleccione un profesor...", );

    for (let i = 0; i < infoPrfeIL.length; i++) {
        // for (let j = 0; j < lista.length; j++) {
        //     if (infoPrfeIL[i]['_id'] == lista[i]['_id']) {
                 select.options[i + 1] = new Option(infoPrfeIL[i]['nombre_proyecto'], infoPrfeIL[i]['id']);
            }

        }





function llenarSelectEstudiantes() {

    let infoEstudiante = obtenerListaEstudiantes();

    let select = document.querySelector('#slEstudiante');
    select.options[0] = new Option("Seleccione un profesor...", );

    for (let i = 0; i < infoEstudiante.length; i++) {
        select.options[i + 1] = new Option(infoEstudiante[i]['Nombre1'] + ' ' + infoEstudiante[i]['apellido1'], infoEstudiante[i]['_id']);

    }

}

function obtenrDatos() {
    agregarProyectoE();

    swal({
        type: 'success',
        title: 'Registro exitoso',
        text: 'El usuario se registró adecuadamente',
        confirmButtonText: 'Entendido'
    });


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

// id: { type: String },
// nombre_proyecto: { type: String },
// fecha_Entrega: { type: String },
// estado_proyecto: { type: String },
// nombre_cliente: { type: String }
