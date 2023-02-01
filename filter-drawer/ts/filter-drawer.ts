/**
 * 
 * Html
 * <ad-filter-drawer class="ad-filter-drawer--show">
 *  <ad-filter-drawer-header>
 *    <ad-button>   
 *    <ad-close>
 *  <ad-filter-drawer-panel>
 *  <ad-filter-drawer-content>
 * <ad-filter-drawer-scrim class="ad-filter-drawer-scrim--show">
 * 
 * Public methods
 * show() - show draw
 * hide() - hide draw  
 */

class ADFilterDrawer extends HTMLElement {
    scrim_: HTMLElement;
    constructor(){
        super();
        this.scrim_ = document.querySelector('ad-filter-drawer-scrim');
        document.querySelector('ad-close')
            .addEventListener('click', e=>{
                this.hide();
            })
    }

    show(){
        this.classList.add('ad-filter-drawer--show');
        this.scrim_.classList.add('ad-filter-drawer-scrim--show');
    }

    hide(){
        this.classList.remove('ad-filter-drawer--show');
        this.scrim_.classList.remove('ad-filter-drawer-scrim--show');
    }

    
}
window.customElements.define('ad-filter-drawer', ADFilterDrawer);