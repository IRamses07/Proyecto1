'use strict';
moveUser(true);
/**
 * Formulario de registro del cliente
 */
let fmrCliente = elm('#fmrRegistroCliente')
/**
 * Select que contiene la lista de provincias
 */
let sltProvincia = elm("#sltProvincia");
listener(sltProvincia, 'change', function () {
    llenarSelect(sltCantones, sltProvincia.value, cantones);
    llenarSelect(sltDistrito, sltCantones.value, distritos);
    geocodeAddress(gCoder, map);
});
/**
 * Select que contiene la lista de provincias
 */
let sltCantones = elm("#sltCanton");
listener(sltCantones, 'change', function () {
    llenarSelect(sltDistrito, sltCantones.value, distritos);
    geocodeAddress(gCoder, map);

});
/**
 * Select que contiene la lista de distritos
 */
let sltDistrito = elm('#sltDistrito');
listener(sltDistrito, 'change', function () {
    geocodeAddress(gCoder, map);
});
/**
 * Boton que ejecuta la funcion de registro
 */
let btnRegistrar = elm('#btnRegistrar');
listener(btnRegistrar, 'click', function () {
    let inputs = [
        fmrCliente.cedulaJuridica,
        fmrCliente.nombre,
        fmrCliente.provincia,
        fmrCliente.canton,
        fmrCliente.distrito,
        fmrCliente.direccionExacta,
        fmrCliente.segundoNombre,
        fmrCliente.primerNombre,
        fmrCliente.primerApellido,
        fmrCliente.segundoApellido,
        fmrCliente.telefono,
        fmrCliente.correoElectronico
    ];
    console.log(inputs);
    fmrCliente.registrarCliente.dataset.ubucacion = marker.getPosition().lat() + ',' + marker.getPosition().lng();
    if (registro(inputs)) {
        if (fmrCliente.registrarCliente.dataset.ubucacion != undefined) {
            let data = {
                cedula_juridica: inputs[0].value,
                nombre: inputs[1].value,
                provincia: inputs[2].value,
                canton: inputs[3].value,
                distrito: inputs[4].value,
                direccion_exacta: inputs[5].value,
                segundo_nombre: inputs[6].value,
                primer_nombre: inputs[7].value,
                primer_apellido: inputs[8].value,
                segundo_apellido: inputs[9].value,
                telefono: inputs[10].value,
                correo_electronico: inputs[11].value,
                ubicacion: fmrCliente.registrarCliente.dataset.ubucacion
            }
            registrarCliente(data);
            swal({
                type: 'success',
                title: 'Registro exitoso',
                text: 'El usuario se registró adecuadamente',
                confirmButtonText: 'Entendido'
            });
            fmrCliente.reset();
        }
    } else {
        swal({
            type: 'warning',
            title: 'No se pudo registrar el usuario',
            text: 'Por favor revise los campos en rojo',
            confirmButtonText: 'Entendido'
        });
    }

});

/**
 * Esta funcion llena un elemento HTMLSelectElement con datos dependiendo del valor de otro elemento
 * @param {*} element elemento al cual se le van a generar opciones
 * @param {String} key el valor donde se encuentra la lista
 * @param {JSON} data elemento del cual se sacan los datos dependiendo del value del element
 * @return {void} 
 */
function llenarSelect(element, key, data) {
    key = key.toLowerCase().replace(/á/g, 'a').replace(/é/g, 'e').replace(/í/g, 'i').replace(/ó/g, 'o').replace(/ú/g, 'u').replace(/ñ/g, 'nn').replace(/ /g, '_');
    element.innerHTML = '';
    let lista = data[key];
    element.options[0] = new Option('-Seleccione un ' + element.name + '-', '');
    if (key != '') {
        for (let i = 1; i < lista.length; i++) {
            element.options[i] = new Option(lista[i - 1], lista[i - 1]);
        }
    }
}