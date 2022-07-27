function mediaFactory(data) {
    const {id, title, likes, price} = data;
    
    //* méthode de création de la carte média
    function getCardMediaDOM() {
        const card = document.createElement('div');
        // éléments présents sur la carte
        const informations = getMediaInfo();
        let mediaPicture;

        if(data.hasOwnProperty('image')) {
            mediaPicture = getMediaLinkedPicture(data.image, 'image', 'img');
        } else if(data.hasOwnProperty('video')) {
            mediaPicture = getMediaLinkedPicture(data.video, 'video', 'video')
        } else {
            throw new Error("il n'y a pas de format de média affichable");
        }
        card.setAttribute('class', 'wrapper_mediacard');
        //intègre la carte média
        card.appendChild(mediaPicture);
        card.appendChild(informations);
        return card;
    }

    //* intègre les informations
    function getMediaInfo() {
        const wrapperInfoCard = document.createElement('div');
        // éléments présents dans les informations
        const titleCard = document.createElement('p');
        const mediaLikes = getMediaLikes();
        wrapperInfoCard.setAttribute('class', 'wrapper_mediainfo');
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

    //* lien d'ouverture de la lightbox
    function getLinkedLightBox() {
        const clickCardPicture = document.createElement('button');
        clickCardPicture.setAttribute('role', 'link');
        clickCardPicture.setAttribute('aria-label', 'Ouverture de la lightbox');
        return clickCardPicture;
    }

    //* récupère l'image et créé la balise
    function getMediaLinkedPicture(picture, media, tag) {
        const cardImage = document.createElement(tag);
        const linkedLightBox = getLinkedLightBox();
        cardImage.setAttribute('src', `assets/media/${media}/${picture}`);
        cardImage.setAttribute('alt', "");
        cardImage.setAttribute('tabindex', "-1");
        linkedLightBox.appendChild(cardImage);
        return(linkedLightBox);
    }
    
    return {getCardMediaDOM};
}