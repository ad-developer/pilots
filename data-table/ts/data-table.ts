/**
 * ad-dt
 *  sticky
 *  small
 *      
 *  
 */



interface IConfig {
    label: string;
    sort: boolean;
    width: number;
}

interface IHandler {
    key: string,
    handler: any;
}

interface IDataTable {
    config(data:any):void;
    bind(data: any):void;
    addHandler(handler: IHandler):void;
}

class ADDataTable extends HTMLElement implements IDataTable{
    tblBody: HTMLTableSectionElement;
    tblHeader: HTMLTableSectionElement;
    handlers: any;

    constructor(){
        super();
        // Get attributes

        // Render 
        // Table
        const tbl = document.createElement('table');
        tbl.classList.add('ad-dt__table');
       
        // Table header
        const tblHeader = document.createElement('thead');
        tbl.appendChild(tblHeader);
        this.tblHeader = tblHeader;
        
        // Table body
        const tblBody = document.createElement('tbody');
        tbl.appendChild(tblBody);
        this.tblBody = tblBody;
        
        this.innerHTML = this.render();
    }

    /**
     * 
     * @param handler 
     */
    addHandler(handler: IHandler): void {
       this.handlers[handler.key] = handler;
    }

    /**
     * 
     * @param data 
     */
    public config(data: Map<string, IConfig>): void {
       const entries = Object.entries(data);
       let hContent = ''; 
       const cssClass = 'ad-dt__header-cell';
       
       for (const [id, val] of entries) {
            
            let cContent = `${val.label}`;
            if(val.sort){
                cContent = `<ad-dt-c-text>${val.label}</ad-dt-c-text><ad-icon><svg viewBox="0 0 24 24"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M4 12l1.41 1.41L11 7.83V20h2V7.83l5.58 5.59L20 12l-8-8-8 8z"/></svg></ad-icon>`;
            }   
            
            let cWidth = '';
            if(val.width){
                cWidth = ` style='width:${val.width}px`;
            }

            hContent +=
                `<th class='${cssClass}'${cWidth}>${cContent}</th>`;
       }

       this.tblHeader.innerHTML = hContent;
    }

    /**
     * 
     * @param data 
     */
    public bind(data: any): void {
        
    }

    //#region Private members 
    
    private render():string{
        return ``;
    }

    //#endregion
}
window.customElements.define('ad-dt', ADDataTable);