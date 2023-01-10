import './style.scss';
import ComponentTemplate from '../component-template';

class Footer extends ComponentTemplate {
  constructor() {
    super('footer', 'footer');
  }

  private createAuthorLink(name: string, link: string): HTMLElement {
    const authorLink = document.createElement('a');
    authorLink.className = 'footer__author';
    authorLink.href = link;
    authorLink.textContent = name;
    return authorLink;
  }

  private createAuthors(): void {
    const authors = document.createElement('div');
    authors.className = 'footer__school-authors';

    authors.append(this.createAuthorLink('aleksryab', 'https://github.com/aleksryab'));
    authors.append(this.createAuthorLink('ValeriaYan', 'https://github.com/ValeriaYan'));
    this.container.append(authors);
  }

  private createCopyright() {
    const copyright = document.createElement('p');
    copyright.className = 'footer__copyright';
    copyright.textContent = '@2023';
    this.container.append(copyright);
  }

  private createSchoolLogo(): void {
    const logo = document.createElement('a');
    logo.className = 'footer__school-link';
    logo.href = 'https://rs.school/js/';
    const logoText = document.createElement('span');
    logoText.className = 'visually-hidden';
    logoText.innerText = 'Rolling Scopes School';

    logo.append(logoText);
    this.container.append(logo);
  }

  public render(): HTMLElement {
    this.createAuthors();
    this.createCopyright();
    this.createSchoolLogo();
    return this.container;
  }
}

export default Footer;
