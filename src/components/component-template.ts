abstract class ComponentTemplate {
  protected container: HTMLElement;

  constructor(tagName: string, className: string) {
    this.container = document.createElement(tagName);
    this.container.className = className;
  }
}

export default ComponentTemplate;
