import * as readlineSync from 'readline-sync';
import { Product, CartItem } from '../types/productTypes';
import { addToCart, getCartTotal } from './cartUtils';

export class CustomerService {
  private products: Product[];
  private cart: CartItem[];

  constructor(products: Product[], cart: CartItem[]) {
    this.products = products;
    this.cart = cart;
  }

  searchProducts(): void {
    console.log('\n=== Search Products ===');
    
    const keyword = readlineSync.question('Enter search keyword (or "back"): ');
    
    if (keyword.toLowerCase() === 'back') {
      return;
    }

    const results = this.products.filter(product =>
      product.title.toLowerCase().includes(keyword.toLowerCase())
    );

    if (results.length === 0) {
      console.log('No products found matching your search.');
    } else {
      console.log(`\n🔍 Found ${results.length} products:`);
      this.displayProductsList(results);
    }

    readlineSync.question('\nPress Enter to continue...');
  }

  filterByPrice(): void {
    const maxPriceStr = readlineSync.question('Enter maximum price (or "back"): ');
    
    if (maxPriceStr.toLowerCase() === 'back') {
      return;
    }

    const maxPrice = parseFloat(maxPriceStr);
    if (isNaN(maxPrice)) {
      console.log('Invalid price. Please try again.');
      this.filterByPrice();
      return;
    }

    const results = this.products.filter(product => product.price <= maxPrice);
    
    if (results.length === 0) {
      console.log('No products found within this price range.');
    } else {
      console.log(`\n💰 Products under $${maxPrice}:`);
      this.displayProductsList(results);
    }

    readlineSync.question('\nPress Enter to continue...');
  }

  filterByCategory(): void {
    // Get unique categories
    const categories = [...new Set(this.products.map(p => p.category))];
    
    console.log('\nAvailable categories:');
    categories.forEach((cat, index) => {
      console.log(`${index + 1}. ${cat}`);
    });

    const input = readlineSync.question('Enter category name or number (or "back"): ');
    
    if (input.toLowerCase() === 'back') {
      return;
    }

    let selectedCategory = '';
    const categoryIndex = parseInt(input) - 1;
    
    if (!isNaN(categoryIndex) && categoryIndex >= 0 && categoryIndex < categories.length) {
      selectedCategory = categories[categoryIndex];
    } else {
      selectedCategory = input;
    }

    const results = this.products.filter(product => 
      product.category.toLowerCase().includes(selectedCategory.toLowerCase())
    );

    if (results.length === 0) {
      console.log('No products found in this category.');
    } else {
      console.log(`\n📂 Products in category "${selectedCategory}":`);
      this.displayProductsList(results);
    }

    readlineSync.question('\nPress Enter to continue...');
  }

  filterByRating(): void {
    const minRatingStr = readlineSync.question('Enter minimum rating (1-5) or "back": ');
    
    if (minRatingStr.toLowerCase() === 'back') {
      return;
    }

    const minRating = parseFloat(minRatingStr);
    if (isNaN(minRating) || minRating < 1 || minRating > 5) {
      console.log('Invalid rating. Please enter a number between 1 and 5.');
      this.filterByRating();
      return;
    }

    const results = this.products.filter(product => product.rating.rate >= minRating);
    
    if (results.length === 0) {
      console.log('No products found with this rating or higher.');
    } else {
      console.log(`\n⭐ Products with rating ${minRating}+ stars:`);
      this.displayProductsList(results);
    }

    readlineSync.question('\nPress Enter to continue...');
  }

  addToCartInterface(): CartItem[] {
    console.log('\n=== Add to Cart ===');
    this.displayProductsList(this.products);
    
    const input = readlineSync.question('Enter product name or ID to add to cart (or "back"): ');
    
    if (input.toLowerCase() === 'back') {
      return this.cart;
    }

    let product: Product | undefined;
    
    // Try to find by ID first
    const id = parseInt(input);
    if (!isNaN(id)) {
      product = this.products.find(p => p.id === id);
    }
    
    // If not found by ID, try by name
    if (!product) {
      product = this.products.find(p => 
        p.title.toLowerCase().includes(input.toLowerCase())
      );
    }

    if (product) {
      this.cart = addToCart(this.cart, product);
      console.log(`✅ Added "${product.title}" to cart!`);
    } else {
      console.log('❌ Product not found.');
    }
    
    return this.cart;
  }

  viewCart(): void {
    console.log('\n=== Your Cart ===');
    
    if (this.cart.length === 0) {
      console.log('Your cart is empty.');
    } else {
      this.cart.forEach((item, index) => {
        console.log(`${index + 1}. ${item.product.title}`);
        console.log(`   Price: $${item.product.price}`);
        console.log(`   Quantity: ${item.quantity}`);
        console.log(`   Subtotal: $${(item.product.price * item.quantity).toFixed(2)}`);
        console.log('');
      });
      
      const total = getCartTotal(this.cart);
      console.log(`💰 Total: $${total.toFixed(2)}`);
    }
    
    readlineSync.question('\nPress Enter to continue...');
  }

  viewAllProducts(): void {
    console.log('\n=== All Products ===');
    this.displayProductsList(this.products);
    readlineSync.question('\nPress Enter to continue...');
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

  getCart(): CartItem[] {
    return this.cart;
  }
}