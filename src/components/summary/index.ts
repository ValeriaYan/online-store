import './style.scss'
import Cart from '../../model/cart';
import ComponentTemplate from '../component-template';
import Elem from '../elem';

class Summary extends ComponentTemplate {
    private _cart: Cart;
    private _total: HTMLElement;
    private _promoCode: HTMLElement;
    private _availablePromoCode: HTMLElement;
    constructor(cart: Cart) {
        super('div', 'summary');
        this._cart = cart;
        this._total = new Elem('div', 'summary__total').elem;
        this._promoCode = new Elem('div', 'summary__promo-code').elem;
        this._availablePromoCode = new Elem('div', 'summary__available-promo-code').elem;
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
        if(this._cart.thereIsPromoCode()) {
            totalPriceNum.textContent = `€${this._cart.getTotalPriceWithPromoCodes()}`;
        } else {
            totalPriceNum.textContent = `€${this._cart.getTotalPrice()}`;
        }
        totalPriceDeleted.textContent = 'Total: ';
        totalPriceNumDeleted.textContent = `€${this._cart.getTotalPrice()}`;

        totalProducts.append(totalProductsNum);
        totalPrice.append(totalPriceNum);
        totalPriceDeleted.append(totalPriceNumDeleted);
        this._total.append(totalProducts);
        if(this._cart.thereIsPromoCode()) {
            this._total.append(totalPriceDeleted);
        }
        this._total.append(totalPrice);
    }

    private createInputPromoCode() {
        this._promoCode.innerHTML = '';
        const input = <HTMLInputElement>new Elem('input', 'summary__input').elem;
        input.placeholder = 'Enter promo code';
        input.addEventListener('input', this.inputPromoCodeHandler.bind(this, input));
        this._promoCode.append(input);

        const message = new Elem('div', 'summary__message').elem;
        message.textContent = 'Promo for test: "RS", "EPM"';
        this._promoCode.append(message);
    }

    private createAvailablePromoCode(promoCode: string) {
        const addBtn = <HTMLButtonElement>new Elem('button', 'summary__add-button').elem;

        this._availablePromoCode.textContent = `${promoCode.toUpperCase()} - ${this._cart.getDiscount(promoCode)}%`;
        addBtn.textContent = 'Add';
        this._availablePromoCode.append(addBtn);
    }

    private inputPromoCodeHandler(input: HTMLInputElement) {
        if(input) {
            const value = input.value;
            if(this._cart.checkPromoCode(value)) {
                this.createAvailablePromoCode(value);
                this._promoCode.append(this._availablePromoCode);
            } else {
                this._availablePromoCode.remove();
            }
        }
    }

    public render(): HTMLElement {
        this.container.innerHTML = '';
        this.createTotal();
        this.createInputPromoCode();
        this.container.append(this.createHeader());
        this.container.append(this._total);
        this.container.append(this._promoCode);
        return this.container;
    }
}

export default Summary;