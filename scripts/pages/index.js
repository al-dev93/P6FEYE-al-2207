
    async function displayData(photographers) {
        const photographersSection = document.querySelector(".photographer_section");
        const pageName = document.querySelector('title').textContent;
        console.log(pageName);

        photographers.forEach((photographer) => {
            const photographerModel = photographerFactory(photographer, pageName);
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