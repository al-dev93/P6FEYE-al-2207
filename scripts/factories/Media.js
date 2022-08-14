// eslint-disable-next-line no-unused-vars
function mediaFactory(data, index) {
    const {id, title, likes} = data;
    
    //* méthode de création de la carte média
    function getCardMediaDOM() {
        const card = document.createElement('div');
        // éléments présents sur la carte
        const informations = getMediaInfo();
        let mediaPicture;
        // détermination de la balise html en fonction du contenu
        // eslint-disable-next-line no-prototype-builtins
        if(data.hasOwnProperty('image')) {
            mediaPicture = getMediaLinkedPicture(data.image, 'image', 'img');
        // eslint-disable-next-line no-prototype-builtins
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
        const mediaLikes = document.createElement('div');
        const hiddenLabel = document.createElement('span');
        const countLikes = document.createElement('span');
        const heartIcon = document.createElement('img');
        let isLiked = false;
        mediaLikes.setAttribute('class', 'likes');
        
        mediaLikes.setAttribute('tabindex', '0');
        mediaLikes.setAttribute('aria-live', 'polite');
        mediaLikes.setAttribute('aria-relevant', 'all');
        mediaLikes.setAttribute('aria-atomic', 'true');
        /* global arrayLikesUpdate */
        if(arrayLikesUpdate.length) {
            isLiked = arrayLikesUpdate.find(element => {
                return element.id == id
            });
        }
        if(isLiked) {
            mediaLikes.setAttribute('data-isliked', 'true');
            heartIcon.setAttribute('src', 'assets/icons/heart_black.svg');
            hiddenLabel.textContent = 'Liké';
        } else {
            mediaLikes.setAttribute('data-isliked', 'false');
            heartIcon.setAttribute('src', 'assets/icons/heart_red.svg');
            hiddenLabel.textContent = 'Cliquez pour liker';
        }
        hiddenLabel.setAttribute('class', 'sr-only');
        heartIcon.setAttribute('alt', "Likes");
        countLikes.setAttribute('role', 'text');
        
        countLikes.textContent = `${likes}`;
        mediaLikes.appendChild(hiddenLabel);
        mediaLikes.appendChild(countLikes);
        mediaLikes.appendChild(heartIcon);
        if(!isLiked) {
            /* global setOnLikeEvent */
            setOnLikeEvent(mediaLikes, id);
        }
        return mediaLikes;
    }

    //* lien d'ouverture de la lightbox
    function getLinkedLightBox() {
        const clickCardPicture = document.createElement('button');
        clickCardPicture.setAttribute('onclick', 'modalLightbox.openModal()');
        clickCardPicture.setAttribute('role', 'link');
        clickCardPicture.setAttribute('aria-label', 'Ouverture de la lightbox');
        clickCardPicture.setAttribute('data-item', `${index}`)
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
        linkedLightBox.appendChild(cardImage);
        return(linkedLightBox);
    }
    return {getCardMediaDOM};
}