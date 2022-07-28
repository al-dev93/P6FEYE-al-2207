

// builder pour la lightbox
const lightbox = new ModalBuilder('lightbox_modal', 'lightbox_template') // ciblage du conteneur et du template
    .setIdLastFocus('.ctrl_left')
    // .setIdModalTitle('modal_title')
    // .setModalFunction(formObject)
    .buildModal(); // création de la lightbox