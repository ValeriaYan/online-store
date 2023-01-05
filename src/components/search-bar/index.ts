import ComponentTemplate from '../component-template';

class SearchBar extends ComponentTemplate {
  private searchQuery: string;
  private searchInput: HTMLInputElement;

  constructor(updateProductList: () => void) {
    super('div', 'search-bar');
    this.searchQuery = '';
    this.searchInput = this.createSearchInput(updateProductList);
  }

  private setUrl(): void {
    const url = new URL(window.location.toString());

    if (this.searchQuery) {
      url.searchParams.set('search', this.searchQuery);
    } else {
      url.searchParams.delete('search');
    }

    window.history.pushState({}, '', url);
  }

  private createSearchInput(updateProductList: () => void): HTMLInputElement {
    const searchInput = document.createElement('input');
    searchInput.type = 'search';
    searchInput.placeholder = 'Search product';

    searchInput.oninput = () => {
      this.searchQuery = searchInput.value;
      this.setUrl();
      updateProductList();
    };

    this.container.append(searchInput);
    return searchInput;
  }

  private setSearchQuery(): void {
    const queryParamsString = window.location.search;
    if (queryParamsString) {
      const queryParams = new URLSearchParams(queryParamsString);
      this.searchQuery = queryParams.get('search') ?? '';
      this.searchInput.value = this.searchQuery;
    }
  }

  public getSearchQuery = (): string => {
    return this.searchQuery;
  };

  public render(): HTMLElement {
    this.setSearchQuery();
    return this.container;
  }
}

export default SearchBar;
