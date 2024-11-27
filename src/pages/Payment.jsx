import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Payment = ({ cartItems }) => {
  const [cardNumber, setCardNumber] = useState('');
  const [cardHolder, setCardHolder] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const navigate = useNavigate();

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handlePayment = () => {
    if (cardNumber && cardHolder && expiryDate && cvv) {
      // 주문 접수 데이터를 로컬스토리지에 저장
      const order = {
        date: new Date().toLocaleString(),
        items: cartItems,
        totalPrice,
        status: '주문 접수됨',
      };

      const existingOrders = JSON.parse(localStorage.getItem('orderHistory')) || [];
      localStorage.setItem('orderHistory', JSON.stringify([...existingOrders, order]));

      alert('결제가 완료되었습니다. 주문이 접수되었습니다!');
      navigate('/order-status'); // 주문 상태 페이지로 이동
    } else {
      alert('결제 정보를 모두 입력해주세요!');
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h1>결제 페이지</h1>
      <h2>총 금액: ₩{totalPrice.toLocaleString()}</h2>
      <form
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '15px',
          marginTop: '20px',
        }}
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          type="text"
          placeholder="카드 번호"
          value={cardNumber}
          onChange={(e) => setCardNumber(e.target.value)}
          style={inputStyle}
        />
        <input
          type="text"
          placeholder="카드 소유자 이름"
          value={cardHolder}
          onChange={(e) => setCardHolder(e.target.value)}
          style={inputStyle}
        />
        <input
          type="text"
          placeholder="유효기간 (MM/YY)"
          value={expiryDate}
          onChange={(e) => setExpiryDate(e.target.value)}
          style={inputStyle}
        />
        <input
          type="password"
          placeholder="CVV"
          value={cvv}
          onChange={(e) => setCvv(e.target.value)}
          style={inputStyle}
        />
        <button
          type="button"
          onClick={handlePayment}
          style={{
            padding: '10px',
            backgroundColor: '#007aff',
            color: '#fff',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '16px',
          }}
        >
          결제 완료
        </button>
      </form>
    </div>
  );
};

const inputStyle = {
  padding: '10px',
  border: '1px solid #ddd',
  borderRadius: '8px',
  fontSize: '16px',
};

export default Payment;
