import { IProduct } from '../types/';

class DataService {
  private url = 'https://dummyjson.com/';

  public async getProducts(): Promise<IProduct[]> {
    try {
      const response = await fetch(`${this.url}products`);
      const data = await response.json();
      return data.products;
    } catch {
      throw new Error('Service not available');
    }
  }

  public async getProduct(id: string): Promise<IProduct> {
    const response = await fetch(`${this.url}products/${id}`);
    if (response.ok) {
      const product = await response.json();
      return product;
    } else {
      const messageObj = await response.json();
      throw new Error(messageObj.message);
    }
  }
}

export default DataService;
