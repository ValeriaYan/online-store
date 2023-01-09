import './style.scss';

import { PagePaths } from '../../app';
import ComponentTemplate from '../component-template';

const links = [
  {
    href: PagePaths.MainPage,
    text: 'Main page',
  },
  {
    href: PagePaths.CartPage,
    text: 'Cart',
  },
];

class Header extends ComponentTemplate {
  private productsInCart: HTMLElement;
  private totalCart: HTMLElement;
  constructor() {
    super('header', 'header');
    this.productsInCart = document.createElement('span');
    this.productsInCart.textContent = '0';
    this.totalCart = document.createElement('div');
    this.totalCart.textContent = '€0';
  }

  renderNavigation(navLinkClickHandler: (event: Event) => void) {
    const pageLinksList = document.createElement('nav');
    pageLinksList.className = 'nav';

    links.forEach((link) => {
      const pageLink = document.createElement('a');
      pageLink.href = link.href;
      pageLink.innerText = link.text;
      pageLink.onclick = (event) => navLinkClickHandler(event);
      pageLinksList.append(pageLink);

      if(link.text === 'Cart') {
        pageLink.append(this.productsInCart);
      }
    });

    this.container.append(pageLinksList);
  }

  renderTotalCart(countProducts: number, totalPrice: number) {
    this.productsInCart.textContent = String(countProducts);
    this.totalCart.textContent = `€${totalPrice}`;
  }

  render(navLinkClickHandler: (event: Event) => void): HTMLElement {
    this.renderNavigation(navLinkClickHandler);
    this.container.append(this.totalCart);
    return this.container;
  }
}

export default Header;
