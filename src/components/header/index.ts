import './style.scss';
import ComponentTemplate from '../component-template';
import clickLinkHandler from '../../utils/click-link-handler';
import storeOptions from '../../app/store-options';

class Header extends ComponentTemplate {
  private productsInCart: HTMLElement;
  private totalCart: HTMLElement;

  constructor() {
    super('header', 'header');
    this.productsInCart = document.createElement('span');
    this.productsInCart.className = 'header__products';
    this.productsInCart.textContent = '0';
    this.totalCart = document.createElement('span');
    this.totalCart.className = 'header__total-value';
    this.totalCart.textContent = `${storeOptions.currencySymbol}0`;
  }

  private createLogo() {
    const logo = document.createElement('a');
    logo.className = 'header__logo logo';
    logo.href = '/';
    logo.onclick = clickLinkHandler;

    const logoText = document.createElement('h2');
    logoText.className = 'logo__text';
    logoText.textContent = 'Online Store';

    logo.append(logoText);
    this.container.append(logo);
  }

  public renderTotalCart(countProducts: number, totalPrice: number) {
    this.productsInCart.textContent = String(countProducts);
    this.totalCart.textContent = `${storeOptions.currencySymbol}${totalPrice}`;
  }

  public render(): HTMLElement {
    this.createLogo();
    const totalCartContainer = document.createElement('div');
    totalCartContainer.className = 'header__total';
    totalCartContainer.innerText = 'Cart total: ';
    totalCartContainer.append(this.totalCart);

    const headerCart = document.createElement('a');
    headerCart.className = 'header__cart';
    headerCart.href = '/cart';
    headerCart.onclick = clickLinkHandler;
    headerCart.append(this.productsInCart);

    this.container.append(totalCartContainer);
    this.container.append(headerCart);
    return this.container;
  }
}

export default Header;
