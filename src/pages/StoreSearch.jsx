import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const StoreSearch = () => {
  const { stores, setCurrentStore } = useContext(AuthContext); // 가게 목록과 선택 함수 가져오기
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  // 검색 쿼리를 기준으로 가게 필터링
  const filteredStores = stores.filter((store) =>
    store.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // 가게 선택 핸들러
  const handleStoreSelect = (store) => {
    setCurrentStore(store); // 선택된 가게 설정
    navigate("/menu"); // 메뉴 페이지로 이동
  };

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h1>가게 검색</h1>
      <input
        type="text"
        placeholder="가게 이름을 검색하세요"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        style={{
          padding: "10px",
          width: "80%",
          marginBottom: "20px",
          border: "1px solid #ccc",
          borderRadius: "8px",
        }}
      />
      <div
        style={{
          display: "grid",
          gap: "20px",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          marginTop: "20px",
        }}
      >
        {filteredStores.map((store) => (
          <div
            key={store.id}
            onClick={() => handleStoreSelect(store)}
            style={{
              border: "1px solid #ddd",
              borderRadius: "8px",
              padding: "15px",
              textAlign: "center",
              cursor: "pointer",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              transition: "transform 0.2s",
            }}
          >
            <h2>{store.name}</h2>
            <p>{store.location}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StoreSearch;
