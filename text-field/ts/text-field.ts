class ADTextField extends HTMLElement{
    private label: HTMLElement = null;
    private inputElement: HTMLInputElement = null;
    private focused: boolean = false;

    constructor(){
        super();
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
            document.body.addEventListener('click', e=>{
                this.handleBodyClick(e);
            });            
        });
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
        document.body.removeEventListener('click', e=>{
            this.handleBodyClick(e);
        });  
    }

    private floatLabel():void{
        this.label.classList.add('ad-text-field-label--float');
    }

    private restoreLabel():void{
        this.label.classList.remove('ad-text-field-label--float');
    }
}
window.customElements.define('ad-text-field', ADTextField);