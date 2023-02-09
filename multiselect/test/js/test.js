const states = document.querySelector('[ad-id="state"]');
const stData = [
    {value: 'Alaska', label: 'Alaska'}, 
    {value: 'Arizona', label: 'Arizona'}, 
    {value: 'California', label: 'California'}, 
    {value: 'Utah', label: 'Utah'}, 
    {value: 'Nevada', label: 'Nevada'}, 
    {value: 'Colorado', label: 'Colorado'}
];
states.bind(stData);

states.values = ['Arizona','Colorado','Nevada'];
//states.clear();

states.addEventListener('change',e=>{ alert(e.detail)});