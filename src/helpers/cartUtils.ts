import { CartItem, Product } from '../types/productTypes';

export const addToCart = (
  cart: CartItem[],
  product: Product
): CartItem[] => {
  const existingItem = cart.find((item) => item.product.id === product.id);
  if (existingItem) {
    return cart.map((item) =>
      item.product.id === product.id
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );
  } else {
    return [...cart, { product, quantity: 1 }];
  }
};

export const removeFromCart = (
  cart: CartItem[],
  productId: number
): CartItem[] => {
  return cart.filter((item) => item.product.id !== productId);
};

export const updateQuantity = (
  cart: CartItem[],
  productId: number,
  quantity: number
): CartItem[] => {
  return cart.map((item) =>
    item.product.id === productId ? { ...item, quantity } : item
  );
};

export const getCartTotal = (cart: CartItem[]): number => {
  return cart.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );
};
