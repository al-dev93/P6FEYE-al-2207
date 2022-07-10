
    async function displayData(photographers) {
        const photographersSection = document.querySelector(".photographer_section");

        photographers.forEach((photographer) => {
            const photographerModel = photographerFactory(photographer, 'index');
            const userCardDOM = photographerModel.getUserCardDOM();
            photographersSection.appendChild(userCardDOM);
        });
    }

    async function init() {
        // Récupère les datas des photographes
        const [{ photographers }, { media }] = await getPhotographers();
        // affiche les cartes des photographes dans la page
        displayData(photographers);
    }
    
    init();