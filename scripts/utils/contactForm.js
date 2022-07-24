/* ouverture de la fenêtre modale */
function displayModal() {
    document
        .getElementById('main')
        .setAttribute('aria-hidden', 'true');
    document
        .querySelector('body')
        .setAttribute('class', 'noscroll');
    modal.setAttribute('aria-hidden', 'false');
    modal.setAttribute('aria-modal', 'true');
	modal.style.display = 'block';
    modal
        .querySelector('#modal_title')
        .insertAdjacentText('beforeend', '\n'+nameOfPhotograph);
    modal
        .querySelector('img')
        .focus();
}
/* femeture de la fenêtre modale */
function closeModal() {
    document
        .getElementById('main')
        .setAttribute('aria-hidden', 'false');
    document
        .querySelector('body')
        .removeAttribute('class', 'noscroll');
    document
        .querySelector('button[class="contact_button"]')
        .focus();
    const modalTitle = modal.querySelector('#modal_title');
    modalTitle.textContent = modalTitle.textContent.replace(nameOfPhotograph,"");
    modal.setAttribute('aria-hidden', 'true');
    modal.setAttribute('aria-modal', 'false');
    modal.style.display = 'none'
}

/* défilement du focus dans la fanêtre modale */
function setNextFocusElement(event) {
    const firstFocusableElement = modal.querySelector('img');
    const lastFocusableElement = modal.querySelector('button');

    if (event.shiftKey) { 
        if (document.activeElement === firstFocusableElement) {
            lastFocusableElement.focus();
            event.preventDefault();
        }
    } else {
        if (document.activeElement === lastFocusableElement) {
            firstFocusableElement.focus();
            event.preventDefault();
        }
    }
}

const contactForm = document.querySelector('form');
const modal = document.getElementById('contact_modal')

/* gestion du clavier dans la fenêtre modale */
document.addEventListener('keydown', (event) => { 
    const closeButton = modal.querySelector('img');
    if(modal.getAttribute('aria-hidden') == 'false') {
        switch (true) {
            case event.key === 'Tab':
                setNextFocusElement(event);
                break;
    
            case event.key === 'Escape':
            case event.key === 'Enter' && document.activeElement === closeButton:
                closeModal();
                event.preventDefault();
                break;
    
            default:
                return;
        }
    }
});
/* récupération des données à la soumission du formulaire */
contactForm.addEventListener('submit', (event) => {
    event.preventDefault();
    console.log('Prénom...:', event.target.surname.value);
    console.log('Nom......:', event.target.name.value);
    console.log('Email....:', event.target.mail.value);
    console.log('Message..:', event.target.message.value);
    event.target.reset();
    closeModal();
});