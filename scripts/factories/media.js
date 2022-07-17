function mediaFactory(data) {
    const {id, title, likes, price} = data;
    
    //fonction retournant la carte des médias
    function getCardMediaDOM() {
        //conteneur de la carte et conteneur des informations textuelles
        const wrapperCard = document.createElement('div');
        const wrapperTextCard = document.createElement('div');
        wrapperTextCard.setAttribute('class', 'wrapper_cardinfo');
        wrapperCard.setAttribute('class', 'wrapper_card');
        //création des éléments d'information
        const titleCard = document.createElement('p');
        const numberOfLikes = document.createElement('span');
        const heartIcon = document.createElement('img');
        titleCard.textContent = title;
        heartIcon.setAttribute('src', `assets/icons/favorite-24px-red.svg`);
        //Insertion des éléments d'information dans le conteneur
        numberOfLikes.appendChild(heartIcon);
        numberOfLikes.insertAdjacentText('afterbegin',`${likes} `);
        wrapperTextCard.appendChild(titleCard);
        wrapperTextCard.appendChild(numberOfLikes);
        //insertion des éléments dans le conteneur de la carte
        wrapperCard.appendChild(wrapperTextCard);

        /* retourne une image  ou une image de video en fonction **
        ** de la clé video ou image de l'objet data              */
        if(data.hasOwnProperty('image')) {
            return(getCardImage(wrapperCard));
        } else if(data.hasOwnProperty('video')) {
            return(getCardVideo(wrapperCard));
        }
    }
    //fontion insérant une image dans la carte
    function getCardImage(cardMedia) {
        const imgCard = document.createElement('img');
        imgCard.setAttribute('src', `assets/media/image/${data.image}`);
        cardMedia.insertAdjacentElement('afterbegin', imgCard);

        return(cardMedia);
    }
    //fonction insérant une miniature de la vidéo dans la carte
    function getCardVideo(cardMedia) {
        const videoCard = document.createElement('video');
        videoCard.setAttribute('src', `assets/media/video/${data.video}`);
        cardMedia.insertAdjacentElement('afterbegin', videoCard);

        return cardMedia;
    }
    //retour de la média factory
    return { getCardMediaDOM };
}