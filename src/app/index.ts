import Header from '../components/header';
import CartPage from '../pages/cart';
import ErrorPage from '../pages/error';
import MainPage from '../pages/main';
import ProductPage from '../pages/product';
import DataService from './data-service';

export const enum PagePaths {
  MainPage = '/',
  CartPage = '/cart',
  ProductPage = '/product',
}

class App {
  private container: HTMLElement;
  private content: HTMLElement;
  private header: Header;
  private dataService: DataService;

  constructor() {
    this.container = document.createElement('div');
    this.container.className = 'container';
    this.content = document.createElement('main');
    this.header = new Header();
    this.dataService = new DataService();
  }

  private renderPage(): void {
    this.content.innerHTML = '';
    const path = window.location.pathname;
    let page: HTMLElement | null = null;

    (async () => {
      if (path === PagePaths.MainPage) {
        const products = await this.dataService.getProducts();
        page = new MainPage().render(products);
      } else if (path === PagePaths.CartPage) {
        page = new CartPage().render();
      } else if (path === PagePaths.ProductPage) {
        page = new ProductPage().render();
      } else {
        page = new ErrorPage().render();
      }

      if (page) this.content.append(page);
    })();
  }

  private router(): void {
    window.addEventListener('DOMContentLoaded', () => this.renderPage());
    window.addEventListener('popstate', () => this.renderPage());
  }

  private navLinkClickHandler(event: Event) {
    event.preventDefault();
    if (event.target instanceof HTMLAnchorElement) {
      history.pushState({}, '', event.target.href);
      this.renderPage();
    }
  }

  public run(): void {
    this.container.append(this.header.render(this.navLinkClickHandler.bind(this)));
    this.container.append(this.content);
    document.body.prepend(this.container);
    this.router();
  }
}

export default App;
