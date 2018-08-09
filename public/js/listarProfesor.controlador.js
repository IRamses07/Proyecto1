listadoProfesores();

function listadoProfesores(){
    let listaProfes = getProfessorData();
    let tbody = document.querySelector('#tblProfesores tbody');
    tbody.innerHTML = '';

    for(let i = 0; i < listaProfes.length; i++){
        let fila = tbody.insertRow();

        fila.insertCell().innerHTML = listaProfes[i]['nombre1'];
        fila.insertCell().innerHTML = listaProfes[i]['apellido1'];
        fila.insertCell().innerHTML = listaProfes[i]['cedula'];
        fila.insertCell().innerHTML = listaProfes[i]['correo'];
        fila.insertCell().innerHTML = listaProfes[i]['telefono'];
        fila.insertCell().innerHTML = listaProfes[i]['profesion'];
    }

};