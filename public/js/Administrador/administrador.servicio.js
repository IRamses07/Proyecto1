function resetAdminPassword(_id) {
    let respuesta = 'respuesta';
    let peticion = $.ajax({
        url: 'http://localhost:4000/api/reset_admin_password',
        type: 'post',
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        dataType: 'json',
        async: false,
        data: {
            _id: _id
        }
    });
    peticion.done(function (response) {
        respuesta = response;
    });
    peticion.fail(function (response) { });
    return respuesta;
}