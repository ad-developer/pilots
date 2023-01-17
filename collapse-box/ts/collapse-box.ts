interface ICollapseBox{
    adId: string;
    componentTitle: string;

    close():void;
    open():void;
    highlightTitle():void;
    unHighlightTitle():void;
    
    render(values:object):string;
    addButton(html:string, action: (event:Event)=> void):void;
}

interface IContent {
    content:string;
}

/**
 * Custom component for ad-collapse-box html tag
 * window.customElements.define('ad-collapse-box', ADCollapseBox);
 * Usage:
 *  ad-title
 *  ad-id
 *  ad-initial-state 
 */
class ADCollapseBox extends HTMLElement implements ICollapseBox{
    
    get adId(){
        return this.getAttribute('ad-id');
    }

    set adId(value){
        this.setAttribute('ad-id', value);
    }

    get componentTitle(){
        return this.getAttribute('ad-title');
    }

    set componentTitle(value){
        this.setAttribute('ad-title', value);
    }

    static get observedAttributes() {
        return ['ad-id', 'ad-title'];
    }

    constructor(){
        super();
        
        const content = this.innerHTML;
        this.innerHTML = this.render({ content:content});
        
    }

    render(values:IContent): string {
        return `<ad-collapse-box-title>
            <ad-cb-title></ad-cb-title>
            <ad-cb-button></ad-cb-button-title>
        </ad-collapse-box-title>
        <ad-cb-content>${values.content}</ad-cb-content>`;
    }

    addButton(html: string, action: (event: Event) => void): void {
        
        throw new Error("Method not implemented.");
    }

    highlightTitle(): void {
        throw new Error("Method not implemented.");
    }

    unHighlightTitle(): void {
        throw new Error("Method not implemented.");
    }

    close(): void {
        throw new Error("Method not implemented.");
    }

    open(): void {
        throw new Error("Method not implemented.");
    }
}