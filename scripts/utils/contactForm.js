

const formObject = {
    id : 'form', 
    type : 'submit',
};

function callback(event) {
    event.preventDefault();
    console.log('Prénom...:', event.target.surname.value);
    console.log('Nom......:', event.target.name.value);
    console.log('Email....:', event.target.mail.value);
    console.log('Message..:', event.target.message.value);
    event.target.reset();
}

formObject.callback = callback;

// gestion de la modale avec builder
const modalContact = new ModalBuilder('modal_contact', 'template_contact')
    .setIdFocusOut('button[class="contact_button"]')
    .setIdLastFocus('button[class="contact_button"]')
    .setIdModalTitle('modal_title')
    .setModalFunction(formObject)
    .buildModal();