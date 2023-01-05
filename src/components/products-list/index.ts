import './style.scss';

import { IProduct } from '../../types';
import ComponentTemplate from '../component-template';
import ProductCard from '../product-card';

class ProductsList extends ComponentTemplate {
  constructor() {
    super('div', 'products-list');
  }

  private createProductsList(products: IProduct[]): void {
    products.forEach((product) => {
      const productItem = document.createElement('div');
      productItem.className = 'products-list__item';
      productItem.append(new ProductCard(product).render());
      this.container.append(productItem);
    });
  }

  public render(products: IProduct[]): HTMLElement {
    this.container.innerHTML = '';
    this.createProductsList(products);
    return this.container;
  }
}

export default ProductsList;
