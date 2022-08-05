


function setOnLikeEvent(element) {
    const countLikes = element.querySelector('span');
    element.addEventListener('click', () => {
        if(element.getAttribute('data-isliked') === 'false') {
            const likesSum = document.getElementById('likes_sum');
            countLikes.textContent = Number(countLikes.textContent)+1;
            element.setAttribute('data-isliked', 'true');
            const event = new Event('liked');
            likesSum.dispatchEvent(event);
        }
    });
}
// calcule la somme des likes
function getSum() {
    const likesList = document.getElementsByClassName('likes');
    let count = 0; // totalise le nombre de likes
    for (const card of likesList) {
        count += Number(card.textContent);
    }
    return count;
}