
// soumission du formulaire 
function submitContact(event) {
    event.preventDefault();
    console.log('Prénom...:', event.target.surname.value);
    console.log('Nom......:', event.target.name.value);
    console.log('Email....:', event.target.mail.value);
    console.log('Message..:', event.target.message.value);
    event.target.reset();
}

// builder pour la modale contactez-moi
// eslint-disable-next-line no-unused-vars 
/* global ModalBuilder */
// eslint-disable-next-line no-unused-vars
const modalContact = new ModalBuilder('contact_modal', 'contact_template') // ciblage du conteneur et du template
    .setIdModalAriaLabeled('modal_title') // cible l'id pour libellé aria de la modal
    .setIdLastFocus('button[class="contact_button"]') // ciblage du dernier élément de la modale recevant le focus
    .setModalFunction(submitContact) // transmission de l'objet de définition de la callback
    .buildModal(); // création de la modale de contact
