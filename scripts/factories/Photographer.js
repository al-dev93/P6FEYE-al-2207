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
        const photographCard = document.createElement('article');       
        // lien vers la page photographe
        const photographLink = document.createElement('a');
        photographLink.setAttribute('href', link);
        photographLink.setAttribute('role', 'link');
        // photographLink.setAttribute('aria-label', 'page photographe');
        // corps de la carte
        const wrapperCard = document.createElement('div');
        wrapperCard.setAttribute('class', 'wrapper_card');
        // éléments présents sur la carte
        const imageCard = getPhotographImage();
        const infoCard = getPhotographInfo();
        // intégration de la carte
        wrapperCard.appendChild(imageCard);
        wrapperCard.appendChild(infoCard);
        photographCard.appendChild(photographLink);
        photographCard.appendChild(wrapperCard);
        return photographCard;
    }

    //* nom du photographe - titre de la carte
    function getPhotographName() {
        const photographName = document.createElement('h2');
        photographName.textContent = name;
        return photographName;
    }

    //* image choisie par le photographe pour la page d'accueil
    function getPhotographImage() {
        const choiceImage = choicePhotoForHome
            .find(value => value.id == id)
            .picture;
        const photographImage = document.createElement('img');
        photographImage.setAttribute('src', `/assets/media/image/${choiceImage}`);
        photographImage.setAttribute('role', 'img');
        photographImage.setAttribute('alt', "");
        return photographImage;
    }

    //* informations textuelles de la carte
    function getPhotographInfo() {
        // reprend les informations d'entête
        const photographInfo = getHeadPhotographInfo();
        const photographName = getPhotographName();
        const photographCost = document.createElement('p');
        photographCost.textContent = pricePerDay;
        photographInfo.appendChild(photographCost);
        photographInfo.insertAdjacentElement('afterbegin', photographName);
        return photographInfo;
    }
    
    //* informations d'entête pour la page photographe
    function getHeadPhotographInfo() {
        const photographInfo = document.createElement('div');
        const photographAddress = document.createElement('p');
        const photographSlogan = document.createElement('p');
        photographInfo.setAttribute('class', 'info_photograph')
        photographAddress.textContent = shortAddress;
        photographSlogan.textContent = tagline;
        photographInfo.appendChild(photographAddress);
        photographInfo.appendChild(photographSlogan);
        return photographInfo;
    }

    return {name, picture, getUserCardDOM};
}