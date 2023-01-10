/**
 *  Element template 
 *  {
 *      element: 'element',
 *      tag: 'div',
 *      attributes: [
 *                      {attr: '', value: ''}, 
 *                      {attr: 'ad-id': value: model.id}, 
 *                      {}
 *                  ], 
 *      children: []
 *  }
 * 
 *  Element model
 *  {
 *    element: 'element',
 *    handler:(meta) => { return 'html'}
 *  }
 */

/** Class representing a base ADForm. */
 class ADForm extends ADComponent {
    
    static elementModels = [];
    /**
     * 
     * {
     *  element: 'rte'
     *  handler: (meta) => {
     *      // Meta refer to the 
     *      // object used to render and customize 
     *      //  the control/builder (see build method)
     *      // EXAMPLE:
     *      
     *      const fixture = `
     *          <div
     *              <label>${}</label>
     *          <div?
     *      `;
     *      return fixture;
     *  }
     * }
     * 
     * @param {Object} builder 
     */
    static addControlBuilder(builder){
        ADForm.controlBuilders.push(builder);
    }
     /**
     * @param {!Element} root
     * @return {!ADForm}
     */
    static attachTo(root, ...args) {
        const instanceKey = 'ad-form';
        let instance = root.ad && root.ad[instanceKey] ?
            root.ad[instanceKey] : null;
        
            if(!instance){
            instance = new ADChip(root, ...args);

            // Attach instance to the root
            root.ad = root.ad || {};
            root.ad[instanceKey] = instance;
        }
        return instance;
    }

    /**
     * @param {...?} args
     */
    init(settings) {
        const $this = this;
        
        const formMetaData = settings.formMetaData;
        if(formMetaData){
            $this.build(formMetaData);
        }

        $this.controls_ = null;
        $this.createControlList_();
        
        $this.traceControls_();

        // Init validator
        $this.validator_ = settings.validator($this.root_);
    }

    /**
     * bind
     * @param {!Object} data. Data is a json based object in the 
     * key - value format
     * {
     *  name: 'John Smith',
     *  phoneNumber: '8888888888'
     * } 
     * The method will go over the all keys and try to find element fo the form 
     * with the matching ad-id. 
     */
    bind(data){
        // Remove tracing to prevent firing 
        //form.change event 
        this.traceControls_(true);
        for (const [key, value] of Object.entries(data)) {
            const el = this.root_.querySelector(`[ad-id="${key}"]`);
            if (el) {
                
                let processed = false;
                // Text area or ADRte
                if(el.tagName === 'TEXTAREA'){
                    // See if ADRte is used 
                    if(ad.ADRte){
                        // Try to get instance of the ADRte
                        const inst = ad.ADRte.getInstance(el);
                        if(inst){
                            inst.set(value);
                            processed = true;
                        } 
                    } 
                // multiselect        
                } else if(el.hasAttribute('ad-ms-default-text')){
                    
                    let inst;
                    if(inst = this.isMultiselect_()){
                        inst.selectedData(value);
                        processed = true;
                    }
                    
                    // Check box or radio button 
                } else if(this.isClickType_(el)){
                    el.checked = this.toBool_(value);
                    processed = true;
                    // Everything else     
                } else {
                    if(el.nodeType === 'DIV' || el.nodeType === 'SPAN'){
                        el.innerHTML = this.htmlDecrypt_(value);
                        processed = true;
                    }
                }
                if(!processed){
                    el.value = this.htmlDecrypt_(value);
                }
                if(el.nodeType === 'SELECT'){
                    // TODO: This is a placeholder for 
                    // potential change event trigger on the 
                    // select control.
                }
            }
        }
        // Set tracing 
        this.traceControls_(true);
    }

    /**
     * getData
     * @returns {!Object} data.
     */
    getData() {
        if(this.validator_.isValid()){
            const res = {};
            this.controls_.forEach(el => {
                let value;
                if(el.hasAttribute('ad-ms-default-text')){
                    let inst;
                    if(inst = this.isMultiselect_(el)){
                        value = inst.getSelectedData();
                    }
                } else {
                    value = el.getAttribute('ad-data');
                    if(!value){
                        if(this.isClickType_(el)){
                            value = this.toInt_(el.checked);
                        } else {
                            value = el.value;
                        }
                    }
                }
                res[el.getAttribute('ad-id')] = this.htmlEncrypt_(value);
            });
            return res;
        }
    }

    /**
     * clearData
     */
    clearData(){
         // Remove tracing to prevent firing 
        //form.change event 
        this.traceControls_(true);

        this.controls_.forEach(el => {
            
            let processed = false;
            let inst;
            if(el.hasAttribute('ad-ms-default-text')){
                if(inst = this.isMultiselect_(el)){
                    inst.clear();
                    processed = true;
                }
            } else if(el.tagName === 'TEXTAREA'){
                if(inst = this.isRte_(el)){
                    inst.clear()
                    processed = true;
                }
            } else if(el.tagName === 'SELECT'){
                this.clearSelect_(el);
                processed = true;
            } else if(inst = this.isClickType_(el)){
                el.checked = false;
                processed = true;
            } else if(el.tagName === 'DIV' || el.tagName === 'SPAN'){
                el.innerHTML = '';
                processed = true;
            } 
            
            if(!processed){
                el.value = '';
            }
        });
        
        // Set tracing 
        this.traceControls_(true);
        
        // Remove validator errors
        // this will be replaced by the validator 
        // api validarot.clearErrors(); 
        const errors = this.root_.querySelectorAll('.ad-error');
        errors.forEach(el => {
            el.classList.remove('ad-error');
        });
    }
    
    /**
     * 
     * @param {!Object} formMetaData is json based object.
     * {
     *  element: 'div',
     *  attributes: [{attribute: '', value":''],
     *  children: [
     *              {
     *               element: div, 
     *               attributes:, 
     *               children:[]
     *              }
     *  ],
     *  observer: {
     *              elementId; '', 
     *              event: '', 
     *              value: ''
     *  }
     * } 
     */
    render(formMetaData){
        throw 'Not implemented';
    }

    /**
     * @private
     * Creates control list. 
     */
    createControlList_(){
        const controls = this.root_.querySelectorAll('[ad-id]');
        this.controls_ = controls;
    }
    
    /**
    * @private
    * @param {boolean} untrace - untrace(true)/trace(false) 
    */
    traceControls_(untrace){
        this.controls_.forEach(el=>{
            let eventType = 'blur';
            if(el.nodeType === 'SELECT'){
                eventType = 'change';
            } else if(this.isClickType_(el)){
                eventType = 'click';
            }
            if(untrace){
                el.removeEventListener(eventType, this.traceControlHandler_);
            } else {
                el.addEventListener(eventType, this.traceControlHandler_);
            }
        });
    }

    /**
     * @private
     * @param {!Event} e - element event 
     */
    traceControlHandler_(e){
        this.emit('form.change', {event: e});
    }
    
    /**
     * @private
     * @param {!Element} el 
     * @returns {boolean} 
     */
    isClickType_(el){
        const res = el.matches('[type="checkbox"]') 
            || el.matches('[type="radio"]');

        return res;
    }

    /**
     * @private
     * @param {!string} value 
     * @returns {boolean}
     */
    toBool_(value){
        value = parseInt(value);
        return !!value;
    }

    toInt_(value){
        return value? 1: 0;
    }

    /**
     * @private
     * @param {Object} data 
     * @returns {string}
     */
    htmlDecrypt_(data){
        let res = data;
        if(data && typeof data === 'string'){
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
     htmlEncrypt_(data){
        let res = data;
        if(data && typeof data === 'string'){
            res = data.replace(/'/g, '&#39;');
            res = data.replace(/"/g, '&quot;');
        } 
        return res;
    }

    isMultiselect_(el){
        if(ad.ADMultiselect){
            return el = ad.ADMultiselect.getInstance(el);
        }
    }
    
    isRte_(el){
        if(ad.ADRte){
            return el = ad.ADRte.getInstance(el);
        }
    }

    clearSelect_(el){
        const options = el.querySelectorAll('options');
        for (let index = 0, l =  options.length; index < l ; index++) {
            options[i].selected = options[i].defaultSelected;
        }
    }
  }