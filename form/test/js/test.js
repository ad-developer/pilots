
const inp = document.querySelector('[ad-test-element]');
document.querySelector('[ad-clear]')
    .addEventListener('click',e=>{
        inp.value = '';
        inp.dispatchEvent(new CustomEvent('input'));
    });
    document.querySelector('[ad-set]')
    .addEventListener('click',e=>{
        inp.value = 'some test info on click';
        inp.dispatchEvent(new CustomEvent('input'));
    });
