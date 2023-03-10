/**
 * Custom component for ad-collapse-box html tag
 * window.customElements.define('ad-collapse-box', ADCollapseBox);
 * Usage:
 *  ad-title
 *  ad-id
 *  ad-initial-state
 */
class ADCollapseBox extends HTMLElement {
    get adId() {
        return this.getAttribute('ad-id');
    }
    set adId(value) {
        this.setAttribute('ad-id', value);
    }
    get componentTitle() {
        return this.getAttribute('ad-title');
    }
    set componentTitle(value) {
        this.setAttribute('ad-title', value);
    }
    static get observedAttributes() {
        return ['ad-id', 'ad-title'];
    }
    constructor() {
        super();
        const content = this.innerHTML;
        this.innerHTML = this.render({ content: content });
    }
    render(values) {
        return `<ad-collapse-box-title>
            <ad-cb-title></ad-cb-title>
            <ad-cb-button></ad-cb-button-title>
        </ad-collapse-box-title>
        <ad-cb-content>${values.content}</ad-cb-content>`;
    }
    addButton(html, action) {
        throw new Error("Method not implemented.");
    }
    highlightTitle() {
        throw new Error("Method not implemented.");
    }
    unHighlightTitle() {
        throw new Error("Method not implemented.");
    }
    close() {
        throw new Error("Method not implemented.");
    }
    open() {
        throw new Error("Method not implemented.");
    }
}
