class ModalBuilder {
    constructor(idModalBody, idTemplate){
        this.idModalBody = idModalBody;
        this.idTemplate = idTemplate;
    }

    setIdModal(selector) {
        this.idModal = selector;
        return this;
    }

    setIdFocusOut(selector) {
        this.idFocusOut = selector;
        return this;
    }

    setIdLastFocus(selector) {
        this.idLastFocus = selector;
        return this;
    }

    setIdCloseButton(selector) {
        this.idCloseButton = selector;
        return this;
    }

    setIdFocusIn(selector) {
        this.idFocusIn = selector;
        return this;
    }

    setIdModalTitle(selector) {
        this.idModalTitle = selector;
        return this;
    }

    setModalFunction(object) {
        this.eventModalFunction = object;
        return this;
    }

    buildModal() {
        return new Modal(this);
    }
}