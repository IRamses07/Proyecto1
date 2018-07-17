moveUser(true);
setLocalProfes();
/*let myRadios = document.getElementsByName('botonInutil');
let setCheck;
for (let x = 0; x < myRadios.length; x++) {

    myRadios[x].onclick = function () {
        if (setCheck != this) {
            setCheck = this;
        } else {
            this.checked = false;
            setCheck = null;
        }
    }
}*/

/*document.querySelector('#txtFiltro').addEventListener('keyup', listadoProfesores);*/
document.querySelector('#btnFiltro').addEventListener('click', listadoProfesores);


let listaProfes = getLocalProfes();
listadoProfesores();
function listadoProfesores() {

    let profesFiltrados = [];

    let tbody = document.querySelector('#tblProfesores tbody');
    tbody.innerHTML = '';

    if (document.querySelector('#rbtnNombre').checked) {
        let sFiltro = document.querySelector('#txtFiltro').value;

        for (let i = 0; i < listaProfes.length; i++) {
            if (listaProfes[i]['nombre1'].toLowerCase().includes(sFiltro.toLowerCase()) ||
                listaProfes[i]['apellido1'].toLowerCase().includes(sFiltro.toLowerCase()) ||
                (listaProfes[i]['nombre1'] + " " + listaProfes[i]['apellido1']).toLowerCase().includes(sFiltro.toLowerCase())) {
                profesFiltrados.push(listaProfes[i]);
            }
        }
    } else {
        if (document.querySelector('#txtFiltro').value == '') {
            profesFiltrados = getLocalProfes();
        }
    }

    for (let i = 0; i < profesFiltrados.length; i++) {
        let fila = tbody.insertRow();

        // let btnModificar = document.createElement('button');
        // let btnEstado = document.createElement('button');

        // btnModificar.type = "button";
        // btnEstado.type = "button";
        // btnModificar.classList.add('btnControl');
        // btnEstado.classList.add('btnControl');
        // btnModificar.innerHTML = "Modificar";
        // btnEstado.innerHTML = "Activar"

        let btnVerMas = document.createElement('button');
        btnVerMas.type = "button";
        btnVerMas.classList.add('btnRegistro');
        btnVerMas.id = "btnVerMas";
        btnVerMas.innerHTML = "Ver mas";
        btnVerMas.addEventListener('click', function(){setVerMasLS(i,profesFiltrados)});

        fila.insertCell().innerHTML = profesFiltrados[i]['nombre1'] + " " + profesFiltrados[i]['apellido1'];
        fila.insertCell().innerHTML = profesFiltrados[i]['cedula'];
        fila.insertCell().innerHTML = profesFiltrados[i]['correo'];
        fila.insertCell().innerHTML = profesFiltrados[i]['telefono'];
        fila.insertCell().innerHTML = profesFiltrados[i]['profesion'];
        fila.insertCell().appendChild(btnVerMas);
        // let controlCell = fila.insertCell();
        // controlCell.appendChild(btnModificar);
        // controlCell.appendChild(btnEstado);
    }

}




