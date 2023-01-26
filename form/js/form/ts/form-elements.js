/**
 * ADInputGroup
 * ad-type
 *  text
 *  textarea
 *  search
 *  date
 *  datetime
 *  multiselect
 *  rte
 *  checkbox
 *  radiobutton
 *
 */
class ADInputGroup extends HTMLElement {
    constructor() {
        super();
        const type = this.type;
        const subType = this.subType;
        const id = this.id;
        const label = this.label;
        const formElement = 'ad-form-element';
        const typeHandlers = {
            'text': (p) => {
                return `<input type="text" class="ad-form-control" name="${p.id}" ad-id="${p.id}" ${formElement}>`;
            },
            'search': (p) => {
                return `
                    <input type="text" class="ad-form-control" name="${p.id}" ad-id="${p.id}" ${formElement}>
                    <ad-icon class="ad-icon-button"><svg viewBox="0 0 24 24"><g><path d="M20.87,20.17l-5.59-5.59C16.35,13.35,17,11.75,17,10c0-3.87-3.13-7-7-7s-7,3.13-7,7s3.13,7,7,7c1.75,0,3.35-0.65,4.58-1.71 l5.59,5.59L20.87,20.17z M10,16c-3.31,0-6-2.69-6-6s2.69-6,6-6s6,2.69,6,6S13.31,16,10,16z"></path></g></svg></ad-icon>`;
            },
            'multiselect': (p) => {
                let subType = '';
                if (p.type) {
                    subType = `ad-type="${p.type}" `;
                }
                return `<div ad-id="${p.id}" ${subType}ad-ms-default-text="Please Select" ${formElement}></div>`;
            },
            'rte': (p) => {
                return `<div ad-rte ad-id="${p.id}" ${formElement}></div>`;
            },
            'date': (p) => {
                return `<input type="date" class="ad-form-control" name="${p.id}" ad-id="${p.id}" ${formElement}>`;
            },
            'datetime': (p) => {
                return `<input type="datetime-local" class="ad-form-control" name="${p.id}" ad-id="${p.id}" ${formElement}>`;
            }
        };
        this.removeAttribute('id');
        this.innerHTML = `
          <label for="${id}" class="ad-input-group-text">${label}</label>
          <ad-control-group class="ad-control-group">${typeHandlers[type]({ id: id, type: subType })}</ad-control-group>`;
    }
    static get observedAttributes() {
        return ['ad-type', 'ad-label'];
    }
    get type() {
        return this.getAttribute('ad-type') || '';
    }
    set type(value) {
        this.setAttribute('ad-type', value);
    }
    get subType() {
        return this.getAttribute('ad-sub-type') || '';
    }
    set subType(value) {
        this.setAttribute('ad-sub-type', value);
    }
    get label() {
        return this.getAttribute('ad-title') || '';
    }
    set label(value) {
        this.setAttribute('ad-title', value);
    }
}
window.customElements.define('ad-input-group', ADInputGroup);
