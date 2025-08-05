import React, { useState } from 'react';

function LoginForm({ onClose }) {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Тут можно добавить логику авторизации
    alert(`Логин: ${login}\nПароль: ${password}`);
    onClose();
  };

  return (
    <div style={{
      background: '#eddfd1',
      padding: '20px',
      maxWidth: '300px',
      margin: '10px auto',
      boxShadow: '0 0 10px rgba(0,0,0,0.1)',
      borderRadius: '6px',
      position: 'relative',
      zIndex: 10,
    }}>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '10px' }}>
          <label>Логин:</label><br />
          <input
            type="text"
            value={login}
            onChange={e => setLogin(e.target.value)}
            required
            style={{ width: '100%', padding: '6px' }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Пароль:</label><br />
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            style={{ width: '100%', padding: '6px' }}
          />
        </div>
        <button type="submit" style={{
          backgroundColor: '#d35400',
          color: 'white',
          border: 'none',
          padding: '8px 12px',
          borderRadius: '4px',
          cursor: 'pointer',
        }}>Войти</button>
        <button type="button" onClick={onClose} style={{
          marginLeft: '10px',
          padding: '8px 12px',
          borderRadius: '4px',
          cursor: 'pointer',
        }}>Отмена</button>
      </form>
    </div>
  );
}

export default LoginForm;
