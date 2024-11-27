import React, { useState, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "../styles/navbar.css";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  const handleFloatingButtonClick = () => {
    if (isLoggedIn) {
      setIsLoggedIn(false);
      localStorage.clear();
      alert("로그아웃되었습니다.");
      navigate("/");
    } else {
      navigate("/login");
    }
  };

  return (
    <>
      <header className="navbar-header">
        <div className="navbar-container">
          <Link to="/" className="navbar-logo">
            QR Order
          </Link>
          <button className="navbar-hamburger" onClick={toggleMenu}>
            ☰
          </button>
        </div>
        <nav className={`navbar-links ${menuOpen ? "active" : ""}`}>
          <NavItem to="/" current={location.pathname === "/"}>
            홈
          </NavItem>
          <NavItem to="/menu" current={location.pathname === "/menu"}>
            메뉴
          </NavItem>
          <NavItem to="/cart" current={location.pathname === "/cart"}>
            장바구니
          </NavItem>
          <NavItem
            to="/order-status"
            current={location.pathname === "/order-status"}
          >
            주문 상태
          </NavItem>
          <NavItem
            to="/order-history"
            current={location.pathname === "/order-history"}
          >
            주문 내역
          </NavItem>
        </nav>
      </header>

      <button className="floating-button" onClick={handleFloatingButtonClick}>
        {isLoggedIn ? "로그아웃" : "로그인"}
      </button>
    </>
  );
};

const NavItem = ({ to, current, children }) => (
  <Link to={to} className={`navbar-item ${current ? "active" : ""}`}>
    {children}
  </Link>
);

export default Navbar;
