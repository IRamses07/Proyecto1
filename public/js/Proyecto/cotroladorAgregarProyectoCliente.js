// // id: { type: String },
// // identificacion_juridica: {type: String},
// // nombre_proyecto: { type: String },
// // fecha_Entrega: { type: String },
// // estado_proyecto: { type: String }
//  listarClientes();

// let botonRegistrar = document.querySelector('#btnRegistrar');

// botonRegistrar.addEventListener('click', obtenerDatos);

// let sltClienten = document.querySelector('#slNombredelCliente');
// let inputIdentifiacionJuridica = document.querySelector('#txtIdentifiacionJuridica');
// let inputNombreProyecto = document.querySelector('#txtNombreProyecto');
// let dateFechaEntrega = document.querySelector('#dtEntregaEstimada');
// let selectEstadoProyecto = document.querySelector('#sltEstado');

// function obtenerDatos() {
//     let infoProyecto = [];

//     let id = sltClienten.value;
//     let identificacionJuridica = inputIdentifiacionJuridica.value;
//     let nombreProyecto = inputNombreProyecto.value;
//     let fechaEntrega = dateFechaEntrega.value;
//     let estadoProyecto = selectEstadoProyecto.value;

//     infoProyecto.push(id, identificacionJuridica, nombreProyecto, fechaEntrega, estadoProyecto);


//     asignarProyecto(infoProyecto);


// }

// function obtenerId() {
//     let infoCliente = listarClientes();
//     for (let i = 0; i < infoCliente.length; i++) {
//         let opcion = new Option(infoCliente[i]['nombre'])
//         opcion.value = infoCliente[i]['_id'];

//         sltClienten.options.add(opcion);


//     }
// }