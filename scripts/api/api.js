// récupère le données et les retourne
// eslint-disable-next-line no-unused-vars
async function getPhotographers() {
    // répertoire du fichier json
    // const url = 'http://127.0.0.1/private/P6FEYE-al-2207/data/photographers.json';
    const url = 'data/photographers.json';

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