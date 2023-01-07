import CartProducts from '../../components/cart-products'
import Cart from '../../model/cart';

class CartPage {
  private container: HTMLElement;
  private cart: Cart;

  constructor(cart: Cart) {
    this.container = document.createElement('div');
    this.cart = cart;
  }
  
  private createHeaderTitle(text: string): HTMLElement {
    const headerTitle = document.createElement('h1');
    headerTitle.innerText = text;
    return headerTitle;
  }
  
  render(): HTMLElement {
    const cartProducts = new CartProducts(this.cart);
    this.container.append(cartProducts.render());
    return this.container;
  }
}

export default CartPage;
