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
            return (getPhotographHeadInfo());
        } else if(currentPage === 'Fisheye') {
            // pour insertion dans la page d'accueil
            return (getPhotographCard());
        } else {
            throw new Error("Cette page n'accepte pas l'insertion de carte");
        }
    }

    //* carte photographe pour la page d'accueil
    function getPhotographCard() {
        const card = document.createElement('article');
        const linkCard = getPhotographPageLink();
        const wrapperCard = getPhotographWrapperCard();     
        card.appendChild(linkCard);
        card.appendChild(wrapperCard);
        return card;
    }

    //* lien vers la page du photographe
    function getPhotographPageLink() {
        const photographLink = document.createElement('a');
        photographLink.setAttribute('href', link);
        photographLink.setAttribute('role', 'link');
        photographLink.setAttribute('aria-label', 'Vers la page de');
        return photographLink;
    }

    //* corps de la carte photographe
    function getPhotographWrapperCard() {
        const wrapperCard = document.createElement('div');
        const imageCard = getPhotographImage();
        const infoCard = getPhotographInfo();
        wrapperCard.setAttribute('class', 'wrapper_card');
        wrapperCard.appendChild(imageCard);
        wrapperCard.appendChild(infoCard);
        return wrapperCard;
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
        // ajoute le nom et le coût aux infos d'en-tête
        const photographInfo = getPhotographHeadInfo();
        const photographName = getPhotographName();
        const photographCost = document.createElement('p');
        photographCost.textContent = pricePerDay;
        photographInfo.appendChild(photographCost);
        photographInfo.insertAdjacentElement('afterbegin', photographName);
        return photographInfo;
    }
    
    //* informations d'entête pour la page photographe
    function getPhotographHeadInfo() {
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