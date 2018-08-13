'use strict'
let params = getParam();
listener(elm('#horas'), 'click', horasTotales); 
listener(elm('#proyectos'), 'click', horasProyecto); 
listener(elm('#actividad'), 'click', actividadProyecto);
let estudiante = getInfoEstudiante(params.cedula);
elm('#titulo').innerHTML+=estudiante[0].Nombre1;
function horasProyecto() {
    let estudiante = getInfoEstudiante(params.cedula);
    let horas = estudiante[0].horas;
    let proyectos = {};
    for (let i = 0; i < estudiante[0].proyectos.length; i++) {
        proyectos[estudiante[0].proyectos[i].nombre_proyecto] = [];
        for (let j = 0; j < horas.length; j++) {
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
    drawChart(new google.visualization.PieChart(elm('#chart')), info, { title: 'Horas Proyecto' }, {
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
    drawChart(new google.visualization.BarChart(elm('#chart')), [
        [estudiante[0].Nombre1, hTotales[0]]
    ], {
            bar: { groupWidth: '40%' }
        }, {
            nombre: 'string',
            Horas: 'number'
        });
}
function actividadProyecto() {
    let estudiante = getInfoEstudiante(params.cedula);
    let horas = estudiante[0].horas;
    let proyectos = {};
    for (let i = 0; i < estudiante[0].proyectos.length; i++) {
        proyectos[estudiante[0].proyectos[i].nombre_proyecto] = [];
        for (let j = 0; j < horas.length; j++) {
            if (estudiante[0].proyectos[i]._id == horas[j].id) {
                proyectos[estudiante[0].proyectos[i].nombre_proyecto].push(horas[j]);
            }
        }
    }
    let keys = Object.keys(proyectos);
    let info = [];
    elm('#chart').innerHTML = "";
    for (let i = 0; i < keys.length; i++) {
        for (let j = 0; j < proyectos[keys[i]].length; j++) {
            let hTotales = [0, 0];
            let tiempo = proyectos[keys[i]][j].tiempo.split(':');
            hTotales[0] += Number(tiempo[0]);
            hTotales[1] += Number(tiempo[1]);
            hTotales[0] += Math.trunc(hTotales[1] / 60);
            hTotales[1] = hTotales[1] - (Math.trunc(hTotales[1] / 60) * 60);
            hTotales[0] = hTotales[0] + hTotales[1] / 60;
            info.push([proyectos[keys[i]][j].fecha, hTotales[0]]);
        }
        let cont = createElm('div');
        addClass(cont, 'chart')
        drawChart(new google.visualization.BarChart(cont),
            info
            , {
                bar: { groupWidth: '90%' },
                title: 'Actividad para proyecto "' + keys[i] + '"',height: 360,width: 640
            }, {
                Fecha: 'string',
                Horas: 'number'
            });
        elm('#chart').appendChild(cont);
    }

}