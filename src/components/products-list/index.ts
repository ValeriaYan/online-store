import './style.scss';

import { IProduct } from '../../types';
import Component from '../component-template';

class ProductsList extends Component {
  constructor() {
    super('div', 'products-list');
  }

  private createInfoRow(subtitle: string, text: string | number): HTMLElement {
    const row = document.createElement('p');
    row.className = 'product-item__info-row';
    const subtitleBox = document.createElement('span');
    subtitleBox.className = 'product-item__info-subtitle';
    subtitleBox.innerText = subtitle;

    row.append(subtitleBox);
    row.append(text.toString());

    return row;
  }

  private createProductsList(products: IProduct[]): void {
    products.forEach((product) => {
      const productItem = document.createElement('div');
      productItem.className = 'product-item';

      const productItemTitle = document.createElement('h3');
      productItemTitle.className = 'product-item__title';
      productItemTitle.textContent = product.title;

      const productItemInfo = document.createElement('div');
      productItemInfo.className = 'product-item__info';

      productItemInfo.append(this.createInfoRow('Category:', product.category));
      productItemInfo.append(this.createInfoRow('Brand:', product.brand));
      productItemInfo.append(this.createInfoRow('Price:', product.price));
      productItemInfo.append(this.createInfoRow('Discount:', product.discountPercentage));
      productItemInfo.append(this.createInfoRow('Rating:', product.rating));
      productItemInfo.append(this.createInfoRow('Stock:', product.stock));

      productItem.append(productItemTitle);
      productItem.append(productItemInfo);
      this.container.append(productItem);
    });
  }

  public update(products: IProduct[]): void {
    this.container.innerHTML = '';
    this.createProductsList(products);
  }

  public render(products: IProduct[]): HTMLElement {
    this.container.innerHTML = '';
    this.createProductsList(products);
    return this.container;
  }
}

export default ProductsList;
