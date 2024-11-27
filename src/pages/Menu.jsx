import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";

const Menu = () => {
  const { menuItems, categories, addToCart } = useContext(AuthContext);
  const [filter, setFilter] = useState("전체");

  const filteredItems =
    filter === "전체"
      ? menuItems
      : menuItems.filter((item) => item.category === filter);

  return (
    <div style={{ padding: "20px" }}>
      <h1>메뉴</h1>
      <div style={{ marginBottom: "20px" }}>
        {["전체", ...categories].map((category) => (
          <button
            key={category}
            onClick={() => setFilter(category)}
            style={{
              margin: "5px",
              padding: "10px 15px",
              backgroundColor: filter === category ? "#007aff" : "#ccc",
              color: filter === category ? "#fff" : "#000",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          >
            {category}
          </button>
        ))}
      </div>

      <div
        style={{
          display: "grid",
          gap: "20px",
          gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
        }}
      >
        {filteredItems.map((item) => (
          <div
            key={item.id}
            style={{
              border: "1px solid #ddd",
              borderRadius: "8px",
              padding: "15px",
              textAlign: "center",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            }}
          >
            <h3>{item.name}</h3>
            <p>{item.price}원</p>
            <button
              onClick={() => addToCart(item)}
              style={{
                padding: "10px 15px",
                backgroundColor: "#007aff",
                color: "#fff",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
              }}
            >
              장바구니 추가
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Menu;
