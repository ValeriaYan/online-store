import ComponentTemplate from '../component-template';

class SortBar extends ComponentTemplate {
  private sortOptions = {
    title: 'Sort by title',
    'price-ASC': 'Sort by price ASC',
    'price-DESC': 'Sort by price DESC',
    'rating-ASC': 'Sort by rating ASC',
    'rating-DESC': 'Sort by rating DESC',
    'discountPercentage-ASC': 'Sort by discount ASC',
    'discountPercentage-DESC': 'Sort by discount DESC',
  };

  private currentSortOption: string;
  private sortSelect: HTMLSelectElement;
  private updateProductList: () => void;

  constructor(updateProductList: () => void) {
    super('div', 'sort-bar');
    this.currentSortOption = '';
    this.sortSelect = this.createSortSelect();
    this.updateProductList = updateProductList;
  }

  private setCurrentSortOption(): void {
    const queryParamsString = window.location.search;
    if (queryParamsString) {
      const queryParams = new URLSearchParams(queryParamsString);
      this.currentSortOption = queryParams.get('sort') ?? '';
    }
  }

  private setUrl(): void {
    const url = new URL(window.location.toString());
    url.searchParams.set('sort', this.currentSortOption);
    window.history.pushState({}, '', url);
  }

  private selectOptionHandler(event: Event): void {
    if (event.target instanceof HTMLSelectElement) {
      this.currentSortOption = event.target.value;
      this.setUrl();
      this.updateProductList();
    }
  }

  private createSortSelect(): HTMLSelectElement {
    const select = document.createElement('select');
    const optionsTitle = document.createElement('option');
    optionsTitle.textContent = 'Sort options:';
    optionsTitle.selected = true;
    optionsTitle.disabled = true;
    optionsTitle.value = '';

    select.append(optionsTitle);

    (Object.keys(this.sortOptions) as Array<keyof typeof this.sortOptions>).forEach((key) => {
      const option = document.createElement('option');
      option.textContent = this.sortOptions[key];
      option.selected = this.currentSortOption === key;
      option.value = key;
      select.append(option);
    });

    select.onchange = (event) => this.selectOptionHandler(event);

    return select;
  }

  public getCurrentSortOption(): string {
    return this.currentSortOption;
  }

  public reset(): void {
    this.currentSortOption = '';
    this.sortSelect.value = '';
  }

  public render(): HTMLElement {
    this.setCurrentSortOption();
    this.container.append(this.sortSelect);
    return this.container;
  }
}

export default SortBar;
