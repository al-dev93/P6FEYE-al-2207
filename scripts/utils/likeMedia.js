
const arrayLikesUpdate = [];

function setOnLikeEvent(element, id) {
    const hiddenLabel = element.querySelector("span[class=sr-only]");
    // ajoute 1 like unique au click de la souris et diffuse l'évènement
    element.addEventListener('click', () => {
        if(element.getAttribute('data-isliked') === 'false') {
            increaseLikes(element, id);
            hiddenLabel.textContent = "Liké";
            // diffuse l'évènement vers le panneau de la somme des likes
            dispatchIncreaseLikes();
        }
    });
    // ajoute 1 like unique suite à Enter et diffuse l'évènement
    element.addEventListener('keydown', (e) => {
        if(element.getAttribute('data-isliked') === 'false' && e.key === 'Enter') {
            increaseLikes(element, id);
            hiddenLabel.textContent = "Liké";
            // diffuse l'évènement vers le panneau de la somme des likes
            dispatchIncreaseLikes();
        }
    });
}

//
function increaseLikes(element, id) {
    const countLikes = element.querySelector("span:not([class=sr-only])");
    const heart = element.querySelector('img');
    const updateLikes = Number(countLikes.textContent)+1;
    countLikes.textContent = updateLikes;
    element.setAttribute('data-isliked', 'true');
    heart.setAttribute("src", "assets/icons/heart_black.svg");
    //
    arrayLikesUpdate.push({id : id, likes : updateLikes});
}

//
function dispatchIncreaseLikes() {
    const likesSum = document.getElementById('likes_sum');
    const event = new Event('liked');
    likesSum.dispatchEvent(event);
}

//
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
function getSum() {
    const likesList = document.getElementsByClassName('likes');
    let count = 0; // totalise le nombre de likes
    for (const likes of likesList) {
        count += Number(likes.firstChild.nextSibling.textContent);
    }
    return count;
}