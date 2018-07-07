imprimirListaEstudiantes();

//llamada a buscar por nombre u cedula
let buttonFiltrar = document.querySelector('#butBuscarEstudiante');
buttonFiltrar.addEventListener('click', );

let inputDatoBuscar = document.querySelector('#inputBuscar');

function imprimirListaEstudiantes(){
    let listaEstudiantes = obtenerListaEstudiantes();
    let tbody = document.querySelector('#tblEstudiantes tbody');
    tbody.innerHTML = '';

console.log(listaEstudiantes.length);

    if(listaEstudiantes.length !== 0){
        
        for(let i = 0; i < listaEstudiantes.length; i++){
            let fila = tbody.insertRow();

            let cNombre = fila.insertCell();
            let cApellido = fila.insertCell();
            let cCarrera = fila.insertCell();
            let cHoras = fila.insertCell();
            let cPerfil = fila.insertCell();
            let cEstado = fila.insertCell();

            cNombre.innerHTML = listaEstudiantes[i]['Nombre1'];          //nombre_completo es la db
            cApellido.innerHTML = listaEstudiantes[i]['apellido1'];
            cCarrera.innerHTML = listaEstudiantes[i]['carrera'];
            cHoras.innerHTML = '  0  ';                                                 //A definir con el programador engardado de asignar horas al actor
            //cPerfil.innerHTML = '<a href="" class="pseudoBoton">ver mas<a>';
            //cEstado.innerHTML = '<a href="" class="pseudoBoton">modificar<a>'+'   Activo';

            cPerfil.innerHTML = '<button type="button" class="btnRegistro" value="'+listaEstudiantes[i]['cedula']+'">ver mas</button>';
            cEstado.innerHTML = '<button type="button" class="btnRegistro" value="'+listaEstudiantes[i]['cedula']+'">modificar</button>'+'   Activo';   //falta agregar el estado a la base de datos de estudiantes para tomar el estado.
        }
    }
};

function getEntrada(){
    let sError = false;

    sError = validarEntrada();
}

function validarEntrada(){
    let checkSoloLetras = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ]+$/;

    if(inputDato.value == '' || (checkSoloLetras.test(inputDato.value)==false) ){
        inputDato.classList.add('error_input');
        sError = true;
    }else{
        inputDato.classList.remove('error_input');
    }

}