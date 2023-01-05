import './style.scss';

import Filters from '../../components/filters';
import ProductsList from '../../components/products-list';
import { IProduct } from '../../types';
import SortProducts from '../../components/sort-products';

class MainPage {
  private filters: Filters;
  private productsList: ProductsList;
  private sortProducts: SortProducts;
  private container: HTMLElement;
  private filtersContainer: HTMLElement;
  private productsContainer: HTMLElement;

  constructor(products: IProduct[]) {
    this.container = document.createElement('div');
    this.container.className = 'main-page';
    this.filtersContainer = document.createElement('div');
    this.filtersContainer.className = 'main-page__filters';
    this.productsContainer = document.createElement('div');
    this.productsContainer.className = 'main-page__products';
    this.productsList = new ProductsList();
    this.filters = new Filters(products, this.updateProductList);
    this.sortProducts = new SortProducts(this.updateProductList);
  }

  private updateProductList = (): void => {
    console.log(this.filters.filteredProducts);
    const sortedProducts = this.sortProducts.getSortedProducts(this.filters.filteredProducts);
    this.productsContainer.append(this.productsList.render(sortedProducts));
  };

  render(): HTMLElement {
    this.container.innerHTML = '';
    this.container.append(this.filtersContainer);
    this.container.append(this.productsContainer);
    this.productsContainer.append(this.sortProducts.render());
    this.filtersContainer.append(this.filters.render());
    return this.container;
  }
}

export default MainPage;
