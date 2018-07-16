let imgUrl = '';

$(function() {

    $.cloudinary.config({cloud_name: 'koffeedev', api_key: '697584759616556' });

        // Upload button
        let uploadButton = $('#file-upload');

        // Upload button event
        uploadButton.on('click', function(e){
            // Initiate upload
            cloudinary.openUploadWidget({ cloud_name: 'koffeedev', upload_preset: 'proyecto', tags: ['cgal']},
            function(error, result) {
                if(error) console.log(error);
                // If NO error, log image data to console
                let id = result[0].public_id;
                 console.log(id);
                 imgUrl = 'https://res.cloudinary.com/koffeedev/image/upload/' + id;
                 imgUrl = processImage(id);
                console.log(imgUrl);
                document.querySelector('#imgErr').src = imgUrl;
                // uploadButton.value = imgUrl;

                
                 return imgUrl;
            });
        });

})

function processImage(id) {
    let options = {
        client_hints: true,
    };
    return  $.cloudinary.url(id, options);
}
