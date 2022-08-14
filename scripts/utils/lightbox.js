

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
        const videoInLightbox = inLightbox.item(lastIndex).querySelector('video');
        if(videoInLightbox) {
            videoInLightbox.pause();
        }
    }
}

// builder pour la lightbox
// eslint-disable-next-line no-undef, no-unused-vars
const modalLightbox = new ModalBuilder('lightbox_modal', 'lightbox_template') // ciblage du conteneur et du template
    .setIdModalAriaLabeled('lightbox_title') // cible l'id pour libellé aria de la modal
    .setIdLastFocus('.ctrl_left') // ciblage du dernier élément de la modale recevant le focus
    .setCtrlKeyList({next:'.ctrl_right', prev:'.ctrl_left'}) // élément de control du défilement des média
    .setModalFunction(displayMedia) // transmission de l'objet de définition de la callback
    .buildModal(); // création de la lightbox