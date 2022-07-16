function mediaFactory(data) {
    const {id, title, likes, price} = data;

    function getCardMedia(){
        //conteneur de la carte
        const wrapperCard = document.createElement('div');
        wrapperCard.setAttribute('class', 'wrapper_card');
        //conteneur du titre et des likes
        const wrapperTextCard = document.createElement('div');
        wrapperTextCard.setAttribute('class', 'wrapper_cardinfo');
        //informations textuelles
        const titleCard = document.createElement('p');
        titleCard.textContent = title;
        const numberOfLikes = document.createElement('span');
        //icone des likes
        const heartIcon = document.createElement('img');
        heartIcon.setAttribute('src', `assets/icons/favorite-24px 1.svg`);
        numberOfLikes.appendChild(heartIcon);
        numberOfLikes.insertAdjacentText('afterbegin',`${likes} `);
        //ajoute le titre et les likes au conteneur
        wrapperTextCard.appendChild(titleCard);
        wrapperTextCard.appendChild(numberOfLikes);
        //ajoute le conteneur du titre et des likes dans le conteneur de la carte
        wrapperCard.appendChild(wrapperTextCard);

        return(wrapperCard);
    }

    function getImageCardDOM(){
        const cardMedia = getCardMedia();
        const imgCard = document.createElement('img');
        imgCard.setAttribute('src', `assets/media/image/${data.image}`);
        cardMedia.insertAdjacentElement('afterbegin', imgCard);

        return(cardMedia);
    }

    // function getVideoCardDOM(){
    //     const cardMedia = getCardMedia();
    //     const videoCard = `/assets/media/video/${data.video}`;

    //     return cardMedia;
    // }

    if(data.hasOwnProperty('image')) {
        return { getImageCardDOM };
    } else return null;
}