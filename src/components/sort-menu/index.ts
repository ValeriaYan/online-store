import './style.scss';

import { IProduct } from '../../types';
import ComponentTemplate from '../component-template';
import SortBar from '../sort-bar';
import SearchBar from '../search-bar';

class SortMenu extends ComponentTemplate {
  private sortBar: SortBar;
  private foundBar: HTMLElement;
  private searchBar: SearchBar;

  constructor(updateProductList: () => void, searchHandler: () => void) {
    super('div', 'sort-menu');
    this.foundBar = document.createElement('div');
    this.foundBar.className = 'sort-menu__found';
    this.sortBar = new SortBar(updateProductList);
    this.searchBar = new SearchBar(searchHandler);
  }

  public updateFoundBar(amount: number) {
    this.foundBar.innerText = `Found: ${amount}`;
  }

  public getSortedProducts(products: IProduct[]): IProduct[] {
    const sortOption = this.sortBar.getCurrentSortOption();
    if (!sortOption) return products;

    const [sortBy, sortOrder] = sortOption.split('-');

    if (sortBy === 'title') return [...products].sort((a, b) => a.title.localeCompare(b.title));
    if (sortBy !== 'price' && sortBy !== 'rating' && sortBy !== 'discountPercentage')
      return products;
    if (sortOrder === 'ASC') return [...products].sort((a, b) => a[sortBy] - b[sortBy]);
    if (sortOrder === 'DESC') return [...products].sort((a, b) => b[sortBy] - a[sortBy]);
    return products;
  }

  public getFoundProducts(products: IProduct[]): IProduct[] {
    const searchQuery = this.searchBar.getSearchQuery().toLowerCase();
    if (!searchQuery) return products;
    return products.filter(
      (product) =>
        product.title.toLowerCase().includes(searchQuery) ||
        product.brand.toLowerCase().includes(searchQuery) ||
        product.category.toLowerCase().includes(searchQuery)
    );
  }

  public getSearchQuery = (): string => {
    return this.searchBar.getSearchQuery().toLowerCase();
  };

  public reset() {
    this.sortBar.reset();
    this.searchBar.reset();
  }

  public render() {
    this.container.append(this.sortBar.render());
    this.container.append(this.foundBar);
    this.container.append(this.searchBar.render());
    return this.container;
  }
}

export default SortMenu;
