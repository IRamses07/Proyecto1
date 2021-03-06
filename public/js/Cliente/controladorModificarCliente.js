'use strict';
let params = getParam();
let client = getInfoCliente(params.cedula_juridica)[0];
function llenarFormulario() {
    // console.log(client.nombre, client)
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
        actualizar();
    });
}
llenarFormulario();
function actualizar() {
    console.log('actualiza')
    let inputs = [fmrCliente.nombre, fmrCliente.primerNombre, fmrCliente.segundoNombre, fmrCliente.primerApellido, fmrCliente.segundoApellido, fmrCliente.provincia, fmrCliente.canton, fmrCliente.distrito, fmrCliente.direccionExacta, fmrCliente.correoElectronico, fmrCliente.telefono];
    let data = {
        cedula_juridica: fmrCliente.cedulaJuridica.value,
        nombre: fmrCliente.nombre.value,
        provincia: fmrCliente.provincia.value,
        canton: fmrCliente.canton.value,
        distrito: fmrCliente.distrito.value,
        direccion_exacta: fmrCliente.direccionExacta.value,
        segundo_nombre: fmrCliente.segundoNombre.value,
        primer_nombre: fmrCliente.primerNombre.value,
        primer_apellido: fmrCliente.primerApellido.value,
        segundo_apellido: fmrCliente.segundoApellido.value,
        telefono: fmrCliente.telefono.value,
        correo_electronico: fmrCliente.correoElectronico.value,
        ubicacion: marker.getPosition().lat() + ',' + marker.getPosition().lng()
    }
    // console.log(data);
    if (registro(inputs)) {
        let verificacion = buscar({ nombre: data.nombre });
        if (verificacion.length >0 && verificacion[0].cedula_juridica != data.cedula_juridica) {
            addClass(fmrCliente.nombre, 'error');
            swal({
                type: 'warning',
                title: 'No se pudo registrar el usuario',
                text: 'El nombre del cliente ya existe',
                confirmButtonText: 'Entendido'
            });
        } else {
            actualizarCliente(data)
            swal({
                type: 'success',
                title: 'Información modificada',
                text: 'Los cambios se guardaron adecuadamente',
                confirmButtonText: 'Entendido'
            });
            window.location.href = 'listarClientes.html';
        }
    } else {
        swal({
            type: 'warning',
            title: '¡Algo va mal!',
            text: 'Por favor revise los campos en rojo',
            confirmButtonText: 'Entendido'
        });
    }
}