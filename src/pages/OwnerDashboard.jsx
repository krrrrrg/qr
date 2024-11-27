import React from "react";
import { Link } from "react-router-dom";

const OwnerDashboard = () => {
  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h1>점주 대시보드</h1>
      <p>이곳에서 매장 정보를 확인하고 관리하세요.</p>

      {/* 메뉴 관리로 이동 */}
      <Link to="/owner/menu-management" style={{ textDecoration: "none" }}>
        <button
          style={{
            margin: "10px",
            padding: "10px 20px",
            backgroundColor: "#007aff",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          메뉴 관리
        </button>
      </Link>

      {/* 주문 관리로 이동 */}
      <Link to="/owner/manage-orders" style={{ textDecoration: "none" }}>
        <button
          style={{
            margin: "10px",
            padding: "10px 20px",
            backgroundColor: "#007aff",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          주문 관리
        </button>
      </Link>
    </div>
  );
};

export default OwnerDashboard;
