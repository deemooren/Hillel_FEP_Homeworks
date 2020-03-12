$(() => {
    const $gallery = $('#lightgallery');
    const photoTemplate = $('#photoTemplate').html();
    
    initial();
    
    function initial() {
        api.getPhotos()
            .then(renderPhotos);
    }
    
    function renderPhotos(data) {
        data.map(renderPhoto);
        
        $gallery.lightGallery({
          pager: true
        });
    }
    
    function renderPhoto(photo) {
        const photoHtml = photoTemplate.replace('{{id}}', photo.id)
                                        .replace('{{thumb}}', photo.thumbnailUrl)
                                        .replace('{{img}}', photo.url);

        $gallery.append(photoHtml);
    }
});