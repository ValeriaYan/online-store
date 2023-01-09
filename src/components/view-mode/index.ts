import './style.scss';

import ComponentTemplate from '../component-template';

class viewMode extends ComponentTemplate {
  private updateProductList: () => void;
  private isBigMode = true;

  constructor(updateProductList: () => void) {
    super('div', 'view-mode');
    this.updateProductList = updateProductList;
    this.setMode();
  }

  private setMode(): void {
    const queryParamsString = window.location.search;
    if (queryParamsString) {
      const queryParams = new URLSearchParams(queryParamsString);
      this.isBigMode = queryParams.get('big') === 'false' ? false : true;
    }
  }

  private changeViewMode(isBigMode: boolean): void {
    const url = new URL(window.location.toString());
    url.searchParams.set('big', String(isBigMode));
    window.history.pushState({}, '', url);
    this.updateProductList();
  }

  private createButtons() {
    const fillWithDots = (target: HTMLElement, count: number) => {
      for (let i = 0; i < count; i++) {
        const span = document.createElement('span');
        target.append(span);
      }
    };

    const smallModeButton = document.createElement('button');
    smallModeButton.className = 'view-mode__button view-mode__button_small';
    fillWithDots(smallModeButton, 6 * 6);
    smallModeButton.onclick = () => {
      this.changeViewMode(false);
      smallModeButton.classList.add('view-mode__button_active');
      bigModeButton.classList.remove('view-mode__button_active');
    };

    const bigModeButton = document.createElement('button');
    bigModeButton.className = 'view-mode__button view-mode__button_big';
    fillWithDots(bigModeButton, 4 * 4);
    bigModeButton.onclick = () => {
      smallModeButton.classList.remove('view-mode__button_active');
      bigModeButton.classList.add('view-mode__button_active');
      this.changeViewMode(true);
    };

    if (this.isBigMode) {
      bigModeButton.classList.add('view-mode__button_active');
    } else {
      smallModeButton.classList.add('view-mode__button_active');
    }

    this.container.append(smallModeButton);
    this.container.append(bigModeButton);
  }

  public render(): HTMLElement {
    this.createButtons();
    return this.container;
  }
}

export default viewMode;
