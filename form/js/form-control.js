/**
 * ADInputGroup
 * ad-type
 *  text
 *  textarea
 *  search
 *  date
 *  datetime
 *  multiselect
 *  checkbox
 *  radiobutton
 * 
 */
class ADInputGroup extends HTMLElement{
    constructor(){
        super();
    }

    static get observedAttributes() {
        return ['ad-id', 'ad-type', 'ad-title'];
    }

    get id(){
        return this.getAttribute('ad-id');
    }

    set id(value){
        this.setAttribute('ad-id', value);
    }

    get componentType(){
        return this.getAttribute('ad-type');
    }

    set componentType(value){
        this.setAttribute('ad-type', value);
    }

    get componentTitle(){
        return this.getAttribute('ad-title');
    }

    set componentTitle(value){
        this.setAttribute('ad-title', value);
    }

    set componentTitle(value){
        this.setAttribute('ad-title', value);
    }

    connectedCallback(){
        const componentType = this.componentType;
        const id = this.id;
        const title = this.componentTitle;
        const types = {
            'text': m=>{ 
                return `<input type="text" class="ad-form-control" name="${m}" ad-id="${m}">`;
            },
            'search': m=>{
                return `
                    <input type="text" class="ad-form-control" name="${m}" ad-id="${m}">
                    <ad-icon class="ad-icon-button"><svg viewBox="0 0 24 24"><g><path d="M20.87,20.17l-5.59-5.59C16.35,13.35,17,11.75,17,10c0-3.87-3.13-7-7-7s-7,3.13-7,7s3.13,7,7,7c1.75,0,3.35-0.65,4.58-1.71 l5.59,5.59L20.87,20.17z M10,16c-3.31,0-6-2.69-6-6s2.69-6,6-6s6,2.69,6,6S13.31,16,10,16z"></path></g></svg></ad-icon>`;
            },
            'multiselect': m=>{
                return `<duv ad-id="${m}" ad-ms-default-text="Please Select"></div>`;
            },
            'date': m=>{
                return `<input type="date" class="ad-form-control" name="${m}" ad-id="${m}">`;
            },
            'datetime': m=>{
                return `<input type="datetime-local" class="ad-form-control" name="${m}" ad-id="${m}">`;
            }
        }
        this.innerHTML = `
          <label for="${id}" class="ad-input-group-text">${title}</label>
          <ad-control-group class="ad-control-group">${types[componentType](id)}</ad-control-group>`;
    }

    

}
window.customElements.define('ad-input-group', ADInputGroup);