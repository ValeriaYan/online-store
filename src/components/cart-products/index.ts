import './style.scss';
import ComponentTemplate from '../component-template';
import Elem from '../elem';
// import { IProduct } from '../../types';
import Cart from '../../model/cart';
import { ICartProduct } from '../../model/cart';
import ProductCard from '../product-card';
import { IProduct } from '../../types';

export default class CartProducts extends ComponentTemplate{
    private _cart: Cart;
    private _limit: number;
    private _page: number;
    private _productList: HTMLElement;
    private _numberPage: HTMLElement;
    private _limitInput: HTMLInputElement;

    constructor(cart: Cart) {
        super('div', 'cart-products');
        this._cart = cart;
        this._limit = 3;
        this._page = 1;
        this._productList = new Elem('div', 'cart-products__products').elem;
        this._numberPage = new Elem('span', 'page-numbers__number').elem;
        this._limitInput = <HTMLInputElement>new Elem('input', 'controls__input').elem;
    }

    private createHeader(): HTMLElement {
        const header = new Elem('div', 'cart-products__header').elem;
        const title = new Elem('div', 'cart-products__title').elem;
        title.textContent = 'Products in Cart';
        const controls = this.createControls();
        
        header.append(title);
        header.append(controls);
        return header;
    }

    private createControls(): HTMLElement {
        const controls = new Elem('div', 'cart-products__controls controls').elem;
        const limit = new Elem('div', 'controls__limit').elem;
        limit.textContent = 'Limit: ';
        this._limitInput.type = 'number';
        this._limitInput.value = '3';
        this._limitInput.max = '10';
        
        const pageNumbers = new Elem('div', 'controls__page-numbers page-numbers').elem;
        pageNumbers.textContent = 'Page: ';
        this._numberPage.textContent = String(this._page);
        const buttonLeft = new Elem('button', 'page-numbers__button page-numbers__button_left').elem;
        buttonLeft.textContent = '<';
        const buttonRight = new Elem('button', 'page-numbers__button page-numbers__button_right').elem;
        buttonRight.textContent = '>';
        
        
        this._limitInput.addEventListener('input', this.changeLimitHandler.bind(this));
        buttonLeft.addEventListener('click', this.subPageHandler.bind(this))
        buttonRight.addEventListener('click', this.plusPageHandler.bind(this));

        limit.append(this._limitInput);
        pageNumbers.append(buttonLeft);
        pageNumbers.append(this._numberPage);
        pageNumbers.append(buttonRight);
        controls.append(limit);
        controls.append(pageNumbers);
        return controls;
    }

    private updateProductList(products: ICartProduct[] = this._cart.products): void {
        if(products.length <= 0) {
            while(this.container.firstChild) {
                this.container.removeChild(this.container.firstChild);
            }
            this.createMessageAboutEmpty();
        }
        while(this._productList.firstChild) {
            this._productList.removeChild(this._productList.firstChild);
        }
        const maxProductInList = 10;
        if(this._limit === 0) {
            this._limit = maxProductInList;
        }
        const maxIndex = this._limit * this._page;
        for(let i = maxIndex - this._limit; i < maxIndex; i++) {
            if(products[i]) {
                const productCard = new ProductCard(products[i], i).render(this.reduceAmountProduct.bind(this));
                this._productList.append(productCard);
            }
        }
        
        this.container.append(this._productList);
    }

    private reduceAmountProduct(product: IProduct) {
        this._cart.reduceAmountProduct(product);
        this.updateProductList();
        if(this._cart.products.length < this._limit * this._page - this._limit + 1) {
            this._page = this._cart.products.length / this._limit;
            this.updatePage();
        }
    }

    private createMessageAboutEmpty() {
        const message = new Elem('div', 'cart-products__message').elem;
        message.textContent = 'Cart is empty';
        this.container.append(message);
    }

    private updatePage() {
        this._numberPage.textContent = String(this._page);
        this.updateProductList();
    }

    private changeLimitHandler() {
        this._limit = +this._limitInput.value;
        this._page = 1;
        this.updatePage();
    }

    private subPageHandler() {
        if(this._page - 1 > 0) {
            this._page--;
        }
        this.updatePage();
    }

    private plusPageHandler() {
        if(this._page + 1 * this._limit <= this._cart.products.length) {
            this._page++;
        }
        this.updatePage(); 
    }

    public render(): HTMLElement {
        this.container.append(this.createHeader());
        this.updateProductList();
        return this.container;
    }

}