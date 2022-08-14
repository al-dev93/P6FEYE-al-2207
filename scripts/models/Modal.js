class Modal {
//* propriétés privées ***************/
    #modal; #template; #modalBody;
    #closeButton; #ctrlNext; #ctrlPrev;
    #focusIn; #lastFocus; #focusOut;
    #currentIndex; #lastIndex; 
    #modalListDataSize;
    #function;
    #isAnimated; #slideStep;

//* méthodes privées *****************/

    // insère le template dans la modale
    #insertTemplate() {
        const clone = document.importNode(this.#template.content, true);
        // titre pour le formulaire de contact
        if(this.contentModalTitle) {
            clone
                .getElementById('modal_title')
                .insertAdjacentText('beforeend', this.contentModalTitle);
            
        }
        if (this.idModalAriaLabeled) {
            this.#modal.setAttribute('aria-labelledby', this.idModalAriaLabeled);
        }
        // collection de média pour la lightbox
        if(this.idInsertListData) {
            const idInsert = clone.querySelector(this.idInsertListData);
            this.modalListData.forEach(element => {
            idInsert.insertAdjacentElement('beforeend', element);
            });
        }
        this.#modal.appendChild(clone);
        this.#modalBody = document.getElementById(this.idModalBody);
        this.#modalListDataSize = (this.modalListData)? this.modalListData.length : 0;
        return this.#modalListDataSize;
    }

    // distribue la gestion des évènements
    #eventHandler() {
        this.#eventCtrlKeyModal();  // gestion des évènements claviers de la modale 
        switch (this.idTemplate) {
            // gestion de l'évènement submit du formulaire de contact
            case 'contact_template' :
                this.#eventSubmit()
                break;
            // gestion de la souris et du clavier dans la lightbox
            case 'lightbox_template' :
                this.#eventKeySlide();
                this.#eventClickSlide();
                break;

            default:
                return;
        }
    }

    // évènements clavier de la modale
    #eventCtrlKeyModal() {
        this.#modalBody.addEventListener('keydown', event => {
            switch (true) {
                case event.key === 'Tab' :
                    this.#setNextFocusElement(event);
                    break;
        
                case event.key === 'Escape' :
                case event.key === 'Enter' && document.activeElement === this.#closeButton :
                    this.closeModal();
                    event.preventDefault();
                    break;
                
                    default:
                        return;
            }
        });
    }

    // évènement submit du formulaire de contact
    #eventSubmit() {
        const form = this.#modalBody.querySelector('form');
        form.addEventListener('submit', event => {
            this.#function(event);
        });
    }

    // évènements clavier de la lightbox
    #eventKeySlide() {
        this.#modalBody.addEventListener('keydown', event => {
            switch (true) {
                case event.key === 'ArrowRight' :
                    this.#ctrlNext.focus();
                    // utilisation de la flèche droite place le focus sur le défilement avant et exécute les instructions suivantes
                case event.key === 'Enter' && document.activeElement === this.#ctrlNext :
                    this.#slideMedia(this.#slideStep);
                    event.preventDefault();
                    break;
                    
                case event.key === 'ArrowLeft' :
                    this.#ctrlPrev.focus();
                    // utilisation de la flèche gauche place le focus sur le défilement arrière et exécute les instructions suivantes
                case event.key === 'Enter' && document.activeElement === this.#ctrlPrev :
                    this.#slideMedia(-this.#slideStep);
                    event.preventDefault();
                    break;
            
                default:
                    return;
            }
        });
    }

    // évènements souris de la lightbox
    #eventClickSlide() {
        this.#modalBody.addEventListener('click', event => {
            switch (true) {
                case event.target === this.#ctrlNext :
                    this.#slideMedia(this.#slideStep);
                    event.preventDefault();
                    break;

                case event.target === this.#ctrlPrev :
                    this.#slideMedia(-this.#slideStep);
                    event.preventDefault();
                    break;
            
                default:
                    break;
            }
        })
    }

        // fixe la position courante dans la lightbox à l'ouverture, l'index courant, le pas de défilement
        // et affiche le média clické
        #initLightbox() {
            const listIndex = this.#modalBody.getElementsByClassName('lightbox_item');
            const focusOut = (this.#focusOut.tagName === 'BUTTON')?
                            this.#focusOut : this.#focusOut.parentNode;
            // position courante est celle du media activé pour l'ouverture
            for (const element of listIndex) {
                if(element.getAttribute('data-item') === focusOut.getAttribute('data-item')) {
                    this.#currentIndex = Number(element.getAttribute('data-item'));
                    break;
                }
            }
            this.#slideStep = 1;
            this.#function(this.#currentIndex);
            return true;
        }

    // défilement des média dans la lightbox
    #slideMedia(step) { 
        this.#lastIndex = this.#currentIndex;
        const newIndex = this.#currentIndex + step;
        if(newIndex > this.#modalListDataSize - 1) {
            this.#currentIndex = 0;
        } else if(newIndex < 0) {
            this.#currentIndex = this.#modalListDataSize - 1;
        } else {
            this.#currentIndex = newIndex;
        }
        this.#function(this.#currentIndex, this.#isAnimated, this.#lastIndex);
    }

    // définit les éléments focusables
    #setFocusableTarget() {
        this.#focusIn = this.#modalBody.querySelector(this.idFocusIn);
        this.#closeButton = this.#modalBody.querySelector(this.idCloseButton);
        this.#lastFocus = this.#modalBody.querySelector(this.idLastFocus);
        if(this.ctrlKeyList) {
            this.#ctrlNext = this.#modalBody.querySelector(this.ctrlKeyList.next);
            this.#ctrlPrev = this.#modalBody.querySelector(this.ctrlKeyList.prev);
        }
    }

    // maintient le focus dans la modale
    #setNextFocusElement(event) {
        if (event.shiftKey) { 
            if (document.activeElement === this.#focusIn) {
                this.#lastFocus.focus();
                event.preventDefault();
            }
        } else {
            if (document.activeElement === this.#lastFocus) {
                this.#focusIn.focus();
                event.preventDefault();
            }
        }
    }

    // efface la modale
    #deleteModal() {
        (this.#isAnimated)? this.#function(this.#currentIndex) : null;
        this.#modal.removeAttribute('aria-labelledby');
        this.#modal.innerHTML = "";
    }

    constructor(builder) {
        this.idModalBody = builder.idModalBody;
        this.idTemplate = builder.idTemplate;
        this.eventModalFunction = (builder.eventModalFunction)? builder.eventModalFunction : false;
        this.idLastFocus = builder.idLastFocus;
        this.idModal = (builder.idModal)? builder.idModal : 'modal';
        this.idModalAriaLabeled = (builder.idModalAriaLabeled)? builder.idModalAriaLabeled : false;
        this.idCloseButton = (builder.idCloseButton)? builder.idCloseButton : '.modal_close';
        this.idFocusIn = (builder.idFocusIn)? builder.idFocusIn : this.idCloseButton;
        this.ctrlKeyList = (builder.ctrlKeyList)? builder.ctrlKeyList : false;
        this.contentModalTitle = "";
        this.modalListData = false;
        this.idInsertListData = false;
//* propriétés privées ***************/
        this.#modal = document.getElementById(this.idModal);
        this.#template = document.getElementById(this.idTemplate);
        this.#function = this.eventModalFunction;
    }

    openModal() {
        this.#focusOut = document.activeElement;
        document
            .getElementById('main')
            .setAttribute('aria-hidden', 'true');
        document
            .querySelector('body')
            .setAttribute('class', 'noscroll');
        this.#modal.setAttribute('aria-hidden', 'false');
        this.#modal.setAttribute('aria-modal', 'true');
        this.#modal.style.display = 'flex';
        this.#isAnimated = (this.#insertTemplate())? this.#initLightbox() : false;
        this.#setFocusableTarget();
        this.#eventHandler();
        this.#focusIn.focus();
    }

    closeModal () {
        this.#deleteModal();
        document
            .getElementById('main')
            .setAttribute('aria-hidden', 'false');
        document
            .querySelector('body')
            .removeAttribute('class', 'noscroll');
        this.#modal.setAttribute('aria-hidden', 'true');
        this.#modal.setAttribute('aria-modal', 'false');
        this.#modal.style.display = 'none'
        this.#focusOut.focus();
    }
}