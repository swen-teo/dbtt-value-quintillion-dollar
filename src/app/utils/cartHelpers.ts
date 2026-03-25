// Cart helper functions for consistent add-to-cart logic across the app

export interface CartItem {
  productId: string;
  quantity: number;
}

export const getCart = (): CartItem[] => {
  try {
    const cart = localStorage.getItem('cart');
    return cart ? JSON.parse(cart) : [];
  } catch (error) {
    console.error('Error reading cart:', error);
    return [];
  }
};

export const saveCart = (cart: CartItem[]): void => {
  try {
    localStorage.setItem('cart', JSON.stringify(cart));
  } catch (error) {
    console.error('Error saving cart:', error);
  }
};

export const addToCart = (productId: string, quantity: number = 1): boolean => {
  try {
    const cart = getCart();
    const existingItem = cart.find((item) => item.productId === productId);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.push({ productId, quantity });
    }

    saveCart(cart);
    return true;
  } catch (error) {
    console.error('Error adding to cart:', error);
    return false;
  }
};

export const removeFromCart = (productId: string): boolean => {
  try {
    const cart = getCart();
    const updatedCart = cart.filter((item) => item.productId !== productId);
    saveCart(updatedCart);
    return true;
  } catch (error) {
    console.error('Error removing from cart:', error);
    return false;
  }
};

export const updateCartQuantity = (productId: string, quantity: number): boolean => {
  try {
    const cart = getCart();
    const item = cart.find((item) => item.productId === productId);
    
    if (item) {
      item.quantity = quantity;
      saveCart(cart);
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error updating cart quantity:', error);
    return false;
  }
};

export const clearCart = (): void => {
  try {
    localStorage.removeItem('cart');
  } catch (error) {
    console.error('Error clearing cart:', error);
  }
};

export const getCartItemCount = (): number => {
  const cart = getCart();
  return cart.reduce((total, item) => total + item.quantity, 0);
};
