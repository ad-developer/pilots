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
    validator_: any;
  
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
    public get values(): any {
        
        let res:any = {}
        if(this.validator_.isValid()){
            
            let val:any;
            this.elements_.forEach(el=>{
                if(el.hasAttribute('ad-ms-default-text')){
                    const ms = ADMultiselect.attachTo(el);
                    if(ms){
                        val = ms.getSelectedData();
                    }
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

                res[el.id] = {
                    value: this.htmlEncrypt(val),
                    label: el.getAttribute('label'),
                    adLabel: el.getAttribute('ad-label')
                };

            });
        }
        
        return res
    }

    /**
     * init
     * @param parameters 
     */
    override init(parameters: IParameters): void {
        const meta = parameters.meta;

        if(meta){
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
    public bind(data:object[]):void {
        
        // Remove tracing to prevent firing 
        // form.change event 
        this.trackElements(true);
        for (const [key, value] of Object.entries(data)) {
            const el = this.root.querySelector<any>(`[id="${key}"]`);
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
                    if(inst = this.isMultiselect(el)){
                        inst.selectedData(value);
                        processed = true;
                    }
                    
                    // Check box or radio button 
                } else if(this.isClickType(el)){
                    el.checked = this.toBool(value);
                    processed = true;
                    // Everything else     
                } else {
                    if(el.nodeType === 'DIV' || el.nodeType === 'SPAN'){
                        el.innerHTML = this.htmlDecrypt(value);
                        processed = true;
                    }
                }
                if(!processed){
                    el.value = this.htmlDecrypt(value);
                }
                if(el.nodeType == 'SELECT'){
                    this.emit('change', null, null, el);
                }
            }
        }
        // Set tracing 
        this.trackElements(false);
    }

    public getFormElementData(id:string):any {
        const el = this.root.querySelector(`[id='${id}']`);
        if(el){
            let ms;
            let res;
            if(ms = this.isMultiselect(el)){
                res = 
            }
        }
    }

    public bindFormElement(data:any):void{

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
            
        });
    }

    //#region  Private members 

    private createElementList():void {
        this.elements_ = this.root.querySelectorAll('[ad]');
    }

    private trackElements(untrack:boolean):void {
        this.elements_.forEach(el=>{
            let eventType = 'blur';
            if(el.nodeType.toString() == 'SELECT'){
                eventType = 'change';
            } else if(this.isClickType(el)){
                eventType = 'click';
            }
            if(untrack){
                el.removeEventListener(eventType, this.trackElementHandler);
            } else {
                el.addEventListener(eventType, this.trackElementHandler);
            }
        });
    }

    private isClickType(el:Element):boolean {
        const res = el.matches('[type="checkbox"]') 
            || el.matches('[type="radio"]');

        return res;
    }

    

    private trackElementHandler(e:Event):void {
        this.emit('form.change', {event: e});
    }

    private isMultiselect(element: Element):any {
        
        let res:any = null;
        if(ad.ADMultiselect){
            res = ADMultiselect.getInstance(element);
        }

        return res;
    }
    
    private toBool(value:any):boolean {
        value = parseInt(value);
        return !!value;
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

    private toInt(val:boolean):number{
        return val? 1: 0;
    }

    //#endregion
}