import React, { createContext, useState } from "react";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 상태
  const [cartItems, setCartItems] = useState([]); // 장바구니 상태
  const [orderHistory, setOrderHistory] = useState([]); // 주문 내역 상태

  const addToCart = (item) => {
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

  const placeOrder = () => {
    const order = {
      orderNumber: `ORD-${Date.now()}`,
      date: new Date().toLocaleDateString(),
      items: cartItems,
      total: cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      ),
    };
    setOrderHistory((prevHistory) => [...prevHistory, order]); // 내역 추가
    setCartItems([]); // 장바구니 초기화
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        cartItems,
        setCartItems,
        orderHistory,
        addToCart,
        placeOrder, // 주문 기능 추가
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
