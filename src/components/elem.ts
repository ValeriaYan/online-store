export default class Elem {
    private _elem: HTMLElement;

    constructor(tag: string, className: string) {
        this._elem = document.createElement(tag);
        this._elem.className = className;
    }

    get elem(): HTMLElement {
        return this._elem;
    }
}