import * as readlineSync from 'readline-sync';
import { fetchProducts } from './api/productAPI';
import { Product, CartItem } from './types/productTypes';
import { AdminService } from './helpers/adminService';
import { CustomerService } from './helpers/customerService';

class ECommerceApp {
  private products: Product[] = [];
  private cart: CartItem[] = [];
  private adminService: AdminService;
  private customerService: CustomerService;

  constructor() {
    this.adminService = new AdminService(this.products);
    this.customerService = new CustomerService(this.products, this.cart);
  }

  async initialize() {
    console.log(' Loading products...');
    this.products = await fetchProducts();
    console.log(`✅ Loaded ${this.products.length} products`);
    
    // Update services with loaded products
    this.adminService = new AdminService(this.products);
    this.customerService = new CustomerService(this.products, this.cart);
    
    this.showMainMenu();
  }

  showMainMenu() {
    console.log('\n=== Welcome to E-Commerce CLI ===');
    console.log('Who are you?');
    console.log('1. Admin');
    console.log('2. Customer');
    console.log('0. Exit');

    const choice = readlineSync.question('Enter your choice: ');

    switch (choice) {
      case '1':
        this.showAdminMenu();
        break;
      case '2':
        this.showCustomerMenu();
        break;
      case '0':
        console.log('Goodbye! 👋');
        process.exit(0);
      case 'back':
        this.showMainMenu();
        break;
      default:
        console.log('Invalid choice. Please try again.');
        this.showMainMenu();
    }
  }

  showAdminMenu() {
    console.log('\n=== Admin Panel ===');
    console.log('1. Add Product');
    console.log('2. Remove Product');
    console.log('3. View All Products');
    console.log('0. Back to Main Menu');

    const choice = readlineSync.question('Enter your choice: ');

    switch (choice) {
      case '1':
        this.products = this.adminService.addProduct();
        this.updateServices();
        this.showAdminMenu();
        break;
      case '2':
        this.products = this.adminService.removeProduct();
        this.updateServices();
        this.showAdminMenu();
        break;
      case '3':
        this.adminService.viewAllProducts();
        this.showAdminMenu();
        break;
      case '0':
      case 'back':
        this.showMainMenu();
        break;
      default:
        console.log('Invalid choice. Please try again.');
        this.showAdminMenu();
    }
  }

  showCustomerMenu() {
    console.log('\n=== Customer Panel ===');
    console.log('1. Search Products');
    console.log('2. Filter Products');
    console.log('3. View All Products');
    console.log('4. Add to Cart');
    console.log('5. View Cart');
    console.log('0. Back to Main Menu');

    const choice = readlineSync.question('Enter your choice: ');

    switch (choice) {
      case '1':
        this.customerService.searchProducts();
        this.showCustomerMenu();
        break;
      case '2':
        this.showFilterMenu();
        break;
      case '3':
        this.customerService.viewAllProducts();
        this.showCustomerMenu();
        break;
      case '4':
        this.cart = this.customerService.addToCartInterface();
        this.updateServices();
        this.showCustomerMenu();
        break;
      case '5':
        this.customerService.viewCart();
        this.showCustomerMenu();
        break;
      case '0':
      case 'back':
        this.showMainMenu();
        break;
      default:
        console.log('Invalid choice. Please try again.');
        this.showCustomerMenu();
    }
  }

  showFilterMenu() {
    console.log('\n=== Filter Products ===');
    console.log('1. Filter by Price Range');
    console.log('2. Filter by Category');
    console.log('3. Filter by Rating');
    console.log('0. Back');

    const choice = readlineSync.question('Enter your choice: ');

    switch (choice) {
      case '1':
        this.customerService.filterByPrice();
        this.showFilterMenu();
        break;
      case '2':
        this.customerService.filterByCategory();
        this.showFilterMenu();
        break;
      case '3':
        this.customerService.filterByRating();
        this.showFilterMenu();
        break;
      case '0':
      case 'back':
        this.showCustomerMenu();
        break;
      default:
        console.log('Invalid choice. Please try again.');
        this.showFilterMenu();
    }
  }

  private updateServices() {
    this.adminService = new AdminService(this.products);
    this.customerService = new CustomerService(this.products, this.cart);
  }
}

// Start the application
async function main() {
  try {
    const app = new ECommerceApp();
    await app.initialize();
  } catch (error) {
    console.error('❌ Application error:', error);
  }
}

main();