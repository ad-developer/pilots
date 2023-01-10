/**
 * data
 * [
 *  {
 *      group: name,
 *      template: 'txt'
 *      name: values,
 *      search: true/false,
 *      color: '#fff',      
 *  },
 * ]
 * template
 * {
 *   event: 'blur',
 *   html: '<div></div>'
 * }
 */

class ADFilterSet extends HTMLElement {
    
    constructor(){
        super();
        this.templates_ = [];
    }

    bind(data){
       data.array.forEach(el => {
            
       });
    }

    addTemplate(name, template){
       this.templates_[name] = template;
    }


}
window.customElements.define('ad-filter-set', ADFilterSet);