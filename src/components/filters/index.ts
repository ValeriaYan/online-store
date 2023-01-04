import './style.scss';

import { IProduct } from '../../types';
import Component from '../component-template';
import SelectFilter, { SelectFilterItem } from './select-filer';

type FiltersType = Extract<keyof IProduct, 'category' | 'brand'>;

class Filters extends Component {
  private appliedFilters: Record<FiltersType, Set<string>> = {
    category: new Set(),
    brand: new Set(),
  };

  private products: IProduct[];
  private filteredProducts: IProduct[];
  private categoryFilter: SelectFilter;
  private brandFilter: SelectFilter;
  private renderProductList: (product: IProduct[]) => void;

  constructor(products: IProduct[], renderProductList: (product: IProduct[]) => void) {
    super('div', 'filters');

    this.products = products;
    this.filteredProducts = products;
    this.categoryFilter = new SelectFilter('Category');
    this.brandFilter = new SelectFilter('Brand');
    this.renderProductList = renderProductList;
  }

  private setUrl() {
    const queryParams = (Object.keys(this.appliedFilters) as Array<FiltersType>)
      .filter((filterKey) => this.appliedFilters[filterKey].size !== 0)
      .map((filterKey) => `${filterKey}=${[...this.appliedFilters[filterKey]].join('+')}`)
      .join('&');

    if (queryParams) {
      history.pushState({}, '', `?${queryParams}`);
    } else {
      history.pushState({}, '', window.location.pathname);
    }
  }

  private getFilteredProducts() {
    return this.products.filter((product) => {
      return (Object.keys(this.appliedFilters) as Array<FiltersType>).reduce(
        (isMatch, filterKey) => {
          const currentFilter = this.appliedFilters[filterKey];
          return (currentFilter.has(product[filterKey]) || currentFilter.size === 0) && isMatch;
        },
        true
      );
    });
  }

  private setAppliedFilters() {
    const queryParamsString = window.location.search;
    if (queryParamsString) {
      const queryParams = new URLSearchParams(queryParamsString);
      this.appliedFilters.category = new Set(queryParams.get('category')?.split(' '));
      this.appliedFilters.brand = new Set(queryParams.get('brand')?.split(' '));
      this.filteredProducts = this.getFilteredProducts();
    }
  }

  private getSelectItems(filterName: FiltersType): SelectFilterItem[] {
    const filtersMap = this.products.reduce((acc, product) => {
      const itemKey = product[filterName];
      let totalQuantity = acc.get(itemKey)?.totalQuantity ?? 0;
      totalQuantity += 1;

      const filteredQuantity = this.filteredProducts.filter(
        (product) => product[filterName] === itemKey
      ).length;

      acc.set(itemKey, {
        id: itemKey,
        isSelected: this.appliedFilters[filterName].has(itemKey),
        filteredQuantity,
        totalQuantity,
      });

      return acc;
    }, new Map());

    return [...filtersMap.values()];
  }

  private updateProductList(): void {
    this.renderProductList(this.filteredProducts);
  }

  private categoryFilterHandler = (event: Event): void => {
    this.selectFilterHandler(event, 'category');
  };

  private brandFilterHandler = (event: Event): void => {
    this.selectFilterHandler(event, 'brand');
  };

  private updateFilters(): void {
    this.categoryFilter.update(this.getSelectItems('category'), this.categoryFilterHandler);
    this.brandFilter.update(this.getSelectItems('brand'), this.brandFilterHandler);
  }

  private selectFilterHandler(event: Event, filter: FiltersType): void {
    if (event.target instanceof HTMLInputElement) {
      const filterSet = this.appliedFilters[filter];
      const filterId = event.target.id;

      if (filterSet.has(filterId)) {
        filterSet.delete(filterId);
      } else {
        filterSet.add(filterId);
      }
    }

    this.filteredProducts = this.getFilteredProducts();
    this.updateProductList();
    this.updateFilters();
    this.setUrl();
  }

  public render(): HTMLElement {
    this.container.innerHTML = '';
    this.container.append(this.categoryFilter.render());
    this.container.append(this.brandFilter.render());
    this.setAppliedFilters();
    this.updateFilters();
    this.updateProductList();
    return this.container;
  }
}

export default Filters;
