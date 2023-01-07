import ProductDetails from '../../components/product-details';
import { IProduct } from '../../types';

class ProductPage {
  private product: IProduct | null;
  private container: HTMLElement;
  static TextObject = {
    MainTitle: 'Product Page',
  };

  constructor() {
    this.container = document.createElement('div');
    this.container.className = 'product-page';
    this.product = null;
  }

  public showProduct(product: IProduct): void {
    this.product = product;
    const productDetails = new ProductDetails(product);

    this.container.append(productDetails.render());
  }

  public showError(productID: string): void {
    const errorMessage = document.createElement('div');
    errorMessage.className = 'error-message';
    errorMessage.innerHTML = `Product with id <span class="error-message__highlight">${productID}<span> not found`;
    this.container.append(errorMessage);
  }

  render(): HTMLElement {
    return this.container;
  }
}

export default ProductPage;
