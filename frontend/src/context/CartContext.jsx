import { createContext, useContext, useMemo, useState } from 'react';

const CartContext = createContext(null);
export const useCart = () => useContext(CartContext);

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const addItem = (food) => setItems(current => {
    const existing = current.find(i => i._id === food._id);
    if (existing) return current.map(i => i._id === food._id ? { ...i, quantity: i.quantity + 1 } : i);
    return [...current, { ...food, quantity: 1 }];
  });
  const changeQuantity = (id, quantity) => setItems(current => quantity < 1 ? current.filter(i => i._id !== id) : current.map(i => i._id === id ? { ...i, quantity } : i));
  const clearCart = () => setItems([]);
  const total = useMemo(() => items.reduce((sum, i) => sum + i.price * i.quantity, 0), [items]);
  return <CartContext.Provider value={{ items, addItem, changeQuantity, clearCart, total, count: items.reduce((n, i) => n + i.quantity, 0) }}>{children}</CartContext.Provider>;
}
