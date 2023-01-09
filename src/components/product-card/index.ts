import './style.scss';

import { IProduct } from '../../types';
import ComponentTemplate from '../component-template';
import clickLinkHandler from '../../utils/click-link-handler';
import Cart from '../../model/cart';
import AddToCartButton from '../add-to-cart-button';

class ProductCard extends ComponentTemplate {
  private isInCart = false;
  private cardId: number;
  private product: IProduct;

  constructor(product: IProduct, cartModel: Cart) {
    super('div', 'product-card');
    this.cardId = product.id;
    this.product = product;
    this.isInCart = cartModel.hasProduct(product.id);
    this.createCardContent(product, cartModel);
  }

  private createInfoRow(subtitle: string, text: string | number): HTMLElement {
    const row = document.createElement('p');
    row.className = 'product-card__info-row';
    const subtitleBox = document.createElement('span');
    subtitleBox.className = 'product-card__info-title';
    subtitleBox.innerText = subtitle;

    row.append(subtitleBox);
    row.append(text.toString());

    return row;
  }

  private createCardContent(product: IProduct, cartModel: Cart) {
    if (this.isInCart) this.container.classList.add('product-card_in-cart');
    this.container.style.backgroundImage = `url(${product.thumbnail})`;

    const productTitle = document.createElement('h3');
    productTitle.className = 'product-card__title';
    productTitle.textContent = product.title;

    const productInfo = document.createElement('div');
    productInfo.className = 'product-card__info';

    productInfo.append(this.createInfoRow('Category:', product.category));
    productInfo.append(this.createInfoRow('Brand:', product.brand));
    productInfo.append(this.createInfoRow('Price:', product.price));
    productInfo.append(this.createInfoRow('Discount:', product.discountPercentage));
    productInfo.append(this.createInfoRow('Rating:', product.rating));
    productInfo.append(this.createInfoRow('Stock:', product.stock));

    const productButtonsBox = document.createElement('div');
    productButtonsBox.className = 'product-card__buttons';

    const detailsButton = document.createElement('a');
    detailsButton.href = `/product/${product.id}`;
    detailsButton.className = 'button';
    detailsButton.innerText = 'DETAILS';
    detailsButton.onclick = clickLinkHandler;

    const addToCartButton = new AddToCartButton(cartModel, this.product);

    productButtonsBox.append(addToCartButton.render());
    productButtonsBox.append(detailsButton);

    this.container.append(productTitle);
    this.container.append(productInfo);
    this.container.append(productButtonsBox);
  }

  public render(): HTMLElement {
    return this.container;
  }
}

export default ProductCard;
