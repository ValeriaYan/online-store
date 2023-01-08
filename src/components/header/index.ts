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
  constructor() {
    super('header', 'header');
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
    });

    this.container.append(pageLinksList);
  }

  render(navLinkClickHandler: (event: Event) => void): HTMLElement {
    this.renderNavigation(navLinkClickHandler);
    return this.container;
  }
}

export default Header;
