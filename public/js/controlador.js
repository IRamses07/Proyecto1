'use strict'
let eString = /[A-Za-záéíóúñÑÁÉÍÓÚ+-]+/,
    eNumber = /[0-9]+/,
    eSpace = /\s+/,
    eEmail = /([\w\.\-_]+)?\w+@[\w-_]+(\.\w+){1,}/,
    eDate = /^(0?[1-9]|1[0-2])[\/](0?[1-9]|[12]\d|3[01])[\/](19|20)\d{2}$/,
    ePhone = /^\s*(?:\+?(\d{1,3}))?([-. (]*(\d{3})[-. )]*)?((\d{3})[-. ]*(\d{2,4})(?:[-.x ]*(\d+))?)\s*$/;
let map, marker, gCoder;
/**
 * funcion que retorna un elemento html del documento
 * @param {String} id es la isntruccion para identificar el elemento que se desea extraer
 *  
 */
function elm(id) {
    return document.querySelector(id);
}
function createElm(tag) {
    return document.createElement(tag);
}
/**
 * agrega un evento a un elemento 
 * @param {*} element elemeto html que se le va a asignar un evento
 * @param {String} event el tipo de evento al que va a responder
 * @param {function} action la funcion que se va a ejecutar al detectar el evento
 */
function listener(element, event, action) {
    element.addEventListener(event, action);
}
/**
 * comprueba si un elemento html esta vacío
 * @param {*} element elemento html
 */
function blanck(element) {
    let valido = true;
    if (element != null) {
        if (element.value == '') {
            valido = false;
        }
    } else {
        valido = false;
    }
    return valido;
}
function registro(inputs) {
    let valido = true;
    for (let i = 0; i < inputs.length; i++) {
        let element = inputs[i];
        removeClass(element, 'error');
        switch (element.name) {
            case 'apellido1':
            case 'nombre1':
            case 'profesion':
            case 'primerApellido':
            case 'primerNombre':
                if (blanck(element)) {
                    if (test(eNumber, element) || test(eSpace, element)) {
                        addClass(element, 'error');
                        valido = false;
                    }
                } else {
                    addClass(element, 'error');
                    valido = false;
                }
                break;
            case 'telefono':
                if (blanck(element)) {
                    if (!test(ePhone, element)) {
                        valido = false;
                    }
                } else {
                    addClass(element, 'error');
                    valido = false;
                }
                break;
            case 'edad':
                if (blanck(element)) {
                    if (test(eString, element) || test(eSpace, element)) {
                        addClass(element, 'error');
                        valido = false;
                    }
                } else {
                    addClass(element, 'error');
                    valido = false;
                }
                break;
            case 'correoElectronico':
                if (blanck(element)) {
                    if (!test(eEmail, element) || test(eSpace, element)) {
                        addClass(element, 'error');
                        valido = false;
                    }
                } else {
                    addClass(element, 'error');
                    valido = false;
                }
                break;
            case 'password':

                break;
            case 'cedula':
            case 'direccionExacta':
            case 'nombre':
            case 'cedulaJuridica':
            case 'canton':
            case 'provincia':
            case 'distrito':
                if (blanck(element)) {

                } else {
                    addClass(element, 'error');
                    valido = false;
                }
                break
            default:
                break;
        }
    }
    return valido;
}
function test(expresion, element) {
    if (expresion.test(element.value)) {
        return true;
    } else {
        return false;
    }
}
function addClass(element, clase) {
    element.classList.add(clase);
}
function removeClass(element, clase) {
    element.classList.remove(clase);
}