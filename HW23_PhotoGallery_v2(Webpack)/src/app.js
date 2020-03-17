import $ from 'jquery';
import api from './api';

import 'lightgallery';
import '../node_modules/lightgallery/modules/lg-fullscreen.min.js';
import '../node_modules/lightgallery/modules/lg-thumbnail.min.js';

import './all.css';

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