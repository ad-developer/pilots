/**
 * ADForm class
 */
class ADForm extends ADComponent {
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
     * getter
     */
    get values() {
        let res = {};
        if (this.validator_ == null || this.validator_.isValid()) {
            this.elements_.forEach(el => {
                const val = this.getElementValue(el);
                res[el.getAttribute('ad-id')] = val;
            });
        }
        return res;
    }
    /**
     * values
     * setter
     */
    set values(data) {
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
        this.parameters = parameters;
        const meta = parameters?.meta;
        if (meta) {
            this.build(meta);
        }
        this.bind();
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
     *
     * Template
     * [
     *  {
     *      id: 'id'
     *      tag: 'input'
     *      attributes: [
     *                      { 'type': 'text'},
     *                       ...
     *                  ]
     *  },
     * ]
     * @param {Array<IElement>} elements
     */
    build(elements) {
        elements.forEach(el => {
            this.root.innerHTML += this.buildElement(el);
        });
        this.applyOptions(elements);
        this.bind();
    }
    clear() {
        // Remove tracing to prevent firing 
        // form.change event 
        this.trackElements(true);
        this.elements_.forEach(el => {
            this.clearElement(el);
        });
        // Set tracing 
        this.trackElements(false);
        this.emit('form.clear', {});
    }
    //#region  Private members 
    bind() {
        this.createElementList();
        this.trackElements(false);
        if (this.elements_.length > 0) {
            this.validator_ = this.parameters.validator?.(this.root);
        }
    }
    applyOptions(elements) {
        elements.filter(el => el.options != null)
            .forEach(el => {
            const element = this.root.querySelector(`[ad-id='${el.id}']`);
            element.bind(el.options);
        });
    }
    buildElement(element) {
        const el = element.tag.toLowerCase();
        let end = '';
        let attrAll = ` ad-id='${element.id}'`;
        if (element.tag == 'ad-text-field') {
            attrAll = ` id='${element.id}'`;
        }
        if (el != 'input') {
            end = `</${el}>`;
        }
        element.attributes.forEach(item => {
            for (let [attr, value] of Object.entries(item)) {
                if (value != '') {
                    value = `='${value}'`;
                }
                attrAll += ` ${attr}${value}`;
            }
        });
        return `<${el} ${attrAll}>${end}`;
    }
    createElementList() {
        this.elements_ = this.root.querySelectorAll('[ad-id][ad-form-element]');
    }
    trackElements(untrack) {
        this.elements_.forEach(el => {
            this.trackElement(el, untrack);
        });
    }
    trackElement(el, untrack) {
        let eventType = 'input';
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
        return element.tagName == 'AD-MS';
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
            if (this.isMultiselect(el)) {
                // TODO: Create ms interface and use it as the data type
                // for casting instead of any.
                val = el.values;
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
            if (this.isMultiselect(el)) {
                el.values = value;
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
                    this.emit('input', null, null, el);
                }
            }
            if (el.tagName == 'SELECT') {
                this.emit('change', null, null, el);
            }
        }
    }
    clearElement(el) {
        let customEl = null;
        if (this.isMultiselect(el)) {
            // TODO: User multiselect type
            el.clear();
        }
        else if (customEl = this.isRte(el)) {
            customEl.set('');
        }
        else if (el.tagName == 'SELECT') {
            //TODO: 
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
                    this.emit('input', null, null, el);
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
