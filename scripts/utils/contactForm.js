
// object définissanr la callback submit
const formObject = {
    id : 'form',     // élément ciblé pour l'évènement
    type : 'submit', // type d'évènement
};
// déclaration de la callback 
function callback(event) {
    event.preventDefault();
    console.log('Prénom...:', event.target.surname.value);
    console.log('Nom......:', event.target.name.value);
    console.log('Email....:', event.target.mail.value);
    console.log('Message..:', event.target.message.value);
    event.target.reset();
}
// ajout de la callback comme méthode de formObject
formObject.callback = callback;

// builder pour la modale contactez-moi
const modalContact = new ModalBuilder('contact_modal', 'contact_template') // ciblage du conteneur et du template
    .setIdLastFocus('button[class="contact_button"]') // ciblage du dernier élément de la modale recevant le focus
    .setIdModalTitle('modal_title') // ciblage du titre de la modale
    .setModalFunction(formObject) // transmission de l'objet de définition de la callback
    .buildModal(); // création de la modale de contact
    