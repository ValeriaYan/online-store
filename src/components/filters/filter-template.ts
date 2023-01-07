import ComponentTemplate from '../component-template';

abstract class FilterTemplate extends ComponentTemplate {
  protected title: string;
  constructor(title: string, className: string) {
    super('div', 'filter');
    this.title = title;
    this.container.classList.add(className);
  }

  protected createTitle(): HTMLElement {
    const filterTitle = document.createElement('h3');
    filterTitle.className = 'filter__title';
    filterTitle.textContent = this.title;
    return filterTitle;
  }
}

export default FilterTemplate;
