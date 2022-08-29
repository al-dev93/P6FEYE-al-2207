// enregistrement des média likés
const arrayLikesUpdate = [];

// eslint-disable-next-line no-unused-vars
function setOnLikeEvent(element, id) {
    // écoute le click sur la zone liker
    element.addEventListener('click', () => {
        if(element.getAttribute('data-isliked') === 'false') {
            increaseLikes(element, id);
        }
    });
    // écoute Enter sur la zone liker
    element.addEventListener('keydown', (e) => {
        if(element.getAttribute('data-isliked') === 'false' && e.key === 'Enter') {
            increaseLikes(element, id);
        }
    });
}

// ajoute 1 like
function increaseLikes(element, id) {
    const countLikes = element.querySelector("span:not([class=sr-only])");
    const hiddenLabel = element.querySelector("span[class=sr-only]");
    const heart = element.querySelector('img');
    const updateLikes = Number(countLikes.textContent)+1;
    countLikes.textContent = updateLikes;
    element.setAttribute('data-isliked', 'true');
    heart.setAttribute("src", "assets/icons/heart_black.svg");
    // enregistre le like
    arrayLikesUpdate.push({id : id, likes : updateLikes});
    // change l'information donnée au lecteur d'écran
    hiddenLabel.textContent = "Liké";
    // diffuse l'évènement pour mise à jour du panneau de la somme des likes
    dispatchIncreaseLikes();
}

// diffuse l'évènement pour mise à jour du panneau
function dispatchIncreaseLikes() {
    const likesSum = document.getElementById('likes_sum');
    const event = new Event('liked');
    likesSum.dispatchEvent(event);
}

// met à jour le nombre de likes dans le tableau worksData
// eslint-disable-next-line no-unused-vars
function updateWorkDataLikes(worksData) {
    arrayLikesUpdate.forEach(value => {
        worksData.find(element => {
            if(element.id === value.id) {
                element.likes = value.likes;
                return element.likes;
            }
        });
    });
    return worksData;
}

// calcule la somme des likes du panneau
// eslint-disable-next-line no-unused-vars
function getSum() {
    const likesList = document.getElementsByClassName('likes');
    let count = 0; // totalise le nombre de likes
    for (const likes of likesList) {
        count += Number(likes.firstChild.nextSibling.textContent);
    }
    return count;
}