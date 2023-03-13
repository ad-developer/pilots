/**
 * html
 * <ad-ms
 *      ad-label="Label text"
 *      type="dropdown"list"
 *      height: '200'
 *      ad-search
 *      ad-selected-selected
 *      ></ad-ms>
 */
class ADMultiselect extends HTMLElement {
    set values(data) {
        this.clear();
        data.forEach(item => {
            const el = this.listContainer.querySelector(`[ad-value='${item}']`);
            this.selectItem(el, item);
        });
        if (data.length > 0) {
            this.floatLabel();
        }
    }
    get values() {
        return this.selList;
    }
    constructor() {
        super();
        this.label = null;
        this.focused = false;
        this.sBtn = null;
        this.query = '';
        this.scBtn = null;
        this.checked = false;
        this.listContainer = null;
        this.selList = null;
        this.sBox = null;
        this.sBoxCon = null;
        this.expBtn = null;
        this.handleBodyClick = this.handleBodyClick.bind(this);
        this.selList = [];
        const label = this.getAttribute('ad-label');
        let height = this.getAttribute('height');
        if (height != '') {
            height = `style='height:${height}px'`;
        }
        this.innerHTML = this.render(label, height);
        this.label = this.querySelector('ad-ms-label');
        this.sBtn = this.querySelector('[ad-ms-search]');
        this.sBoxCon = this.querySelector('ad-search-box');
        this.sBox = this.querySelector('[ad-search-box]');
        this.sBtn.addEventListener('click', e => this.handleSearchBtn());
        this.sBox.addEventListener('input', e => this.handleSearchBox(e));
        this.scBtn = this.querySelector('[ad-ms-check]');
        this.scBtn.addEventListener('click', e => this.handleShowSelected(e));
        this.expBtn = this.querySelector('[ad-ms-exp]');
        this.expBtn.addEventListener('click', e => this.handleExpBtn(e));
        this.listContainer = this.querySelector('ad-ms-l');
        this.addEventListener('click', e => {
            this.addFocusState();
            document.body.addEventListener('click', this.handleBodyClick);
        });
    }
    bind(data) {
        // Add all items
        data.forEach(item => {
            this.listContainer.innerHTML += this.renderListItem(item.label, item.value);
        });
        // Wire event 
        this.list = this.listContainer.querySelectorAll('ad-ms-li');
        this.list.forEach(el => {
            el.addEventListener('click', e => {
                this.handleListItemSelect(e);
            });
        });
    }
    clear() {
        this.list.forEach(el => {
            el.removeAttribute('selected');
            el.querySelector('[ad-checkbox]')
                .classList.remove('ad-ms-li-check--selected');
        });
        this.selList = [];
        this.updateHeader();
        this.restoreLabel();
        this.filter();
    }
    //#region Private members 
    handleExpBtn(e) {
        e.stopPropagation();
        if (this.focused) {
            this.removeFocusState();
        }
        else {
            this.addFocusState();
        }
    }
    handleSearchBox(event) {
        const el = event.currentTarget;
        this.query = el.value;
        this.filter();
    }
    handleSearchBtn(overrule = false) {
        // Element 
        const el = this.sBtn;
        const attr = 'checked';
        const cl = 'ad-ms-search--selected';
        let elChecked = overrule;
        if (!overrule) {
            elChecked = el.hasAttribute(attr);
        }
        // Container
        const sbCl = 'ad-search-box--show';
        if (elChecked) {
            el.removeAttribute(attr);
            if (this.sBox.value == '') {
                el.classList.remove(cl);
            }
            this.sBoxCon.classList.remove(sbCl);
        }
        else {
            el.setAttribute(attr, '');
            el.classList.add(cl);
            this.sBoxCon.classList.add(sbCl);
            this.sBox.focus();
        }
    }
    handleShowSelected(event) {
        const el = event.currentTarget;
        const attr = 'checked';
        const cl = 'ad-ms-check--selected';
        const elChecked = el.hasAttribute(attr);
        if (elChecked) {
            this.checked = false;
            el.removeAttribute(attr);
            el.classList.remove(cl);
        }
        else {
            this.checked = true;
            el.setAttribute(attr, '');
            el.classList.add(cl);
        }
        this.filter();
    }
    filter() {
        this.list.forEach(el => {
            const value = el.getAttribute('ad-value');
            const selected = el.hasAttribute('selected');
            const checked = this.checked;
            const qEmpty = this.query == '';
            const qIncluded = value.toLowerCase().includes(this.query.toLowerCase());
            let show = false;
            if ((checked && selected && qEmpty) ||
                (checked && selected && !qEmpty && qIncluded) ||
                (!checked && qEmpty) ||
                (!checked && !qEmpty && qIncluded)) {
                show = true;
            }
            el.style.display = show ? 'flex' : 'none';
        });
    }
    handleListItemSelect(e) {
        const el = e.currentTarget;
        const value = el.getAttribute('ad-value');
        const isSelected = this.selectItem(el, value);
        this.notify(value, isSelected);
    }
    selectItem(listItem, value) {
        const checkBox = listItem.querySelector('[ad-checkbox]');
        const cssClass = 'ad-ms-li-check--selected';
        const isSelected = listItem.hasAttribute('selected');
        if (isSelected) {
            checkBox.classList.remove(cssClass);
            listItem.removeAttribute('selected');
            this.selList = this.selList.filter(p => p != value);
        }
        else {
            checkBox.classList.add(cssClass);
            listItem.setAttribute('selected', '');
            this.selList.push(value);
        }
        this.filter();
        this.updateHeader();
        return !isSelected;
    }
    updateHeader() {
        const l = this.selList.length;
        if (l == 1) {
            this.setHeaderText(this.selList[0]);
        }
        else if (l > 1) {
            this.setHeaderText('Multiple selected');
        }
        else {
            this.setHeaderText('');
        }
        const values = this.selList.join(';');
        this.setAttribute('values', values);
        this.setAttribute('title', values);
    }
    setHeaderText(value) {
        const ht = this.querySelector('ad-ms-header-text');
        ht.innerHTML = value;
    }
    notify(value, selected) {
        const evt = new CustomEvent('change', {
            detail: {
                values: this.selList,
                value: value,
                selected: selected
            },
            bubbles: true,
        });
        this.dispatchEvent(evt);
    }
    /**
     * render
     * @param {string} label
     * @returns {string}
     */
    render(label, height) {
        return `<ad-ms-header><ad-ms-header-content><ad-icon class="ad-icon--20 ad-ms-check" ad-ms-check><svg viewBox="0 0 24 24" fill="#000000" class="ad-ms-not-selected"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/></svg><svg viewBox="0 0 24 24" fill="#000000" class="ad-ms-selected"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/></svg></ad-icon><ad-ms-header-text></ad-ms-header-text><ad-search-box><input type="text" class="ad-search-box" ad-search-box></ad-search-box><ad-icon class="ad-icon--20 ad-ms-search" ad-ms-search><svg viewBox="0 0 24 24"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg></ad-icon><ad-icon class="ad-icon--20 ad-ms-arrow" ad-ms-exp><svg viewBox="0 0 24 24"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M7 10l5 5 5-5H7z"/></svg></ad-icon></ad-ms-header-content><ad-ms-label>${label}</ad-ms-label></ad-ms-header><ad-ms-body><ad-ms-l ${height}></ad-ms-l></ad-ms-body>`;
    }
    renderListItem(label, value) {
        return `<ad-ms-li ad-value="${value}" title="${label}"><ad-icon class="ad-ms-li-check ad-icon--20" ad-checkbox><svg viewBox="0 0 24 24" class="ad-ms-not-selected"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"/></svg><svg viewBox="0 0 24 24" class="ad-ms-selected"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zM17.99 9l-1.41-1.42-6.59 6.59-2.58-2.57-1.42 1.41 4 3.99z"/></svg></ad-icon><ad-ms-text>${label}</ad-ms-text></ad-ms-li>`;
    }
    handleBodyClick(event) {
        if (this.isElementContainer(event.target)) {
            return;
        }
        this.removeFocusState();
    }
    isElementContainer(element) {
        return this == element ||
            this.contains(element);
    }
    addFocusState() {
        this.floatLabel();
        this.classList.add('ad-ms--focus');
        this.focused = true;
    }
    removeFocusState() {
        if (this.selList.length < 1) {
            this.restoreLabel();
        }
        // Focus
        this.classList.remove('ad-ms--focus');
        this.focused = false;
        // Search box if opened 
        this.handleSearchBtn(true);
        // Remove body click
        document.body.removeEventListener('click', this.handleBodyClick);
    }
    floatLabel() {
        this.label.classList.add('ad-ms-label--float');
    }
    restoreLabel() {
        this.label.classList.remove('ad-ms-label--float');
    }
}
window.customElements.define('ad-ms', ADMultiselect);
