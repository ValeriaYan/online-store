class MainPage {
  private container: HTMLElement;
  static TextObject = {
    MainTitle: 'Main Page',
  };

  constructor() {
    this.container = document.createElement('div');
  }

  private createHeaderTitle(text: string): HTMLElement {
    const headerTitle = document.createElement('h1');
    headerTitle.innerText = text;
    return headerTitle;
  }

  render(): HTMLElement {
    const title = this.createHeaderTitle(MainPage.TextObject.MainTitle);
    this.container.append(title);
    return this.container;
  }
}

export default MainPage;
