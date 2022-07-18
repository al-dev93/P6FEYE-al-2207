function displayModal() {
    const modal = document.getElementById('contact_modal');
    const body = document.querySelector('body');
    const name = document.createElement('span');
    name.textContent = nameOfPhotograph;
    modal.querySelector('h2').insertAdjacentElement('beforeend', name);

    body.setAttribute('class', 'noscroll');
	modal.style.display = 'block';
}

function closeModal() {
    const modal = document.getElementById('contact_modal');
    const body = document.querySelector('body');
    body.removeAttribute('class', 'noscroll');
    modal.style.display = 'none';
}
