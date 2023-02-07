/**
 * html
 * <ad-ms
 *      ad-label="Label text"
 *      type="dropdown"list"
 *      ad-search
 *      ad-selected-selected
 *      ></ad-ms>
 */


class ADMultiselect extends HTMLElement {
    private label: HTMLElement = null;
    private focused: boolean = false;

    constructor(){
        super();
        
        const label = this.getAttribute('ad-label');
        this.innerHTML = this.render(label);
        



        this.addEventListener('click', e=> {
            this.addFocusState();
            document.body.addEventListener('click', e=>{
                this.handleBodyClick(e);
            });            
        });
    }

    private render(label:string):string {
        return `<ad-ms-header><ad-ms-header-content><ad-icon class="ad-icon--20 ad-ms-check"><svg viewBox="0 0 24 24" class="ad-ms-not-selected"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"/> </svg><svg viewBox="0 0 24 24" class="ad-ms-selected"><path d="M0 0h24v24H0V0z" fill="none"/> <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zM17.99 9l-1.41-1.42-6.59 6.59-2.58-2.57-1.42 1.41 4 3.99z"/></svg></ad-icon><ad-ms-header-text></ad-ms-header-text><ad-icon class="ad-icon--20 ad-ms-search"><svg viewBox="0 0 24 24"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/> </svg> </ad-icon> <ad-icon class="ad-icon--20 ad-ms-arrow"><svg viewBox="0 0 24 24"><path d="M0 0h24v24H0V0z" fill="none"/> <path d="M7 10l5 5 5-5H7z"/></svg></ad-icon> </ad-ms-header-content> <ad-ms-label>${label}</ad-ms-label> </ad-ms-header> <ad-ms-body> <ad-ms-l></ad-ms-l> </ad-ms-body>`;
    }

    private renderListItem():string{
        return ``;
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
        this.focused = true;
    }

    private removeFocusState():void{
       
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

window.customElements.define('ad-ms', ADMultiselect);