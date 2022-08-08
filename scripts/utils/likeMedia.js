
const arrayLikesUpdate = [];


function setOnLikeEvent(element, id) {
    //! const countLikes = element.querySelector('span');
    //! const index = Number(countLikes.parentNode.parentNode.getAttribute('data-item'));
    // ajoute 1 like unique au click de la souris et diffuse l'évènement
    element.addEventListener('click', () => {
        if(element.getAttribute('data-isliked') === 'false') {
            //! const updateLikes = Number(countLikes.textContent)+1;
            //! countLikes.textContent = updateLikes;
            //! element.setAttribute('data-isliked', 'true');
            //! arraySortMedia[index].likes = updateLikes;
            increaseLikes(element, id);
            // diffuse l'évènement vers le panneau de la somme des likes
            dispatchIncreaseLikes();
            //! const likesSum = document.getElementById('likes_sum');
            //! const event = new Event('liked');
            //! likesSum.dispatchEvent(event);
        }
    });
    // ajoute 1 like unique suite à Enter et diffuse l'évènement
    element.addEventListener('keydown', (e) => {
        if(element.getAttribute('data-isliked') === 'false' && e.key === 'Enter') {
            //! const updateLikes = Number(countLikes.textContent)+1;
            //! countLikes.textContent = updateLikes;
            //! element.setAttribute('data-isliked', 'true');
            //! arraySortMedia[index].likes = updateLikes;
            increaseLikes(element, id);
            // diffuse l'évènement vers le panneau de la somme des likes
            dispatchIncreaseLikes();
            //! const likesSum = document.getElementById('likes_sum');
            //! const event = new Event('liked');
            //! likesSum.dispatchEvent(event);
        }
    });
}

//
function increaseLikes(element, id) {
    const countLikes = element.querySelector('span');
    const updateLikes = Number(countLikes.textContent)+1;
    //! const index = Number(countLikes.parentNode.parentNode.getAttribute('data-item'));
    countLikes.textContent = updateLikes;
    element.setAttribute('data-isliked', 'true');
    //
    arrayLikesUpdate.push({id : id, likes : updateLikes});
    //! arraySortMedia[index].likes = updateLikes;
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
        count += Number(likes.firstChild.textContent);
    }
    return count;
}