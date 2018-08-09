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
    id = getCurrentUserData()._id;
    let thisUserData = [];
    for (let i = 0; i < usuariosRegistrados.length; i++) {
        for (let j = 0; j < usuariosRegistrados[i].length; j++) {
            if (usuariosRegistrados[i][j]['_id'] == id) {
                thisUserData = usuariosRegistrados[i][j];
            }
        }
    }
    sessionStorage.setItem("currentUser", JSON.stringify(thisUserData));
    console.log("[updateCurrentUser]");
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
            "Registrar proyectos",
            // "Agregar estudiantes a proyecto",
            "Agregar proyectos a profesores",
            "Listar proyectos",
            "Listar proyectos en desarrollo",
            "Registrar clientes",
            "Listar clientes",
            "Registrar estudiantes",
            "Listar estudiantes",
            "Registrar profesores",
            "Listar profesores",
            "Listar tiquetes",
            //    "Ver ticket"
        ];
        menuURL = [
            "registrarProyecto.html",
            // "agregarEstudiantes.html",
            "agregarProyectosProfesores.html",
            "listarProyectos.html",
            "listarProyectosDesarrollo.html",
            "registroClientes.html",
            "listarClientes.html",
            "registrarEstudiante.html",
            "listarEstudiante.html",
            "registroProfesores.html",
            "listarProfesores.html",
            "listarTickets.html",
            // "verTicket.html"
        ];
    }

    if (userRol == "cliente") {
        menuTexto = [
            "Listar proyectos",
            // "Listar proyectos en desarrollo",
            "Registrar tickets",
            "Listar tickets",
            "Visualizar perfil",
        ];
        menuURL = [
            "listarProyectosCliente.html",
            // "listarProyectosDesarrollo.html",
            "registroTicket.html",
            "listarTicketsCliente.html",
            "perfilCliente.html",
        ];
    }

    if (userRol == "profesor") {
        menuTexto = [
            "Agregar estudiantes",
            "Listar clientes",
            "Listar estudiantes",
            // "Listar proyectos en desarrollo",
            "Listar proyectos",
            "Listar tickets",
            "Visualizar perfil",
        ];
        menuURL = [
            "agregarEstudiantes.html",
            "listarClientes.html",
            "listarEstudiante.html",
            // "listarProyectosDesarrollo.html",
            "listarProyectosProfesor.html",
            "listarTicketsProfesor.html",
            "perfilProfesor.html",
            "registroTicket.html",
        ];
    }

    if (userRol == "estudiante") {
        menuTexto = [
            // "Listar estudiantes",
            "Listar proyectos",
            "Listar tickets",
            "Visualizar perfil",
            "Registrar horas"
        ];
        menuURL = [
            // "listarEstudiante.html",
            "listarProyectosEstudiante.html",
            "listarTicketsEstudiante.html",
            "perfilEstudiante.html",
            "registrarHoras.html"
        ];
    }

    for (let i = 0; i < menuTexto.length; i++) {
        let newDiv = document.createElement('div');
        newDiv.classList.add('option');
        let newA = document.createElement('a');
        newA.innerHTML = menuTexto[i];
        newA.href = menuURL[i];
        newDiv.appendChild(newA);
        menu.appendChild(newDiv);
        if (menuURL[i] == "registroProfesores.html") {
            newA.onclick = function () {
                sessionStorage.removeItem('professorUpdateLS');
            };
        }
    }
}
