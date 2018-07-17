'use strict'
moveUser(true);
let nomEstudianteTitulo = document.querySelector('#nomEstudiante');
nomEstudianteTitulo.innerHTML = getCurrentUserData()['nombre1']+' '+getCurrentUserData()['apellido1'];
let tbody = document.querySelector('#tblProyectosE tbody');
    tbody.innerHTML = '';

for(let n = 0; n < getCurrentUserData()['proyecto'].length; n++){
    console.log(getCurrentUserData()['proyecto'][n]);
    let fila = tbody.insertRow();

    fila.insertCell().innerHTML = getCurrentUserData()['proyecto'][n]['nombre_proyecto'];         
    fila.insertCell().innerHTML = getCurrentUserData()['proyecto'][n]['fecha_Entrega'];
    fila.insertCell().innerHTML = getCurrentUserData()['proyecto'][n]['estado_proyecto'];
}