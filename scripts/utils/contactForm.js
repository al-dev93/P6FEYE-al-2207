function displayModal() {
    const body = document.querySelector('body');
    const modal = document.getElementById('contact_modal');
    const title = document.getElementById('header_title');
    
    title
        .querySelector('span')
        .textContent 
        = nameOfPhotograph;
    
    body.setAttribute('class', 'noscroll');
	modal.style.display = 'block';
}

function closeModal() {
    const modal = document.getElementById('contact_modal');
    const body = document.querySelector('body');
    body.removeAttribute('class', 'noscroll');
    modal.style.display = 'none';
}

const contactForm = document.querySelector('form');

contactForm.addEventListener('submit', (event) => {
    event.preventDefault();
    console.log('Prénom...:', event.target.surname.value);
    console.log('Nom......:', event.target.name.value);
    console.log('Email....:', event.target.mail.value);
    console.log('Message..:', event.target.message.value);
    event.target.reset();
    closeModal();
});