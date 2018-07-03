'use strict'
let eString = /[A-Za-záéíóúñÑÁÉÍÓÚ+-]+/,
    eNumber = /[0-9]+/,
    eSpace = /\s+/,
    eEmail = /([\w\.\-_]+)?\w+@[\w-_]+(\.\w+){1,}/,
    eDate = /^(0?[1-9]|1[0-2])[\/](0?[1-9]|[12]\d|3[01])[\/](19|20)\d{2}$/,
    ePhone = /^\s*(?:\+?(\d{1,3}))?([-. (]*(\d{3})[-. )]*)?((\d{3})[-. ]*(\d{2,4})(?:[-.x ]*(\d+))?)\s*$/;

function elm(id) {
    return document.querySelector(id);
}
function listener(element, event, action) {
    element.addEventListener(event, action);
}
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