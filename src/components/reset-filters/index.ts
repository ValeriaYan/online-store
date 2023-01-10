import './style.scss';

import ComponentTemplate from '../component-template';

class ResetFilters extends ComponentTemplate {
  constructor(resetFiltersHandler: () => void) {
    super('div', 'reset-filters');
    this.createResetButtons(resetFiltersHandler);
  }

  private copyLink(event: Event): void {
    if (!(event.target instanceof HTMLButtonElement)) return;

    const copyLinkButton = event.target;
    const prevText = copyLinkButton.innerText;

    navigator.clipboard.writeText(window.location.href);
    copyLinkButton.innerText = 'Copied!';
    copyLinkButton.disabled = true;

    setTimeout(() => {
      copyLinkButton.innerText = prevText;
      copyLinkButton.disabled = false;
    }, 1500);
  }

  private createResetButtons(resetFiltersHandler: () => void): void {
    const resetFiltersButton = document.createElement('button');
    resetFiltersButton.className = 'button';
    resetFiltersButton.innerText = 'Reset Filters';

    const copyLinkButton = document.createElement('button');
    copyLinkButton.className = 'button';
    copyLinkButton.innerText = 'Copy Link';

    resetFiltersButton.onclick = resetFiltersHandler;

    copyLinkButton.onclick = this.copyLink;

    this.container.append(resetFiltersButton);
    this.container.append(copyLinkButton);
  }

  public render(): HTMLElement {
    return this.container;
  }
}

export default ResetFilters;
