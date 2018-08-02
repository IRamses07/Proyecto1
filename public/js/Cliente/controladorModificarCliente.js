'use strict';
let params=getParam();
let client=getInfoCliente(params.cedula_juridica)[0];
function llenarFormulario() {
    console.log(client.nombre,client)
    fmrCliente.cedulaJuridica.value=client.cedula_juridica;
    fmrCliente.provincia.value=client.provincia;
    llenarSelect(fmrCliente.canton,fmrCliente.provincia.value,cantones)
    fmrCliente.canton.value=client.canton;
    llenarSelect(fmrCliente.distrito,fmrCliente.canton.value,distritos)
    fmrCliente.distrito.value=client.distrito;
    fmrCliente.primerNombre.value=client.primer_nombre;
    fmrCliente.segundoNombre.value=client.segundo_nombre;
    fmrCliente.primerApellido.value=client.primer_apellido;
    fmrCliente.segundoApellido.value=client.segundo_apellido;
    fmrCliente.correoElectronico.value=client.correo_electronico;
    fmrCliente.telefono.value=client.telefono;
    fmrCliente.nombre.value=client.nombre;
    fmrCliente.direccionExacta.value=client.direccion_exacta;
    let ubicacion=client.ubicacion.split(',');
    mapCenter(ubicacion[0],ubicacion[1])
}
llenarFormulario();
