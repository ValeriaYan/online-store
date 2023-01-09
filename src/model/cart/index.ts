import { IProduct } from '../../types';

export interface ICartProduct {
  product: IProduct;
  quantity: number;
}

export type promoCodes = {
  [key: string]: number;
};

class Cart {
  private _products: ICartProduct[];
  private _appliedPromoCodes: string[];
  private _promoCodes: promoCodes;
  constructor() {
    this._products = [];
    this._appliedPromoCodes = [];
    this._promoCodes = {
      RS: 10,
      EPM: 10,
    };
  }

  public addProduct(product: IProduct): void {
    const productInCart: ICartProduct | undefined = this._products.find(
      (item) => item.product.id === product.id
    );
    if (!productInCart) {
      this._products.push({ product, quantity: 1 });
    } else {
      productInCart.quantity++;
    }
  }

  public removeProduct(product: IProduct): void {
    const indexProductInCart: number = this._products.findIndex(
      (item) => item.product.id === product.id
    );
    if (indexProductInCart !== -1) {
      this._products.splice(indexProductInCart, 1);
    }
  }

  public reduceAmountProduct(product: IProduct): void {
    const productInCart: ICartProduct | undefined = this._products.find(
      (item) => item.product.id === product.id
    );
    if (productInCart) {
      productInCart.quantity--;
      if (productInCart.quantity < 1) {
        this.removeProduct(product);
      }
    }
  }

  public getTotalPrice() {
    return this._products.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  }

  public getTotalPriceWithPromoCodes(): number {
    const sumDiscount = this._appliedPromoCodes.reduce(
      (sum, item) => (sum += this._promoCodes[item]),
      0
    );

    return Math.floor(this.getTotalPrice() - this.getTotalPrice() * (sumDiscount / 100));
  }

  public checkPromoCode(str: string): boolean {
    str = str.toUpperCase();
    if (this._promoCodes[str]) {
      return true;
    }

    return false;
  }

  public addPromoCode(str: string) {
    str = str.toUpperCase();
    if (this.checkPromoCode(str) && !this._appliedPromoCodes.includes(str)) {
      this._appliedPromoCodes.push(str);
    }
  }

  public deletePromoCode(str: string) {
    const indexPromoCode = this._appliedPromoCodes.findIndex((item) => item === str);
    this._appliedPromoCodes.splice(indexPromoCode, 1);
  }

  public thereIsPromoCode(): boolean {
    if (this._appliedPromoCodes.length !== 0) {
      return true;
    }

    return false;
  }

  public getTotalProducts() {
    return this._products.reduce((sum, item) => sum + item.quantity, 0);
  }

  public getDiscount(str: string): number {
    str = str.toUpperCase();
    return this._promoCodes[str];
  }

  public hasProduct(productId: number): boolean {
    return this._products.some((productObj) => productObj.product.id === productId);
  }

  get appliedPromoCodes(): string[] {
    return this._appliedPromoCodes;
  }

  get products(): ICartProduct[] {
    return this._products;
  }
}

export default Cart;
