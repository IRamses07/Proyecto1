moveUser(true);
imprimirListaEstudiantes();

//llamada a buscar por nombre u cedula
let buttonFiltrar = document.querySelector('#butBuscarEstudiante');
buttonFiltrar.addEventListener('click', function(){
    let radioSelected = document.querySelector('#form input[type="radio"]:checked');
    console.log('f1');
    getEntrada(radioSelected);
});

let inputDatoBuscar = document.querySelector('#inputBuscar');
let errorInput = document.querySelector('#errorInput');

function imprimirListaEstudiantes(){
    let listaTotal = obtenerListaEstudiantes();
    imprimirLista(listaTotal);
};

function imprimirListaNombre(){
    let listaNombre = filtrarNombreEstudiantes(inputDatoBuscar);  //ultimo traza
    console.log('f4');
    imprimirLista(listaNombre);
};

function imprimirLista(lista){
    let listaEstudiantes = lista;
    let tbody = document.querySelector('#tblEstudiantes tbody');
    tbody.innerHTML = '';
    console.log('f5');

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
        cPerfil.innerHTML = '<button type="button" class="btnRegistro" value="'+listaEstudiantes[i]['cedula']+'">ver mas</button>';
        cEstado.innerHTML = '<button type="button" class="btnRegistro" value="'+listaEstudiantes[i]['cedula']+'">modificar</button>  '+listaEstudiantes[i]['estado']+' ';
    }
}



function getEntrada(radio){
    let sError = false;
    //radio     variable con el radio seleccionado
    console.log('f2');
    sError = validarEntrada(radio);

    if(sError==false){
        console.log('f3');
        //todo esta bien -> realizar busqueda e imprimir
        imprimirListaNombre();
    }
}

function validarEntrada(radio){
    //validar por nombre o por numeros dependiendo de cual radio fue seleccionado
    let checkSoloLetras = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ]+$/;
    let checkNombreDelProyecto = /^[a-z A-ZáéíóúÁÉÍÓÚñÑ 1234567890]+$/;
    let sError='';

        if(inputDatoBuscar.value == '' ){
            inputDatoBuscar.classList.add('error_input');
            errorInput.innerHTML='*Ingrese un nombre';
            sError = true;
        }else{
            inputDatoBuscar.classList.remove('error_input');
            errorInput.innerHTML='';
                
            if(radio.value=="nombre"){
                if(checkSoloLetras.test(inputDatoBuscar.value)==false){
                    inputDatoBuscar.classList.add('error_input');
                    errorInput.innerHTML='*Nombre no valido';
                    sError = true;
                }else{
                    inputDatoBuscar.classList.remove('error_input');
                    errorInput.innerHTML='';   
                }
            }else{
                if(checkNombreDelProyecto.test(inputDatoBuscar.value)==false){
                    inputDatoBuscar.classList.add('error_input');
                    errorInput.innerHTML='*Proyecto no valido';
                    sError = true;
                }else{
                    inputDatoBuscar.classList.remove('error_input');
                    errorInput.innerHTML='';
                }
            }
        }
    return sError;
}