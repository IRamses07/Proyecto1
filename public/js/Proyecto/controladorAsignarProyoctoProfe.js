function listarSelectClientes() {
    let slNombredelCliente = listarClientes();
    let select = document.querySelector('#slNombredelCliente');
    select.options[0] = new Option("Seleccione un cliente...", "");

    for (let i = 0; i < slNombredelCliente.length; i++) {
        select.options[i] = new Option(slNombredelCliente[i]['nombre'], slNombredelCliente[i]['nombre']);

    }
}