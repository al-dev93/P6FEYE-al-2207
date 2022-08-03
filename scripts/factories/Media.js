function mediaFactory(data) {
    const {id, title, likes, price} = data;
    
    //* méthode de création de la carte média
    function getCardMediaDOM() {
        const card = document.createElement('div');
        // éléments présents sur la carte
        const informations = getMediaInfo();
        let mediaPicture;
        // détermination de la balise html en fonction du contenu
        if(data.hasOwnProperty('image')) {
            mediaPicture = getMediaLinkedPicture(data.image, 'image', 'img');
        } else if(data.hasOwnProperty('video')) {
            mediaPicture = getMediaLinkedPicture(data.video, 'video', 'video')
        } else {
            throw new Error("il n'y a pas de média affichable");
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
        titleCard.setAttribute('class', 'media_title');
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
        mediaLikes.setAttribute('class', 'likes');
        heartIcon.setAttribute('src', `assets/icons/heart_red.svg`);
        heartIcon.setAttribute('alt', "Likes");
        mediaLikes.insertAdjacentElement('beforeend', heartIcon)
        return mediaLikes;
    }

    //* lien d'ouverture de la lightbox
    function getLinkedLightBox() {
        const clickCardPicture = document.createElement('button');
        clickCardPicture.setAttribute('onclick', 'modalLightbox.openModal()');
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
        cardImage.setAttribute('class', 'media_content')
        cardImage.setAttribute('data-id', id)
        linkedLightBox.appendChild(cardImage);
        return(linkedLightBox);
    }
    
    return {getCardMediaDOM};
}