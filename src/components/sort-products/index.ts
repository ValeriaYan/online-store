import './style.scss';

import { IProduct } from '../../types';
import ComponentTemplate from '../component-template';
import SortBar from '../sort-bar';

class SortProducts extends ComponentTemplate {
  private sortBar: SortBar;
  private foundBar: HTMLElement;
  // private updateProductList: ()=>void;

  constructor(updateProductList: () => void) {
    super('div', 'sort-products');
    this.foundBar = document.createElement('div');
    // this.updateProductList = updateProductList;
    this.sortBar = new SortBar(updateProductList);
  }

  private updateFoundBar(amount: number) {
    this.foundBar.innerText = `Found: ${amount}`;
  }

  public getSortedProducts(products: IProduct[]): IProduct[] {
    this.updateFoundBar(products.length);
    const sortOption = this.sortBar.getCurrentSortOption();
    if (!sortOption) return products;

    const [sortBy, sortOrder] = sortOption.split('-');
    console.log(sortBy, sortOrder);
    if (sortBy === 'title') return [...products].sort((a, b) => a.title.localeCompare(b.title));
    if (sortBy !== 'price' && sortBy !== 'rating' && sortBy !== 'discountPercentage')
      return products;
    if (sortOrder === 'ASC') return [...products].sort((a, b) => a[sortBy] - b[sortBy]);
    if (sortOrder === 'DESC') return [...products].sort((a, b) => b[sortBy] - a[sortBy]);
    return products;
  }

  public render() {
    this.container.append(this.sortBar.render());
    this.container.append(this.foundBar);
    return this.container;
  }
}

export default SortProducts;
