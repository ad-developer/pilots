class ADCollapseBox extends ADComponent{
    /**
   * @param {!Element} root
   * @return {!ADComponent}
   */
     static attachTo(root, ...args) {
        const instanceKey = 'COLLAPSE-BOX';
        let instance = root.ad && root.ad[instanceKey] ?
          root.ad[instanceKey] : null;
        
          if(!instance){
          instance = new ADCollapseBox(root, ...args);
    
          // Attach instance to the root
          root.ad = root.ad || {};
          root.ad[instanceKey] = instance;
        }
        return instance;
      }

    init(opt) {
       
        this.button_ = null;
        this.container_ = null;
        this.id_ = this.root_.getAttribute('ad-id');

        this.title_ = this.root_.querySelector('[ad-title]');
        // button handler
        // status collapsed/opened
        const btn = this.root_.querySelector('[ad-button]');
        this.btn_ = btn;
        this.state_ = btn.getAttribute('ad-button');
        
        btn.addEventListener('click', ()=>this.buttonHandler_());
    }

    buttonHandler_(){
        if(this.state_ == 'closed'){
            this.open();
        } else {
            this.close();
        }
    }

    close(){
        this.state_ = 'closed';
        this.root_.classList.remove('ad-collapse-box__opened');
        this.emit('collapsebox.change', {state: this.state_, id: this.id_});
    }

    open(){
        this.state_ = 'opened';
        this.root_.classList.add('ad-collapse-box__opened');
        this.emit('collapsebox.change', {state: this.state_, id: this.id_});
    }

    highlightTitle(){
       this.title_.classList.add('ad-collapse-box-title--highlight');
    }

    unHighlightTitle(){
        this.title_.classList.remove('ad-collapse-box-title--highlight');
    }
}