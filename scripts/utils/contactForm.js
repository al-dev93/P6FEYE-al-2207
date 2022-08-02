


// callback de soumission du formulaire 
function submitCallback(event) {
    event.preventDefault();
    console.log('Prénom...:', event.target.surname.value);
    console.log('Nom......:', event.target.name.value);
    console.log('Email....:', event.target.mail.value);
    console.log('Message..:', event.target.message.value);
    event.target.reset();
}

// object définissant la callback submit
const formSubmit = {
    name : 'contact',     // élément ciblé pour l'évènement
    type : 'submit', // type d'évènement
    callback : submitCallback
}

// builder pour la modale contactez-moi
const modalContact = new ModalBuilder('contact_modal', 'contact_template') // ciblage du conteneur et du template
    .setIdLastFocus('button[class="contact_button"]') // ciblage du dernier élément de la modale recevant le focus
    .setIdModalTitle('modal_title') // ciblage du titre de la modale
    .setModalFunction(formSubmit) // transmission de l'objet de définition de la callback
    .buildModal(); // création de la modale de contact
