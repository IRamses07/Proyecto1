let imagenUrl = '';
$(function() {
    // Configure Cloudinary
    // with credentials available on
    // your Cloudinary account dashboard
    $.cloudinary.config({ cloud_name: 'dtz8agoc3', api_key: '254193184853628'});

    // Upload button
    let uploadButton = $('#btnSeleccionarImagen');

    // Upload button event
    uploadButton.on('click', function(e){
        // Initiate upload
        cloudinary.openUploadWidget({ cloud_name: 'dtz8agoc3', upload_preset: 'proyecto12', tags: ['cgal']},
        function(error, result) {
            if(error) console.log(error);
            // If NO error, log image data to console
            let id = result[0].public_id;
            console.log(id);
            imagenUrl = 'https://res.cloudinary.com/dtz8agoc3/image/upload/' + id;
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