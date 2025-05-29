import axios from 'axios';
import * as dotenv from 'dotenv';
import { Product } from '../types/productTypes';

dotenv.config(); // Load env variables

const API_URL = process.env.API_URL || '';

export async function fetchProducts(): Promise<Product[]> {
  try {
    const response = await axios.get<Product[]>(API_URL);
    return response.data;
  } catch (error: unknown) {
    console.error('Failed to fetch products:', error);
    return [];
  }
}
