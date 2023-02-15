import {ADComponent} from '../../shared/ts/component';

/**
 * Declare external variables 
 */
declare var ad: any;

interface IThrottle {
    (event:Event): void;
}

interface IElement {
    id:string;
    tag:string;
    attributes: Array<Map<string, string>>;
    options: Array<Map<string, string>>;
}

/**
 * Settings interface
 */
interface IParameters {
    validator: (root:Element)=>{};
    meta: Array<IElement>;
    throttling: boolean;
    delay: number; 
}

/**
 * IForm interface
 */
interface IForm {
    values: any;
    getElementData(id:string):any;
    setElementData(id:string, value:any):void;
    build(meta:Array<object>):void;
}

/**
 * ADForm class
 */
export class ADForm extends ADComponent implements IForm {
   
    private elements_: NodeListOf<HTMLElement> = null;
    private validator_: any = null;
    parameters: IParameters = null;
    change: boolean = false;
    timerId: any = undefined;

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
     * getter
     */
    public get values(): any {
        let res:any = {}
        if(this.validator_ == null || this.validator_.isValid()){
            this.elements_.forEach(el=>{
                const val = this.getElementValue(el);
                res[el.getAttribute('ad-id')] = val;
            });
        }
        
        return res
    }
    
    /**
     * values 
     * setter
     */
    public set values(data:object[]){
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
        this.parameters = parameters;
        const meta = parameters?.meta;

        if(meta){
            this.build(meta);
        } else {
            this.bind();
        }
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
    public build(elements:Array<IElement>):void {
        elements.forEach(el=>{
            this.root.innerHTML += this.buildElement(el);
        });

        this.applyOptions(elements);

        this.bind();
    }

    public clear():void {
        // Remove tracing to prevent firing 
        // form.change event 
        this.trackElements(true);
        
        this.elements_.forEach(el=>{
            this.clearElement(el);
        });

         // Set tracing 
         this.trackElements(false)

         this.emit('form.clear', {});
    }

    //#region  Private members 

    private bind():void{
        this.createElementList();
        this.trackElements(false);
        
        if(this.elements_.length > 0){
            this.validator_ = this.parameters?.validator?.(this.root);
        }
    }

    private applyOptions(elements:Array<IElement>):void{
        elements.filter(el=> el.options != null)
        .forEach(el=>{
            const element = this.root.querySelector(`[ad-id='${el.id}']`);
            (element as any).bind(el.options);
        });
    }

    private buildElement(element:IElement):string {
        const el = element.tag.toLowerCase();
        let end = '';
        let attrAll = ` ad-id='${element.id}'`;
        if(element.tag == 'ad-text-field'){
            attrAll = ` id='${element.id}'`;
        }
        
        if(el != 'input'){
            end = `</${el}>`;
        }
        element.attributes.forEach(item=>{
            for(let [attr, value] of Object.entries(item)){
                if(value != ''){
                    value =  `='${value}'`;
                }
                attrAll += ` ${attr}${value}`; 
            }
        });
        return `<${el} ${attrAll}>${end}`;
    }

    private createElementList():void {
        this.elements_ = this.root.querySelectorAll('[ad-id][ad-form-element]');
    }

    private trackElements(untrack:boolean):void {
        this.elements_.forEach(el=>{
            this.trackElement(el, untrack);
        });
    }
    
    private trackElement(el:HTMLElement, untrack: boolean):void {
        let eventType = 'input';
       
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
        const fun = (e:Event)=>{
            this.emit('form.change', {event: e});
        }
        if(this.parameters?.throttling){
            
            let delay = this.parameters.delay;
            if(!delay){
                delay = 1000;
            }
            this.trackElementHandlerWithDelay(fun, e, delay);
        } else {
            fun(e);
        }
    }

    private trackElementHandlerWithDelay(cb:IThrottle, event:Event,  delay:number):void{
        if (this.timerId) {
            this.change = true;
            return;
        }

        cb(event);
        // Schedule a setTimeout after delay seconds
        this.timerId  =  setTimeout(()=>{
            if(this.change){
                cb(event);
            }     
            this.change = false;
            this.timerId  =  undefined;
        }, delay)
    }

    private isClickType(el:Element):boolean {
        const res = el.matches('[type="checkbox"]') 
            || el.matches('[type="radio"]');

        return res;
    }

    private isMultiselect(element: Element):boolean {
        return element.tagName == 'AD-MS';
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

            if(this.isMultiselect(el)) {
                // TODO: Create ms interface and use it as the data type
                // for casting instead of any.
                val = (el as any).values;
            } else if(customEl = this.isRte(el)) {
                val = customEl.getValue();
            } else {
                val = el.getAttribute('ad-value');
               
                if(!val){
                    if(this.isClickType(el)){
                        val = this.toInt((el as HTMLInputElement).checked);
                    } else {
                        val = (el as HTMLInputElement).value;
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
            if(this.isMultiselect(el)){
                el.values = value;
               
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
                    this.emit('input', null, null, el);
                }
            }
            if(el.tagName == 'SELECT') {
                this.emit('change', null, null, el);
            }
        }
    }

    private clearElement(el:HTMLElement):void {
        let customEl:any = null;
        if(this.isMultiselect(el)){
            // TODO: User multiselect type
            (el as any).clear();
        } else if(customEl = this.isRte(el)){
            customEl.set('');
        } else if(el.tagName == 'SELECT'){
            //TODO: 
        } else {
            if(this.isClickType(el)){
                (el as HTMLInputElement).checked = false;
            } else {
                if(el.tagName === 'DIV' || el.tagName === 'SPAN'){
                    el.innerHTML = '';
                } else {
                    (el as HTMLInputElement).value = '';
                    this.emit('input', null, null, el);
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