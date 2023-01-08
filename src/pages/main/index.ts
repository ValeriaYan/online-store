import './style.scss';

import Filters from '../../components/filters';
import ProductsList from '../../components/products-list';
import { IProduct } from '../../types';
import SortMenu from '../../components/sort-menu';
import ResetFilters from '../../components/reset-filters';
import Cart from '../../model/cart';

class MainPage {
  private filters: Filters;
  private sortMenu: SortMenu;
  private resetFilters: ResetFilters;
  private productsList: ProductsList;
  private container: HTMLElement;
  private filtersContainer: HTMLElement;
  private productsContainer: HTMLElement;

  constructor(products: IProduct[], cartModel: Cart) {
    this.container = document.createElement('div');
    this.container.className = 'main-page';
    this.filtersContainer = document.createElement('div');
    this.filtersContainer.className = 'main-page__filters';
    this.productsContainer = document.createElement('div');
    this.productsContainer.className = 'main-page__products';
    this.productsList = new ProductsList(cartModel);
    this.sortMenu = new SortMenu(this.updateProductList, this.searchHandler);
    this.filters = new Filters(products, this.updateProductList, this.sortMenu.getSearchQuery);
    this.resetFilters = new ResetFilters(this.resetFiltersHandler);
  }

  private searchHandler = () => {
    this.filters.updateAllFilters();
    this.updateProductList();
  };

  private updateProductList = (): void => {
    let products = this.filters.getFilteredProducts();
    products = this.sortMenu.getSortedProducts(products);
    this.sortMenu.updateFoundBar(products.length);
    this.productsContainer.append(this.productsList.render(products));
  };

  private resetFiltersHandler = (): void => {
    window.history.pushState({}, '', window.location.pathname);
    this.filters.reset();
    this.sortMenu.reset();
    this.updateProductList();
  };

  public render(): HTMLElement {
    this.container.innerHTML = '';
    this.filtersContainer.append(this.resetFilters.render());
    this.container.append(this.filtersContainer);
    this.container.append(this.productsContainer);
    this.productsContainer.append(this.sortMenu.render());
    this.filtersContainer.append(this.filters.render());
    return this.container;
  }
}

export default MainPage;
