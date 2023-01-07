import FilterTemplate from '../filter-template';
import { SelectFiltersType } from '..';

export interface SelectFilterItem {
  id: string;
  isSelected: boolean;
  filteredQuantity: number;
  totalQuantity: number;
}

class SelectFilter extends FilterTemplate {
  private list: HTMLElement;
  private filterId: SelectFiltersType;

  constructor(title: string, filterId: SelectFiltersType) {
    super(title, 'select-filter');
    this.list = document.createElement('ul');
    this.list.className = 'select-filter__list';
    this.filterId = filterId;
  }

  public update(
    items: SelectFilterItem[],
    filterHandler: (event: Event, filterId: SelectFiltersType) => void
  ): void {
    this.list.innerHTML = '';

    items.forEach((item) => {
      const listItem = document.createElement('li');
      listItem.className = `select-filter__item ${
        item.isSelected ? 'select-filter__item_active' : ''
      }`;

      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.id = item.id;
      checkbox.checked = item.isSelected;
      checkbox.onchange = (event) => filterHandler(event, this.filterId);

      const label = document.createElement('label');
      const labelText = document.createElement('span');
      labelText.textContent = item.id;

      const quantity = document.createElement('span');
      quantity.innerText = `${item.filteredQuantity}/${item.totalQuantity}`;

      label.append(checkbox);
      label.append(labelText);

      listItem.append(label);
      listItem.append(quantity);

      this.list.append(listItem);
    });
  }

  public render(): HTMLElement {
    this.container.append(this.createTitle());
    this.container.append(this.list);
    return this.container;
  }
}

export default SelectFilter;
