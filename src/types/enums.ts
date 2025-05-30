export enum MenuChoice {
  EXIT = '0',
  ADMIN = '1',
  CUSTOMER = '2',
  VIEW_PRODUCTS = '3',
  ADD_TO_CART = '4',
  VIEW_CART = '5'
}

export enum UserRole {
  ADMIN = 'admin',
  CUSTOMER = 'customer'
}

export enum FilterType {
  PRICE = '1',
  CATEGORY = '2',
  RATING = '3',
  BACK = '0'
}

export const Constants = {
  MIN_RATING: 1,
  MAX_RATING: 5,
  MIN_PRICE: 0,
  PLACEHOLDER_IMAGE: 'https://via.placeholder.com/150',
  DEFAULT_REVIEW_COUNT: 1,
  ID_OFFSET: 1000
} as const;

export const Messages = {
  LOADING: '🔄 Loading products...',
  SUCCESS: '✅',
  ERROR: '❌',
  INVALID_CHOICE: 'Invalid choice. Please try again.',
  PRODUCT_ADDED: 'Product added successfully!',
  PRODUCT_REMOVED: 'Product removed successfully!',
  PRODUCT_NOT_FOUND: 'Product not found.',
  CART_EMPTY: 'Your cart is empty.',
  GOODBYE: 'Goodbye! 👋',
  PRESS_ENTER: '\nPress Enter to continue...',
  BACK_INSTRUCTION: ' (or "back" to return)'
} as const;