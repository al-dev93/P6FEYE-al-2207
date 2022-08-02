
// nom de la page pour la photographerFactory
const pageName = document.querySelector('title').textContent;
// identifiant du photographe passé en paramètre dans l'URL
const photographId = new URL(document.location)
                        .searchParams
                        .get('id');

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
function createPhotographPage(photograph, works, lightbox) {
    const photographCost = photograph.price;
    const photographName = photograph.name;

    displayHeader(photograph);
    displayGallery(works);
    displayLikesPanel(photographCost)
    // transmet le nom du photographe à la modale de contact
    modalContact.contentModalTitle = photographName;
    modalLightbox.modalListData = lightbox;
}

// extrait les données et média du photographe
function photographMain(photographers, media) {
    // données sur le photographe
    const photographData = photographers.find(value => value.id == photographId);
    // média du photographe
    const worksData = media.filter(value => value.photographerId == photographId);
    //
    const lightboxData = [];
    worksData.forEach(element => {
        const mediaObjet = {
            media : (element.hasOwnProperty('image'))? 'image' : 'video',
            tag : (element.hasOwnProperty('image'))? 'img' : 'video',
            src : (element.hasOwnProperty('image'))? element.image : element.video,
            title : element.title
        }
        lightboxData.push(mediaObjet);
    });

    // centralise l'affichage de la page
    createPhotographPage(photographData, worksData, lightboxData);

    console.log(photographData);
    console.log(worksData);
    console.log(lightboxData)
    // console.log(lightboxData.entries()[0])
}

// récupération des données
async function init() {
    const [{photographers},{media}] = await getPhotographers();
    photographMain(photographers, media);
}

init(); 
