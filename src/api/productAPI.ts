import * as axios from 'axios';
import { Product } from '../types/productTypes';

const API_URL = 'https://fakestoreapi.com/products';

export async function fetchProducts(): Promise<Product[]> {
  try {
    const response = await axios.default.get<Product[]>(API_URL);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch products:', error);
    return [];
  }
}