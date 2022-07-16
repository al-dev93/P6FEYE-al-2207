//Mettre le code JavaScript lié à la page photographer.html

async function displayHeaderData(photographers, id) {
    // récupère le titre de la page pour le passer en paramètre à photographerFactory
    const pageName = document.querySelector('title').textContent;
    // extrait l'enregistrement correspondant à l'id du photographe
    const photographer = photographers.find(value => value.id == id);
    // cible l'élément de la page pour insérer le retour de la photographerFactory
    const photographHeader = document.querySelector('.photograph_header');
    const article = photographHeader.getElementsByTagName('article').item(0);
    //appelle photographerFactory en transmettant les données du photographe et le nom de la page
    const photographerModel = photographerFactory(photographer, pageName);
    //insère le retour de photographerFactory
    const h1 = article.getElementsByTagName('h1').item(0);
    h1.textContent = photographerModel.name;
    const paragraph = photographerModel.getHeaderPhotographDOM();
    article.insertAdjacentElement('beforeend', paragraph);
    const img = photographHeader.getElementsByTagName('img').item(0);
    img.setAttribute('src', photographerModel.picture);
}

async function displayMediaPhotographer(medias, id) {
    const mediaSection = document.querySelector('.media_section');
    const mediaPhotographer = medias.filter(value => value.photographerId == id);
    console.log(mediaPhotographer);
    mediaPhotographer.forEach((media) => {
        const mediaModel = mediaFactory(media);
        if (mediaModel != null){
            const mediaCardDOM = mediaModel.getImageCardDOM();
            mediaSection.appendChild(mediaCardDOM);
        }
    });
}

async function init() {
    // récupère l'id du photographe passé en pramètre dans l'url
    const idPhotographer = new URL(document.location)
        .searchParams
        .get('id');
    // Récupère les datas des photographes
    const [{ photographers }, { media }] = await getPhotographers();
    //
    displayHeaderData(photographers, idPhotographer);
    displayMediaPhotographer(media, idPhotographer);
}

init();