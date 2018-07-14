llenarSelecProyectos();


function llenarSelecProyectos() {
    let listaProfes = getProfessorData();
    let select = document.querySelector('#slProfeLider');
    select.options[0] = new Option("Seleccione un profesor...", );

    for (let i = 0; i < listaProyectosT.length; i++) {
        select.options[i] = new Option(listaProyectosT[i]['nombre1'], listaProyectosT[i]['_id']);
listaProfes[i]['id'];
console.log(listaProfes[i]['id']);

    }
}