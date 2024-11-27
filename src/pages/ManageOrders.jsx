import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const ManageOrders = () => {
  const { orderHistory, updateOrderStatus, updateEstimatedTime } =
    useContext(AuthContext);

  return (
    <div>
      <h1>주문 관리</h1>
      {orderHistory.map((order) => (
        <div key={order.orderNumber}>
          <p>주문 번호: {order.orderNumber}</p>
          <p>현재 상태: {order.status}</p>
          <input
            type="number"
            placeholder="예상 시간 (분)"
            onBlur={(e) =>
              updateEstimatedTime(order.orderNumber, e.target.value)
            }
          />
          <button
            onClick={() => updateOrderStatus(order.orderNumber, "조리 중")}
          >
            조리 중
          </button>
          <button onClick={() => updateOrderStatus(order.orderNumber, "완료")}>
            완료
          </button>
        </div>
      ))}
    </div>
  );
};

export default ManageOrders;
