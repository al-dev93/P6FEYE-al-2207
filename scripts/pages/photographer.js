//Mettre le code JavaScript lié à la page photographer.html

/*
const parameter = (new URL(document.location)).searchParams;
const idPhotographer = params.get('id');

const query = (photographers.find(ele => ele.id == 930))
*/

function getPhotographer(photographers) {
    const idPhotogrpher = new URL(document.location)
        .searchParams
        .get('id');
    return (photographers.find(value => value.id == idPhotogrpher));
}

async function init() {
    // Récupère les datas des photographes
    const [{ photographers }, { media }] = await getPhotographers();
    const photographer = getPhotographer(photographers);
    console.log(photographer);
}

init();