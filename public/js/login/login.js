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
    let userRol = getCurrentUserData()['rol'];

    if (userRol == "administrador") {

        let mainMenu = ["Proyectos", "Clientes", "Profesores", "Estudiantes", "Tickets"];
        for (let i = 0; i < mainMenu.length; i++) {
            let optionsContainer = document.createElement('div');
            optionsContainer.id = mainMenu[i];
            let mainOption = document.createElement('div');
            mainOption.classList.add('option');
            /*optionsContainer.onclick = "secundaryMenu(mainMenu[i])";*/
            optionsContainer.addEventListener('click', function () { secundaryMenu(mainMenu[i]) });
            let mainLabel = document.createElement('a');
            mainLabel.classList.add('menuLabel');
            mainLabel.innerHTML = mainMenu[i];
            mainLabel.addEventListener('click', function () { secundaryMenu(mainMenu[i]) });
            mainOption.appendChild(mainLabel);
            optionsContainer.appendChild(mainOption);
            menu.appendChild(optionsContainer);

            let menuTexto = [];
            let menuURL = [];

            if (mainMenu[i] == "Proyectos") {
                menuTexto = ["Agregar proyectos a profesores", "registrar proyecto", "Listar proyectos", "Listar proyectos en desarrollo"];
                menuURL = ["agregarProyectosProfesores.html", "registrarProyecto.html", "listarProyectos.html", "listarProyectosDesarrollo.html"];
            }
            if (mainMenu[i] == "Clientes") {
                menuTexto = ["Registrar clientes", "Listar clientes"];
                menuURL = ["registroClientes.html", "listarClientes.html"];
            }
            if (mainMenu[i] == "Profesores") {
                menuTexto = ["Registrar profesores", "Listar profesores"];
                menuURL = ["registroProfesores.html", "listarprofesores.html"];
            }
            if (mainMenu[i] == "Estudiantes") {
                menuTexto = ["Registrar estudiantes", "Listar estudiantes"];
                menuURL = ["registrarEstudiante.html", "listarEstudiante.html"];
            }
            if (mainMenu[i] == "Tickets") {
                menuTexto = ["Listar tickets"];
                menuURL = ["listarTickets.html"];
            }

            for (let i = 0; i < menuTexto.length; i++) {
                let newDiv = document.createElement('div');
                newDiv.classList.add('option2');
                /*newDiv.classList.add('hide');*/
                let newA = document.createElement('a');
                newA.innerHTML = menuTexto[i];
                newA.href = menuURL[i];
                /*newA.style.display = "block";*/
                newA.style.width = "400px";
                newDiv.appendChild(newA);
                optionsContainer.appendChild(newDiv);

                if (menuURL[i] == "registroProfesores.html") {
                    newA.onclick = function () {
                        sessionStorage.removeItem('professorUpdateLS');
                    };
                }
            }
        }
    }

    if (userRol == "cliente") {
        let mainMenu = ["Proyectos", "Tickets"];
        for (let i = 0; i < mainMenu.length; i++) {
            let optionsContainer = document.createElement('div');
            optionsContainer.id = mainMenu[i];
            let mainOption = document.createElement('div');
            mainOption.classList.add('option');
            // mainOption.onclick = "secundaryMenu(userRol, mainMenu[i])";
            /*mainOption.addEventListener('click', function () { secundaryMenu(userRol, mainMenu[i]) });*/
            let mainLabel = document.createElement('a');
            mainLabel.classList.add('menuLabel');
            mainLabel.innerHTML = mainMenu[i];
            mainOption.appendChild(mainLabel);
            optionsContainer.appendChild(mainOption);
            menu.appendChild(optionsContainer);


            let menuTexto = [];
            let menuURL = [];

            if (mainMenu[i] == "Proyectos") {
                menuTexto = ["Listar proyectos"];
                menuURL = ["listarProyectosCliente.html"];
            }
            if (mainMenu[i] == "Tickets") {
                menuTexto = ["Registrar tickets", "Listar tickets"];
                menuURL = ["registroTicket.html", "listarTicketsCliente.html"];
            }

            for (let i = 0; i < menuTexto.length; i++) {
                let newDiv = document.createElement('div');
                newDiv.classList.add('option2');
                /*newDiv.classList.add('hide');*/
                let newA = document.createElement('a');
                newA.innerHTML = menuTexto[i];
                newA.href = menuURL[i];
                newA.style.display = "block";
                newA.style.width = "400px";
                newA.classList.add('hide');
                newDiv.appendChild(newA);
                optionsContainer.appendChild(newDiv);
                if (menuURL[i] == "registroProfesores.html") {
                    newA.onclick = function () {
                        sessionStorage.removeItem('professorUpdateLS');
                    };
                }
            }
        }
        let profile = document.createElement('div');
        profile.classList.add('option');
        /*profile.classList.add('option2');*/
        profile.classList.add('optionHover');
        let profileLabel = document.createElement('a');
        profileLabel.classList.add('menuLabel');
        profileLabel.innerHTML = "Visualizar perfil";
        profileLabel.href = "perfilCliente.html";
        profile.appendChild(profileLabel);
        menu.appendChild(profile);
    }

    if (userRol == "profesor") {
        let mainMenu = ["Proyectos", "Clientes", "Estudiantes", "Tickets"];
        for (let i = 0; i < mainMenu.length; i++) {
            let optionsContainer = document.createElement('div');
            optionsContainer.id = mainMenu[i];
            let mainOption = document.createElement('div');
            mainOption.classList.add('option');
            // mainOption.onclick = "secundaryMenu(userRol, mainMenu[i])";
            /*mainOption.addEventListener('click', function () { secundaryMenu(userRol, mainMenu[i]) });*/
            let mainLabel = document.createElement('a');
            mainLabel.classList.add('menuLabel');
            mainLabel.innerHTML = mainMenu[i];
            mainOption.appendChild(mainLabel);
            optionsContainer.appendChild(mainOption);
            menu.appendChild(optionsContainer);

            let menuTexto = [];
            let menuURL = [];

            if (mainMenu[i] == "Proyectos") {
                menuTexto = ["Listar proyectos"];
                menuURL = ["listarProyectosProfesor.html"];
            }
            if (mainMenu[i] == "Clientes") {
                menuTexto = ["Listar clientes"];
                menuURL = ["listarClientes.html"];
            }

            if (mainMenu[i] == "Estudiantes") {
                menuTexto = ["Agregar estudiantes", "Listar estudiantes"];
                menuURL = ["agregarEstudiantes.html", "listarEstudiante.html"];
            }
            if (mainMenu[i] == "Tickets") {
                menuTexto = ["Listar tickets"];
                menuURL = ["listarTickets.html"];
            }

            for (let i = 0; i < menuTexto.length; i++) {
                let newDiv = document.createElement('div');
                newDiv.classList.add('option2');
                /*newDiv.classList.add('hide');*/
                let newA = document.createElement('a');
                newA.innerHTML = menuTexto[i];
                newA.href = menuURL[i];
                newA.style.display = "block";
                newA.style.width = "400px";
               /* newA.classList.add('hide');*/
               newDiv.appendChild(newA);
                optionsContainer.appendChild(newDiv);

                if (menuURL[i] == "registroProfesores.html") {
                    newA.onclick = function () {
                        sessionStorage.removeItem('professorUpdateLS');
                    };
                }
            }
        }
        let profile = document.createElement('div');
        profile.classList.add('option');
        /*profile.classList.add('option2');*/
        profile.classList.add('optionHover');
        let profileLabel = document.createElement('a');
        profileLabel.classList.add('menuLabel');
        profileLabel.innerHTML = "Visualizar perfil";
        profileLabel.href = "perfilProfesor.html";
        profile.appendChild(profileLabel);
        menu.appendChild(profile);
    }

    if (userRol == "estudiante") {
        let mainMenu = ["Proyectos", "Tickets"];

        for (let i = 0; i < mainMenu.length; i++) {
            let optionsContainer = document.createElement('div');
            optionsContainer.id = mainMenu[i];
            let mainOption = document.createElement('div');
            mainOption.classList.add('option');
            // mainOption.onclick = "secundaryMenu(userRol, mainMenu[i])";
            mainOption.addEventListener('click', function () { secundaryMenu(userRol, mainMenu[i]) });
            let mainLabel = document.createElement('a');
            mainLabel.classList.add('menuLabel');
            mainLabel.innerHTML = mainMenu[i];
            mainOption.appendChild(mainLabel);
            optionsContainer.appendChild(mainOption);
            menu.appendChild(optionsContainer);

            let menuTexto = [];
            let menuURL = [];

            if (mainMenu[i] == "Proyectos") {
                menuTexto = ["Listar proyectos", "Registrar horas",];
                menuURL = ["listarProyectosEstudiante.html", "registrarHoras.html"];
            }
            if (mainMenu[i] == "Tickets") {
                menuTexto = ["Listar tickets"];
                menuURL = ["listarTicketsEstudiante.html"];
            }

            for (let i = 0; i < menuTexto.length; i++) {
                let newDiv = document.createElement('div');
                newDiv.classList.add('option2');
                /*newDiv.classList.add('hide');*/
                let newA = document.createElement('a');
                newA.innerHTML = menuTexto[i];
                newA.href = menuURL[i];
                newA.style.display = "block";
                newA.style.width = "400px";
                newDiv.appendChild(newA);
                optionsContainer.appendChild(newDiv);
                if (menuURL[i] == "registroProfesores.html") {
                    newA.onclick = function () {
                        sessionStorage.removeItem('professorUpdateLS');
                    };
                }
            }
        }
        let profile = document.createElement('div');
        profile.classList.add('option');
       /* profile.classList.add('option2');*/
        profile.classList.add('optionHover');
        let profileLabel = document.createElement('a');
        profileLabel.classList.add('menuLabel');
        profileLabel.innerHTML = "Visualizar perfil";
        profileLabel.href = "perfilEstudiante.html";
        profile.appendChild(profileLabel);
        menu.appendChild(profile);
    }
}

let menuStatus = false;
function togglMenu() {
    let menu = document.querySelector('#divMenuLateral');
    /*let content = document.querySelector('#content');*/
    if (!menuStatus) {
        menu.style.width = "18%";
        /* content.style.padding = "0 0 0 18%";*/
        menuStatus = true;
    } else {
        menu.style.width = "0px";
        /*content.style.padding = "0 0 0 0";*/
        menuStatus = false;
    }

}

let subMenuStatus = false;
function secundaryMenu(optionContainer) {
    let subMenu = document.querySelectorAll('#' + optionContainer + '.option2');
    if (!subMenuStatus) {
        for (let i = 0; i < subMenu.length; i++) {
            submenu[i].classList.remove('hide');
            subMenuStatus = true;
        }
    } else {
        for (let i = 0; i < subMenu.length; i++) {
            submenu[i].classList.add('hide');
            subMenuStatus = false;
        }
    }
}
