class ADCollapseBoxContainer extends ADComponent{
    /**
   * @param {!Element} root
   * @return {!ADComponent}
   */
  static attachTo(root, ...args) {
    const instanceKey = 'ad-collapse-section-container';
    let instance = root.ad && root.ad[instanceKey] ?
      root.ad[instanceKey] : null;
    
      if(!instance){
      instance = new ADCollapseBoxContainer(root, ...args);

      // Attach instance to the root
      root.ad = root.ad || {};
      root.ad[instanceKey] = instance;
    }
    return instance;
  }

  init(opt, collapse){
    this.boxes_ = [];
    if(collapse){
      this.collapse_ = collapse;
    }
    this.renderCollapseBoxes(opt);
  }

  /**
  * * [
   *    { 
   *        id: '123',
   *        title: 'Title',
   *        titleHighlighted: false,
   *        state: 'closed',
   *        content: '<div><div>'
   *    }
   * ]
  * @param {Object} par 
  */
  renderCollapseBoxes(par){
    par.forEach(element => {
      this.renderCollapseBox(element);
    });
  }

  renderCollapseBox(par){
    let collapse = '';
    if(par.state == 'opened'){
      collapse = 'ad-collapse-box__opened ';
    }
    let titleHighlighted = '';
    if(par.titleHighlighted){
      titleHighlighted = 'ad-collapse-box-title--highlight ';
    }
    const fixture = 
      `<div class="${collapse}ad-collapse-box" ad-collapse-box ad-id="${par.id}">
        <div class="${titleHighlighted}ad-collapse-box-title" ad-title>
            <div class="ad-collapse-box-title__text">${par.title}</div>
            <div class="ad-collapse-box-title__arrow" ad-button="${par.state}">
                <svg><path d="m12 15.375-6-6 1.4-1.4 4.6 4.6 4.6-4.6 1.4 1.4Z"/></svg>
            </div>
        </div>
        <div class="ad-collapse-box__content" ad-content>${par.content}</div>
       </div>`;
    const node = this.createElement(fixture);
    const box = ADCollapseBox.attachTo(node);
    this.boxes_.push({
      id: par.id,
      control: box
    });
    node.addEventListener('collapsebox.change', event=>{
      if(this.collapse_ && event.detail.state == 'opened'){
         this.collapseAllExcept_(event.detail.id);
      }
    });

    this.root_.appendChild(node);
  }

  collapseAll(){
    this.boxes_.forEach(el=>{
      el.control.close();
    });
  }

  collapseAllExcept_(id){
    this.boxes_.forEach(el=>{
      if(el.id != id){
        el.control.close();
      }
    });
  }
}