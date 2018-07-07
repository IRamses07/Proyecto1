


function getUsers() {

    let aListaProfesores = [];
    let aListaEstudiantes = [];
    let aListaClientes = [];
    let aAllUsers = [];

    let peticion = $.ajax({
        url: 'http://localhost:4000/api/listar_profesores',
        type: 'get',
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        dataType: 'json',
        async: false,
        data: {

        }
    });

    peticion.done(function (response) {
        aListaProfesores = response;
    });

    peticion.fail(function () {

    });

    let peticion = $.ajax({
        url: 'http://localhost:4000/api/listar_clientes', //Corregir la ruta del listado de estudiantes
        type: 'get',
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        dataType: 'json',
        async: false,
        data: {

        }
    });

    peticion.done(function (response) {
        aListaProfesores = response;
    });

    peticion.fail(function () {

    });

    let peticion = $.ajax({
        url: 'http://localhost:4000/api/listar_clientes', //Corregir la ruta del listado de clientes
        type: 'get',
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        dataType: 'json',
        async: false,
        data: {

        }
    });

    peticion.done(function (response) {
        aListaClientes = response;
    });

    peticion.fail(function () {

    });

    aAllUsers = [aListaProfesores, aListaEstudiantes, aListaClientes];

    return aAllUsers;
}


function setCurrentUser(pId) {
    let allUsers = getUsers();
    let datosID = [];
    for (let i = 0; i < allUsers.length; i++) {
        for (let j = 0; j < allUsers[i].length; j++) {
            if (allUsers[i][j]['cedula'] == pId) {
                console.log("[setCurrentUser] Se colocó/actualizó la información del usuario actual.");
                datosID = allUsers[i][j];
            }
        }
    }

    sessionStorage.setItem("currentUser", JSON.stringify(datosID));
}

function getUserPassword(pId) {
    let allUsers = getUsers();
    let thisUserPassword = "";
    for (let i = 0; i < allUsers.length; i++) {
        for (let j = 0; j < allUsers[i].length; j++) {

            if (allUsers[i][j]['cedula'] == pId) {
                thisUserPassword = allUsers[i][j]['password'];
                console.log("[getUserPassword]  El usuario existe y se encontró la contraseña del usuario.")
            }
        }
    }
    if (thisUserPassword == "") {
        console.log("[getUserPassword] No se encontró el usuario, este no existe.")
    }
    return thisUserPassword;
}