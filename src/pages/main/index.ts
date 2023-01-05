import './style.scss';

import Filters from '../../components/filters';
import ProductsList from '../../components/products-list';
import { IProduct } from '../../types';
import SortMenu from '../../components/sort-menu';

class MainPage {
  private filters: Filters;
  private productsList: ProductsList;
  private sortMenu: SortMenu;
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
    this.sortMenu = new SortMenu(this.updateProductList, this.searchHandler);
    this.filters = new Filters(products, this.updateProductList, this.sortMenu.getSearchQuery);
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

  private createFilterControls(): HTMLElement {
    const resetFilters = document.createElement('div');
    resetFilters.className = 'reset-filters';

    const resetFiltersButton = document.createElement('button');
    resetFiltersButton.className = 'button';
    resetFiltersButton.innerText = 'Reset Filters';

    const copyLinkButton = document.createElement('button');
    copyLinkButton.className = 'button';
    copyLinkButton.innerText = 'Copy Link';

    resetFiltersButton.onclick = () => {
      // this.render();
      // window.history.pushState({}, '', '/');
    };

    copyLinkButton.onclick = () => {
      const prevText = copyLinkButton.innerText;
      navigator.clipboard.writeText(window.location.href);
      copyLinkButton.innerText = 'Copied !';
      copyLinkButton.disabled = true;
      setTimeout(() => {
        copyLinkButton.innerText = prevText;
        copyLinkButton.disabled = false;
      }, 1000);
    };

    resetFilters.append(resetFiltersButton);
    resetFilters.append(copyLinkButton);

    return resetFilters;
  }

  public render(): HTMLElement {
    this.container.innerHTML = '';
    this.filtersContainer.append(this.createFilterControls());
    this.container.append(this.filtersContainer);
    this.container.append(this.productsContainer);
    this.productsContainer.append(this.sortMenu.render());
    this.filtersContainer.append(this.filters.render());
    return this.container;
  }
}

export default MainPage;
