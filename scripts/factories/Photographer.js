function photographerFactory(data, page) {
    const {id, name, portrait, city, country, tagline, price} = data;
    const picture = `assets/photographers/${portrait}`;
    const shortAddress = `${city}, ${country}`;
    const pricePerDay = `${price}€/jour`;
    const link = `/photographer.html?id=${id}`;
    const currentPage = page;

    //* méthode de présentation des informations sur les photographes
    function getUserCardDOM() {
        if(currentPage === 'Fisheye - photographe') {
            // pour insertion dans la page photographe
            return (getHeadPhotographInfo());
        } else if(currentPage === 'Fisheye') {
            // pour insertion dans la page d'accueil
            return (getPhotographCard());
        } else {
            throw new Error("Cette page n'accepte pas l'insertion de carte");
        }
    }

    //* carte photographe pour la page d'accueil
    function getPhotographCard() {
        // conteneur et lien de la carte
        const wrapperCard = document.createElement('a');
        wrapperCard.setAttribute('href', link);
        wrapperCard.setAttribute('role', 'link');
        wrapperCard.setAttribute('aria-hidden', 'true');
        // corps de la carte
        const article = document.createElement('article');
        article.setAttribute('role', 'article');
        article.setAttribute('aria-hidden', 'false');
        article.setAttribute('aria-label', 'Cliquez pour voir les réalisations de');
        // éléments présents sur la carte
        const title = getNameOfPhotograph();
        const img = getPhotographImage();
        const informations = getPhotographInfo(); 
        // intégration de la carte
        article.appendChild(img);
        article.appendChild(title);
        article.appendChild(informations);
        wrapperCard.appendChild(article);
        return wrapperCard;
    }

    //* nom du photographe - titre de la carte
    function getNameOfPhotograph() {
        const h2 = document.createElement('h2');
        h2.textContent = name;
        return h2;
    }

    //* image choisie par le photographe pour la page d'accueil
    function getPhotographImage() {
        const choiceImage = 
            choicePhotoForHome
            .find(value => value.id == id)
            .picture;
        const img = document.createElement('img');
        img.setAttribute('src', `/assets/media/image/${choiceImage}`);
        img.setAttribute('role', img);
        img.setAttribute('alt', "");
        return img;
    }

    //* informations textuelles de la carte
    function getPhotographInfo() {
        // reprend les informations d'entête
        const paragraph = getHeadPhotographInfo();
        const cost = document.createElement('span');
        cost.textContent = pricePerDay;
        paragraph.appendChild(cost);
        return paragraph;
    }
    
    //* informations d'entête pour la page photographe
    function getHeadPhotographInfo() {
        const paragraph = document.createElement('p');
        const address = document.createElement('address');
        const slogan = document.createElement('span');
        address.textContent = shortAddress;
        slogan.textContent = tagline;
        paragraph.appendChild(address);
        paragraph.appendChild(slogan);
        return paragraph;
    }

    return {name, picture, getUserCardDOM};
}