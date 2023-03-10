const states = document.querySelector('[ad-id="state"]');
const stData = [
    {value: 'Alaska', label: 'Alaska'}, 
    {value: 'Arizona', label: 'Arizona'}, 
    {value: 'California', label: 'California'}, 
    {value: 'Utah', label: 'Utah'}, 
    {value: 'Nevada', label: 'Nevada'}, 
    {value: 'Colorado', label: 'Colorado'},
    {value: 'Colorado Colorado Colorado Colorado Colorado Colorado', label: 'Colorado Colorado Colorado Colorado Colorado Colorado'}
];
states.bind(stData);


const clearBtn = document.querySelector('[ad-clear]')
clearBtn.addEventListener('click', e=>{
    states.clear();
});

//states.values = ['Arizona','Colorado','Nevada'];
//states.clear();

//states.addEventListener('change',e=>{ alert(e.detail)});