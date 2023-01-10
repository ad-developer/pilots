class ADFilterController extends ADComponent{

    /**
    * @param {!Element} root
    * @return {!ADFilterController}
    */
    static attachTo(root, ...args) {
        const instanceKey = 'ad-filter-controller';
        let instance = root.ad && root.ad[instanceKey] ?
        root.ad[instanceKey] : null;
        
        if(!instance){
        instance = new ADFilterController(root, ...args);

        // Attach instance to the root
        root.ad = root.ad || {};
        root.ad[instanceKey] = instance;
        }
        return instance;
    }

    init(){
        // bind collapse boxes with the elements 
        const container = ADCollapseBoxContainer.attachTo(this.root_, opt, false);

        // Bind form object 

        // Add event listener to the form object 
    }
}