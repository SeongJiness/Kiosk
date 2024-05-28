import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Css/LoginScreen.css"; // CSS 파일 import

const LoginScreen = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // 로그인 로직 추가
    if (username === "Admin123" && password === "Admin1234") {
      sessionStorage.setItem("isLoggedIn", true);
      sessionStorage.setItem("nickname", "테스트");
      alert("로그인 성공!");
      navigate("/"); // 메인 페이지로 리다이렉트
    } else {
      alert("로그인 정보가 잘못되었습니다.");
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>
        <div>
          <input
            type="text"
            placeholder="아이디"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">로그인</button>
        <a href="/" className="forgot-password">
          비밀번호를 잊으셨나요?
        </a>
        <a href="/register" className="register-link">
          아이디가 없으신가요? 회원가입
        </a>
      </form>
    </div>
  );
};

export default LoginScreen;
