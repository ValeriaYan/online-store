import Cart from '../../model/cart';
import { IProduct } from '../../types';

class AddToCartButton {
  private cartModel: Cart;
  private product: IProduct;
  private button: HTMLButtonElement;
  private isInCart = false;

  constructor(cartModel: Cart, product: IProduct) {
    this.cartModel = cartModel;
    this.product = product;
    this.isInCart = cartModel.hasProduct(product.id);
    this.button = document.createElement('button');
    this.button.className = 'button add-to-cart';
  }

  private createButton() {
    this.button.innerText = this.isInCart ? 'DROP FROM CART' : 'ADD TO CART';
    this.button.onclick = () => {
      if (this.isInCart) {
        this.cartModel.removeProduct(this.product);
        this.button.classList.remove('product-card_in-cart');
        this.button.innerText = 'ADD TO CART';
        this.isInCart = false;
      } else {
        this.cartModel.addProduct(this.product);
        this.button.classList.add('product-card_in-cart');
        this.button.innerText = 'DROP FROM CART';
        this.isInCart = true;
      }
    };
  }

  public render(): HTMLButtonElement {
    this.createButton();
    return this.button;
  }
}

export default AddToCartButton;
