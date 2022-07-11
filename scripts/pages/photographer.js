//Mettre le code JavaScript lié à la page photographer.html

function displayHeaderData(photographers, id) {
    const pageName = document.querySelector('title').textContent;
    console.log(pageName);
    const photographer = photographers.find(value => value.id == id);
    const photographHeader = document.querySelector('.photograph-header');
    const article = photographHeader.getElementsByTagName('article').item(0);
    const photographerModel = photographerFactory(photographer, pageName);
    const h1 = article.getElementsByTagName('h1').item(0);
    h1.textContent = photographerModel.name;
    const paragraph = photographerModel.getHeaderPhotographDOM();
    article.insertAdjacentElement('beforeend', paragraph);
    const img = photographHeader.getElementsByTagName('img').item(0);
    img.setAttribute('src', photographerModel.picture);
}

function displayMediaPhotographer(media, id) {
    const mediaPhotographer = media.filter(value => value.photographerId == id);
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