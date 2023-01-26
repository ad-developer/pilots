import {ADComponent} from '../../shared/ts/component';

/**
 * Declare external variables 
 */
declare var ad: any;
declare var ADMultiselect: any;

/**
 * Settings inter
 */
interface IParameters {
    validator: (root:Element)=>{};
    meta: Array<object>;
}


export class ADForm extends ADComponent{
   
    private elements_: NodeListOf<HTMLElement>;
    private validator_: any;
  
    /**
    * attachTo
    * @param {Element}root
    * @param {Array} args
    * @returns {ADForm}
    */
    static override attachTo(root: Element, ...args: undefined[]): ADForm {
        return new ADForm(root, ...args);
    }

    /**
     * values 
     */
    public get value(): any {
        let res:any = {}
        if(this.validator_ == null || this.validator_.isValid()){
            this.elements_.forEach(el=>{
                const val = this.getElementValue(el);
                res[el.id] = {
                    value: this.htmlEncrypt(val),
                    label: el.getAttribute('label'),
                    adLabel: el.getAttribute('ad-label')
                };
            });
        }
        
        return res
    }
    
    public set value(data:object[]){
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
    override init(parameters: IParameters): void {
        const meta = parameters?.meta;

        if(meta){
            this.build(meta);
        }

        this.createElementList();
        this.trackElements(false);
        
        this.validator_ = parameters.validator(this.root);
    }

    public getElementData(id:string):any {
        const el = this.root.querySelector(`[ad-id='${id}']`);
        const res = this.getElementValue(el as HTMLElement);
        return res;
    }

    public setElementData(id:string, value:any):void{
       this.setElementValue(id, value);
    }

    /**
     * build
     * @param {Array<object>} meta 
     */
    public build(meta:Array<object>):void {
        throw new Error('Not Implemented'); 
    }

    public clear():void {
        this.elements_.forEach(el=>{
            this.clearElement(el);
        });
    }

    //#region  Private members 

    private createElementList():void {
        this.elements_ = this.root.querySelectorAll('[ad-ad][ad-form-element]');
    }

    private trackElements(untrack:boolean):void {
        this.elements_.forEach(el=>{
            this.trackElement(el, untrack);
        });
    }
    
    private trackElement(el:HTMLElement, untrack: boolean):void {
        let eventType = 'keyup';
       
        if(this.isMultiselect(el)  
            || this.isRte(el)
            || el.tagName == 'SELECT'){
            eventType = 'change'
        } else if(this.isClickType(el)){
            eventType = 'click';
        }
        
        if(untrack){
            el.removeEventListener(eventType, e=>this.trackElementHandler(e));
        } else {
            el.addEventListener(eventType, e=>this.trackElementHandler(e));
        }
    }

    private trackElementHandler(e:Event):void {
        this.emit('form.change', {event: e});
    }

    private isClickType(el:Element):boolean {
        const res = el.matches('[type="checkbox"]') 
            || el.matches('[type="radio"]');

        return res;
    }

    private isMultiselect(element: Element):any {
        
        let res:any = null;
        if(element.hasAttribute('ad-ms-default-text')){
            res = ad.ADMultiselect.attachTo(element);
        }

        return res;
    }
    
    private isRte(element: Element):any {
        
        let res:any = null;
        if(element.hasAttribute('ad-rte')){
            res = ad.ADRte.getInstance(element);
        }

        return res;
    }

    /**
     * getElementValue
     * @param {HTMLElement} el 
     * @returns {any} 
     */
    private getElementValue(el:HTMLElement):any {
        
        let res:any = null;
        
        if(el) {
            let val:any;
            let customEl: any;

            if(customEl = this.isMultiselect(el)) {
                val = customEl.getSelectedData();
            } else if(customEl = this.isRte(el)) {
                val = customEl.getValue();
            } else {
                val = el.getAttribute('ad-value');
               
                if(!val){
                    if(this.isClickType(el)){
                        val = this.toInt((el as HTMLInputElement).checked);
                    } else {
                        val (el as HTMLInputElement).value;
                    }
                }     
            }
    
            res = {
                value: this.htmlEncrypt(val),
                label: el.getAttribute('label'),
                adLabel: el.getAttribute('ad-label')
            }
        }

        return res;
    }

    private setElementValue(id:string, value:any):void {

        const el = this.root.querySelector<any>(`[ad-id="${id}"]`);
        if (el) {
            
            let customEl:any = null;
            if(customEl = this.isMultiselect){
                customEl.setSelectedData(value);
               
            } else if(customEl = this.isRte(el)){
                customEl.set(value);     
              
                // Check box or radio button 
            } else if(this.isClickType(el)){
                el.checked = this.toBool(value);
             
                    
            } else {
                if(el.tagName === 'DIV' || el.tagName === 'SPAN'){
                    el.innerHTML = this.htmlDecrypt(value);
                } else {
                    el.value = this.htmlDecrypt(value);
                }
            }
            if(el.tagName == 'SELECT') {
                this.emit('change', null, null, el);
            }
        }
    }

    private clearElement(el:HTMLElement):void {
        let customEl:any = null;
        if(customEl = this.isMultiselect(el)){
            customEl.clear();
        } else if(customEl = this.isRte){
            customEl.set('');
        } else if(el.tagName == 'SELECT'){

        } else {
            if(this.isClickType(el)){
                (el as HTMLInputElement).checked = false;
            } else {
                if(el.tagName === 'DIV' || el.tagName === 'SPAN'){
                    el.innerHTML = '';
                } else {
                    (el as HTMLInputElement).value = '';
                }
            }
        }
    }

    private toBool(value:any):boolean {
        value = parseInt(value);
        return !!value;
    }
    
    private toInt(val:boolean):number{
        return val? 1: 0;
    }
    /**
     * @private
     * @param {Object} data 
     * @returns {string}
     */
    private htmlDecrypt(data:any):string{
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
    private htmlEncrypt(data: any): string{
        let res = data;
        if(data && typeof data === 'string'){
            res = data.replace(/'/g, '&#39;');
            res = data.replace(/"/g, '&quot;');
        } 
        return res;
    }
    //#endregion
}