import './style.scss'
import CartProducts from '../../components/cart-products'
import Summary from '../../components/summary';
import CheckoutWindow from '../../components/checkout-window';
import Cart from '../../model/cart';
import Elem from '../../components/elem';

class CartPage {
  private container: HTMLElement;
  private cart: Cart;

  constructor(cart: Cart) {
    this.container = new Elem('div', 'cart').elem;
    this.cart = cart;
  }
  
  private createHeaderTitle(text: string): HTMLElement {
    const headerTitle = document.createElement('h1');
    headerTitle.innerText = text;
    return headerTitle;
  }
  
  render(): HTMLElement {
    const checkoutWindow = new CheckoutWindow();
    const summary = new Summary(this.cart, checkoutWindow);
    const cartProducts = new CartProducts(this.cart, summary);
    this.container.append(cartProducts.render());
    this.container.append(summary.render());
    this.container.append(checkoutWindow.render());
    return this.container;
  }
}

export default CartPage;
