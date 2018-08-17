'use strict'
let params = getParam();
google.charts.load('current', { 'packages': ['corechart'] });
google.charts.load("current", {packages:["timeline"]});
listener(elm('#horas'), 'click', function () {
    horasTotales();
    removeClass(elm('#proyectos'),'selected');
    removeClass(elm('#actividad'),'selected');
    addClass(elm('#horas'),'selected');
}); 
listener(elm('#proyectos'), 'click', function () {
    horasProyecto();
    addClass(elm('#proyectos'),'selected');
    removeClass(elm('#actividad'),'selected');
    removeClass(elm('#horas'),'selected');
}); 
listener(elm('#actividad'), 'click', function () {
    actividadProyecto();
    removeClass(elm('#proyectos'),'selected');
    addClass(elm('#actividad'),'selected');
    removeClass(elm('#horas'),'selected');
});
let estudiante = getInfoEstudiante(params.cedula);
elm('#titulo').innerHTML+=estudiante[0].Nombre1+' '+estudiante[0].apellido1;
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
            bar: { groupWidth: '30%' }
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
        // addClass(cont, 'chart')
        elm('#chart').appendChild(cont);
        drawChart(new google.visualization.BarChart(cont),
            info
            , {
                bar: { groupWidth: '60%' },
                title: 'Actividad para proyecto "' + keys[i] + '"',
                height:446
            }, {
                Fecha: 'string',
                Horas: 'number'
            });
    }

}