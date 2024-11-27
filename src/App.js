import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthProvider from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";
import StoreSearch from "./pages/StoreSearch"; // 가게 검색 페이지
import Menu from "./pages/Menu";
import Cart from "./pages/Cart";
import OrderStatus from "./pages/OrderStatus";
import OrderHistory from "./pages/OrderHistory";
import OwnerDashboard from "./pages/OwnerDashboard";
import ManageOrders from "./pages/ManageOrders";
import MenuManagement from "./pages/MenuManagement";
import LoginSignup from "./pages/LoginSignup"; // 추가된 로그인 페이지

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<StoreSearch />} /> {/* 가게 검색 페이지 */}
          <Route
            path="/menu"
            element={
              <ProtectedRoute>
                <Menu />
              </ProtectedRoute>
            }
          />
          <Route
            path="/cart"
            element={
              <ProtectedRoute>
                <Cart />
              </ProtectedRoute>
            }
          />
          <Route
            path="/order-status"
            element={
              <ProtectedRoute>
                <OrderStatus />
              </ProtectedRoute>
            }
          />
          <Route
            path="/order-history"
            element={
              <ProtectedRoute>
                <OrderHistory />
              </ProtectedRoute>
            }
          />
          <Route
            path="/owner/dashboard"
            element={
              <ProtectedRoute requiredRole="owner">
                <OwnerDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/owner/manage-orders"
            element={
              <ProtectedRoute requiredRole="owner">
                <ManageOrders />
              </ProtectedRoute>
            }
          />
          <Route
            path="/owner/menu-management"
            element={
              <ProtectedRoute requiredRole="owner">
                <MenuManagement />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<LoginSignup />} />{" "}
          {/* 로그인 페이지 */}
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
