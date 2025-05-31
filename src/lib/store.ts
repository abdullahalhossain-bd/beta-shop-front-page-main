
import { create } from 'zustand';
import { toast } from 'sonner';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  oldPrice?: number;
  image: string;
  category: string;
  featured?: boolean;
  new?: boolean;
  sale?: boolean;
  rating?: number;
  reviewCount?: number;
}

export interface Category {
  id: string;
  name: string;
  image: string;
  productCount: number;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface WishlistItem extends Product {}

interface StoreState {
  cart: CartItem[];
  wishlist: WishlistItem[];
  cartOpen: boolean;
  addToCart: (product: Product) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (id: string) => void;
  getCartTotal: () => number;
  getCartItemCount: () => number;
  getWishlistCount: () => number;
}

export const useStore = create<StoreState>((set, get) => ({
  cart: [],
  wishlist: [],
  cartOpen: false,

  addToCart: (product) => {
    const { cart } = get();
    const existing = cart.find(item => item.id === product.id);
    
    if (existing) {
      set({
        cart: cart.map(item => 
          item.id === product.id 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        )
      });
      toast.success(`Added another ${product.name} to your cart`);
    } else {
      set({ cart: [...cart, { ...product, quantity: 1 }] });
      toast.success(`${product.name} added to your cart`);
    }
    
    // Open cart drawer
    set({ cartOpen: true });
  },

  removeFromCart: (id) => {
    const { cart } = get();
    const itemToRemove = cart.find(item => item.id === id);
    if (itemToRemove) {
      set({ cart: cart.filter(item => item.id !== id) });
      toast.info(`${itemToRemove.name} removed from your cart`);
    }
  },

  updateQuantity: (id, quantity) => {
    const { cart } = get();
    
    if (quantity <= 0) {
      get().removeFromCart(id);
      return;
    }
    
    set({
      cart: cart.map(item => 
        item.id === id ? { ...item, quantity } : item
      )
    });
  },

  clearCart: () => {
    set({ cart: [] });
    toast.info('Cart cleared');
  },

  toggleCart: () => set(state => ({ cartOpen: !state.cartOpen })),

  addToWishlist: (product) => {
    const { wishlist } = get();
    const exists = wishlist.some(item => item.id === product.id);
    
    if (!exists) {
      set({ wishlist: [...wishlist, product] });
      toast.success(`${product.name} added to your wishlist`);
    } else {
      toast.info(`${product.name} is already in your wishlist`);
    }
  },

  removeFromWishlist: (id) => {
    const { wishlist } = get();
    const itemToRemove = wishlist.find(item => item.id === id);
    if (itemToRemove) {
      set({ wishlist: wishlist.filter(item => item.id !== id) });
      toast.info(`${itemToRemove.name} removed from your wishlist`);
    }
  },

  getCartTotal: () => {
    return get().cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  },

  getCartItemCount: () => {
    return get().cart.reduce((count, item) => count + item.quantity, 0);
  },

  getWishlistCount: () => {
    return get().wishlist.length;
  }
}));
