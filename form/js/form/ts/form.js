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
    get values() {
        let res = {};
        if (this.validator_.isValid()) {
            let val;
            this.elements_.forEach(el => {
                if (el.hasAttribute('ad-ms-default-text')) {
                    const ms = ADMultiselect.attachTo(el);
                    if (ms) {
                        val = ms.getSelectedData();
                    }
                }
                else {
                    val = el.getAttribute('ad-value');
                    if (!val) {
                        if (this.isClickType(el)) {
                            val = this.toInt(el.checked);
                        }
                        else {
                            val(el).value;
                        }
                    }
                }
                res[el.id] = {
                    value: this.htmlEncrypt(val),
                    label: el.getAttribute('label'),
                    adLabel: el.getAttribute('ad-label')
                };
            });
        }
        return res;
    }
    /**
     * init
     * @param parameters
     */
    init(parameters) {
        const meta = parameters.meta;
        if (meta) {
            this.build(meta);
        }
        this.createElementList();
        this.trackElements(false);
        this.validator_ = parameters.validator(this.root);
    }
    /**
     * bind
     * @param {object[]} data
     * @returns {void}
     */
    bind(data) {
        // Remove tracing to prevent firing 
        // form.change event 
        this.trackElements(true);
        for (const [key, value] of Object.entries(data)) {
            const el = this.root.querySelector(`[id="${key}"]`);
            if (el) {
                let processed = false;
                // Text area or ADRte
                if (el.tagName === 'TEXTAREA') {
                    // See if ADRte is used 
                    if (ad.ADRte) {
                        // Try to get instance of the ADRte
                        const inst = ad.ADRte.getInstance(el);
                        if (inst) {
                            inst.set(value);
                            processed = true;
                        }
                    }
                    // multiselect        
                }
                else if (el.hasAttribute('ad-ms-default-text')) {
                    let inst;
                    if (inst = this.isMultiselect(el)) {
                        inst.selectedData(value);
                        processed = true;
                    }
                    // Check box or radio button 
                }
                else if (this.isClickType(el)) {
                    el.checked = this.toBool(value);
                    processed = true;
                    // Everything else     
                }
                else {
                    if (el.nodeType === 'DIV' || el.nodeType === 'SPAN') {
                        el.innerHTML = this.htmlDecrypt(value);
                        processed = true;
                    }
                }
                if (!processed) {
                    el.value = this.htmlDecrypt(value);
                }
                if (el.nodeType == 'SELECT') {
                    this.emit('change', null, null, el);
                }
            }
        }
        // Set tracing 
        this.trackElements(false);
    }
    getFormElementData(id) {
    }
    bindFormElement(data) {
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
        });
    }
    //#region  Private members 
    createElementList() {
        this.elements_ = this.root.querySelectorAll('[ad]');
    }
    trackElements(untrack) {
        this.elements_.forEach(el => {
            let eventType = 'blur';
            if (el.nodeType.toString() == 'SELECT') {
                eventType = 'change';
            }
            else if (this.isClickType(el)) {
                eventType = 'click';
            }
            if (untrack) {
                el.removeEventListener(eventType, this.trackElementHandler);
            }
            else {
                el.addEventListener(eventType, this.trackElementHandler);
            }
        });
    }
    isClickType(el) {
        const res = el.matches('[type="checkbox"]')
            || el.matches('[type="radio"]');
        return res;
    }
    trackElementHandler(e) {
        this.emit('form.change', { event: e });
    }
    isMultiselect(element) {
        let res = null;
        if (ad.ADMultiselect) {
            res = ADMultiselect.getInstance(element);
        }
        return res;
    }
    toBool(value) {
        value = parseInt(value);
        return !!value;
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
    toInt(val) {
        return val ? 1 : 0;
    }
}
