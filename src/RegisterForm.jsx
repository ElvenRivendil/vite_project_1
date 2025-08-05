import React, { useState } from 'react';

function RegisterForm({ onClose }) {
  const [fullName, setFullName] = useState('');
  const [nick, setNick] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [readRules, setReadRules] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!agreeTerms || !readRules) {
      alert('Пожалуйста, согласитесь с условиями и подтвердите, что прочитали правила.');
      return;
    }
    if (password !== passwordConfirm) {
      alert('Пароли не совпадают!');
      return;
    }
    // Здесь логика регистрации
    alert(`Регистрация: ${fullName}, ${nick}, ${email}`);
    onClose();
  };

  return (
    <div style={{
      background: '#fff',
      padding: '20px',
      maxWidth: '350px',
      margin: '10px auto',
      boxShadow: '0 0 10px rgba(0,0,0,0.1)',
      borderRadius: '6px',
      position: 'relative',
      zIndex: 10,
    }}>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '10px' }}>
          <label>Имя и Фамилия:</label><br />
          <input
            type="text"
            value={fullName}
            onChange={e => setFullName(e.target.value)}
            required
            style={{ borderRadius: '6px', padding: '6px', width: '100%', boxSizing: 'border-box' }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Ник:</label><br />
          <input
            type="text"
            value={nick}
            onChange={e => setNick(e.target.value)}
            required
            style={{ borderRadius: '6px', padding: '6px', width: '100%', boxSizing: 'border-box' }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Ящик:</label><br />
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            style={{ borderRadius: '6px', padding: '6px', width: '100%', boxSizing: 'border-box' }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Пароль:</label><br />
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            style={{ borderRadius: '6px', padding: '6px', width: '100%', boxSizing: 'border-box' }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Подтверждение пароля:</label><br />
          <input
            type="password"
            value={passwordConfirm}
            onChange={e => setPasswordConfirm(e.target.value)}
            required
            style={{ borderRadius: '6px', padding: '6px', width: '100%', boxSizing: 'border-box' }}
          />
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label>
            <input
              type="checkbox"
              checked={agreeTerms}
              onChange={e => setAgreeTerms(e.target.checked)}
              style={{ marginRight: '6px' }}
            />
            Согласен с условиями
          </label>
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>
            <input
              type="checkbox"
              checked={readRules}
              onChange={e => setReadRules(e.target.checked)}
              style={{ marginRight: '6px' }}
            />
            Правила прочел
          </label>
        </div>

        <button
          type="submit"
          style={{
            backgroundColor: '#d35400',
            color: 'white',
            border: 'none',
            padding: '8px 12px',
            borderRadius: '6px',
            cursor: 'pointer',
            marginRight: '10px',
          }}
        >
          Зарегистрироваться
        </button>
        <button
          type="button"
          onClick={onClose}
          style={{
            padding: '8px 12px',
            borderRadius: '6px',
            cursor: 'pointer',
          }}
        >
          Отмена
        </button>
      </form>
    </div>
  );
}

export default RegisterForm;
