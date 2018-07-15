loadOptionsMenu();
function getCurrentUserData() {
    let currentData = JSON.parse(sessionStorage.getItem('currentUser'));
    if (currentData == null) {
        currentData = false;
    }
    return currentData;
}

function moveUser(type) {

    let userLoggedIn = getCurrentUserData();

    if (type) {
        if (!userLoggedIn) {
            window.location = "login.html";
        } else {
        }
    }
}

function logOut() {
    let usuarioData = getCurrentUserData();
    let logSucessfull = false;
    if (usuarioData) {
        logSucessfull = true;
        sessionStorage.removeItem('currentUser');
    }
    window.location = 'login.html';
}

function updateCurrentUser(id) {
    let usuariosRegistrados = getUsers();
    let thisUserData = [];
    for (let i = 0; i < usuariosRegistrados.length; i++) {
        for (let j = 0; j < usuariosRegistrados[i].length; j++) {
            if (usuariosRegistrados[i][j]['_id'] == id) {
                thisUserData = usuariosRegistrados[i][j];
            }
        }
    }
    sessionStorage.setItem("currentUser", JSON.stringify(thisUserData));
    console.log("[updateCurrentUser] Ok, información de la identificación " + id + " actualizada.");
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

function loadOptionsMenu() {
    let menu = document.getElementById('divMenuLateral');
    let menuTexto = [];
    let menuURL = [];
    let userRol = getCurrentUserData()['rol'];

    if (userRol == "administrador") {
        menuTexto = [
            "Agregar estudiantes",
            "Agregar proyectos a profesores",
            "Listar clientes",
            "Listar estudiantes",
            "Listar profesores",
            "Listar proyectos",
            "Listar proyectos en desarrollo",
            "Listar tiquetes",
            "Registrar estudiantes",
            "Registrar proyectos",
            "Registrar clientes",
            "Registrar profesores",
            "Registrar tickets",
            "Ver ticket"];
        menuURL = [
            "agregarEstudiantes.html",
            "agregarProyectosProfesores.html",
            "listarClientes.html",
            "listarEstudiante.html",
            "listarProfesores.html",
            "listarProyectos.html",
            "listarProyectosDesarrollo.html",
            "listarTickets.html",
            "registrarEstudiante.html",
            "registrarProyecto.html",
            "registroClientes.html",
            "registroProfesores.html",
            "registroTicket.html",
            "verTicket.html"];
    }

    if (userRol == "cliente") {
        menuTexto = [
            "Agregar estudiantes",
            "Agregar proyectos a profesores",
            "Listar clientes",
            "Listar estudiantes",
            "Listar profesores",
            "Listar proyectos",
            "Listar proyectos de clientes",
            "Listar proyectos en desarrollo",
            "Listar proyectos de estudiantes",
            "Listar proyectos de profesores",
            "Listar tiquetes",
            "Listar tiquetes de clientes",
            "Listar tiquetes de estudiantes",
            "Listar tiquetes de profesores",
            "Visualizar perfil",
            "Visualizar perfil",
            "Visualizar perfil",
            "Registrar estudiantes",
            "Registrar proyectos",
            "Registrar clientes",
            "Registrar profesores",
            "Registrar tickets",
            "Ver ticket"];
        menuURL = [
            "agregarEstudiantes.html",
            "agregarProyectosProfesores.html",
            "listarClientes.html",
            "listarEstudiante.html",
            "listarProfesores.html",
            "listarProyectos.html",
            "listarProyectosCliente.html",
            "listarProyectosDesarrollo.html",
            "listarProyectosEstudiante.html",
            "listarProyectosProfesor.html",
            "listarTickets.html",
            "listarTicketsCliente.html",
            "listarTicketsEstudiante.html",
            "listarTicketsProfesor.html",
            "perfilCliente.html",
            "perfilEstudiante.html",
            "perfilProfesor.html",
            "registrarEstudiante.html",
            "registrarProyecto.html",
            "registroClientes.html",
            "registroProfesores.html",
            "registroTicket.html",
            "verTicket.html"];
    }

    if (userRol == "profesor") {
        menuTexto = [
            "Agregar estudiantes",
            "Agregar proyectos a profesores",
            "Listar clientes",
            "Listar estudiantes",
            "Listar profesores",
            "Listar proyectos",
            "Listar proyectos de clientes",
            "Listar proyectos en desarrollo",
            "Listar proyectos de estudiantes",
            "Listar proyectos de profesores",
            "Listar tiquetes",
            "Listar tiquetes de clientes",
            "Listar tiquetes de estudiantes",
            "Listar tiquetes de profesores",
            "Visualizar perfil",
            "Visualizar perfil",
            "Visualizar perfil",
            "Registrar estudiantes",
            "Registrar proyectos",
            "Registrar clientes",
            "Registrar profesores",
            "Registrar tickets",
            "Ver ticket"];
        menuURL = [
            "agregarEstudiantes.html",
            "agregarProyectosProfesores.html",
            "listarClientes.html",
            "listarEstudiante.html",
            "listarProfesores.html",
            "listarProyectos.html",
            "listarProyectosCliente.html",
            "listarProyectosDesarrollo.html",
            "listarProyectosEstudiante.html",
            "listarProyectosProfesor.html",
            "listarTickets.html",
            "listarTicketsCliente.html",
            "listarTicketsEstudiante.html",
            "listarTicketsProfesor.html",
            "perfilCliente.html",
            "perfilEstudiante.html",
            "perfilProfesor.html",
            "registrarEstudiante.html",
            "registrarProyecto.html",
            "registroClientes.html",
            "registroProfesores.html",
            "registroTicket.html",
            "verTicket.html"];
    }

    if (userRol == "estudiante") {
        menuTexto = [
            "Agregar estudiantes",
            "Agregar proyectos a profesores",
            "Listar clientes",
            "Listar estudiantes",
            "Listar profesores",
            "Listar proyectos",
            "Listar proyectos de clientes",
            "Listar proyectos en desarrollo",
            "Listar proyectos de estudiantes",
            "Listar proyectos de profesores",
            "Listar tiquetes",
            "Listar tiquetes de clientes",
            "Listar tiquetes de estudiantes",
            "Listar tiquetes de profesores",
            "Visualizar perfil",
            "Visualizar perfil",
            "Visualizar perfil",
            "Registrar estudiantes",
            "Registrar proyectos",
            "Registrar clientes",
            "Registrar profesores",
            "Registrar tickets",
            "Ver ticket"];
        menuURL = [
            "agregarEstudiantes.html",
            "agregarProyectosProfesores.html",
            "listarClientes.html",
            "listarEstudiante.html",
            "listarProfesores.html",
            "listarProyectos.html",
            "listarProyectosCliente.html",
            "listarProyectosDesarrollo.html",
            "listarProyectosEstudiante.html",
            "listarProyectosProfesor.html",
            "listarTickets.html",
            "listarTicketsCliente.html",
            "listarTicketsEstudiante.html",
            "listarTicketsProfesor.html",
            "perfilCliente.html",
            "perfilEstudiante.html",
            "perfilProfesor.html",
            "registrarEstudiante.html",
            "registrarProyecto.html",
            "registroClientes.html",
            "registroProfesores.html",
            "registroTicket.html",
            "verTicket.html"];
    }

    for (let i = 0; i < menuTexto.length; i++) {
        let newDiv = document.createElement('div');
        newDiv.classList.add('option');
        let newA = document.createElement('a');
        newA.innerHTML = menuTexto[i];
        newA.href = menuURL[i];
        newDiv.appendChild(newA);
        menu.appendChild(newDiv);
    
    }
}
