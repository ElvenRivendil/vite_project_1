import React, { useState, useEffect } from 'react';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import logo from './assets/Kalaron_big_logotip_pr.png';

function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [darkTheme, setDarkTheme] = useState(false);

  const toggleLogin = () => {
    setShowLogin(prev => !prev);
    if (showRegister) setShowRegister(false);
  };

  const toggleRegister = () => {
    setShowRegister(prev => !prev);
    if (showLogin) setShowLogin(false);
  };

  const toggleTheme = () => {
    setDarkTheme(prev => !prev);
  };

  // Добавим класс body для темы
  useEffect(() => {
    if (darkTheme) {
      document.body.classList.add('dark-theme');
      document.body.classList.remove('light-theme');
    } else {
      document.body.classList.add('light-theme');
      document.body.classList.remove('dark-theme');
    }
  }, [darkTheme]);

  return (
    <div className="app">
      <header className="header">
        <div className="left-buttons" style={{ display: 'flex', alignItems: 'center', gap: '8px', marginRight: '15px' }}>
          <button
            onClick={toggleTheme}
            title="Переключить тему"
            style={{
              padding: '6px 10px',
              borderRadius: '6px',
              cursor: 'pointer',
              border: 'none',
              backgroundColor: darkTheme ? '#a36e1a' : '#f5f0e6',
              color: darkTheme ? 'white' : '#b54b05',
              transition: 'background-color 0.3s ease',
            }}
            onMouseOver={e => e.currentTarget.style.backgroundColor = darkTheme ? '#8c5a14' : '#d9cab3'}
            onMouseOut={e => e.currentTarget.style.backgroundColor = darkTheme ? '#a36e1a' : '#f5f0e6'}
          >
            Тема
          </button>

          <button
            title="Запасная кнопка"
            style={{
              padding: '6px 10px',
              borderRadius: '6px',
              cursor: 'pointer',
              border: 'none',
              backgroundColor: darkTheme ? '#a36e1a' : '#f5f0e6',
              color: darkTheme ? 'white' : '#b54b05',
              transition: 'background-color 0.3s ease',
            }}
            onMouseOver={e => e.currentTarget.style.backgroundColor = darkTheme ? '#8c5a14' : '#d9cab3'}
            onMouseOut={e => e.currentTarget.style.backgroundColor = darkTheme ? '#a36e1a' : '#f5f0e6'}
          >
            Запасная
          </button>
        </div>

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
          <button
            className={`register-btn ${showRegister ? 'active' : ''}`}
            onClick={toggleRegister}
          >
            Регистрация
          </button>
        </div>
      </header>

      <div className={`login-form-container ${showLogin ? 'open' : ''}`}>
        {showLogin && <LoginForm onClose={() => setShowLogin(false)} />}
      </div>

      <div className={`register-form-container ${showRegister ? 'open' : ''}`}>
        {showRegister && <RegisterForm onClose={() => setShowRegister(false)} />}
      </div>

      <main className="content">
        <h1>Добро пожаловать!</h1>
        <p>Это стартовая страница сайта.</p>
      </main>
    </div>
  );
}

export default App;

