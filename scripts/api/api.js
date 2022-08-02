
async function getPhotographers() {
    // répertoire du fichier json
    const url = '/data/photographers.json';
    
    return fetch(url)
        .then(response => {
            if(response.ok) {
                return response.json()
            }
        })
        .then(response => {
            return ([
                {photographers: [...response.photographers]},
                {media: [...response.media]}
            ])
        })
        .catch(err => console.log("une erreur s'est produite", err));
}