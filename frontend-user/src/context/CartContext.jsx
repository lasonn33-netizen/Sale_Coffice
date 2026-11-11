import React, { createContext, useContext, useReducer, useEffect } from 'react';
import toast from 'react-hot-toast';
import { useLanguage } from './LanguageContext';

// Cart reducer
const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItem = state.items.find(item => item.product_id === action.payload.product_id);
      if (existingItem) {
        return {
          ...state,
          items: state.items.map(item =>
            item.product_id === action.payload.product_id
              ? { ...item, quantity: item.quantity + action.payload.quantity }
              : item
          ),
        };
      }
      return {
        ...state,
        items: [...state.items, action.payload],
      };
    }
    case 'REMOVE_ITEM': {
      return {
        ...state,
        items: state.items.filter(item => item.product_id !== action.payload),
      };
    }
    case 'UPDATE_QUANTITY': {
      return {
        ...state,
        items: state.items.map(item =>
          item.product_id === action.payload.product_id
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
      };
    }
    case 'CLEAR_CART': {
      return { ...state, items: [] };
    }
    default:
      return state;
  }
};

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, { items: [] });
  const { t } = useLanguage();

  // Load cart from localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        const items = JSON.parse(savedCart);
        dispatch({ type: 'CLEAR_CART' });
        items.forEach(item => {
          dispatch({ type: 'ADD_ITEM', payload: item });
        });
      } catch (e) {
        console.error('Error loading cart:', e);
      }
    }
  }, []);

  // Save cart to localStorage
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(state.items));
  }, [state.items]);

  const addItem = (product, quantity = 1, options = {}) => {
    const optionKey = JSON.stringify(options);
    dispatch({
      type: 'ADD_ITEM',
      payload: {
        product_id: `${product.id}-${optionKey}`,
        base_product_id: product.id,
        name: product.name,
        price: parseFloat(options.price || product.price),
        quantity,
        image_url: product.image_url,
        options,
      },
    });
    toast.success(`${product.name} ${t('addedToCart')}`);
  };

  const removeItem = (productId) => {
    dispatch({ type: 'REMOVE_ITEM', payload: productId });
    toast.success(t('removedFromCart'));
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeItem(productId);
      return;
    }
    dispatch({ type: 'UPDATE_QUANTITY', payload: { product_id: productId, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const getTotalItems = () => {
    return state.items.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return state.items.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const value = {
    items: state.items,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    getTotalItems,
    getTotalPrice,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
