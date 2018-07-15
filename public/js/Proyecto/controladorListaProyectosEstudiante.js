'use strict'
moveUser(true);
let nomEstudianteTitulo = document.querySelector('#nomEstudiante');
nomEstudianteTitulo.innerHTML = getCurrentUserData()['Nombre1']+' '+getCurrentUserData()['apellido1'];
let tbody = document.querySelector('#tblProyectosE tbody');
    tbody.innerHTML = '';

for(let n = 0; n < getCurrentUserData()['proyectos'].length; n++){
    console.log(getCurrentUserData()['proyectos'][n]);
    let fila = tbody.insertRow();


    let cNombre = fila.insertCell();
    let cFecha = fila.insertCell();
    let cEstado = fila.insertCell();


    cNombre.innerHTML = getCurrentUserData()['proyectos'][n]['nombre_proyecto'];         
    cFecha.innerHTML = getCurrentUserData()['proyectos'][n]['fecha_Entrega'];
    cEstado.innerHTML = getCurrentUserData()['proyectos'][n]['estado_proyecto'];
}