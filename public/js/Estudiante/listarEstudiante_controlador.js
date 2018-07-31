'use strict'
moveUser(true);
imprimirLista();

let inputDatoBuscar = document.querySelector('#inputBuscar');
let errorInput = document.querySelector('#errorInput');
let buttonFiltrar = document.querySelector('#butBuscarEstudiante');

buttonFiltrar.addEventListener('click', function(){
    let radioSelected = document.querySelector('#form input[type="radio"]:checked');
    imprimirLista(radioSelected.value,inputDatoBuscar.value);
});

cambiarEstado();
function cambiarEstado(){
    let cambioEstado = document.querySelectorAll('.cambioEstado');
    cambioEstado.forEach(function(elem){
        elem.addEventListener("click", function(){
            let ced = elem.value;
            localStorage.setItem('ced',ced);
            let info = getInfoEstudiante()[0];
            
            swal({
                title: 'Esta seguro de que desea realizar los cambios?',
                text: 'El estudiante "'+info['Nombre1']+'" pasara a estar en estado '+((info['estado']=='Activo')?'"Desactivo"':'"Activo"'),
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                cancelButtonText: 'Cancelar',
                confirmButtonText: 'Si, cambiar!'
            }).then((result) => {
                if (result.value) {
                    swal(
                    'Cambio realizado!',
                    'El estudiante "'+info['Nombre1']+'" tiene ahora un estado '+((info['estado']=='Activo')?'"Desactivo"':'"Activo"'),
                    'success'
                    )
                    if(info['estado']=='Activo'){
                        cambiarEstadoS(ced,'Desactivo');
                    } else {
                        cambiarEstadoS(ced,'Activo');
                    }
                    imprimirLista();
                }
            })
        })
    })
}

vermas();
function vermas(){
    let buttonsVermas = document.querySelectorAll('.btnVerMas');
    buttonsVermas.forEach(function(elem){
        elem.addEventListener("click", function(){
            let ced = elem.value;
            localStorage.setItem('ced',ced);
            document.location.href = 'perfilEstudiante.html';
        })
    });
    cambiarEstado();
    modificaEstudiante();
}

modificaEstudiante();
function modificaEstudiante(){
    let modEstudiante = document.querySelectorAll('.modEstudiante');
    modEstudiante.forEach(function(elem){
        elem.addEventListener("click", function(){
            let ced = elem.value;
            localStorage.setItem('ced',ced);
            sessionStorage.setItem('update', 1);
            document.location.href = 'registrarEstudiante.html';
        })
    });
}

function imprimirLista(radioSelected,inputDatoBuscar){
    let listaEstudiantes = obtenerListaEstudiantes();
    let tbody = document.querySelector('#tblEstudiantes tbody');
    tbody.innerHTML = '';

    if (!radioSelected) {
        radioSelected = 'Nombre1';
    }
    if (!inputDatoBuscar) {
        inputDatoBuscar = '';
    }
        
        for(let i = 0; i < listaEstudiantes.length; i++){
            if(listaEstudiantes[i][radioSelected].toLowerCase().includes(inputDatoBuscar.toLowerCase())){
                let fila = tbody.insertRow();

                let cCedula = fila.insertCell();
                let cNombre = fila.insertCell();
                let cApellido = fila.insertCell();
                let cCarrera = fila.insertCell();
                let cHoras = fila.insertCell();
                let cPerfil = fila.insertCell();
                let cEstado = fila.insertCell();
                let cModificar = fila.insertCell();

                cCedula.innerHTML = listaEstudiantes[i]['cedula'];
                cNombre.innerHTML = listaEstudiantes[i]['Nombre1'];          
                cApellido.innerHTML = listaEstudiantes[i]['apellido1'];
                cCarrera.innerHTML = listaEstudiantes[i]['carrera'];
                cHoras.innerHTML = '  0  ';                                                 
                cPerfil.innerHTML = '<button type="button" class="btnVerMas" value="'+listaEstudiantes[i]['cedula']+'">Ver mas</button>';
                cEstado.innerHTML = '<button type="button" class="btnRegistro cambioEstado" value="'+listaEstudiantes[i]['cedula']+'">'+listaEstudiantes[i]['estado']+'</button>';
                cModificar.innerHTML = '<button type="button" class="btnRegistro modEstudiante" value="'+listaEstudiantes[i]['cedula']+'">Modificar</button>';
            } 
        }
    vermas();
}