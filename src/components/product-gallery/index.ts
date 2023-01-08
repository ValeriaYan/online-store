import './style.scss';

import ComponentTemplate from '../component-template';

class ProductGallery extends ComponentTemplate {
  private images: string[];
  private defaultActiveIndex = 0;
  private activeSlide: HTMLImageElement | null = null;
  private mainSlide: HTMLImageElement | null = null;
  private altText: string;

  constructor(images: string[], altText = '') {
    super('div', 'product-gallery');
    this.images = images;
    this.altText = altText;
  }

  private switchSlide = (event: Event) => {
    if (event.target instanceof HTMLImageElement) {
      const newActiveSlide = event.target;
      this.activeSlide?.classList.remove('product-gallery__slide_active');
      if (this.mainSlide) this.mainSlide.src = newActiveSlide.src;
      this.activeSlide = newActiveSlide;
      newActiveSlide.classList.add('product-gallery__slide_active');
    }
  };

  private createGallery() {
    const mainSlideContainer = document.createElement('div');
    mainSlideContainer.className = 'product-gallery__main-slide';

    this.mainSlide = document.createElement('img');
    this.mainSlide.src = this.images[this.defaultActiveIndex];
    this.mainSlide.alt = this.altText;

    const gallerySlides = document.createElement('div');
    gallerySlides.className = 'product-gallery__slides';

    this.images.forEach((urlToImg, idx) => {
      const slide = document.createElement('img');
      slide.className = 'product-gallery__slide';
      slide.src = urlToImg;
      slide.alt = this.altText;

      if (idx === this.defaultActiveIndex) {
        slide.classList.add('product-gallery__slide_active');
        this.activeSlide = slide;
      }
      slide.onclick = this.switchSlide;

      gallerySlides.append(slide);
    });

    mainSlideContainer.append(this.mainSlide);
    this.container.append(gallerySlides);
    this.container.append(mainSlideContainer);
  }

  public render(): HTMLElement {
    this.createGallery();
    return this.container;
  }
}

export default ProductGallery;
