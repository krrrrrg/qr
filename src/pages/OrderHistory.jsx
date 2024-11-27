import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import '../styles/global.css'; // Global styles

const OrderHistory = () => {
  const { orderHistory } = useContext(AuthContext); // 주문 내역 가져오기

  return (
    <div style={{ padding: '20px' }}>
      <h1>주문 내역</h1>
      {orderHistory.length === 0 ? (
        <p>주문 내역이 없습니다.</p>
      ) : (
        <div className="menu-container">
          {orderHistory.map((order, index) => (
            <div className="menu-card" key={index}>
              <h3>주문 번호: {order.orderNumber}</h3>
              <p>주문 날짜: {order.date}</p>
              <div>
                {order.items.map((item) => (
                  <div
                    key={item.id}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      marginBottom: '10px',
                    }}
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      style={{
                        width: '50px',
                        height: '50px',
                        marginRight: '10px',
                        borderRadius: '4px',
                      }}
                    />
                    <div>
                      <h4>{item.name}</h4>
                      <p>수량: {item.quantity}</p>
                      <p>
                        가격: ₩{(item.price * item.quantity).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <p>
                <strong>총 금액: ₩{order.total.toLocaleString()}</strong>
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderHistory;
