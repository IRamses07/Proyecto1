
function getCurrentUserData(){
    let currentData = JSON.parse(sessionStorage.getItem('currentUser'));
    if (currentData == null){
        currentData = false;
        console.log("[getCurrentUserData] Ningun usuario ha iniciado sesión.");
    }
    return currentData;
}

function moveUser(type){
    
    let userLoggedIn = getCurrentUserData();

    if (type == "without"){
        if (userLoggedIn == false){
            window.location = "login.html";
        }else{
        }
    }

}
