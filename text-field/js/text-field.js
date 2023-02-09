class ADTextField extends HTMLElement {
    label = null;
    inputElement = null;
    focused = false;
    constructor() {
        super();
        this.handleBodyClick = this.handleBodyClick.bind(this);
        this.label = this.querySelector('label');
        this.inputElement = this.querySelector('[ad-input-element]');
        if (this.inputElement.value.trim() != '') {
            this.floatLabel();
        }
        this.inputElement.addEventListener('input', e => {
            if (!this.focused) {
                if (this.inputElement.value.trim() == '') {
                    this.restoreLabel();
                }
                else {
                    this.floatLabel();
                }
            }
        });
        this.addEventListener('click', e => {
            this.addFocusState();
            document.body.addEventListener('click', this.handleBodyClick);
        });
    }
    handleBodyClick(event) {
        if (this.isElementContainer(event.target)) {
            return;
        }
        this.removeFocusState();
    }
    isElementContainer(element) {
        return this == element ||
            this.contains(element);
    }
    addFocusState() {
        this.floatLabel();
        this.classList.add('ad-form-field--focus');
        this.inputElement.focus();
        this.focused = true;
    }
    removeFocusState() {
        if (this.inputElement.value.trim() == '') {
            this.restoreLabel();
        }
        // Focus
        this.classList.remove('ad-form-field--focus');
        this.focused = false;
        // Remove body click
        document.body.removeEventListener('click', this.handleBodyClick);
    }
    floatLabel() {
        this.label.classList.add('ad-text-field-label--float');
    }
    restoreLabel() {
        this.label.classList.remove('ad-text-field-label--float');
    }
}
window.customElements.define('ad-text-field', ADTextField);
