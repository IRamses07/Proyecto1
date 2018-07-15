llenarSelecProyectos();

let selectProyecto = document.querySelector('#slProfeLider');

function llenarSelecProyectos() {
    let infoPrfeIL = getCurrentUserData()['proyecto'];



    let select = document.querySelector('#slProfeLider');
    select.options[0] = new Option("Seleccione un profesor...", );

    for (let i = 0; i < listaProfes.length; i++) {
        select.options[i] = new Option(listaProfes[i]['proyectos', 'nombre_proyecto'], listaProfes[i]['proyectos', 'id']);

    }
}