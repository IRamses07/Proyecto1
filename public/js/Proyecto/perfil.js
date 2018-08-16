
let outNombreProyecto = document.querySelector('#NombreProyecto');

let outNombreCliente = document.querySelector('#nombreCliente');

let outJuridica = document.querySelector('#juridica');

let outEstado = document.querySelector('#estado');

let outFecha = document.querySelector('#fecha');

let outDescripcion = document.querySelector('#descripcion');



llenarInfo();
function llenarInfo() {

    let id = localStorage.getItem('idP')

    let infoProyecto = obtenerProyectoId(id);


    let nombreProyecto = infoProyecto['nombre_proyecto'];
    
    let nombreCliente = infoProyecto['nombre_cliente'];

    let cedulaJuridica = infoProyecto['identificacion_juridica'];

    let estadoProyecto = infoProyecto['estado_proyecto'];

    let fechaEntrega = infoProyecto ['fecha_Entrega'];

    let descripcion = infoProyecto['descripcion'];
    
    outNombreProyecto.value = nombreProyecto;

    outNombreCliente.value = nombreCliente;

    outJuridica.value = cedulaJuridica;

    outEstado.value = estadoProyecto;

    outFecha.value = fechaEntrega;

    outDescripcion.value = descripcion;





    
}

