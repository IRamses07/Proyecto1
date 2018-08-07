function setAdmin() {

    let respuesta = '';
    let peticion = $.ajax({
        url: 'http://localhost:4000/api/registrar_admin',
        type: 'post',
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        dataType: 'json',
        async: false,
        data: {
            nombre1: 'Luis',
            nombre2: 'Esteban',
            apellido1: 'Bonilla',
            apellido2: 'Alfaro',
            cedula: '123',
            correo: 'estebanba@gmail.com',
            telefono: 88948243,
            profesion: 'Administración de empresas',
            rol: 'administrador',
            password: 'admin',
            passwordChange: 0
            /*profesion: infoProfesor.profesion*/
        }
    });

    peticion.done(function (response) {
        console.log('Registro bien');
        respuesta = response;
    });

    peticion.fail(function (response) {
        console.log('Registro mal');
    });

    return respuesta;
}

function getAdminData() {

    let respuesta = [];
    let peticion = $.ajax({
        url: 'http://localhost:4000/api/get_info_admin',
        type: 'get',
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        dataType: 'json',
        async: false,
        data: {

        }
    });

    peticion.done(function (response) {
        respuesta = response;
    });

    peticion.fail(function (response) {

    });

    return respuesta;
}


function getUsers() {

    let aListaProfesores = [];
    let aListaEstudiantes = [];
    let aListaClientes = [];
    let aAllUsers = [];

    let peticion1 = $.ajax({
        url: 'http://localhost:4000/api/listar_profesores',
        type: 'get',
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        dataType: 'json',
        async: false,
        data: {

        }
    });

    peticion1.done(function (response) {
        aListaProfesores = response;
    });

    peticion1.fail(function () {

    });

    let peticion2 = $.ajax({
        url: 'http://localhost:4000/api/listar_estudiantes',
        type: 'get',
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        dataType: 'json',
        async: false,
        data: {

        }
    });

    peticion2.done(function (response) {
        aListaEstudiantes = response;
    });

    peticion2.fail(function () {

    });

    let peticion3 = $.ajax({
        url: 'http://localhost:4000/api/listar_clientes',
        type: 'get',
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        dataType: 'json',
        async: false,
        data: {

        }
    });

    peticion3.done(function (response) {
        aListaClientes = response;
    });

    peticion3.fail(function () {

    });


    let peticion4 = $.ajax({
        url: 'http://localhost:4000/api/get_info_admin',
        type: 'get',
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        dataType: 'json',
        async: false,
        data: {

        }
    });

    peticion4.done(function (response) {
        aListaAdmin = response;
    });

    peticion4.fail(function (response) {

    });

    aAllUsers = [aListaProfesores, aListaEstudiantes, aListaClientes, aListaAdmin];

    return aAllUsers;
}


function setCurrentUser(pId) {
    let allUsers = getUsers();
    let datosID = [];
    for (let i = 0; i < allUsers.length; i++) {
        for (let j = 0; j < allUsers[i].length; j++) {
            if (allUsers[i][j]['cedula'] == pId || allUsers[i][j]['cedula_juridica'] == pId) {
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

            if (allUsers[i][j]['cedula'] == pId || allUsers[i][j]['cedula_juridica'] == pId) {
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

function setNewPassword(_id, newPassword) {

    let sUrl = ''
    if (getCurrentUserData()['rol'] == 'administrador') {
        sUrl = 'http://localhost:4000/api/cambiar_contrasenna_admin'
    } else if (getCurrentUserData()['rol'] == 'cliente') {
        sUrl = 'http://localhost:4000/api/cambiar_contrasenna_cliente'
    } else if (getCurrentUserData()['rol'] == 'profesor') {
        sUrl = 'http://localhost:4000/api/cambiar_contrasenna_profesor'
    } else if (getCurrentUserData()['rol'] == 'estudiante') {
        sUrl = 'http://localhost:4000/api/cambiar_contrasenna_estudiante'
    }

    let peticion = $.ajax({
        url: sUrl,
        type: 'post',
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        dataType: 'json',
        async: false,
        data: {
            '_id': _id,
            'password': newPassword,
            'passwordChange': 1,

        }
    });

    peticion.done(function (response) {
        console.log('registro bien.')
    });

    peticion.fail(function () {
        console.log("registro mal.")
    });
    updateCurrentUser();
}




