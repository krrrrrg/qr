import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Cart = () => {
  const { cartItems, setCartItems, placeOrder } = useContext(AuthContext);
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();

  const handlePayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      if (cartItems.length > 0) {
        placeOrder();
        setCartItems([]);
        alert("결제가 완료되었습니다!");
        navigate("/order-history");
      } else {
        alert("장바구니가 비어 있습니다.");
      }
      setIsProcessing(false);
    }, 2000);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>장바구니</h1>
      {cartItems.length === 0 ? (
        <p>장바구니가 비어 있습니다.</p>
      ) : (
        <>
          <ul>
            {cartItems.map((item) => (
              <li key={item.id}>
                {item.name} - {item.price}원 x {item.quantity}
              </li>
            ))}
          </ul>
          <button onClick={handlePayment} disabled={isProcessing}>
            {isProcessing ? "결제 중..." : "결제하기"}
          </button>
        </>
      )}
    </div>
  );
};

export default Cart;
