export const addToCart = (cartItems, setCartItems, item) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((i) => i.id === item.id);
      if (existingItem) {
        return prevItems.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prevItems, { ...item, quantity: 1 }];
    });
  };
  
  export const removeItem = (cartItems, setCartItems, id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };
  