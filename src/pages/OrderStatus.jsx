import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const OrderStatus = () => {
  const { orderHistory } = useContext(AuthContext);

  if (orderHistory.length === 0) {
    return <p>주문 내역이 없습니다.</p>;
  }

  // 프로세스 바 진행 상태 계산 함수
  const getProgress = (status) => {
    switch (status) {
      case "준비 중":
        return 25;
      case "조리 중":
        return 50;
      case "완료":
        return 100;
      default:
        return 0;
    }
  };

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h1>주문 상태</h1>
      {orderHistory.map((order) => (
        <div
          key={order.orderNumber}
          style={{
            border: "1px solid #ddd",
            borderRadius: "8px",
            padding: "20px",
            marginBottom: "20px",
            textAlign: "left",
            maxWidth: "600px",
            margin: "0 auto 20px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          }}
        >
          <h2>주문 번호: {order.orderNumber}</h2>
          <p>현재 상태: {order.status}</p>
          <p>
            예상 소요 시간:{" "}
            {order.estimatedTime ? `${order.estimatedTime}분` : "정보 없음"}
          </p>
          <h3>주문한 메뉴</h3>
          <ul>
            {order.items.map((item) => (
              <li key={item.id}>
                <strong>{item.name}</strong> - 수량: {item.quantity}, 가격:{" "}
                {item.price}원
              </li>
            ))}
          </ul>
          <h4>총 금액: {order.total}원</h4>

          {/* 프로세스 바 */}
          <div style={{ margin: "20px auto", maxWidth: "600px" }}>
            <label
              htmlFor={`progressBar-${order.orderNumber}`}
              style={{ display: "block", marginBottom: "10px" }}
            >
              주문 진행 상태:
            </label>
            <progress
              id={`progressBar-${order.orderNumber}`}
              value={getProgress(order.status)}
              max="100"
              style={{
                width: "100%",
                height: "20px",
                borderRadius: "10px",
                overflow: "hidden",
              }}
            ></progress>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrderStatus;
