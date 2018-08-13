'use strict'
let params = getParam()
function horasProyecto() {
    let estudiante = getInfoEstudiante(params.cedula);
    let horas = estudiante[0].horas;
    let proyectos = {};
    for (let i = 0; i < estudiante[0].proyectos.length; i++) {
        for (let j = 0; j < horas.length; j++) {
            proyectos[estudiante[0].proyectos[i].nombre_proyecto] = [];
            if (estudiante[0].proyectos[i]._id == horas[j].id) {
                proyectos[estudiante[0].proyectos[i].nombre_proyecto].push(horas[j]);
            }
        }
    }
    let pkeys = Object.keys(proyectos);
    let info = [];
    for (let i = 0; i < pkeys.length; i++) {
        let hTotales = [0, 0];
        for (let j = 0; j < proyectos[pkeys[i]].length; j++) {
            let tiempo = proyectos[pkeys[i]][j].tiempo.split(':');
            hTotales[0] += Number(tiempo[0]);
            hTotales[1] += Number(tiempo[1]);
        }
        hTotales[0] += Math.trunc(hTotales[1] / 60);
        hTotales[1] = hTotales[1] - (Math.trunc(hTotales[1] / 60) * 60);
        hTotales[0] = hTotales[0] + hTotales[1] / 60;
        info.push([pkeys[i], hTotales[0]]);
    }
    drawChart(elm('#chart'), info, {}, {
        Proyecto: 'string',
        Horas: 'number',
    });
}
function horasTotales() {
    let estudiante = getInfoEstudiante(params.cedula);
    let horas = estudiante[0].horas;
    let hTotales = [0, 0];
    for (let i = 0; i < horas.length; i++) {
        let tiempo = horas[i].tiempo.split(':');
        hTotales[0] += Number(tiempo[0]);
        hTotales[1] += Number(tiempo[1]);
    }
    hTotales[0] += Math.trunc(hTotales[1] / 60);
    hTotales[1] = hTotales[1] - (Math.trunc(hTotales[1] / 60) * 60);
    hTotales[0] = hTotales[0] + hTotales[1] / 60;
    drawChart(elm('#chart'), [
        [estudiante[0].Nombre1, hTotales[0]]
    ], {
            bar: { groupWidth: '10%' }
        }, {
            nombre: 'string',
            Horas: 'number'
        });
}