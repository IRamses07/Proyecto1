loadOptionsMenu();
document.querySelector("main").classList.add("mainCorrediso");
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
        let iconos = ['fa-project-diagram', 'fa-briefcase', 'fa-chalkboard-teacher', 'fa-user-graduate', 'fa-ticket-alt'];
        for (let i = 0; i < mainMenu.length; i++) {
            let optionsContainer = document.createElement('div');
            optionsContainer.id = mainMenu[i];
            let mainOption = document.createElement('div');
            mainOption.classList.add('option');
            let mainLabel = document.createElement('a');
            mainLabel.classList.add('menuLabel');
            mainLabel.innerHTML = mainMenu[i];
            mainLabel.href = "javascript:secundaryMenu(" + mainMenu[i].toString() + ")";
            let icono = document.createElement('i');
            icono.classList.add('iconosMenu');
            icono.classList.add('fas');
            icono.classList.add(iconos[i]);
            mainLabel.appendChild(icono);
            mainOption.appendChild(mainLabel);
            optionsContainer.appendChild(mainOption);
            menu.appendChild(optionsContainer);

            let menuTexto = [];
            let menuURL = [];

            if (mainMenu[i] == "Proyectos") {
                menuTexto = ["Agregar proyectos a profesores", "Registrar proyecto", "Listar proyectos", "Listar proyectos en desarrollo"];
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
                newDiv.classList.add('hide');
                let newA = document.createElement('a');
                newA.innerHTML = menuTexto[i];
                newA.href = menuURL[i];
                /*newA.style.display = "block";*/
                newA.style.width = "270px";
                newDiv.appendChild(newA);
                optionsContainer.appendChild(newDiv);

                if (menuURL[i] == "registroProfesores.html") {
                    newA.onclick = function () {
                        sessionStorage.removeItem('professorUpdateLS');
                    };
                }
                if (menuURL[i] == "registrarEstudiante.html") {
                    newA.onclick = function () {
                        sessionStorage.setItem('update', 0);
                    };
                }
            }


        }
        let history = document.createElement('div');
        history.classList.add('option');
        /*profile.classList.add('option2');*/
        history.classList.add('optionHover');
        let profileLabel = document.createElement('a');
        profileLabel.classList.add('menuLabel');
        profileLabel.innerHTML = "Mensajería";
        profileLabel.href = "historialChat.html";
        let icono2 = document.createElement('i');
        icono2.classList.add('iconosMenu');
        icono2.classList.add('fas');
        icono2.classList.add('fa-comments');
        profileLabel.appendChild(icono2);
        history.appendChild(profileLabel);
        menu.appendChild(history);
    }

    if (userRol == "cliente") {
        let mainMenu = ["Proyectos", "Tickets"];
        let iconos = ['fa-project-diagram', 'fa-ticket-alt'];
        for (let i = 0; i < mainMenu.length; i++) {
            let optionsContainer = document.createElement('div');
            optionsContainer.id = mainMenu[i];
            let mainOption = document.createElement('div');
            mainOption.classList.add('option');
            let mainLabel = document.createElement('a');
            mainLabel.classList.add('menuLabel');
            mainLabel.innerHTML = mainMenu[i];
            mainLabel.href = "javascript:secundaryMenu(" + mainMenu[i].toString() + ")";
            let icono = document.createElement('i');
            icono.classList.add('iconosMenu');
            icono.classList.add('fas');
            icono.classList.add(iconos[i]);
            mainLabel.appendChild(icono);
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
                newDiv.classList.add('hide');
                let newA = document.createElement('a');
                newA.innerHTML = menuTexto[i];
                newA.href = menuURL[i];
                newA.style.display = "block";
                newA.style.width = "270px";
                newDiv.appendChild(newA);
                optionsContainer.appendChild(newDiv);
                if (menuURL[i] == "registroProfesores.html") {
                    newA.onclick = function () {
                        sessionStorage.removeItem('professorUpdateLS');
                    };
                }
                if (menuURL[i] == "registrarEstudiante.html") {
                    newA.onclick = function () {
                        sessionStorage.setItem('update', 0);
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
        profileLabel.innerHTML = "Perfil";
        profileLabel.href = "perfilCliente.html";
        let icono2 = document.createElement('i');
        icono2.classList.add('iconosMenu');
        icono2.classList.add('fas');
        icono2.classList.add('fa-user');
        profileLabel.appendChild(icono2);
        profile.appendChild(profileLabel);
        menu.appendChild(profile);
    }

    if (userRol == "profesor") {
        let mainMenu = ["Proyectos", "Clientes", "Estudiantes", "Tickets"];
        let iconos = ['fa-project-diagram', 'fa-briefcase', 'fa-user-graduate', 'fa-ticket-alt'];
        for (let i = 0; i < mainMenu.length; i++) {
            let optionsContainer = document.createElement('div');
            optionsContainer.id = mainMenu[i];
            let mainOption = document.createElement('div');
            mainOption.classList.add('option');
            let mainLabel = document.createElement('a');
            mainLabel.classList.add('menuLabel');
            mainLabel.innerHTML = mainMenu[i];
            mainLabel.href = "javascript:secundaryMenu(" + mainMenu[i].toString() + ")";
            let icono = document.createElement('i');
            icono.classList.add('iconosMenu');
            icono.classList.add('fas');
            icono.classList.add(iconos[i]);
            mainLabel.appendChild(icono);
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
                newDiv.classList.add('hide');
                let newA = document.createElement('a');
                newA.innerHTML = menuTexto[i];
                newA.href = menuURL[i];
                newA.style.display = "block";
                newA.style.width = "270px";
                newDiv.appendChild(newA);
                optionsContainer.appendChild(newDiv);

                if (menuURL[i] == "registroProfesores.html") {
                    newA.onclick = function () {
                        sessionStorage.removeItem('professorUpdateLS');
                    };
                }
                if (menuURL[i] == "registrarEstudiante.html") {
                    newA.onclick = function () {
                        sessionStorage.setItem('update', 0);
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
        profileLabel.innerHTML = "Perfil";
        profileLabel.href = "perfilProfesor.html";
        let icono2 = document.createElement('i');
        icono2.classList.add('iconosMenu');
        icono2.classList.add('fas');
        icono2.classList.add('fa-user');
        profileLabel.appendChild(icono2);
        profile.appendChild(profileLabel);
        menu.appendChild(profile);
    }

    if (userRol == "estudiante") {
        let mainMenu = ["Proyectos", "Tickets"];
        let iconos = ['fa-project-diagram', 'fa-ticket-alt'];

        for (let i = 0; i < mainMenu.length; i++) {
            let optionsContainer = document.createElement('div');
            optionsContainer.id = mainMenu[i];
            let mainOption = document.createElement('div');
            mainOption.classList.add('option');
            let mainLabel = document.createElement('a');
            mainLabel.classList.add('menuLabel');
            mainLabel.innerHTML = mainMenu[i];
            mainLabel.href = "javascript:secundaryMenu(" + mainMenu[i].toString() + ")";
            let icono = document.createElement('i');
            icono.classList.add('iconosMenu');
            icono.classList.add('fas');
            icono.classList.add(iconos[i]);
            mainLabel.appendChild(icono);
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
                newDiv.classList.add('hide');
                let newA = document.createElement('a');
                newA.innerHTML = menuTexto[i];
                newA.href = menuURL[i];
                newA.style.display = "block";
                newA.style.width = "270px";
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
        profileLabel.innerHTML = "Perfil";
        profileLabel.href = "perfilEstudiante.html";
        let icono2 = document.createElement('i');
        icono2.classList.add('iconosMenu');
        icono2.classList.add('fas');
        icono2.classList.add('fa-user');
        profileLabel.appendChild(icono2);
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
        document.querySelector("#content").style.marginLeft = "18%";
        /* content.style.padding = "0 0 0 18%";*/
        menuStatus = true;
    } else {
        menu.style.width = "0px";
        document.querySelector("#content").style.marginLeft = "0%";
        /*content.style.padding = "0 0 0 0";*/
        menuStatus = false;
    }

}


let subMenuProyecto = false;
let subMenuCliente = false;
let subMenuProfesor = false;
let subMenuEstudiante = false;
let subMenuTicket = false;
function secundaryMenu(optionContainer) {

    if (optionContainer.id == "Proyectos") {
        if (!subMenuProyecto) {
            for (let i = 1; i < optionContainer.children.length; i++) {
                optionContainer.children[i].classList.remove('hide');
                subMenuProyecto = true;
            }
        } else {
            for (let i = 1; i < optionContainer.children.length; i++) {
                optionContainer.children[i].classList.add('hide');
                subMenuProyecto = false;
            }
        }
    }

    if (optionContainer.id == "Clientes") {
        if (!subMenuCliente) {
            for (let i = 1; i < optionContainer.children.length; i++) {
                optionContainer.children[i].classList.remove('hide');
                subMenuCliente = true;
            }
        } else {
            for (let i = 1; i < optionContainer.children.length; i++) {
                optionContainer.children[i].classList.add('hide');
                subMenuCliente = false;
            }
        }
    }

    if (optionContainer.id == "Profesores") {
        if (!subMenuProfesor) {
            for (let i = 1; i < optionContainer.children.length; i++) {
                optionContainer.children[i].classList.remove('hide');
                subMenuProfesor = true;
            }
        } else {
            for (let i = 1; i < optionContainer.children.length; i++) {
                optionContainer.children[i].classList.add('hide');
                subMenuProfesor = false;
            }
        }
    }

    if (optionContainer.id == "Estudiantes") {
        if (!subMenuEstudiante) {
            for (let i = 1; i < optionContainer.children.length; i++) {
                optionContainer.children[i].classList.remove('hide');
                subMenuEstudiante = true;
            }
        } else {
            for (let i = 1; i < optionContainer.children.length; i++) {
                optionContainer.children[i].classList.add('hide');
                subMenuEstudiante = false;
            }
        }
    }

    if (optionContainer.id == "Tickets") {
        if (!subMenuTicket) {
            for (let i = 1; i < optionContainer.children.length; i++) {
                optionContainer.children[i].classList.remove('hide');
                subMenuTicket = true;
            }
        } else {
            for (let i = 1; i < optionContainer.children.length; i++) {
                optionContainer.children[i].classList.add('hide');
                subMenuTicket = false;
            }
        }
    }
}
