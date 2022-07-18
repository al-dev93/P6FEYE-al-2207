
let nameOfPhotograph;

async function displayHeaderData(photographers, id) {
    // nom de la page pour fournir à photographerFactory
    const pageName = document.querySelector('title').textContent;
    // enregistrement correspondant à l'id du photographe
    const photographer = photographers.find(value => value.id == id);
    // cible les éléments pour insérer le retour de la photographerFactory
    const photographHeader = document.querySelector('.photograph_header');
    const article = photographHeader.getElementsByTagName('article').item(0);
    const h1 = article.getElementsByTagName('h1').item(0);
    const img = photographHeader.getElementsByTagName('img').item(0);
    // photographerFactory pour construire l'entête de la page
    const photographerModel = photographerFactory(photographer, pageName);
    nameOfPhotograph = photographerModel.name;
    const paragraph = photographerModel.getUserCardDOM();
    // insertion du contenu
    h1.textContent = photographerModel.name;
    img.setAttribute('src', photographerModel.picture);
    article.insertAdjacentElement('beforeend', paragraph);
    console.log(photographer.price);
    return photographer.price;
}

async function displayMediaPhotographer(medias, id, costPerDay) {
    let numberOfLikes = 0;
    // cible la section où insérer les cartes
    const mediaSection = document.querySelector('.media_section');
    // extrait les médias du photographe sélectionné
    const mediaPhotographer = medias.filter(value => value.photographerId == id);
    // construit les cartes médias
    mediaPhotographer.forEach((media) => {
        const mediaModel = mediaFactory(media);
        const mediaCardDOM = mediaModel.getCardMediaDOM();
        mediaSection.appendChild(mediaCardDOM);
        numberOfLikes += media.likes;
    });
    // création du cadre nombre de likes et coût journalier
    const numberLikes = document.querySelector(".number_likes");
    const costDay = document.querySelector(".cost_day");
    numberLikes.insertAdjacentText('afterbegin', numberOfLikes);
    costDay.textContent = `${costPerDay}€ / jour`;
}

async function init() {
    // récupère l'id du photographe passé en pramètre dans l'url
    const idPhotographer = new URL(document.location)
        .searchParams
        .get('id');
    // Récupère les datas des photographes
    const [{ photographers }, { media }] = await getPhotographers();
    // affiche l'entête et le cartes médias
    const costPerDay = await displayHeaderData(photographers, idPhotographer);
    displayMediaPhotographer(media, idPhotographer, costPerDay);
}

init();