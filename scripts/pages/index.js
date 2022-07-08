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
            const linkPhotographer = `/photographer.html?id=${photographer.id}`;
            //lien vers la page du photographe
            userCardDOM.addEventListener("click", () =>{
                window.location.href = linkPhotographer;
            });
            userCardDOM.addEventListener("keydown", (e) =>{
                if(e.key === "Enter") {
                    window.location.href = linkPhotographer;
                }
            })
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