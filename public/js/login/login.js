
function getCurrentUserData(){
    let currentData = JSON.parse(sessionStorage.getItem('currentUser'));
    if (currentData == null){
        currentData = false;
        console.log("Ningun usuario ha iniciado sesión.");
    }
    return currentData;
}

function moveUser(type){
    
    let userLoggedIn = getCurrentUserData();

    if (type){
        if (!userLoggedIn){
            window.location = "login.html";
        }else{
        }
    }
}

function logOut(){
    let usuarioData = getCurrentUserData();
    let logSucessfull = false;
    if(usuarioData){
        logSucessfull = true;
        sessionStorage.removeItem('currentUser');
    }
    window.location = 'login.html';
}