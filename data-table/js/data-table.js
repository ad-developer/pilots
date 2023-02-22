/**
 * ad-dt
 *  sticky
 *  small
 *
 *
 */
class ADDataTable extends HTMLElement {
    tblBody;
    tblHeader;
    constructor() {
        super();
        // Get attributes
        // Render 
        // Table
        const tbl = document.createElement('table');
        tbl.classList.add('ad-dt__table');
        if (tbl.hasAttribute('sticky')) {
            tbl.classList.add('ad-dt__table--sticky-header');
        }
        if (tbl.hasAttribute('small')) {
            tbl.classList.add('ad-dt__table--small');
        }
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
    config(data) {
    }
    bind(data) {
    }
    //#region Private members 
    render() {
        return ``;
    }
}
window.customElements.define('ad-dt', ADDataTable);
