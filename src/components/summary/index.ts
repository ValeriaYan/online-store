import './style.scss'
import Cart from '../../model/cart';
import ComponentTemplate from '../component-template';
import Elem from '../elem';

class Summary extends ComponentTemplate {
    private _cart: Cart;
    private _total: HTMLElement;
    constructor(cart: Cart) {
        super('div', 'summary');
        this._cart = cart;
        this._total = new Elem('div', 'summary__total').elem;
    }

    private createHeader(): HTMLElement {
        const header = new Elem('div', 'summary__header').elem;
        header.textContent = 'Summary';
        
        return header;
    }

    private createTotal() {
        this._total.innerHTML = '';
        const totalProducts = new Elem('div', 'summary__total-products').elem;
        const totalProductsNum = new Elem('span', 'summary__total-products-num').elem;
        const totalPrice = new Elem('div', 'summary__total-price').elem;
        const totalPriceNum = new Elem('span', 'summary__total-price-num').elem;
        const totalPriceDeleted = new Elem('div', 'summary__total-price summary__total-price_deleted').elem;
        const totalPriceNumDeleted = new Elem('span', 'summary__total-price-num summary__total-price-num_deleted').elem;
        
        totalProducts.textContent = 'Products: ';
        totalProductsNum.textContent = String(this._cart.getTotalProducts());
        totalPrice.textContent = 'Total: ';
        totalPriceNum.textContent = `€${this._cart.getTotalPrice()}`;
        totalPriceDeleted.textContent = 'Total: ';
        totalPriceNumDeleted.textContent = `€${this._cart.getTotalPrice()}`;

        totalProducts.append(totalProductsNum);
        totalPrice.append(totalPriceNum);
        totalPriceDeleted.append(totalPriceNumDeleted);
        this._total.append(totalProducts);
        this._total.append(totalPrice);
    }

    public render(): HTMLElement {
        this.container.innerHTML = '';
        this.createTotal();
        this.container.append(this.createHeader());
        this.container.append(this._total);
        return this.container;
    }
}

export default Summary;