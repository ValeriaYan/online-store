import Footer from '../components/footer';
import Header from '../components/header';
import Cart from '../model/cart';
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
  private footer: Footer;
  private dataService: DataService;
  private cart: Cart;

  constructor() {
    this.container = document.createElement('div');
    this.container.className = 'container';
    this.content = document.createElement('main');
    this.header = new Header();
    this.footer = new Footer();
    this.dataService = new DataService();
    this.cart = new Cart(this.header).download();
  }

  private renderPage(): void {
    this.content.innerHTML = '';
    let path = window.location.pathname;
    if (path !== '/') path = path.replace(/\/$/, '');

    const isProductPath = (testPath: string): boolean => {
      const pathParts = testPath.slice(1).split('/');
      if (pathParts.length !== 2) return false;
      return `/${pathParts[0]}` === PagePaths.ProductPage;
    };

    let page: HTMLElement | null = null;
    (async () => {
      if (path === PagePaths.MainPage) {
        const products = await this.dataService.getProducts();
        page = new MainPage(products, this.cart).render();
      } else if (path === PagePaths.CartPage) {
        page = new CartPage(this.cart).render();
      } else if (isProductPath(path)) {
        const productId = path.slice(1).split('/')[1];
        const productPage = new ProductPage();

        try {
          const product = await this.dataService.getProduct(productId);
          productPage.showProduct(product, this.cart);
        } catch (error) {
          console.error(error);
          productPage.showError(productId);
        }

        page = productPage.render();
      } else {
        page = new ErrorPage().render();
      }

      this.content.append(page);
    })();
  }

  private addRouteListeners(): void {
    window.addEventListener('DOMContentLoaded', () => this.renderPage());
    window.addEventListener('popstate', () => this.renderPage());
  }

  public run(): void {
    this.container.append(this.header.render());
    this.container.append(this.content);
    this.container.append(this.footer.render());
    document.body.prepend(this.container);
    this.addRouteListeners();
  }
}

export default App;
