let imagenUrl = '';
$(function() {
    // Configure Cloudinary
    // with credentials available on
    // your Cloudinary account dashboard
    $.cloudinary.config({ cloud_name: 'koffeedev', api_key: '697584759616556'});

    // Upload button
    // let uploadButton = $('#btnSeleccionarImagen');
    let uploadButton = $('#changeImg');

    // Upload button event
    uploadButton.on('click', function(e){
        // Initiate upload
        cloudinary.openUploadWidget({ cloud_name: 'koffeedev', upload_preset: 'proyecto', tags: ['cgal']},
        function(error, result) {
            if(error) console.log(error);
            // If NO error, log image data to console
            let id = result[0].public_id;
            console.log(id);
            imagenUrl = 'https://res.cloudinary.com/koffeedev/image/upload/' + id;
            console.log(imagenUrl);
            document.querySelector('#perfiImagen').src = imagenUrl;
            cambiarFoto(imagenUrl);
            return imagenUrl;
        });
    });
})

function processImage(id) {
    let options = {
        client_hints: true,
    };
    return  $.cloudinary.url(id, options);
}
