
let outNombreProyecto = document.querySelector('#NombreProyecto');

let outNombreCliente = document.querySelector('#nombreCliente');

let outJuridica = document.querySelector('#juridica');

let outEstado = document.querySelector('#estado');

let outFecha = document.querySelector('#fecha');

let outDescripcion = document.querySelector('#descripcion');

let outTec = document.querySelector('#tec');

let tabla1 = document.querySelector('#tecnologiasWed');

let tabla2 = document.querySelector('#tecnologiasMovil');

llenarInfo();
function llenarInfo() {

    let id = localStorage.getItem('idP')

    let infoProyecto = obtenerProyectoId(id);


    let nombreProyecto = infoProyecto['nombre_proyecto'];

    let nombreCliente = infoProyecto['nombre_cliente'];

    let cedulaJuridica = infoProyecto['identificacion_juridica'];

    let estadoProyecto = infoProyecto['estado_proyecto'];

    let fechaEntrega = infoProyecto['fecha_Entrega'];

    // let tecnologiasW = infoProyecto['tecnologia_wed'];

    let descripcion = infoProyecto['descripcion'];

    outNombreProyecto.value = nombreProyecto;

    outNombreCliente.value = nombreCliente;

    outJuridica.value = cedulaJuridica;

    outEstado.value = estadoProyecto;

    outFecha.value = fechaEntrega;

    outDescripcion.value = descripcion;

    // outTec.value = tecnologiasW;

}
controladorListas();

function controladorListas() {
    let id = localStorage.getItem('idP')

    let infoProyecto = obtenerProyectoId(id);

    let tecWed = JSON.parse(infoProyecto['tecnologia_wed']);


    let tecMovil = JSON.parse(infoProyecto['tecnologia_movil']);


    if (tecMovil == '') {

      
        imprimirListaProyectos();

    } else {

        if (tecWed == '') {
            
            listaMobil();

        }
    }


}


function imprimirListaProyectos() {

    let id = localStorage.getItem('idP')

    let infoProyecto = obtenerProyectoId(id);

    let tecWed = JSON.parse(infoProyecto['tecnologia_wed']);

    let tecBd = JSON.parse(infoProyecto['tecnologia_bd']);

    tecWed.push(tecBd);

    console.log(tecWed);

    let tbody = document.querySelector('#tecnologiasWed tbody');
    tbody.innerHTML = '';


    for (let i = 0; i < tecWed.length; i++) {

        let fila = tbody.insertRow();

        let ifno = fila.insertCell();

        ifno.innerHTML = tecWed[i];


    }

}


function listaMobil() {
    let id = localStorage.getItem('idP')

    let infoProyecto = obtenerProyectoId(id);

    let tecMovil = JSON.parse(infoProyecto['tecnologia_movil']);

    let tecBd = JSON.parse(infoProyecto['tecnologia_bd']);

    tecMovil.push(tecBd);

    console.log(tecMovil);


    let tbody = document.querySelector('#tecnologiasMovil tbody');
    tbody.innerHTML = '';


    for (let i = 0; i < tecMovil.length; i++) {

        let fila = tbody.insertRow();

        let ifno = fila.insertCell();

        ifno.innerHTML = tecMovil[i];


    }
}




