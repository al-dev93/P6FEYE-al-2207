// déclaration de la callback 
function ctrlKeyCallback(key, size, index) { 
    switch (key) {
        case 'ctrl_right' :
            if(index < size-1) {
                index++;
            } else if(index == size-1) {
                index = 0;
            }
            break;
        case 'ctrl_left' :
            if(index > 0 ) {
                index--;
            } else if(index == 0) {
                index = size-1;
            }
            break;

        default:
            break;
    }
    console.log(index)
    return index;
}

// object définissanr la callback submit
const ctrlSlideObject = {
    name : 'slide',     // élément ciblé pour l'évènement
    type : 'keydown&click', // type d'évènement
    callback : ctrlKeyCallback
}

// builder pour la lightbox
const modalLightbox = new ModalBuilder('lightbox_modal', 'lightbox_template') // ciblage du conteneur et du template
    .setIdLastFocus('.ctrl_left')
    // .setIdModalTitle(['.media_title',false])
    .setCtrlKeyList({next:'.ctrl_right', prev:'.ctrl_left'})
    .setModalFunction(ctrlSlideObject)
    .buildModal(); // création de la lightbox