import React, { useEffect, useRef, useState } from 'react';

function Index() {
  const [log, setLog] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const infoRef = useRef(null);
  const intervalIdRef = useRef(null);

  useEffect(() => {
    return () => {
      clearInterval(intervalIdRef.current);
    };
  }, []);

  const addLog = (message) => {
    setLog((prev) => [
      ...prev,
      `${new Date().toLocaleTimeString()}: ${message}`,
    ]);
  };

  const clearLog = () => {
    setLog([]);
  };

  const handleMemoryStart = () => {
    window.testArray = [];
    if (!infoRef.current) {
        const container = document.getElementById('memory-info-container');
        if (container) {
          infoRef.current = document.createElement('div');
          infoRef.current.style.marginTop = '1rem';
          container.appendChild(infoRef.current);
        } else {
          console.warn('⚠️ Контейнер memory-info-container не найден');
        }
      }
    intervalIdRef.current = setInterval(() => {
      for (let i = 0; i < 1000; i++) {
        window.testArray.push(new Date());
      }
      infoRef.current.textContent = `Создано ${window.testArray.length} элементов`;
    }, 500);

    addLog('✅ Утечка памяти началась');
  };

  const handleMemoryStop = () => {
    clearInterval(intervalIdRef.current);
  
    // Дополнительно: удалить infoRef из DOM, если существует
    if (infoRef.current && infoRef.current.parentNode) {
      infoRef.current.parentNode.removeChild(infoRef.current);
      infoRef.current = null;
    }
  
    // Очищаем массив, чтобы остановить рост памяти
    if (window.testArray) {
      window.testArray = [];
    }
  
    addLog('🛑 Утечка остановлена и память очищена');
  };
  

  const handleMemoryClear = () => {
    if (window.testArray) {
      window.testArray.length = 0;
      addLog('🧹 Память очищена');
    }
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    addLog(`📝 Ввод: ${e.target.value}`);
  };

  const handleDebugClick = () => {
    addLog(
      '🐞 Debug: Состояние массива — ' + (window.testArray?.length || 0)
    );
  };

  const handleFetchClick = () => {
    addLog('🌐 Имитирован fetch-запрос...');
    setTimeout(() => {
      addLog('📦 Данные успешно получены!');
    }, 1000);
  };

  return (
    <main style={{ fontFamily: 'sans-serif', padding: '20px' }}>
      {/* Панель кнопок в строку */}
      <div
        style={{
          display: 'flex',
          gap: '10px',
          flexWrap: 'wrap',
          marginBottom: '20px',
        }}
      >
        <button onClick={handleMemoryStart}>Утечка памяти</button>
        <button onClick={handleMemoryStop}>Остановить утечку</button>
        <button onClick={handleMemoryClear}>Очистить</button>
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Введите что-нибудь"
          style={{ flex: '1', minWidth: '150px' }}
        />
        <button onClick={handleDebugClick}>Debugger</button>
        <button onClick={handleFetchClick}>Fetch</button>
        <button onClick={clearLog}>🗑 Очистить лог</button>
      </div>

      <div className="top-panel">
              <div id="memory-info-container" style={{ marginTop: '1rem' }}></div>
      </div>


      {/* Два блока: слева — пояснение, справа — лог */}
      <div
        style={{
          display: 'flex',
          gap: '20px',
          alignItems: 'flex-start',
        }}
      >
        

        {/* Лог */}
        <div
          style={{
            flex: 1,
            maxHeight: '500px',
            overflowY: 'auto',
            border: '1px solid #ccc',
            backgroundColor: '#f0f0f0',
            padding: '10px',
            fontSize: '14px',
          }}
        >
          <h3>📜 Лог:</h3>
          {log.map((entry, index) => (
            <div key={index}>{entry}</div>
          ))}
        </div>
        {/* Подсказки */}
        <div
          style={{
            flex: 1,
            backgroundColor: '#f9f9f9',
            padding: '15px',
            border: '1px solid #ccc',
            fontSize: '14px',
          }}
        >
          <h3>🔍 Что делает этот компонент:</h3>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th
                  style={{
                    textAlign: 'left',
                    padding: '6px',
                    borderBottom: '1px solid #ccc',
                  }}
                >
                  Элемент
                </th>
                <th
                  style={{
                    textAlign: 'left',
                    padding: '6px',
                    borderBottom: '1px solid #ccc',
                  }}
                >
                  Действие
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ padding: '6px' }}>Утечка памяти</td>
                <td style={{ padding: '6px' }}>
                  Каждые 500 мс создаёт 1000 объектов и выводит общее число
                </td>
              </tr>
              <tr>
                <td style={{ padding: '6px' }}>Остановить утечку</td>
                <td style={{ padding: '6px' }}>Останавливает таймер</td>
              </tr>
              <tr>
                <td style={{ padding: '6px' }}>Очистить</td>
                <td style={{ padding: '6px' }}>Обнуляет массив</td>
              </tr>
              <tr>
                <td style={{ padding: '6px' }}>Поле ввода</td>
                <td style={{ padding: '6px' }}>
                  Показывает в логах, что ты вводишь
                </td>
              </tr>
              <tr>
                <td style={{ padding: '6px' }}>Debugger</td>
                <td style={{ padding: '6px' }}>
                  Выводит длину массива
                </td>
              </tr>
              <tr>
                <td style={{ padding: '6px' }}>Fetch</td>
                <td style={{ padding: '6px' }}>
                  Симулирует получение данных с задержкой
                </td>
              </tr>
              <tr>
                <td style={{ padding: '6px' }}>🗑 Очистить лог</td>
                <td style={{ padding: '6px' }}>
                  Полностью очищает окно логов
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}

export default Index;
