import './style.scss';

import { IProduct } from '../../types';
import ComponentTemplate from '../component-template';
import SelectFilter, { SelectFilterItem } from './select-filter';
import RangeFilter from './range-filter';

export type SelectFiltersType = Extract<keyof IProduct, 'category' | 'brand'>;
export type RangeFiltersType = Extract<keyof IProduct, 'price' | 'stock'>;

// Record<FiltersType, Set<string>>
class Filters extends ComponentTemplate {
  private appliedFilters = {
    select: { category: new Set(), brand: new Set() },
    range: { price: [0, Infinity], stock: [0, Infinity] },
  };

  private products: IProduct[];
  public filteredProducts: IProduct[];
  private categoryFilter: SelectFilter;
  private brandFilter: SelectFilter;
  private priceFilter: RangeFilter;
  private updateProductList: () => void;

  constructor(products: IProduct[], updateProductList: () => void) {
    super('div', 'filters');

    this.products = products;
    this.filteredProducts = products;
    this.categoryFilter = new SelectFilter('Category', 'category');
    this.brandFilter = new SelectFilter('Brand', 'brand');
    const prices = this.products.map((product) => product.price);
    this.priceFilter = new RangeFilter(
      'Price',
      'price',
      {
        min: Math.min(...prices),
        max: Math.max(...prices),
      },
      this.rangeFilterHandler
    );
    this.updateProductList = updateProductList;
  }

  private setSelectUrl(filter: SelectFiltersType): void {
    const queryParams = [...this.appliedFilters.select[filter]].join('↕');
    const url = new URL(window.location.toString());

    if (queryParams) {
      url.searchParams.set(filter, queryParams);
    } else {
      url.searchParams.delete(filter);
    }

    window.history.pushState({}, '', url);
  }

  private setRangeUrl(filter: RangeFiltersType): void {
    const queryParams = this.appliedFilters.range[filter].join('↕');
    const url = new URL(window.location.toString());

    if (queryParams) {
      url.searchParams.set(filter, queryParams);
    } else {
      url.searchParams.delete(filter);
    }

    window.history.pushState({}, '', url);
  }

  private filterProducts(): IProduct[] {
    return this.products.filter((product) => {
      return (
        (
          Object.keys(this.appliedFilters.select) as Array<keyof typeof this.appliedFilters.select>
        ).reduce((isMatch, filterKey) => {
          const currentFilter = this.appliedFilters.select[filterKey];
          return (currentFilter.has(product[filterKey]) || currentFilter.size === 0) && isMatch;
        }, true) &&
        (
          Object.keys(this.appliedFilters.range) as Array<keyof typeof this.appliedFilters.range>
        ).reduce((isMatch, filterKey) => {
          const currentFilter = this.appliedFilters.range[filterKey];
          const [from, to] = currentFilter;
          return product[filterKey] >= from && product[filterKey] <= to && isMatch;
        }, true)
      );
    });
  }

  private setAppliedFilters() {
    const queryParamsString = window.location.search;
    console.log(queryParamsString);
    if (queryParamsString) {
      const queryParams = new URLSearchParams(queryParamsString);
      this.appliedFilters.select.category = new Set(queryParams.get('category')?.split('↕'));
      this.appliedFilters.select.brand = new Set(queryParams.get('brand')?.split('↕'));
      this.appliedFilters.range.price = queryParams
        .get('price')
        ?.split('↕')
        .map((it) => Number(it)) ?? [0, Infinity];
      this.filteredProducts = this.filterProducts();
    }
  }

  private getSelectItems(filterName: SelectFiltersType): SelectFilterItem[] {
    const filtersMap = this.products.reduce((acc, product) => {
      const itemKey = product[filterName];

      let totalQuantity = acc.get(itemKey)?.totalQuantity ?? 0;
      totalQuantity += 1;

      const filteredQuantity = this.filteredProducts.filter(
        (product) => product[filterName] === itemKey
      ).length;

      acc.set(itemKey, {
        id: itemKey,
        isSelected: this.appliedFilters.select[filterName].has(itemKey),
        filteredQuantity,
        totalQuantity,
      });

      return acc;
    }, new Map());

    return [...filtersMap.values()];
  }

  private getFilteredRange(): string[] | null {
    const items = this.filteredProducts.map((product) => product.price);
    if (items.length === 0) return null;
    return [Math.min(...items).toString(), Math.max(...items).toString()];
  }

  private selectFilterHandler = (event: Event, filter: SelectFiltersType): void => {
    if (event.target instanceof HTMLInputElement) {
      const filterSet = this.appliedFilters.select[filter];
      const filterId = event.target.id;

      if (filterSet.has(filterId)) {
        filterSet.delete(filterId);
      } else {
        filterSet.add(filterId);
      }
    }

    this.filteredProducts = this.filterProducts();
    this.updateProductList();
    this.updateSelectFilters();
    this.updateRangeFilters();
    this.setSelectUrl(filter);
  };

  private updateSelectFilters(): void {
    this.categoryFilter.update(this.getSelectItems('category'), this.selectFilterHandler);
    this.brandFilter.update(this.getSelectItems('brand'), this.selectFilterHandler);
  }

  private updateRangeFilters(): void {
    this.priceFilter.update(this.getFilteredRange());
  }

  private rangeFilterHandler = (from: string, to: string, filterId: RangeFiltersType): void => {
    console.log(filterId);
    this.appliedFilters.range[filterId] = [
      Math.min(Number(from), Number(to)),
      Math.max(Number(from), Number(to)),
    ];
    console.log(this.appliedFilters.range[filterId]);

    this.filteredProducts = this.filterProducts();
    this.updateProductList();
    this.updateSelectFilters();
    this.setRangeUrl(filterId);
  };

  public getFilteredProducts(): IProduct[] {
    return this.filteredProducts;
  }

  public render(): HTMLElement {
    this.container.innerHTML = '';
    this.container.append(this.categoryFilter.render());
    this.container.append(this.brandFilter.render());
    this.container.append(this.priceFilter.render());
    this.setAppliedFilters();
    this.updateSelectFilters();
    this.updateRangeFilters();
    this.updateProductList();
    return this.container;
  }
}

export default Filters;
