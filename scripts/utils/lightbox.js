

function displayMedia(mode, currentIndex, lastIndex, parent = document.querySelector('.lightbox_body')) {
    if(mode === 'slide') {
        parent
            .getElementsByClassName('lightbox_item')
            .item(lastIndex)
            .classList
            .toggle('is-hidden');
        parent
            .getElementsByClassName('lightbox_item')
            .item(currentIndex)
            .classList
            .toggle('is-hidden');
    }
    if(mode === 'on') {
        parent
            .getElementsByClassName('lightbox_item')
            .item(currentIndex)
            .classList
            .remove('is-hidden');
    }
    if(mode === 'off') {
        parent
            .getElementsByClassName('lightbox_item')
            .item(currentIndex)
            .classList
            .add('is-hidden');
    }
}



// // object définissanr la callback submit
// const ctrlSlideObject = {
//     name : 'slide',     // élément ciblé pour l'évènement
//     type : 'keydown&click', // type d'évènement
//     callback : displayMedia
// }

// builder pour la lightbox
const modalLightbox = new ModalBuilder('lightbox_modal', 'lightbox_template') // ciblage du conteneur et du template
    .setIdLastFocus('.ctrl_left')
    // .setIdModalTitle(['.media_title',false])
    .setCtrlKeyList({next:'.ctrl_right', prev:'.ctrl_left'})
    .setModalFunction(displayMedia)
    .buildModal(); // création de la lightbox