import { ADComponent } from '../../shared/ts/component';
export class ADForm extends ADComponent {
    elements_;
    validator_;
    /**
    * attachTo
    * @param {Element}root
    * @param {Array} args
    * @returns {ADForm}
    */
    static attachTo(root, ...args) {
        return new ADForm(root, ...args);
    }
    /**
     * values
     */
    get value() {
        let res = {};
        if (this.validator_ == null || this.validator_.isValid()) {
            this.elements_.forEach(el => {
                const val = this.getElementValue(el);
                res[el.getAttribute('ad-id')] = val;
            });
        }
        return res;
    }
    set value(data) {
        // Remove tracing to prevent firing 
        // form.change event 
        this.trackElements(true);
        // Bind elements 
        for (const [id, value] of Object.entries(data)) {
            this.setElementValue(id, value);
        }
        // Set tracing 
        this.trackElements(false);
    }
    /**
     * init
     * @param parameters
     */
    init(parameters) {
        const meta = parameters?.meta;
        if (meta) {
            this.build(meta);
        }
        this.createElementList();
        this.trackElements(false);
        this.validator_ = parameters.validator(this.root);
    }
    getElementData(id) {
        const el = this.root.querySelector(`[ad-id='${id}']`);
        const res = this.getElementValue(el);
        return res;
    }
    setElementData(id, value) {
        this.setElementValue(id, value);
    }
    /**
     * build
     * @param {Array<object>} meta
     */
    build(meta) {
        throw new Error('Not Implemented');
    }
    clear() {
        this.elements_.forEach(el => {
            this.clearElement(el);
        });
    }
    //#region  Private members 
    createElementList() {
        this.elements_ = this.root.querySelectorAll('[ad-id][ad-form-element]');
    }
    trackElements(untrack) {
        this.elements_.forEach(el => {
            this.trackElement(el, untrack);
        });
    }
    trackElement(el, untrack) {
        let eventType = 'keyup';
        if (this.isMultiselect(el)
            || this.isRte(el)
            || el.tagName == 'SELECT') {
            eventType = 'change';
        }
        else if (this.isClickType(el)) {
            eventType = 'click';
        }
        if (untrack) {
            el.removeEventListener(eventType, e => this.trackElementHandler(e));
        }
        else {
            el.addEventListener(eventType, e => this.trackElementHandler(e));
        }
    }
    trackElementHandler(e) {
        this.emit('form.change', { event: e });
    }
    isClickType(el) {
        const res = el.matches('[type="checkbox"]')
            || el.matches('[type="radio"]');
        return res;
    }
    isMultiselect(element) {
        let res = null;
        if (element.hasAttribute('ad-ms-default-text')) {
            res = ADMultiselect.attachTo(element);
        }
        return res;
    }
    isRte(element) {
        let res = null;
        if (element.hasAttribute('ad-rte')) {
            res = ad.ADRte.getInstance(element);
        }
        return res;
    }
    /**
     * getElementValue
     * @param {HTMLElement} el
     * @returns {any}
     */
    getElementValue(el) {
        let res = null;
        if (el) {
            let val;
            let customEl;
            if (customEl = this.isMultiselect(el)) {
                val = customEl.getSelectedData();
            }
            else if (customEl = this.isRte(el)) {
                val = customEl.getValue();
            }
            else {
                val = el.getAttribute('ad-value');
                if (!val) {
                    if (this.isClickType(el)) {
                        val = this.toInt(el.checked);
                    }
                    else {
                        val = el.value;
                    }
                }
            }
            res = {
                value: this.htmlEncrypt(val),
                label: el.getAttribute('label'),
                adLabel: el.getAttribute('ad-label')
            };
        }
        return res;
    }
    setElementValue(id, value) {
        const el = this.root.querySelector(`[ad-id="${id}"]`);
        if (el) {
            let customEl = null;
            if (customEl = this.isMultiselect) {
                customEl.setSelectedData(value);
            }
            else if (customEl = this.isRte(el)) {
                customEl.set(value);
                // Check box or radio button 
            }
            else if (this.isClickType(el)) {
                el.checked = this.toBool(value);
            }
            else {
                if (el.tagName === 'DIV' || el.tagName === 'SPAN') {
                    el.innerHTML = this.htmlDecrypt(value);
                }
                else {
                    el.value = this.htmlDecrypt(value);
                }
            }
            if (el.tagName == 'SELECT') {
                this.emit('change', null, null, el);
            }
        }
    }
    clearElement(el) {
        let customEl = null;
        if (customEl = this.isMultiselect(el)) {
            customEl.clear();
        }
        else if (customEl = this.isRte) {
            customEl.set('');
        }
        else if (el.tagName == 'SELECT') {
        }
        else {
            if (this.isClickType(el)) {
                el.checked = false;
            }
            else {
                if (el.tagName === 'DIV' || el.tagName === 'SPAN') {
                    el.innerHTML = '';
                }
                else {
                    el.value = '';
                }
            }
        }
    }
    toBool(value) {
        value = parseInt(value);
        return !!value;
    }
    toInt(val) {
        return val ? 1 : 0;
    }
    /**
     * @private
     * @param {Object} data
     * @returns {string}
     */
    htmlDecrypt(data) {
        let res = data;
        if (data && typeof data === 'string') {
            res = data.replace(/&#39;/g, "'");
            res = data.replace(/&quot;/g, '"');
        }
        return res;
    }
    /**
     * @private
     * @param {Object} data
     * @returns {string}
     */
    htmlEncrypt(data) {
        let res = data;
        if (data && typeof data === 'string') {
            res = data.replace(/'/g, '&#39;');
            res = data.replace(/"/g, '&quot;');
        }
        return res;
    }
}
