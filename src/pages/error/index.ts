import './style.scss';

class ErrorPage {
  private container: HTMLElement;
  static TextObject = {
    MainTitle: '404 - Page non found!',
  };

  constructor() {
    this.container = document.createElement('div');
    this.container.className = 'error-page';
  }

  private createHeaderTitle(text: string): HTMLElement {
    const headerTitle = document.createElement('h1');
    headerTitle.innerText = text;
    return headerTitle;
  }

  render(): HTMLElement {
    const title = this.createHeaderTitle(ErrorPage.TextObject.MainTitle);
    this.container.append(title);
    return this.container;
  }
}

export default ErrorPage;
