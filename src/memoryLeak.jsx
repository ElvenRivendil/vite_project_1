import React, { useEffect, useRef, useState } from 'react';
import './memoryLeak.css';

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

  console.log(new Date());
  console.warn('Предупреждения');
  console.error('Ошибка')

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
          infoRef.current.className = 'memory-info';
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

    if (infoRef.current && infoRef.current.parentNode) {
      infoRef.current.parentNode.removeChild(infoRef.current);
      infoRef.current = null;
    }

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
    try {
      const output = a(); // вызов функции a()
      addLog(
        '🐞 Debug: Состояние массива — ' + (window.testArray?.length || 0)
      );
      addLog('📦 Результат функции a(): ' + JSON.stringify(output));
    } catch (err) {
      console.error('Ошибка в функции a():', err);
      addLog('❌ Ошибка при вызове функции a(): ' + err.message);
    }
  };

  const handleFetchClick = () => {
    addLog('🌐 Имитирован fetch-запрос...');
  
    fetch('https://jsonplaceholder.typicode.com/todos/1')
      .then(response => response.json())
      .then(json => {
        console.log(json);
        addLog('📦 Данные успешно получены!');
      })
      .catch(error => {
        console.error('Ошибка fetch:', error);
        addLog('❌ Ошибка при получении данных: ' + error.message);
      });
  };
  

  // const handleFetchClick = () => {
    
  //   addLog('🌐 Имитирован fetch-запрос...');
  //   setTimeout(() => {
  //     addLog('📦 Данные успешно получены!');
  //   }, 1000);
  // };

  // fetchButton.addEventListener('click', () => {
  //   fetch('https://jsonplaceholder.typicode.com/todos/1')
  //   .then(response => response.json())
  //   .then(json => console.log(json))
  // });

  function a() {
    // debugger;
    const result = [1 + 1];           // массив, чтобы можно было .push()
    const newResult = result[0] * 2 + b(1);  // просто пример вычисления
    result.push(newResult);
    return result;
  }
  

  function b(data) {
    // Заглушка: просто возвращает значение, например, удваивает
    const myResult = data + 2;
    return myResult;
  }

  return (
    <main className="main">
      <div className="button-panel">
        <button id="memory" onClick={handleMemoryStart}>Утечка памяти</button>
        <button id="memory_stop" onClick={handleMemoryStop}>Остановить утечку</button>
        <button id="memory_clear" onClick={handleMemoryClear}>Очистить</button>
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Введите что-нибудь"
        />
        <button id="debug" onClick={handleDebugClick}>Debugger</button>
        <button id="fetch" onClick={handleFetchClick}>Fetch</button>
        <button id="debug_clear" onClick={clearLog}>🗑 Очистить лог</button>
      </div>

      <div className="top-panel">
        <div id="memory-info-container"></div>
      </div>

      <div className="content-panel">
        <div className="log-box">
          <h3>📜 Лог:</h3>
          {log.map((entry, index) => (
            <div key={index}>{entry}</div>
          ))}
        </div>

        <div className="info-box">
          <h3>🔍 Что делает этот компонент:</h3>
          <table>
            <thead>
              <tr>
                <th>Элемент</th>
                <th>Действие</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Утечка памяти</td>
                <td>Каждые 500 мс создаёт 1000 объектов и выводит общее число</td>
              </tr>
              <tr>
                <td>Остановить утечку</td>
                <td>Останавливает таймер</td>
              </tr>
              <tr>
                <td>Очистить</td>
                <td>Обнуляет массив</td>
              </tr>
              <tr>
                <td>Поле ввода</td>
                <td>Показывает в логах, что ты вводишь</td>
              </tr>
              <tr>
                <td>Debugger</td>
                <td>Выводит длину массива</td>
              </tr>
              <tr>
                <td>Fetch</td>
                <td>Симулирует получение данных с задержкой</td>
              </tr>
              <tr>
                <td>🗑 Очистить лог</td>
                <td>Полностью очищает окно логов</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}

export default Index;
