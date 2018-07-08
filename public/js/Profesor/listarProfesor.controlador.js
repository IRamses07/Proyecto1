moveUser(false);
listadoProfesores();

function listadoProfesores(){
    let listaProfes = getProfessorData();
    let tbody = document.querySelector('#tblProfesores tbody');
    tbody.innerHTML = '';

    for(let i = 0; i < listaProfes.length; i++){
        let fila = tbody.insertRow();
        
        // let btnModificar = document.createElement('button');
        // let btnEstado = document.createElement('button');
        
        // btnModificar.type = "button";
        // btnEstado.type = "button";
        // btnModificar.classList.add('btnControl');
        // btnEstado.classList.add('btnControl');
        // btnModificar.innerHTML = "Modificar";
        // btnEstado.innerHTML = "Activar"

        fila.insertCell().innerHTML = listaProfes[i]['nombre1']+" "+listaProfes[i]['apellido1'];
        fila.insertCell().innerHTML = listaProfes[i]['cedula'];
        fila.insertCell().innerHTML = listaProfes[i]['correo'];
        fila.insertCell().innerHTML = listaProfes[i]['telefono'];
        fila.insertCell().innerHTML = listaProfes[i]['profesion'];
        // let controlCell = fila.insertCell();
        // controlCell.appendChild(btnModificar);
        // controlCell.appendChild(btnEstado);

    }

}

for (let i = 0; i < getListaCursos().length; i++) {
    if (getListaCursos()[i]['codigo'].toLowerCase().includes(sFiltro.toLowerCase()) ||
        getListaCursos()[i]['nombre'].toLowerCase().includes(sFiltro.toLowerCase()) ||
        getListaCursos()[i]['creditos'].toString().includes(sFiltro) ||
        getListaCursos()[i]['cuatrimestre'].toString().includes(sFiltro) ||
        getListaCursos()[i]['precio'].toString().includes(sFiltro)) {
        listaCursos.push(getListaCursos()[i]);
    }
}