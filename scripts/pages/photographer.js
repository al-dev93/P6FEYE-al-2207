


// nom de la page pour la photographerFactory
const pageName = document.querySelector('title').textContent;

// nom du photographe pour récupération dans le formulaire de contact
let nameOfPhotograph; 


// affiche l'ensemble des sections de la page photographe
async function displayPhotographWebPage(photographers, media, idPhotographer) {
    const costPerDay = displayDataPhotographer(photographers, idPhotographer);
    const numberOfLikes = displayMediaPhotographer(media, idPhotographer);
    displayLikesAndCost(numberOfLikes, costPerDay);
}

// affichage de l'entête de la page avec les informations sur le photographe
function displayDataPhotographer(photographers, id) {
    // datas du photographe correspondant à l'id
    const photographer = photographers.find(value => value.id == id);
    // cible les éléments pour insérer les datas du photographe
    const photographHeader = document.querySelector('.photograph_header');
    const article = photographHeader.getElementsByTagName('article').item(0);
    const h1 = article.getElementsByTagName('h1').item(0);
    const img = photographHeader.getElementsByTagName('img').item(0);
    // construit l'entête de la page avec la photographerFactory
    const photographerModel = photographerFactory(photographer, pageName);
    const paragraph = photographerModel.getUserCardDOM();
    // insertion du contenu dans la page
    nameOfPhotograph = photographerModel.name; //enregistre le nom du photographe
    h1.textContent = nameOfPhotograph;
    img.setAttribute('src', photographerModel.picture);
    article.insertAdjacentElement('beforeend', paragraph);

    return photographer.price; 
}

// affichage des médias du photographe sélectionné
function displayMediaPhotographer(medias, id) {
    let numberOfLikes = 0;
    // cible la section où insérer les cartes
    const mediaSection = document.querySelector('.media_section');
    // extrait les médias du photographe sélectionné dans un array
    const mediaPhotographer = medias.filter(value => value.photographerId == id);
    // construit les cartes média du photographe
    mediaPhotographer.forEach((media) => {
        const mediaModel = mediaFactory(media);
        const mediaCardDOM = mediaModel.getCardMediaDOM();
        mediaSection.appendChild(mediaCardDOM);
        numberOfLikes += media.likes;
    });

    return numberOfLikes;
}

// création du cadre nombre de likes et coût journalier
function displayLikesAndCost(likes, cost) {
    const numberOfLikes = document.querySelector(".number_likes");
    const costPerDay = document.querySelector(".cost_day");
    numberOfLikes.insertAdjacentText('afterbegin', likes);
    costPerDay.textContent = `${cost}€ / jour`;
}

// récupère l'id du photographe passé dans l'URL
function getIdPhotographer() {
    return (new URL(document.location)
        .searchParams
        .get('id'));
}

// initialisation
async function init() {
    // récupère les datas des photographes et les médias
    const [{ photographers }, { media }] = await getPhotographers();
    //récupère l'id du photographe passé dans l'URL
    const idPhotographer = getIdPhotographer();
    // affiche les datas et les médias du photographe
    displayPhotographWebPage(photographers, media, idPhotographer);
}

init();