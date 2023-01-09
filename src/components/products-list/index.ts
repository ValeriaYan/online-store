import './style.scss';

import { IProduct } from '../../types';
import ComponentTemplate from '../component-template';
import ProductCard from '../product-card';
import Cart from '../../model/cart';

class ProductsList extends ComponentTemplate {
  private cartModel: Cart;
  private viewMode = 'big';

  constructor(cartModel: Cart) {
    super('div', 'products-list');
    this.cartModel = cartModel;
  }

  private addNoFoundMessage(): void {
    const messageBox = document.createElement('div');
    messageBox.className = 'products-list__no-found-message';
    messageBox.innerText = 'No products found  ¯\\_(ツ)_/¯';
    this.container.append(messageBox);
  }

  private createProductsList(products: IProduct[]): void {
    this.setViewMode();

    if (products.length === 0) {
      this.addNoFoundMessage();
    } else {
      products.forEach((product) => {
        const productItem = document.createElement('div');
        productItem.className = `products-list__item products-list__item_${this.viewMode}`;
        productItem.append(new ProductCard(product, this.cartModel).render());
        this.container.append(productItem);
      });
    }
  }

  private setViewMode(): void {
    const queryParamsString = window.location.search;
    if (queryParamsString) {
      const queryParams = new URLSearchParams(queryParamsString);
      this.viewMode = queryParams.get('big') === 'false' ? 'small' : 'big';
    } else {
      this.viewMode = 'big';
    }
  }

  public render(products: IProduct[]): HTMLElement {
    this.container.innerHTML = '';
    this.createProductsList(products);
    return this.container;
  }
}

export default ProductsList;
