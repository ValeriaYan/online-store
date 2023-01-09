import './style.scss';
import ComponentTemplate from '../component-template';
import Elem from '../elem';
import Cart, { ICartProduct } from '../../model/cart';

class ProductInCart extends ComponentTemplate {
    private _cartProduct: ICartProduct;
    private _indexProduct: number;
    private _number: HTMLElement;
    private _info: HTMLElement;
    private _controls: HTMLElement;
    private _cart: Cart;

    constructor(cartProduct: ICartProduct, indexProduct: number, cart: Cart) {
        super('div', 'cart-products__item item');
        this._cartProduct = cartProduct;
        this._indexProduct = indexProduct;
        this._number = new Elem('div', 'item__number').elem;
        this._info = new Elem('div', 'item__info').elem;
        this._controls = new Elem('div', 'item__controls').elem;
        this._cart = cart;
    }


    private createNumberProduct() {
        this._number.textContent = `${this._indexProduct + 1}`;
    }

    private createProductInfo() {
        const pictureWrap = new Elem('div', 'item__img-wrap').elem;
        const img = new Elem('img', 'item__img').elem;
        const main = new Elem('div', 'item__main').elem;
        const title = new Elem('h3', 'item__title').elem;
        const description = new Elem('div', 'item__description').elem;
        const rating = new Elem('div', 'item__rating').elem;
        const discount = new Elem('div', 'item__discount').elem;

        (<HTMLImageElement>img).src = this._cartProduct.product.images[0];
        title.textContent = this._cartProduct.product.title;
        description.textContent = this._cartProduct.product.description;
        rating.textContent = `Rating: ${this._cartProduct.product.rating}`;
        discount.textContent = `Discount: ${this._cartProduct.product.discountPercentage}%`;
        
        pictureWrap.append(img);
        main.append(title);
        main.append(description);
        main.append(rating);
        main.append(discount)
        this._info.append(pictureWrap);
        this._info.append(main);
    }

    private createControls(reduceAmountProduct: Function) {
        while(this._controls.firstChild) {
            this._controls.removeChild(this._controls.firstChild);
        }
        const stock = new Elem('div', 'item__stock').elem;
        const quantityControl = new Elem('div', 'item__quantity-control').elem;
        const buttonSub = new Elem('div', 'item__button item__button_sub').elem;
        const quantity = new Elem('div', 'item__quantity').elem;
        const buttonPlus = new Elem('div', 'item__button item__button_plus').elem;
        const cost = new Elem('div', 'item__cost').elem;
        
        stock.textContent = `Stock: ${this._cartProduct.product.stock}`;
        buttonSub.textContent = '-';
        quantity.textContent = `${this._cartProduct.quantity}`;
        buttonPlus.textContent = '+';
        cost.textContent = `€${this._cartProduct.quantity * this._cartProduct.product.price}`;

        buttonSub.addEventListener('click', this.changeQuantityHandler.bind(this, 'sub', reduceAmountProduct));
        buttonPlus.addEventListener('click', this.changeQuantityHandler.bind(this, 'plus', reduceAmountProduct));
        quantityControl.append(buttonSub);
        quantityControl.append(quantity);
        quantityControl.append(buttonPlus);
        this._controls.append(stock);
        this._controls.append(quantityControl);
        this._controls.append(cost);
    }

    private changeQuantityHandler(operation: 'sub' | 'plus', reduceAmountProduct: Function) {
        if(operation === 'sub') {
            if(this._cartProduct.quantity - 1 <= 0) {
                reduceAmountProduct(this._cartProduct.product);
            }
            this._cart.reduceAmountProduct(this._cartProduct.product);
        } else {
            if(this._cartProduct.quantity + 1 <= this._cartProduct.product.stock) {
                this._cart.addProduct(this._cartProduct.product);
            }
        }
        this.container.removeChild(this._controls);
        this.createControls(reduceAmountProduct);
        this.container.append(this._controls);
    }

    public render(reduceAmountProduct: Function): HTMLElement {
        this.createNumberProduct();
        this.createProductInfo();
        this.createControls(reduceAmountProduct);
        this.container.append(this._number);
        this.container.append(this._info);
        this.container.append(this._controls);
        return this.container;
    }
}

export default ProductInCart;