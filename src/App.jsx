import React, { useState } from 'react';
import LoginForm from './LoginForm';
import logo from './assets/Kalaron_big_logotip_pr.png';

function App() {
  const [showLogin, setShowLogin] = useState(false);

  const toggleLogin = () => {
    setShowLogin(prev => !prev);
  };

  return (
    <div className="app">
      <header className="header">
        <div className="logo">
          <img src={logo} alt="Kalaron Logo" style={{ height: '45px', width: 'auto' }} />
        </div>
        <nav className="nav">
          <a href="#">Главная</a>
          <a href="#">О нас</a>
          <a href="#">Разработка</a>
          <a href="#">Контакты</a>
        </nav>
        <div className="auth-buttons">
          <button
            className={`login-btn ${showLogin ? 'active' : ''}`}
            onClick={toggleLogin}
          >
            Войти
          </button>
          <button className="register-btn">Регистрация</button>
        </div>
      </header>

      <div className={`login-form-container ${showLogin ? 'open' : ''}`}>
        <LoginForm onClose={() => setShowLogin(false)} />
      </div>

      <main className="content">
        <h1>Добро пожаловать!</h1>
        <p>Это стартовая страница сайта.</p>
      </main>
    </div>
  );
}

export default App;

