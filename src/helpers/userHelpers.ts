import * as readlineSync from 'readline-sync';
import { Product } from '../types/productTypes';

export function showWelcomeMessage(): void {
  console.log('\n=== Welcome to Shopping CLI App ===\n');
}

export function askUserRole(): 'admin' | 'customer' {
  console.log('Who are you?');
  console.log('1. Admin');
  console.log('2. Customer');

  const choice = readlineSync.question('Enter your choice (1 or 2): ');

  if (choice === '1') return 'admin';
  if (choice === '2') return 'customer';

  console.log('Please enter 1 or 2 only.');
  return askUserRole();
}

export function showProducts(products: Product[]): void {
  if (products.length === 0) {
    console.log('No products found.');
    return;
  }

  console.log('\n--- Products List ---');
  products.forEach((product, index) => {
    console.log(`${index + 1}. ${product.title}`);
    console.log(`   Price: $${product.price}`);
    console.log(`   Category: ${product.category}`);
    console.log(`   Rating: ${product.rating.rate} / 5`);
    console.log('');
  });
}

export function waitForUser(): void {
  readlineSync.question('\nPress Enter to continue...');
}
