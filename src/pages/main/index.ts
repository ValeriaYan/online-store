import './style.scss';

import Filters from '../../components/filters';
import ProductsList from '../../components/products-list';
import { IProduct } from '../../types';

class MainPage {
  private productsList: ProductsList;
  private container: HTMLElement;
  private filtersContainer: HTMLElement;

  constructor() {
    this.container = document.createElement('div');
    this.container.className = 'main-page';
    this.filtersContainer = document.createElement('div');
    this.filtersContainer.className = 'main-page__filters';
    this.productsList = new ProductsList();
  }

  private renderProductList = (products: IProduct[]): void => {
    this.container.append(this.productsList.render(products));
  };

  render(products: IProduct[]): HTMLElement {
    this.container.innerHTML = '';
    this.filtersContainer.innerHTML = '';
    this.container.append(this.filtersContainer);

    const filters = new Filters(products, this.renderProductList);
    this.filtersContainer.append(filters.render());

    return this.container;
  }
}

export default MainPage;
