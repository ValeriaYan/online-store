import { IProduct } from '../types/';

class DataService {
  private url = 'https://dummyjson.com/';

  public async getProducts(): Promise<IProduct[]> {
    try {
      const response = await fetch(`${this.url}products`);
      const data = await response.json();
      return data.products;
    } catch (error) {
      throw new Error('Service not available');
    }
  }
}

export default DataService;
