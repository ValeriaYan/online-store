import { IProduct } from '../../types';

class ProductPage {
  private product: IProduct | null;
  private container: HTMLElement;
  static TextObject = {
    MainTitle: 'Product Page',
  };

  constructor() {
    this.container = document.createElement('div');
    this.container.className = '';
    this.product = null;
  }

  public showProduct(product: IProduct): void {
    this.product = product;
    const productDetails = document.createElement('div');
    productDetails.textContent = `Product ID: ${product.id}`;
    this.container.append(productDetails);
  }

  public showError(productID: string): void {
    const errorBox = document.createElement('div');
    errorBox.className = 'error-message';
    errorBox.innerHTML = `Product with id <span class="error-message__highlight">${productID}<span> not found`;
    this.container.append(errorBox);
  }

  render(): HTMLElement {
    return this.container;
  }
}

export default ProductPage;
