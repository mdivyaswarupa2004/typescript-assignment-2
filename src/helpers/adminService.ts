import * as readlineSync from 'readline-sync';
import { Product } from '../types/productTypes';

export class AdminService {
  private products: Product[];

  constructor(products: Product[]) {
    this.products = products;
  }

  addProduct(): Product[] {
    console.log('\n=== Add New Product ===');
    
    const title = readlineSync.question('Enter product title: ');
    if (title.toLowerCase() === 'back') {
      return this.products;
    }

    const priceStr = readlineSync.question('Enter product price: ');
    if (priceStr.toLowerCase() === 'back') {
      return this.products;
    }

    const price = parseFloat(priceStr);
    if (isNaN(price)) {
      console.log('Invalid price. Please try again.');
      return this.addProduct();
    }

    const category = readlineSync.question('Enter product category: ');
    if (category.toLowerCase() === 'back') {
      return this.products;
    }

    const description = readlineSync.question('Enter product description: ');
    if (description.toLowerCase() === 'back') {
      return this.products;
    }

    const ratingStr = readlineSync.question('Enter product rating (1-5): ');
    if (ratingStr.toLowerCase() === 'back') {
      return this.products;
    }

    const rating = parseFloat(ratingStr);
    if (isNaN(rating) || rating < 1 || rating > 5) {
      console.log('Invalid rating. Please enter a number between 1 and 5.');
      return this.addProduct();
    }

    const newProduct: Product = {
      id: this.products.length + 1000,
      title,
      price,
      description,
      category,
      image: 'https://via.placeholder.com/150',
      rating: {
        rate: rating,
        count: 1
      }
    };

    this.products.push(newProduct);
    console.log('✅ Product added successfully!');
    return this.products;
  }

  removeProduct(): Product[] {
    console.log('\n=== Remove Product ===');
    
    if (this.products.length === 0) {
      console.log('No products available to remove.');
      return this.products;
    }

    this.displayProductsList(this.products);
    
    const input = readlineSync.question('Enter product ID or name to remove (or "back"): ');
    
    if (input.toLowerCase() === 'back') {
      return this.products;
    }

    let productIndex = -1;
    
    // Try to find by ID first
    const id = parseInt(input);
    if (!isNaN(id)) {
      productIndex = this.products.findIndex(p => p.id === id);
    }
    
    // If not found by ID, try by name
    if (productIndex === -1) {
      productIndex = this.products.findIndex(p => 
        p.title.toLowerCase().includes(input.toLowerCase())
      );
    }

    if (productIndex !== -1) {
      const removedProduct = this.products.splice(productIndex, 1)[0];
      console.log(`✅ Removed product: ${removedProduct.title}`);
    } else {
      console.log('❌ Product not found.');
    }
    
    return this.products;
  }

  displayProductsList(products: Product[]): void {
    if (products.length === 0) {
      console.log('No products available.');
      return;
    }

    products.forEach((product, index) => {
      console.log(`${index + 1}. ID: ${product.id} | ${product.title}`);
      console.log(`   Price: $${product.price}`);
      console.log(`   Category: ${product.category}`);
      console.log(`   Rating: ${product.rating.rate}/5 (${product.rating.count} reviews)`);
      console.log('');
    });
  }

  viewAllProducts(): void {
    console.log('\n=== All Products ===');
    this.displayProductsList(this.products);
    readlineSync.question('\nPress Enter to continue...');
  }
}