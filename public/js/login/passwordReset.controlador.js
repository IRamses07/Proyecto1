document.querySelector('#btnReset').addEventListener('click', passwordReset);

function passwordReset() {

    let usersList = getUsers();
    let encontrado = false;
    let UserId = '';
    let userRole = '';
    for (let i = 0; i < usersList.length && !encontrado; i++) {
        for (let j = 0; j< usersList[i].length && !encontrado; j++) {
            if (usersList[i][j]['correo'] == document.querySelector('#txtRecuperar').value
        || usersList[i][j]['correo_electronico'] == document.querySelector('#txtRecuperar').value) {
                UserId = usersList[i][j]['_id'];
                userRole = usersList[i][j]['rol']
                encontrado = true;
                console.log(usersList[i][j]);
            }
        }
    }
    if (encontrado) {
        swal({
            title: "Exito",
            text: "El ususario fue encontrado.",
            icon: "success",
            button: "Ok",
        });
    } else {
        swal({
            title: "Advertencia",
            text: "El ususario no fue encontrado.",
            icon: "warning",
            button: "Ok",
        });
    }

    if(userRole == "administrador"){
        resetAdminPassword(UserId);
    }else if(userRole == 'cliente'){
        resetClientPassword(UserId);
    }else if(userRole == 'profesor'){
        resetProfessorPassword(UserId);
        /*getProfessorById(UserId)*/
    }else if(userRole == 'estudiante'){
        resetStudentPassword(UserId);
    }
}