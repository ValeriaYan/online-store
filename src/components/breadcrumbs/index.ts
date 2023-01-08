import './style.scss';

import clickLinkHandler from '../../utils/click-link-handler';
import ComponentTemplate from '../component-template';

export interface Breadcrumb {
  href: string;
  text: string;
}

class Breadcrumbs extends ComponentTemplate {
  private links: Breadcrumb[];

  constructor(links: Breadcrumb[]) {
    super('div', 'breadcrumbs');
    this.links = links;
  }

  private createBreadcrumbs(): void {
    this.links.forEach((link, indx) => {
      const breadcrumbsLink = document.createElement('a');
      breadcrumbsLink.className = 'breadcrumbs__link';
      breadcrumbsLink.href = link.href;
      breadcrumbsLink.textContent = link.text.toUpperCase();
      breadcrumbsLink.onclick = clickLinkHandler;

      if (indx !== this.links.length - 1) {
        this.container.append(breadcrumbsLink);
        const separator = document.createElement('span');
        separator.className = 'breadcrumbs__separator';
        this.container.append(separator);
      } else {
        const current = document.createElement('span');
        current.className = 'breadcrumbs__current';
        current.textContent = link.text.toUpperCase();
        this.container.append(current);
      }
    });
  }

  public render(): HTMLElement {
    this.createBreadcrumbs();
    return this.container;
  }
}

export default Breadcrumbs;
