class Modal {
//* propriétés privées ***************/
    #modal; 
    #template;
    // #modalBody;
    #focusIn; //!
    #closeButton;
    #lastFocus;
    #focusOut;
//* méthodes privées *****************/

    #insertTemplate() {
        const clone = document.importNode(this.#template.content, true);
        if(this.idModalTitle) {
            clone
                .getElementById(this.idModalTitle)
                .insertAdjacentText('beforeend', nameOfPhotograph);
        }
        this.#modal.appendChild(clone);
        this.#setFocusableTarget();
    }

    #setFocusableTarget() {
        this.#focusIn = this.#modal.querySelector(this.idFocusIn); //!
        this.#closeButton = this.#modal.querySelector(this.idCloseButton);
        this.#lastFocus = this.#modal.querySelector(this.idLastFocus); //!
    }

    #eventHandler(callBack) {
        if(this.#modal.getAttribute('aria-hidden') == 'false') {
            document.addEventListener('keydown', (event) => {
                switch (true) {
                    case event.key === 'Tab':
                        this.#setNextFocusElement(event);
                        break;
            
                    case event.key === 'Escape':
                    case event.key === 'Enter' && document.activeElement === this.#closeButton:
                        this.closeModal();
                        event.preventDefault();
                        break;
            
                    default:
                        return;
                }
            });
            if(callBack) {
                const idTarget = this.#modal.querySelector(this.eventModalFunction.id);
                idTarget.addEventListener(this.eventModalFunction.type, function(event){callBack(event)});
            }
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
        this.idModalTitle = builder.idModalTitle;
//* propriétés privées ***************/
        this.#modal = document.getElementById(this.idModal);
        // this.#modalBody = document.getElementById(this.idModalBody);
        this.#template = document.getElementById(this.idTemplate);
        
    }

    openModal() {
        this.#focusOut = document.activeElement;
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
        this.#eventHandler(this.eventModalFunction.callback);
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
        this.#focusOut.focus();
    }
}