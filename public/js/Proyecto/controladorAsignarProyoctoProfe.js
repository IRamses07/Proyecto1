
listarSelectClientes();

function listarSelectClientes() {
    let slProyecto =obtenerListaProyectos();
    let select = document.querySelector('#slProyecto');
    select.options[0] = new Option("Seleccione un cliente...", "");

    for (let i = 0; i < slProyecto.length; i++) {
        select.options[i] = new Option(slProyecto[i]['nombre_proyecto'], slProyecto[i]['nombre_proyecto']);

    }
}