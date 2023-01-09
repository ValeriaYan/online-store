import './style.scss';

import { IProduct } from '../../types';
import ComponentTemplate from '../component-template';
import ProductGallery from '../product-gallery';
import Cart from '../../model/cart';
import AddToCartButton from '../add-to-cart-button';

class ProductDetails extends ComponentTemplate {
  private product: IProduct;
  private cartModel: Cart;
  private isInCart = false;

  constructor(product: IProduct, cartModel: Cart) {
    super('div', 'product-details');
    this.cartModel = cartModel;
    this.product = product;
  }

  private createGallery(): HTMLElement {
    const galleryContainer = document.createElement('div');
    galleryContainer.className = 'product-details__gallery';
    const gallery = new ProductGallery(this.product.images, this.product.title);
    galleryContainer.append(gallery.render());
    return galleryContainer;
  }

  private createInfoItem(subtitle: string, text: string | number): HTMLElement {
    const infoItem = document.createElement('div');
    infoItem.className = 'product-details__info-item';

    const infoItemSubtitle = document.createElement('h3');
    infoItemSubtitle.className = 'product-details__info-subtitle';
    infoItemSubtitle.innerText = subtitle;

    const infoItemText = document.createElement('p');
    infoItemText.className = 'product-details__info-text';
    infoItemText.innerText = text.toString();

    infoItem.append(infoItemSubtitle);
    infoItem.append(infoItemText);

    return infoItem;
  }

  private createProductInfo(): HTMLElement {
    const productInfo = document.createElement('div');
    productInfo.className = 'product-details__info';

    productInfo.append(this.createInfoItem('Description:', this.product.description));
    productInfo.append(
      this.createInfoItem('Discount Percentage:', this.product.discountPercentage)
    );
    productInfo.append(this.createInfoItem('Stock:', this.product.stock));
    productInfo.append(this.createInfoItem('Brand:', this.product.brand));
    productInfo.append(this.createInfoItem('Category:', this.product.category));

    return productInfo;
  }

  private createCartMenu = (): HTMLElement => {
    const cartMenu = document.createElement('div');
    cartMenu.className = 'product-details__cart-menu';

    const productPrice = document.createElement('div');
    productPrice.className = 'product-details__price';
    productPrice.innerText = this.product.price.toString();

    const addToCartButton = new AddToCartButton(this.cartModel, this.product);

    cartMenu.append(productPrice);
    cartMenu.append(addToCartButton.render());
    return cartMenu;
  };

  private createHeader(): void {
    const header = document.createElement('div');
    header.className = 'product-details__header';
    const title = document.createElement('h1');
    title.className = 'product-details__title';
    title.innerText = this.product.title;

    header.append(title);
    this.container.append(header);
  }

  private createBody(): void {
    const body = document.createElement('div');
    body.className = 'product-details__body';
    body.append(this.createGallery());
    body.append(this.createProductInfo());
    body.append(this.createCartMenu());
    this.container.append(body);
  }

  public render(): HTMLElement {
    this.createHeader();
    this.createBody();
    return this.container;
  }
}

export default ProductDetails;
