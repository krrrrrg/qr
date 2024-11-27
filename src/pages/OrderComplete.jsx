import React from 'react';
import { Link } from 'react-router-dom';

const OrderComplete = () => {
  const orderNumber = Math.floor(100000 + Math.random() * 900000); // 랜덤 주문 번호 생성

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>결제가 완료되었습니다!</h1>
      <p>주문 번호: <strong>{orderNumber}</strong></p>
      <p>주문 상태를 확인하려면 아래 버튼을 클릭하세요.</p>
      <Link to="/order-status">
        <button
          style={{
            padding: '10px 20px',
            backgroundColor: '#007aff',
            color: '#fff',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
          }}
        >
          주문 상태 확인
        </button>
      </Link>
    </div>
  );
};

export default OrderComplete;
