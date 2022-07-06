    async function getPhotographers() {
        // répertoire du fichier json
        const url = '/data/photographers.json'
        
        return fetch(url)
            .then(response => {
                if(response.ok) {
                    return response.json();
                }
            })
            .then(response => {
                return ([
                    { photographers: [...response.photographers]},
                    { media: [...response.media]}
                ]);
            })
            .catch(err => console.log("une erreur s'est produite", err));
    }

    async function displayData(photographers) {
        const photographersSection = document.querySelector(".photographer_section");

        photographers.forEach((photographer) => {
            const photographerModel = photographerFactory(photographer);
            const userCardDOM = photographerModel.getUserCardDOM();
            photographersSection.appendChild(userCardDOM);
        });
    }

    async function init() {
        // Récupère les datas des photographes
        const [{ photographers }, { media }] = await getPhotographers();
        //console.log(photographers)

        displayData(photographers);
    }
    
    init();
    