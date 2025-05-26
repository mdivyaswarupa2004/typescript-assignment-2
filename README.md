# Shopping CLI App

A command-line e-commerce management and shopping application built with TypeScript.

This app provides both admin and customer functionalities for managing products and creating shopping experiences.

## Features

### Admin Features

- Add new products with details - name, price, category, rating
- Remove existing products by name or ID
- View all products in inventory
- Real-time product management

### Customer Features

- Search products by keywords
- Filter products by:
  
  - Price range
  
  - Category
  
  - Rating
  
- Add items to shopping cart
- View cart with total price calculation
- Navigate easily with "back" option

### Additional Features

- Real product data from external API
- Role-based access control
- Input validation and error handling
- Clean command-line interface

## Demo

```

=== Welcome to Shopping CLI App ===

Loading products...
Loaded 20 products successfully!

Who are you?
1. Admin
2. Customer
Enter your choice (1 or 2): 2

--- Customer Menu ---
1. Search Products
2. Filter Products
3. Add to Cart
4. View Cart
5. View All Products
6. Back
Choose option: 1

Enter search keyword: shirt
Found 3 products:
1. Mens Cotton Jacket
   Price: $55.99
   Category: men's clothing
   Rating: 4.7/5
```

## Installation

### Prerequisites

Make sure you have these installed on your computer:

- [Node.js](https://nodejs.org/) (version 16 or higher)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- [Git](https://git-scm.com/)

### Setup Steps

Clone the repository
git clone git@github.com:mdivyaswarupa2004/typescript-task-2.git
'cd typescript-task-2'

Install dependencies
'npm install'

Compile the TypeScript code
'tsc'

Run the application
'node dist/main.js'

## Project Structure

```
Typescript-task-2/
├-- src/
│   ├-- main.ts
│   ├-- helpers/
│   │   ├-- AdminService.ts
│   │   ├-- CustomerService.ts
│   │   ├-- cartUtils.ts
│   │   └-- userHelpers.ts
│   ├-- api/
│   │   └-- productAPI.ts
│   └--- types/
│       └-- productTypes.ts
├-- .gitignore
├-- package.json
├-- package-lock.json
├-- tsconfig.json
├-- README.md

```

## Technology Stack

- **Runtime**: Node.js
- **Language**: TypeScript
- **HTTP Client**: Axios
- **CLI Interaction**: readline-sync
- **External API**: [Fake Store API](https://fakestoreapi.com/)

## Dependencies

### Production Dependencies

- `axios` - HTTP client for API requests
- `readline-sync` - Synchronous CLI user input

### Development Dependencies

- `typescript` - TypeScript compiler
- `@types/node` - Node.js type definitions
- `@types/readline-sync` - readline-sync type definitions

## Usage Guide

### Starting the Application

1. Run `npm tsc` to launch the app
2. Choose your role: Admin or Customer
3. Navigate through menus using numbered options
4. Type "

- **Add Product**: Enter product details when prompted
  
- **Remove Product**: Select product by name or ID to delete
  
- **View Products**: Display all available products

### Customer Operations

- **Search**: Find products by typing keywords
  
- **Filter**: Use price, category, or rating filters
  
- **Shopping**: Add products to cart and view totals

## API Integration

This application fetches real product data from the [Fake Store API](https://fakestoreapi.com/).

The app automatically loads product data on startup and requires an internet connection for initial setup.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Author

**M.Divyaswarupa**

- GitHub: [@mdivyaswarupa2004](git@github.com:mdivyaswarupa2004/typescript-task-2.git)
  
- Email: <divyaswarupa@everest.engineering>
