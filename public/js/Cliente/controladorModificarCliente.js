'use strict';
let params = getParam();
let client = getInfoCliente(params.cedula_juridica)[0];
function llenarFormulario() {
    console.log(client.nombre, client)
    fmrCliente.cedulaJuridica.value = client.cedula_juridica;
    fmrCliente.provincia.value = client.provincia;
    llenarSelect(fmrCliente.canton, fmrCliente.provincia.value, cantones)
    fmrCliente.canton.value = client.canton;
    llenarSelect(fmrCliente.distrito, fmrCliente.canton.value, distritos)
    fmrCliente.distrito.value = client.distrito;
    fmrCliente.primerNombre.value = client.primer_nombre;
    fmrCliente.segundoNombre.value = client.segundo_nombre;
    fmrCliente.primerApellido.value = client.primer_apellido;
    fmrCliente.segundoApellido.value = client.segundo_apellido;
    fmrCliente.correoElectronico.value = client.correo_electronico;
    fmrCliente.telefono.value = client.telefono;
    fmrCliente.nombre.value = client.nombre;
    fmrCliente.direccionExacta.value = client.direccion_exacta;
    let ubicacion = client.ubicacion.split(',');
    mapCenter(ubicacion[0], ubicacion[1]);
    listener(fmrCliente.actualizarCliente, 'click', function () {
        actualizarCliente();
        // window.location.href='listarClientes.html';
    });
}
llenarFormulario();
function actualizarCliente() {
    let inputs = [fmrCliente.nombre, fmrCliente.primerNombre, fmrCliente.segundoNombre, fmrCliente.cedulaJuridica, fmrCliente.primerApellido, fmrCliente.segundoApellido, fmrCliente.provincia, fmrCliente.canton, fmrCliente.distrito, fmrCliente.direccionExacta, fmrCliente.correoElectronico, fmrCliente.telefono];
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
    console.log(inputs);
    if (registro(inputs)) {
        actualizarCliente(data)
        registrarCliente(data);
        swal({
            type: 'success',
            title: 'Registro exitoso',
            text: 'El usuario se registró adecuadamente',
            confirmButtonText: 'Entendido'
        });
        fmrCliente.reset();
    } else {
        swal({
            type: 'warning',
            title: 'No se pudo registrar el usuario',
            text: 'Por favor revise los campos en rojo',
            confirmButtonText: 'Entendido'
        });
    }
}