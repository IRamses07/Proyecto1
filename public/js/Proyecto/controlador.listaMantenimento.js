"use strict";
moveUser(true);
imprimirListaProyectos();

const inputFiltro = document.querySelector('#txtFiltro');

inputFiltro.addEventListener('keyup', function () {
    imprimirListaProyectos(inputFiltro.value)
});

function imprimirListaProyectos(pFiltro) {
    let infoProyecto = getCurrentUserData()['proyectos'];
    let tbody = document.querySelector('#tblProyectos tbody');
console.log()
    

    for (let i = 0; i < infoProyecto.length; i++) {
       


            if (infoProyecto[i]['estado_proyecto'] == 'mantenimiento') {
                let fila = tbody.insertRow();

                let cCedulaJuridica = fila.insertCell();
                let cNombreProyecto = fila.insertCell();
                let cNombreCliente = fila.insertCell();
                let cFechaEntrega = fila.insertCell();
                // let verMas = fila.insertCell();

                // let boton = document.createElement("input");
                // boton.type = "button";
                // boton.value = "Ver más";
                // boton.classList.add('btnRegistro');

                cCedulaJuridica.innerHTML = infoProyecto[i]['identificacion_juridica'];
                cNombreProyecto.innerHTML = infoProyecto[i]['nombre_proyecto'];
                cNombreCliente.innerHTML = infoProyecto[i]['nombre_cliente'];
                cFechaEntrega.innerHTML = infoProyecto[i]['fecha_Entrega'];
                // verMas.appendChild(boton);
            }
        }

    }

