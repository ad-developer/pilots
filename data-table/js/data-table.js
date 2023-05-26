/**
 * ad-dt
 */
class ADDataTable extends HTMLElement {
    constructor() {
        super();
        this.handlers = {};
        // Get attributes
        // Render 
        // Table
        const tbl = document.createElement('table');
        tbl.classList.add('ad-dt__table');
        this.appendChild(tbl);
        // Table header
        const tblHeader = document.createElement('thead');
        tbl.appendChild(tblHeader);
        this.tblHeader = tblHeader;
        // Table body
        const tblBody = document.createElement('tbody');
        tbl.appendChild(tblBody);
        this.tblBody = tblBody;
    }
    /**
     * addHandler
     * @param handler
     */
    addHandler(handler) {
        this.handlers[handler.key] = handler;
    }
    /**
     * config
     * @param data
     */
    config(data) {
        this.configData = data;
        let hContent = '';
        const sortAttr = 'ad-sort';
        data.forEach(item => {
            let cContent = `${item.label}`;
            let cssClass = 'ad-dt__header-cell';
            let sortAttrApplied = '';
            if (item.sort) {
                cContent = `<ad-dt-c><ad-dt-c-text>${item.label}</ad-dt-c-text><ad-icon><svg viewBox="0 0 24 24"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M4 12l1.41 1.41L11 7.83V20h2V7.83l5.58 5.59L20 12l-8-8-8 8z"/></svg></ad-icon></ad-dt-c>`;
                sortAttrApplied = ` ${sortAttr}`;
                cssClass += ' ad-dt__header-cell--sort';
            }
            let cWidth = '';
            if (item.width) {
                cWidth = ` style='width:${item.width}px; max-width:${item.width}px'`;
            }
            if (item.hWrap) {
                cssClass += ' ad-dt__header-cell--wrap';
            }
            if (item.hAlign == 'center') {
                cssClass += ' ad-dt__header-cell--align-center';
            }
            if (item.hAlign == 'right') {
                cssClass += ' ad-dt__header-cell--align-right';
            }
            hContent +=
                `<th ad-id='${item.id}' class='${cssClass}'${cWidth}${sortAttrApplied} title='${item.label}'>${cContent}</th>`;
        });
        this.tblHeader.innerHTML = `<tr class="ad-dt__header-row">${hContent}</tr>`;
        this.tblHeader.querySelectorAll(`[${sortAttr}]`)
            .forEach(el => el.addEventListener('click', e => this.handleSort(e)));
    }
    /**
     * bind
     * @param data
     */
    bind(data) {
        if (Array.isArray(data[0])) {
            this.bindArray(data);
        }
        else {
            this.bindObject(data);
        }
    }
    /**
     * setSortField
     * @param id
     * @param dir
     */
    setSortField(id, dir) {
        const el = this.querySelector(`[ad-id='${id}']`);
        this.sort(el, dir);
    }
    //#region Private members 
    bindObject(data) {
        let rows = '';
        data.forEach(rec => {
            let cols = '';
            const recId = rec['id'];
            this.configData.forEach(cEl => {
                let value = rec[cEl.id];
                // Remove nulls
                if (value == null || value == 'null') {
                    value = '';
                }
                let content = value;
                if (cEl.custom) {
                    const handler = this.handlers[cEl.custom];
                    const hnd = handler.handler(cEl, rec);
                    content = hnd.content;
                    if (hnd.title) {
                        value = hnd.title;
                    }
                }
                // Date type 
                if (cEl.type == 'date' && content != '') {
                    const dateType = new Date(content);
                    content = dateType.toLocaleDateString();
                }
                let width = '';
                if (cEl.width) {
                    width = ` style='width:${cEl.width}px; min-width:${cEl.width}px; max-width:${cEl.width}px'`;
                }
                let cssClass = 'ad-dt__cell';
                if (cEl.rWrap) {
                    cssClass += ' ad-dt__cell--wrap';
                }
                if (cEl.cAlign == 'center') {
                    cssClass += ' ad-dt__cell--align-center';
                }
                if (cEl.cAlign == 'right') {
                    cssClass += ' ad-dt__cell--align-right';
                }
                let title = '';
                if (value) {
                    if (typeof value == 'string') {
                        // Single quote
                        value = value.replace("'", '&#39;');
                        // Double quote
                        value = value.replace("'", '&#34;');
                    }
                    title = `title='${value}'`;
                }
                cols +=
                    `<td class='${cssClass}' ad-id='${cEl.id}' ${title}${width}>${content}</td>`;
            });
            rows += `<tr class='ad-dt__row' ad-id='${recId}' ad-row>${cols}</tr>`;
        });
        this.tblBody.innerHTML = rows;
        this.tblBody.querySelectorAll('[ad-row]')
            .forEach(el => el.addEventListener('click', e => this.handleSelect(e)));
    }
    bindArray(data) {
        let rows = '';
        const config = this.configData;
        data.forEach(rec => {
            let cols = '';
            for (let index = 0; index < config.length; index++) {
                const cEl = config[index];
                const value = rec[index];
                cols +=
                    `<td ad-id=${cEl.id} title='${value}'>${value}<td>`;
            }
            //let id = '';
            rows += `<tr>${cols}</tr>`;
        });
        console.log(rows);
        //this.tblBody.innerHTML = rows;
    }
    handleSelect(event) {
        this.notify('datatable.select', {
            id: event.currentTarget.getAttribute('ad-id'),
        });
    }
    handleSort(event) {
        const sortCol = event.currentTarget;
        const id = sortCol.getAttribute('ad-id');
        let dir = sortCol.getAttribute('ad-sort');
        const asc = 'asc';
        const desc = 'desc';
        if (dir == '' || dir == desc) {
            dir = asc;
        }
        else if (dir == asc) {
            dir = desc;
        }
        this.sort(sortCol, dir);
        this.notify('datatable.sort', {
            id: id,
            dir: dir
        });
    }
    sort(element, setDir) {
        const iconRotCl = 'ad-icon--rotate-180';
        this.removeSort(element);
        element.querySelector('ad-dt-c')
            .classList.add('ad-dt-c--show-icon');
        const ic = element.querySelector('ad-icon');
        element.setAttribute('ad-sort', setDir);
        if (setDir == 'asc') {
            ic.classList.remove(iconRotCl);
        }
        else {
            ic.classList.add(iconRotCl);
        }
    }
    removeSort(el) {
        if (this.sortColumn != el) {
            if (this.sortColumn != null) {
                this.sortColumn.querySelector('ad-dt-c')
                    .classList.remove('ad-dt-c--show-icon');
            }
            this.sortColumn = el;
        }
    }
    notify(event, obj) {
        const evt = new CustomEvent(event, {
            detail: obj,
            bubbles: true,
        });
        this.dispatchEvent(evt);
    }
}
window.customElements.define('ad-dt', ADDataTable);
