// nom de la page pour la photographerFactory
const pageName = document.querySelector('title').textContent;


// affiche les cartes des photographes
async function displayData(photographers) {
    const photographersSection = document.querySelector(".photographer_section");
    // construit les cartes photographes
    photographers.forEach((photographer) => {
        const photographerModel = photographerFactory(photographer, pageName);
        const userCardDOM = photographerModel.getUserCardDOM();
        photographersSection.appendChild(userCardDOM);
    });
}

// initialisation
async function init() {
    // Récupère les datas des photographes
    const [{ photographers }] = await getPhotographers();
    // affiche les cartes des photographes dans la page
    displayData(photographers);
}
    
    init();