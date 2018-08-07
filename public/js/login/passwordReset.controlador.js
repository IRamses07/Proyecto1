document.querySelector('#btnReset').addEventListener('click',function(){passwordReset()});

function passwordReset(){
    resetPassword(document.querySelector('#txtEmail').value);
}