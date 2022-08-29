
const sortMenuMedia = document.querySelector('.wrapper_select');
const dropDown = document.querySelector('.dropdown');
const selectMenuMedia = document.getElementById('sort_select');
const sortMenuItem = document.querySelectorAll('option');
const countItem = sortMenuItem.length;

// initialise initialise le menu de tri après le lancement d'un tri
function initSortMenu(value) {
    sortMenuMedia.classList.remove('dropdown_open');
    selectMenuMedia.setAttribute('aria-expanded', 'false');
    selectMenuMedia.focus();
    selectMenuMedia.value = value;
}

/*  envoi l'option sélectionnée dans le menu de tri à la fonction init pour
    pour afficher la page du photographe triée                              */
function selectedSortMenuItem(item) {
    const key = item.getAttribute('value');
    switch (true) {
        case key === 'popularity':
        case key === 'date':
        case key === 'title':
            /* global init */
            init(key);
            break;
        default:
            break;
    }
    initSortMenu(key);
}

/*  controle l'ouverture et la fermeture du menu avec la flèche
    dropdown                                                    */
function dropDownControl() {
    sortMenuMedia.classList.toggle('dropdown_open');
    if(sortMenuMedia.classList.contains('dropdown_open')) {
        selectMenuMedia.firstElementChild.focus();
        selectMenuMedia.setAttribute('aria-expanded', 'true');
    } else {
        selectMenuMedia.focus();
        selectMenuMedia.setAttribute('aria-expanded', 'false');
    }
}

// gère les évènements clavier sur le menu de tri
selectMenuMedia.addEventListener('keydown', event => {
    if(!sortMenuMedia.classList.contains('dropdown_open') && event.key === 'Enter') {
        sortMenuMedia.classList.add('dropdown_open');
        selectMenuMedia.setAttribute('aria-expanded', 'true');
        event.currentTarget.firstElementChild.focus();
    }
    if(sortMenuMedia.classList.contains('dropdown_open') && event.key === 'Escape') {
        sortMenuMedia.classList.remove('dropdown_open');
        selectMenuMedia.setAttribute('aria-expanded', 'false');
        selectMenuMedia.focus();
    }
});

/*  écoute le click de la souris sur la flèche dropdown
    du menu de tri                                      */
dropDown.addEventListener('click',() =>{
    dropDownControl();
});

/*  écoute les évènements clavier sur la flèche dropdown
    du menu de tri                                      */
dropDown.addEventListener('keydown',(event) =>{
    if (event.key === 'Enter') {
        dropDownControl();
    }
});

/*  écoute les évènements souris et clavier sur les items du menu de tri
    et gère la navigation au clavier dans le menu de tri
*/
sortMenuItem.forEach(item => {
    item.addEventListener('click', () => {
        selectedSortMenuItem(item);
    });

    item.addEventListener('keydown', event => {
        switch (event.key) {
            case 'Enter' :
                selectedSortMenuItem(item);
                event.preventDefault();
                event.stopPropagation();
                break;

            case 'ArrowDown':
            case 'ArrowRight':
                if(item.index < countItem-1) {
                    sortMenuItem[item.index + 1].focus();
                }
                else {
                    sortMenuItem[0].focus();
                }
                break;

            case 'ArrowUp':
            case 'ArrowLeft':
                if(item.index > 0) {
                    sortMenuItem[item.index - 1].focus();
                }
                else {
                    sortMenuItem[countItem-1].focus();
                }
                break;

            case 'Home':
                sortMenuItem[0].focus();
                break;

            case 'End':
                sortMenuItem[countItem-1].focus;
                break;
            
            case 'ShiftTab':
            case 'Tab':
                sortMenuMedia.classList.remove('dropdown_open');
                selectMenuMedia.setAttribute('aria-expanded', 'false');
                break;

            default:
                break;
        }
    })
});
