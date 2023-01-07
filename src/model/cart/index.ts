import { IProduct } from '../../types';

export interface ICartProduct {
    product: IProduct,
    quantity: number,
}

class Cart {
    private _products: ICartProduct[];

    constructor() {
        this._products = [];
    }

    public addProduct(product: IProduct): void {
        const productInCart: ICartProduct | undefined = this._products.find((item) => item.product.id === product.id);
        if(!productInCart) {
            this._products.push({product, quantity: 1})
        } else {
            productInCart.quantity++;
        }
    }

    public removeProduct(product: IProduct): void {
        const indexProductInCart: number = this._products.findIndex((item) => item.product.id === product.id);
        if(indexProductInCart !== -1) {
            this._products.splice(indexProductInCart, 1);
        }
    }

    public reduceAmountProduct(product: IProduct): void {
        const productInCart: ICartProduct | undefined = this._products.find((item) => item.product.id === product.id);
        if(productInCart) {
            productInCart.quantity--;
            if(productInCart.quantity < 1) {
                this.removeProduct(product);
            }
        }
    }

    get products(): ICartProduct[] {
        return this._products;
    }
}

export default Cart;