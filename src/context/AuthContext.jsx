import React, { createContext, useState, useEffect } from "react";

// 기본 데이터
const defaultCategories = ["음식", "음료"];
const defaultMenuItems = [
  { id: 1, name: "치킨", price: 15000, category: "음식" },
  { id: 2, name: "피자", price: 18000, category: "음식" },
  { id: 3, name: "콜라", price: 2000, category: "음료" },
];
const defaultStores = [
  {
    id: "store1",
    name: "서울 치킨집",
    location: "서울 강남구",
    menu: defaultMenuItems,
    owner: "2", // 점주의 ID
  },
  {
    id: "store2",
    name: "부산 피자집",
    location: "부산 해운대구",
    menu: [
      { id: 4, name: "콜라", price: 2000, category: "음료" },
      { id: 5, name: "감자튀김", price: 5000, category: "음식" },
    ],
    owner: "3", // 점주의 ID
  },
];

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [stores, setStores] = useState(() => {
    const storedStores = JSON.parse(localStorage.getItem("stores"));
    return storedStores || defaultStores;
  });
  const [currentStore, setCurrentStore] = useState(null);
  const [menuItems, setMenuItems] = useState([]);
  const [categories, setCategories] = useState(defaultCategories);
  const [cartItems, setCartItems] = useState([]);
  const [orderHistory, setOrderHistory] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState(null);
  const [userId, setUserId] = useState(null); // 현재 로그인한 사용자 ID

  // 현재 가게 선택에 따라 메뉴와 카테고리 업데이트
  useEffect(() => {
    if (currentStore) {
      setMenuItems(currentStore.menu);
      const uniqueCategories = [
        ...new Set(currentStore.menu.map((item) => item.category)),
      ];
      setCategories(uniqueCategories);
    }
  }, [currentStore]);

  // LocalStorage 로드 및 동기화
  useEffect(() => {
    const loadFromStorage = () => {
      try {
        setCartItems(JSON.parse(localStorage.getItem("cartItems")) || []);
        setOrderHistory(JSON.parse(localStorage.getItem("orderHistory")) || []);
        setRole(localStorage.getItem("role") || null);
        setUserId(localStorage.getItem("userId") || null);
        setIsLoggedIn(JSON.parse(localStorage.getItem("isLoggedIn")) || false);
      } catch (error) {
        console.error("LocalStorage 데이터 로드 중 오류 발생:", error);
      }
    };

    loadFromStorage();

    const handleStorageChange = () => loadFromStorage();
    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const syncToLocalStorage = (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`${key} 저장 중 오류 발생:`, error);
    }
  };

  useEffect(() => syncToLocalStorage("cartItems", cartItems), [cartItems]);
  useEffect(
    () => syncToLocalStorage("orderHistory", orderHistory),
    [orderHistory]
  );
  useEffect(() => syncToLocalStorage("role", role), [role]);
  useEffect(() => syncToLocalStorage("userId", userId), [userId]);
  useEffect(() => syncToLocalStorage("isLoggedIn", isLoggedIn), [isLoggedIn]);
  useEffect(() => syncToLocalStorage("stores", stores), [stores]);

  // 주요 기능들
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
    alert(`${item.name}이(가) 장바구니에 추가되었습니다!`);
  };

  const placeOrder = () => {
    if (!cartItems.length) {
      alert("장바구니가 비어 있습니다.");
      return;
    }
    const newOrder = {
      orderNumber: `ORD-${Date.now()}`,
      items: cartItems,
      store: currentStore?.name || "알 수 없음", // 현재 가게 정보
      date: new Date().toLocaleDateString(),
      status: "준비 중",
      total: cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      ),
    };
    setOrderHistory((prev) => [...prev, newOrder]);
    setCartItems([]);
    alert("주문이 완료되었습니다!");
  };

  const addCategory = (category) => {
    setCategories((prevCategories) => [...prevCategories, category]);
  };

  const deleteCategory = (category) => {
    setCategories((prevCategories) =>
      prevCategories.filter((cat) => cat !== category)
    );
    setMenuItems((prevMenuItems) =>
      prevMenuItems.filter((item) => item.category !== category)
    );
  };

  const addMenuItem = (item) => {
    const newItem = { ...item, id: Date.now() };
    setMenuItems((prevMenu) => [...prevMenu, newItem]);
    setCurrentStore((prevStore) => ({
      ...prevStore,
      menu: [...prevStore.menu, newItem],
    }));
    alert("새 메뉴가 추가되었습니다!");
  };

  const deleteMenuItem = (id) => {
    setMenuItems((prevMenu) => prevMenu.filter((item) => item.id !== id));
    setCurrentStore((prevStore) => ({
      ...prevStore,
      menu: prevStore.menu.filter((item) => item.id !== id),
    }));
    alert("메뉴가 삭제되었습니다!");
  };

  const editMenuItem = (id, updatedItem) => {
    setMenuItems((prevMenu) =>
      prevMenu.map((item) =>
        item.id === id ? { ...item, ...updatedItem } : item
      )
    );
    setCurrentStore((prevStore) => ({
      ...prevStore,
      menu: prevStore.menu.map((item) =>
        item.id === id ? { ...item, ...updatedItem } : item
      ),
    }));
    alert("메뉴가 수정되었습니다!");
  };

  const filterStoresByOwner = () => {
    if (role === "owner" && userId) {
      return stores.filter((store) => store.owner === userId);
    }
    return stores;
  };

  return (
    <AuthContext.Provider
      value={{
        stores,
        setStores,
        currentStore,
        setCurrentStore,
        menuItems,
        categories,
        cartItems,
        setCartItems,
        orderHistory,
        setOrderHistory,
        addToCart,
        placeOrder,
        isLoggedIn,
        setIsLoggedIn,
        role,
        setRole,
        userId,
        setUserId,
        addCategory,
        deleteCategory,
        addMenuItem,
        deleteMenuItem,
        editMenuItem,
        filterStoresByOwner,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
