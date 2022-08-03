
// nom de la page pour la photographerFactory
const pageName = document.querySelector('title').textContent;
// identifiant du photographe passé en paramètre dans l'URL
const photographId = new URL(document.location)
                        .searchParams
                        .get('id');

// créé le contenu de la lightbox
function createLightbox(works) {
    const lightbox = [];
    for(element in works) {
        // eléments de la lightbox
        const item = document.createElement('li');
        const media = document.createElement('div');
        const title = document.createElement('p');
        let contentMedia;

        item.classList.add('lightbox_item', 'is-hidden');
        item.setAttribute('data-item', `${element}`);
        item.setAttribute('data-id', `${works[element].id}`)
        item.setAttribute('aria-hidden', 'false');
        media.setAttribute('class', 'lightbox_media');
        title.setAttribute('class', 'media_title');

        if(works[element].image) {
            contentMedia = document.createElement('img');
            contentMedia.setAttribute('src', `assets/media/image/${works[element].image}`);
        } else if(works[element].video) {
            contentMedia = document.createElement('video');
            contentMedia.setAttribute('src', `assets/media/video/${works[element].video}`);
        }

        media.appendChild(contentMedia);
        title.textContent = works[element].title;
        item.appendChild(media);
        item.appendChild(title);
        lightbox.push(item);
    }
    return lightbox;
}

// affiche l'entête de la page contenant les informations sur le photographe
function displayHeader(photograph) {
    const header = document.querySelector('.photograph_header');
    const identity = header.getElementsByTagName('article').item(0);
    const name = identity.getElementsByTagName('h1').item(0);
    const photo = header.getElementsByTagName('img').item(0);
    // initialise la photographerFactory
    const photographFactory = photographerFactory(photograph, pageName);
    // getUserCardDom de la factory adaptée pour la page photographe
    const photographInfo = photographFactory.getUserCardDOM();
    // mise à jour avec les données du photographe
    name.textContent = photographFactory.name;
    photo.setAttribute('src', photographFactory.picture);
    identity.insertAdjacentElement('beforeend', photographInfo);
}

// afiche la gallerie des réalisations du photographe
function displayGallery(works) {
    const worksGallery = document.querySelector('.media_section');
    works.forEach((media) => {
        const worksFactory = mediaFactory(media);
        const mediaCardDOM = worksFactory.getCardMediaDOM();
        worksGallery.appendChild(mediaCardDOM);
    });
}

// affiche le panneau contenant le nombre de likes et le coût journalier du photographe
function displayLikesPanel(photographCost) {
    document
        .querySelector(".cost_day")
        .textContent = `${photographCost}€ / jour`;
    displayLikesSum();
}

// calcule la somme des likes et l'affiche dans le panneau
function displayLikesSum() {
    const likesList = document.getElementsByClassName('likes');
    let count = 0;
    
    for (const card of likesList) {
        // count totalise le nombre de likes
        count += Number(card.textContent);
    }
    document
        .querySelector(".likes_number")
        .insertAdjacentText('afterbegin', count);
}

// distribue l'affichage l'affichage de la page
function createPhotographPage(photograph, works) {
    const photographCost = photograph.price;

    displayHeader(photograph);
    displayGallery(works);
    displayLikesPanel(photographCost)
}

// extrait les données et média du photographe
function photographMain(photographers, media) {
    // stockage des données sur le photographe
    const photographData = photographers.find(value => value.id == photographId);
    // stockage des média du photographe
    const worksData = media.filter(value => value.photographerId == photographId);
    // stockage des média pour la lightbox
    const lightboxData = createLightbox(worksData);

    // centralise l'affichage de la page
    createPhotographPage(photographData, worksData);

    modalContact.contentModalTitle = photographData.name;
    modalLightbox.modalListData = lightboxData;
    modalLightbox.idInsertListData = '.lightbox_body';
}

// récupération des données
async function init() {
    const [{photographers},{media}] = await getPhotographers();
    photographMain(photographers, media);
}

init(); 
