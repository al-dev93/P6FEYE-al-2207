
const sortMenuMedia = document.querySelector('.wrapper_select');
const dropDown = document.querySelector('.dropdown');
const selectMenuMedia = document.getElementById('sort_select');
const sortMenuItem = document.querySelectorAll('option');
const countItem = sortMenuItem.length;


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
    sortMenuMedia.classList.remove('dropdown_open');
    selectMenuMedia.setAttribute('aria-expanded', 'false');
    selectMenuMedia.focus();
    selectMenuMedia.value = key;
}

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

dropDown.addEventListener('click',() =>{
    sortMenuMedia.classList.toggle('dropdown_open');
    if(sortMenuMedia.classList.contains('dropdown_open')) {
        selectMenuMedia.firstElementChild.focus();
        selectMenuMedia.setAttribute('aria-expanded', 'true');
    } else {
        selectMenuMedia.focus();
        selectMenuMedia.setAttribute('aria-expanded', 'false');
    }
});

dropDown.addEventListener('keydown',(event) =>{
    if (event.key === 'Enter') {
        sortMenuMedia.classList.toggle('dropdown_open');
        if(sortMenuMedia.classList.contains('dropdown_open')) {
            selectMenuMedia.firstElementChild.focus();
            selectMenuMedia.setAttribute('aria-expanded', 'true');
        } else {
            selectMenuMedia.focus();
            selectMenuMedia.setAttribute('aria-expanded', 'false');
        }
    }
});

sortMenuItem.forEach(item => {
    item.addEventListener('click', event => {
        event.preventDefault();
        event.stopPropagation();
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
