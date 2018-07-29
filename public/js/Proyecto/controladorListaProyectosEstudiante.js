'use strict'
moveUser(true);
// let nomEstudianteTitulo = document.querySelector('#nomEstudiante');
// nomEstudianteTitulo.innerHTML = getCurrentUserData()['Nombre1']+' '+getCurrentUserData()['apellido1'];          Este era para poner el nombre del estudiante en un ttulo h2

let tbody = document.querySelector('#tblProyectosE tbody');
let butBuscarProyecto = document.querySelector('#butBuscarProyecto');    //boton para buscar por nombre y estado

butBuscarProyecto.addEventListener('click', function(){
    let selectEstadoP = document.querySelector('#selectEstadoP');       //select de estado para la busqueda
    let inputBuscar = document.querySelector('#inputBuscar');
    imprimirLista(inputBuscar.value,selectEstadoP.value);
});

imprimirLista();
function imprimirLista(inputDatoBuscar,selectEstadoP){
    let listaProyectos = getCurrentUserData()['proyectos'];
    tbody.innerHTML = '';
    
    if (!inputDatoBuscar) {
        inputDatoBuscar = '';
    }
    if (!selectEstadoP) {
        selectEstadoP = 'desarrollo';
    }
    
    for(let n = 0; n < getCurrentUserData()['proyectos'].length; n++){
        if(listaProyectos[n]['nombre_proyecto'].toLowerCase().includes(inputDatoBuscar.toLowerCase())){

            if(selectEstadoP=='todos'){
                let fila = tbody.insertRow();
        
                let cNombre = fila.insertCell();
                let cFecha = fila.insertCell();
                let cEstado = fila.insertCell();

                cNombre.innerHTML = getCurrentUserData()['proyectos'][n]['nombre_proyecto'];         
                cFecha.innerHTML = getCurrentUserData()['proyectos'][n]['fecha_Entrega'];
                cEstado.innerHTML = getCurrentUserData()['proyectos'][n]['estado_proyecto'];

            } else if(listaProyectos[n]['estado_proyecto'].toLowerCase().includes(selectEstadoP)){
                let fila = tbody.insertRow();
        
                let cNombre = fila.insertCell();
                let cFecha = fila.insertCell();
                let cEstado = fila.insertCell();

                cNombre.innerHTML = getCurrentUserData()['proyectos'][n]['nombre_proyecto'];         
                cFecha.innerHTML = getCurrentUserData()['proyectos'][n]['fecha_Entrega'];
                cEstado.innerHTML = getCurrentUserData()['proyectos'][n]['estado_proyecto'];
            }
        }
    }
}