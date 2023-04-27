/**
 * <ad-test-filed
 *  id='id'
 *  ad-label='label'
 *  type'text|'
 *  
 *  >
 * </ad-text-filed>
 */

interface IParameter {
    id: string;
    type: string;
}

class ADTextField extends HTMLElement{
    private label: HTMLElement = null;
    private inputElement: HTMLInputElement = null;
    private focused: boolean = false;

    constructor(){
        super();
        const type = this.getAttribute('type');
        if(type != null && type != ''){
            this.render(type);
        }

        this.handleBodyClick = this.handleBodyClick.bind(this);

        this.label = this.querySelector('label');
        this.inputElement = this.querySelector('[ad-input-element]');
        
        if(this.inputElement.value.trim() != ''){
            this.floatLabel();
        }
        this.inputElement.addEventListener('input', e=>{
            if(!this.focused){
                if(this.inputElement.value.trim() == ''){
                    this.restoreLabel();
                } else {
                    this.floatLabel();
                }
            }
        });

        this.addEventListener('click', e=> {
            this.addFocusState();
            document.body.addEventListener('click',this.handleBodyClick);            
        });
    }
    
    private render(type:string):void{
    
        const id = this.id;
        const label = this.getAttribute('ad-label');
        const formElement = 'ad-form-element';
        const inputElement = 'ad-input-element';
        let value = this.getAttribute('value');
        if(value){
            value = ` value="${value}"`;
        }

        const typeHandlers: {[index: string]:any} = {
            'text': (id:string) => { 
                
                return `<input type="text" class="ad-element-input" name="${id}" ad-id="${id}" ${inputElement} ${formElement}${value}>`;
            },
            'search': (id:string) => {
                this.classList.add('ad-text-field--icon-left');
                return `
                <ad-icon class="ad-icon--20">
                        <svg viewBox="0 0 24 24">
                            <path d="M0 0h24v24H0V0z" fill="none"/>
                            <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
                        </svg>
                    </ad-icon>
                    <input type="text" class="ad-element-input" name="${id}" ad-id="${id}" ${inputElement} ${formElement}>`;
            },
            'date':  (id:string) => {
                this.classList.add('ad-text-field--date-time');
                return `<input type="date" class="ad-element-input" name="${id}" ad-id="${id}" ${inputElement} ${formElement}${value}>`;
            },
            'datetime': (id:string) => {
                this.classList.add('ad-text-field--date-time');
                return `<input type="datetime-local" class="ad-element-input" name="${id}" ad-id="${id}" ${inputElement} ${formElement}${value}>`;
            }
        }


        this.innerHTML = `<label for="${id}" class="ad-text-field-label">${label}</label>
        <ad-element>${typeHandlers[type](id)}</ad-element>
        <ad-helper-text></ad-helper-text>`;
        
        this.removeAttribute('id');
        this.removeAttribute('type');
        this.removeAttribute('ad-label');
    }

    private handleBodyClick(event:Event):void {
        if(this.isElementContainer(event.target)){
            return;
        }
        this.removeFocusState();
    }
   
    private isElementContainer(element:EventTarget):boolean{
        return this == element ||
        this.contains(element as HTMLElement);
    } 

    private addFocusState():void{
        this.floatLabel();
        this.classList.add('ad-form-field--focus');
        this.inputElement.focus();
        this.focused = true;
    }

    private removeFocusState():void{
        if(this.inputElement.value.trim() == ''){
            this.restoreLabel();
        }

        // Focus
        this.classList.remove('ad-form-field--focus');
        this.focused = false;

        // Remove body click
        document.body.removeEventListener('click',this.handleBodyClick);  
    }

    private floatLabel():void{
        this.label.classList.add('ad-text-field-label--float');
    }

    private restoreLabel():void{
        this.label.classList.remove('ad-text-field-label--float');
    }
}
window.customElements.define('ad-text-field', ADTextField);