

function displayMedia(currentIndex, slide = false, lastIndex = undefined) {
    const inLightbox = document.getElementsByClassName('lightbox_item');
    inLightbox
        .item(currentIndex)
        .classList
        .toggle('is-hidden');
    if(inLightbox.item(currentIndex).classList.contains('is-hidden')) {
        inLightbox.item(currentIndex).setAttribute('aria-hidden', 'true');
    } else {
        inLightbox.item(currentIndex).setAttribute('aria-hidden', 'false');
    }
    
    if(slide) {
        inLightbox
            .item(lastIndex)
            .classList
            .toggle('is-hidden');
        inLightbox.item(lastIndex).setAttribute('aria-hidden', 'true');
    }
}

// builder pour la lightbox
const modalLightbox = new ModalBuilder('lightbox_modal', 'lightbox_template') // ciblage du conteneur et du template
    .setIdLastFocus('.ctrl_left')
    .setCtrlKeyList({next:'.ctrl_right', prev:'.ctrl_left'})
    .setModalFunction(displayMedia)
    .buildModal(); // création de la lightbox