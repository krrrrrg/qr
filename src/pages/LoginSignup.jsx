import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "../styles/LoginSignup.css";

const LoginSignup = () => {
  const { setIsLoggedIn, setRole, setUserId } = useContext(AuthContext); // setUserId 추가
  const [activeTab, setActiveTab] = useState("login");
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [signupData, setSignupData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [users, setUsers] = useState([
    { username: "1", password: "1", role: "customer" },
    { username: "2", password: "2", role: "owner" },
    { username: "3", password: "3", role: "owner" }, // 피자집 점주
  ]); // 사용자 데이터 관리
  const navigate = useNavigate();

  // 로그인 처리
  const handleLogin = () => {
    const { username, password } = credentials;

    if (!username || !password) {
      alert("아이디와 비밀번호를 입력하세요.");
      return;
    }

    const user = users.find(
      (user) => user.username === username && user.password === password
    );

    if (user) {
      setIsLoggedIn(true);
      setRole(user.role);
      setUserId(username); // 현재 로그인한 사용자 ID 저장
      alert(`${user.role === "owner" ? "점주" : "고객"}로 로그인되었습니다.`);
      navigate(user.role === "owner" ? "/owner/dashboard" : "/menu");
    } else {
      alert("잘못된 아이디 또는 비밀번호입니다.");
    }
  };

  // 회원가입 처리
  const handleSignup = () => {
    const { username, password, confirmPassword } = signupData;

    if (!username || !password || !confirmPassword) {
      alert("모든 필드를 입력하세요.");
      return;
    }

    if (password !== confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    if (users.find((user) => user.username === username)) {
      alert("이미 존재하는 아이디입니다.");
      return;
    }

    setUsers((prevUsers) => [
      ...prevUsers,
      { username, password, role: "customer" },
    ]);
    alert("회원가입 성공! 로그인해주세요.");
    setSignupData({ username: "", password: "", confirmPassword: "" });
    setActiveTab("login");
  };

  return (
    <div className="login-container">
      <h1 className="login-title">QR Order</h1>
      <div className="tabs">
        <button
          className={`tab-button ${activeTab === "login" ? "active" : ""}`}
          onClick={() => setActiveTab("login")}
        >
          로그인
        </button>
        <button
          className={`tab-button ${activeTab === "signup" ? "active" : ""}`}
          onClick={() => setActiveTab("signup")}
        >
          회원가입
        </button>
      </div>
      {activeTab === "login" && (
        <div className="form-container">
          <input
            type="text"
            placeholder="아이디"
            value={credentials.username}
            onChange={(e) =>
              setCredentials({ ...credentials, username: e.target.value })
            }
          />
          <input
            type="password"
            placeholder="비밀번호"
            value={credentials.password}
            onChange={(e) =>
              setCredentials({ ...credentials, password: e.target.value })
            }
          />
          <button onClick={handleLogin} className="login-button">
            로그인
          </button>
        </div>
      )}
      {activeTab === "signup" && (
        <div className="form-container">
          <input
            type="text"
            placeholder="아이디"
            value={signupData.username}
            onChange={(e) =>
              setSignupData({ ...signupData, username: e.target.value })
            }
          />
          <input
            type="password"
            placeholder="비밀번호"
            value={signupData.password}
            onChange={(e) =>
              setSignupData({ ...signupData, password: e.target.value })
            }
          />
          <input
            type="password"
            placeholder="비밀번호 확인"
            value={signupData.confirmPassword}
            onChange={(e) =>
              setSignupData({
                ...signupData,
                confirmPassword: e.target.value,
              })
            }
          />
          <button onClick={handleSignup} className="signup-button">
            회원가입
          </button>
        </div>
      )}
    </div>
  );
};

export default LoginSignup;
