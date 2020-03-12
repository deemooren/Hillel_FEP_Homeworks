$(() => {
    const $gallery = $('#lightgallery').lightGallery(); 
    const photoTemplate = $('#photoTemplate').html();

    initial();

    function initial() {
        api.getPhotos()
            .then(renderPhotos);
    }

    function renderPhotos(data) {
        data.map(renderPhoto);
    }
    
    function renderPhoto(photo) {
        const photoHtml = photoTemplate.replace('{{id}}', photo.id)
                                        .replace('{{thumb}}', photo.thumbnailUrl)
                                        .replace('{{img}}', photo.url);

        $gallery.append(photoHtml);
    }
});