
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
        item.setAttribute('aria-hidden', 'true');
        item.setAttribute('aria-label', `${Number(element)+1}`+` sur ${works.length}`);
        media.setAttribute('class', 'lightbox_media');
        title.setAttribute('class', 'media_title');

        if(works[element].image) {
            contentMedia = document.createElement('img');
            contentMedia.setAttribute('src', `assets/media/image/${works[element].image}`);
            contentMedia.setAttribute('alt', "");
        } else if(works[element].video) {
            contentMedia = document.createElement('video');
            contentMedia.setAttribute('src', `assets/media/video/${works[element].video}`);
            contentMedia.setAttribute('controls', "")
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
    let index = 0;
    works.forEach((media) => {
        const worksFactory = mediaFactory(media, index);
        const mediaCardDOM = worksFactory.getCardMediaDOM();
        worksGallery.appendChild(mediaCardDOM);
        index++;
    });
}

// affiche le panneau contenant le nombre de likes et le coût journalier du photographe
function displayCostAndLikesPanel(photographCost) {
    document
        .querySelector(".cost_day")
        .textContent = `${photographCost}€ / jour`;
    displayLikesSum();
}

// affiche et met à jour la somme des likes dans le panneau
function displayLikesSum() {
    const likesSum = document.getElementById("likes_sum");

    likesSum.textContent = getSum();

    likesSum.addEventListener('liked', () => {
        likesSum.textContent = getSum();
    });
}

// distribue l'affichage l'affichage de la page
function createPhotographPage(photograph, works) {
    displayHeader(photograph);
    displayGallery(works);
    displayCostAndLikesPanel(photograph.price);
}

// créé les structures de données média, photographe, lightbox et initialise les objets modale
function photographMain(photographers, media, sort) {
    // stockage des média du photographe
    const worksData = media.filter(value => value.photographerId == photographId);
    // stockage des données sur le photographe
    const photographData = photographers.find(value => value.id == photographId);
    
    if(!sort) {
        // nom du photographe à afficher dans le formulaire de contact
        modalContact.contentModalTitle = photographData.name;
        // cible l'élément pour afficher la lightbox
        modalLightbox.idInsertListData = '.lightbox_body';
        // pour création de la page du photographe
        createPhotographPage(photographData, worksData);
    } else {
        // efface la gallerie du photographe
        document
            .querySelector('.media_section')
            .innerHTML = "";
        // mise à jour de worksData si modification de likes
        if(arrayLikesUpdate) {
            updateWorkDataLikes(worksData);
        }
        // tri de la gallerie
        sortMedia(worksData, sort);
        // pour affichage de la galerie triée
        displayGallery(worksData);
    }
    // transmission du contenu de la lightbox à l'objet modalLightbox
    modalLightbox.modalListData = createLightbox(worksData);
}

// récupération des données
async function init(sort = undefined) {
    const [{photographers},{media}] = await getPhotographers();
    // fonction de création des structures de données
    photographMain(photographers, media, sort);
}

init(); 




