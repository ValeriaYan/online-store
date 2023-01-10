import './style.scss';

import ComponentTemplate from '../component-template';

class viewMode extends ComponentTemplate {
  private updateProductList: () => void;
  private smallModeButton: HTMLButtonElement;
  private bigModeButton: HTMLButtonElement;
  private isBigMode = true;

  constructor(updateProductList: () => void) {
    super('div', 'view-mode');
    this.smallModeButton = document.createElement('button');
    this.smallModeButton.className = 'view-mode__button view-mode__button_small';
    this.bigModeButton = document.createElement('button');
    this.bigModeButton.className = 'view-mode__button view-mode__button_big';
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
    this.isBigMode = isBigMode;
    const url = new URL(window.location.toString());
    url.searchParams.set('big', String(isBigMode));
    window.history.pushState({}, '', url);
    this.updateProductList();
  }

  private updateButtons(): void {
    if (this.isBigMode) {
      this.smallModeButton.classList.remove('view-mode__button_active');
      this.bigModeButton.classList.add('view-mode__button_active');
    } else {
      this.smallModeButton.classList.add('view-mode__button_active');
      this.bigModeButton.classList.remove('view-mode__button_active');
    }
  }

  private createButtons() {
    const fillWithDots = (target: HTMLElement, count: number) => {
      for (let i = 0; i < count; i++) {
        const span = document.createElement('span');
        target.append(span);
      }
    };
    fillWithDots(this.smallModeButton, 6 * 6);
    fillWithDots(this.bigModeButton, 4 * 4);
    this.updateButtons();

    this.smallModeButton.onclick = () => {
      this.changeViewMode(false);
      this.updateButtons();
    };

    this.bigModeButton.onclick = () => {
      this.changeViewMode(true);
      this.updateButtons();
    };

    this.container.append(this.smallModeButton);
    this.container.append(this.bigModeButton);
  }

  public reset(): void {
    this.bigModeButton.classList.add('view-mode__button_active');
    this.smallModeButton.classList.remove('view-mode__button_active');
  }

  public render(): HTMLElement {
    this.createButtons();
    return this.container;
  }
}

export default viewMode;
