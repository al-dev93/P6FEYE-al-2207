class Modal {
//* propriétés privées ***************/
    #modal; #template;
    #closeButton; #ctrlNext; #ctrlPrev;
    #focusIn; #lastFocus; #focusOut;
    #currentIndex; 
    #modalListDataSize;

//* méthodes privées *****************/
    #insertTemplate() {
        const clone = document.importNode(this.#template.content, true);
        if(this.idModalTitle) {
            clone
                .getElementById(this.idModalTitle)
                .insertAdjacentText('beforeend', this.contentModalTitle);
        }
        if(this.modalListData) {
            this.#insertMediaInModal(clone)
        }
        this.#modal.appendChild(clone);
    }

    #insertMediaInModal(container) {
        const element = this.modalListData[this.#currentIndex];
        const media = document.createElement(element.tag);
        media.setAttribute('src', `assets/media/${element.media}/${element.src}`);
        container
            .querySelector('.lightbox_media')
            .appendChild(media);
        container
            .querySelector('.media_title')
            .textContent = element.title;
    }

    #deleteContentModal(selector) {
        this.#modal
            .querySelector(selector)
            .innerHTML = "";
    }

    #eventHandler() {
        this.#eventCtrlKeyModal();
        switch (this.idTemplate) {
            case 'contact_template' :
                this.#eventSubmit()
                break;
        
            case 'lightbox_template' :
                this.#eventKeySlide();
                this.#eventClickSlide();
                break;

            default:
                return;
        }
    }

    #eventCtrlKeyModal() {
        document.addEventListener('keydown', event => {
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

    #eventSubmit() {
        const form = this.#modal.querySelector('form');
        form.addEventListener('submit', event => {
            this.eventModalFunction.callback(event);
        });
    }

    #eventKeySlide() {
        this.#modal.addEventListener('keydown', event => {
            switch (true) {
                case event.key === 'ArrowRight' :
                    this.#ctrlNext.focus();
                case event.key === 'Enter' && document.activeElement === this.#ctrlNext :
                    this.#eventCtrlSlide(this.#ctrlNext.className);
                    event.preventDefault();
                    break;
                    
                case event.key === 'ArrowLeft' :
                    this.#ctrlPrev.focus();
                case event.key === 'Enter' && document.activeElement === this.#ctrlPrev :
                    this.#eventCtrlSlide(this.#ctrlPrev.className);
                    event.preventDefault();
                    break;
            
                default:
                    return;
            }
        });
    }

    #eventCtrlSlide(key) {
        this.#currentIndex = this.eventModalFunction.callback(key, this.#modalListDataSize, this.#currentIndex);
        this.#deleteContentModal('.lightbox_media');
        this.#insertMediaInModal(this.#modal);
    }

    #eventClickSlide() {
        this.#modal.addEventListener('click', event => {
            switch (true) {
                case event.target === this.#ctrlNext :
                    this.#eventCtrlSlide(this.#ctrlNext.className);
                    event.preventDefault();
                    break;

                case event.target === this.#ctrlPrev :
                    this.#eventCtrlSlide(this.#ctrlPrev.className);
                    event.preventDefault();
                    break;
            
                default:
                    break;
            }
        })
    }

    #setCurrentIndex() {
        let index = 0;
        const elementList = document.getElementsByClassName(this.#focusOut.className);
        this.#modalListDataSize = elementList.length;
        for (; index < elementList.length; index++) {
            if(elementList[index] === this.#focusOut) {
                this.#currentIndex = index;
                break;
            }
        }
        return index;
    }

    #setFocusableTarget() {
        this.#focusIn = this.#modal.querySelector(this.idFocusIn); //!
        this.#closeButton = this.#modal.querySelector(this.idCloseButton);
        this.#lastFocus = this.#modal.querySelector(this.idLastFocus); //!
        if(this.ctrlKeyList) {
            this.#ctrlNext = this.#modal.querySelector(this.ctrlKeyList.next);
            this.#ctrlPrev = this.#modal.querySelector(this.ctrlKeyList.prev);
        }
    }

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
    
    constructor(builder) {
        this.idModalBody = builder.idModalBody;
        this.idTemplate = builder.idTemplate;
        this.eventModalFunction = (builder.eventModalFunction)? builder.eventModalFunction : false;
        this.idLastFocus = builder.idLastFocus;
        this.idModal = (builder.idModal)? builder.idModal : 'modal';
        this.idCloseButton = (builder.idCloseButton)? builder.idCloseButton : '.modal_close';
        this.idFocusIn = (builder.idFocusIn)? builder.idFocusIn : this.idCloseButton;
        this.idModalTitle = (builder.idModalTitle)? builder.idModalTitle : false ;
        this.contentModalTitle = "";
        this.modalListData = false;
        this.ctrlKeyList = (builder.ctrlKeyList)? builder.ctrlKeyList : false;
//* propriétés privées ***************/
        this.#modal = document.getElementById(this.idModal);
        this.#template = document.getElementById(this.idTemplate);
        
    }

    openModal() {
        this.#focusOut = document.activeElement;
        this.#setCurrentIndex();
        document
            .getElementById('main')
            .setAttribute('aria-hidden', 'true');
        document
            .querySelector('body')
            .setAttribute('class', 'noscroll');
        this.#insertTemplate();
        this.#modal.setAttribute('aria-hidden', 'false');
        this.#modal.setAttribute('aria-modal', 'true');
        this.#modal.style.display = 'flex';
        this.#setFocusableTarget();
        this.#eventHandler();
        this.#focusIn.focus();
    }

    closeModal () {
        document
            .getElementById('main')
            .setAttribute('aria-hidden', 'false');
        document
            .querySelector('body')
            .removeAttribute('class', 'noscroll');
        this.#modal.setAttribute('aria-hidden', 'true');
        this.#modal.setAttribute('aria-modal', 'false');
        this.#modal.style.display = 'none'
        this.#modal.innerHTML = "";
        this.#currentIndex = undefined;
        this.#focusOut.focus();
    }
}