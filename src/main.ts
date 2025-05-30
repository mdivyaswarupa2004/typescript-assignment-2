import * as readlineSync from 'readline-sync';
import { fetchProducts } from './api/productAPI';
import { Product, CartItem } from './types/productTypes';
import { AdminService } from './helpers/adminService';
import { CustomerService } from './helpers/customerService';
import {MenuChoice, UserRole} from './types/enums';
class ECommerceApp {
  private products: Product[] = [];
  private cart: CartItem[] = [];
  private adminService: AdminService;
  private customerService: CustomerService;

  constructor() {
    this.adminService = new AdminService(this.products);
    this.customerService = new CustomerService(this.products, this.cart);
  }

  async initialize(): Promise<void> {
    console.log(' Loading products...');
    this.products = await fetchProducts();
    console.log(`✅ Loaded ${this.products.length} products`);
    
    // Update services with loaded products
    this.adminService = new AdminService(this.products);
    this.customerService = new CustomerService(this.products, this.cart);
    
    this.showMainMenu();
  }

  showMainMenu():void {
    console.log('\n=== Welcome to E-Commerce CLI ===');
    console.log('Who are you?');
    console.log('1. Admin');
    console.log('2. Customer');
    console.log('0. Exit');

    const choice:string = readlineSync.question('Enter your choice: ');
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
  showAdminMenu() : void{
    console.log('\n=== Admin Panel ===');
    console.log('1. Add Product');
    console.log('2. Remove Product');
    console.log('3. View All Products');
    console.log('0. Back to Main Menu');

    const choice:string = readlineSync.question('Enter your choice: ');

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
  showCustomerMenu():void {
    console.log('\n=== Customer Panel ===');
    console.log('1. Search Products');
    console.log('2. Filter Products');
    console.log('3. View All Products');
    console.log('4. Add to Cart');
    console.log('5. View Cart');
    console.log('0. Back to Main Menu');

    const choice:string= readlineSync.question('Enter your choice: ');

    switch (choice) {
      case '1':
        this.customerService.searchProducts();
        this.showCustomerMenu();
        break;
      case '2':
        this.customerService.showFilterMenu();
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
  private updateServices() {
    this.adminService = new AdminService(this.products);
    this.customerService = new CustomerService(this.products, this.cart);
  }
}
// Start the application
async function main(): Promise<void> {
  try {
    const app: ECommerceApp = new ECommerceApp();
    await app.initialize();
  } catch (error:unknown) {
    console.error('❌ Application error:', error);
  }
}
main();