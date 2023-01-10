//const elements = document.querySelectorAll('[ad-collapse-box]');
//elements.forEach((el)=>{
//    const control = ADCollapseBox.attachTo(el);
//    //control.highlightTitle();
//    el.addEventListener('collapsebox.change', (e)=>{
//        //alert(`State: ${e.detail.state} with id: ${e.detail.id}` );
//    })
//});

const con = document.querySelector('[ad-box-container]');
const opt = [
    {
        id: '23467',
        title: 'Products',
        titleHighlighted: false,
        state: 'opened',
        content: '<div>Some information is here<div>'
    },
    {
        id: '23462',
        title: 'Deposits',
        titleHighlighted: false,
        state: 'closed',
        content: '<div>Some information is here<div>'
    },
    {
        id: '234337',
        title: 'States',
        titleHighlighted: true,
        state: 'closed',
        content: '<div>Some information is here<div>'
    },
    {
        id: '23',
        title: 'Something',
        titleHighlighted: false,
        state: 'closed',
        content: '<div>Some information is here<div>'
    },
    {
        id: '3',
        title: 'Cool',
        titleHighlighted: true,
        state: 'closed',
        content: '<div style="display: flex; flex-direction: column; padding: 24px">Some information is here<div>Tet</div><div>Tet</div><div>Tet</div><div>Tet</div><div>Tet</div><div>'
    }
];

const container = ADCollapseBoxContainer.attachTo(con, opt, false);
const boxes = container.getBoxes();
ADForm.attachTo(container);
container.AddEventListener('form.change', e=>{
    container.contentChanged(e.detail);
});
  

const chipContainer = ADChipContainer.attachTo();
container.AddEventListener('container.change', e=>{
    chipContainer.action(e.detail);
});


// Add form() object
// Catch form control event and pass it to the box container {id,value}
// Catch box control event and add it to  