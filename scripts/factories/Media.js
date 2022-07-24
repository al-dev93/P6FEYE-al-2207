function mediaFactory(data) {
    const {id, title, likes, price} = data;
    
    //* méthode de création de la carte média
    function getCardMediaDOM() {
        // conteneur de la carte
        const wrapperCard = document.createElement('div');
        wrapperCard.setAttribute('class', 'wrapper_mediacard');
        // éléments présents sur la carte
        let mediaPicture;
        const informations = getMediaInfo();
        if(data.hasOwnProperty('image')) {
            mediaPicture = getMediaPicture(data.image, 'image', 'img');
        } else if(data.hasOwnProperty('video')) {
            mediaPicture = getMediaPicture(data.video, 'video', 'video')
        } else {
            throw new Error("il n'y a pas de format de média affichable");
        }
        //intègre la carte média
        wrapperCard.appendChild(mediaPicture);
        wrapperCard.appendChild(informations);
        return wrapperCard;
    }

    //* intègre les informations
    function getMediaInfo() {
        // conteneur des informations
        const wrapperInfoCard = document.createElement('div');
        wrapperInfoCard.setAttribute('class', 'wrapper_mediainfo');
        // éléments présents dans les informations
        const titleCard = document.createElement('p');
        const mediaLikes = getMediaLikes();
        titleCard.textContent = title;
        // intégration des informations
        wrapperInfoCard.appendChild(titleCard);
        wrapperInfoCard.appendChild(mediaLikes);
        return wrapperInfoCard;
    }

    //* nombre de likes et îcone coeur
    function getMediaLikes() {
        const mediaLikes = document.createElement('span');
        const heartIcon = document.createElement('img');
        mediaLikes.textContent = `${likes}`;
        heartIcon.setAttribute('src', `assets/icons/favorite-24px-red.svg`);
        heartIcon.setAttribute('alt', "Likes");
        mediaLikes.insertAdjacentElement('beforeend', heartIcon)
        return mediaLikes;
    }

    //* récupère l'image et créé la balise
    function getMediaPicture(picture, media, tag) {
        const clickCardImage = document.createElement('button')
        const cardImage = document.createElement(tag);
        clickCardImage.setAttribute('role', 'link');
        clickCardImage.setAttribute('aria-label', 'Ouverture de la lightbox');
        cardImage.setAttribute('src', `assets/media/${media}/${picture}`);
        cardImage.setAttribute('alt', "");
        cardImage.setAttribute('tabindex', "-1");
        clickCardImage.appendChild(cardImage);
        return(clickCardImage);
    }

    return {getCardMediaDOM};
}