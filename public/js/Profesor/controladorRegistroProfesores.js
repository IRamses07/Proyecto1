'use strict'
let inputNombre1, inputNombre2, inputApellido1, inputApellido2, inputCedula, inputProfesion, inputCorreo, inputTelefono, inputs = [
    inputNombre1 = elm('#fmrRegitroProfesor input[name="nombre1"]'),
    inputNombre2 = elm('#fmrRegitroProfesor input[name="nombre2"]'),
    inputApellido1 = elm('#fmrRegitroProfesor input[name="apellido1"]'),
    inputApellido2 = elm('#fmrRegitroProfesor input[name="apellido2"]'),
    inputCedula = elm('#fmrRegitroProfesor input[name="cedula"]'),
    inputProfesion = elm('#fmrRegitroProfesor input[name="profesion"]'),
    inputCorreo = elm('#fmrRegitroProfesor input[name="correoElectronico"]'),
    inputTelefono = elm('#fmrRegitroProfesor input[name="telefono"]')
],
    btnRegistro = elm('#btnRegistro');
listener(btnRegistro, 'click', function () {
    if (registro(inputs)) {
        console.log('Registro exitoso');
        let x={
            nombre1:inputNombre1.value,
            nombre2:inputNombre2.value,
            apellido1: inputApellido1.value,
            apellido2:inputApellido2.value,
            cedula:inputCedula.value,
            profesion:inputProfesion.value,
            correo:inputCorreo.value,
            telefono:inputTelefono.value
        }
        registrarProfesor(x);
    }else{
        console.log('Revise los campos marcados');
    }
});
