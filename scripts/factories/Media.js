function mediaFactory(data) {
    const {id, title, likes, price} = data;
    
    //* méthode de création de la carte média
    function getCardMediaDOM() {
        // conteneur de la carte
        const wrapperCard = document.createElement('div');
        wrapperCard.setAttribute('class', 'wrapper_card');
        // éléments présents sur la carte
        let mediaPicture;
        const informations = getMediaInfo();
        if(data.hasOwnProperty('image')) {
            mediaPicture = getCardImage();
        } else if(data.hasOwnProperty('video')) {
            mediaPicture = getCardVideo()
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
        wrapperInfoCard.setAttribute('class', 'wrapper_cardinfo');
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
        mediaLikes.insertAdjacentElement('beforeend', heartIcon)
        return mediaLikes;
    }

    //* récupère l'image et créé la balise
    function getCardImage() {
        const cardImage = document.createElement('img');
        cardImage.setAttribute('src', `assets/media/image/${data.image}`);
        return(cardImage);
    }

    //* récupère la vidéo et créé la balise
    function getCardVideo() {
        const cardVideo = document.createElement('video');
        cardVideo.setAttribute('src', `assets/media/video/${data.video}`);
        return cardVideo;
    }

    //retour de la média factory
    return {getCardMediaDOM};
}