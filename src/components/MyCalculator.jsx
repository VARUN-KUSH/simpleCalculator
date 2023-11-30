import React, { useState } from 'react';
import './calculator.css'; 
const Calculator = () => {
  const [expression, setExpression] = useState('');
  const [result, setResult] = useState('');
  const operators = ['+', '-', '*', '/', '%'];

  const handleButtonClick = (value) => {
    try {
      if (value === '=') {
        setResult(eval(expression).toString());
        setExpression('');
      } else if (value === 'C') {
        clearCalculator();
      } else if (value === 'backspace') {
        setExpression((prevExpression) => prevExpression.slice(0, -1));
      } else if (operators.includes(value) && operators.includes(expression.slice(-1))) {
        
        setExpression((prevExpression) => prevExpression.slice(0, -1) + value);
      } else {
        setExpression((prevExpression) => prevExpression + value);
      }
    } catch (error) {
      handleCalculationError();
    }
  };

  const handleCalculationError = () => {
    setExpression('');
    setResult('Error');
  };

  const clearCalculator = () => {
    setExpression('');
    setResult('');
  };

  const handleKeyPress = (event) => {
    const key = event.key;

    if (
      (key >= '0' && key <= '9') ||
      operators.includes(key) ||
      key === '=' ||
      key === 'Enter' ||
      key === 'C' ||
      key === 'Backspace'
    ) {
      handleButtonClick(key === 'Enter' ? '=' : key);
    }
  };

  return (
    <div className="calculator" tabIndex="0" onKeyDown={handleKeyPress}>
      <div className="display">
        <div className="expression">{expression}</div>
        <div className="result">{result}</div>
      </div>
      <div className="buttons">
        {[7, 8, 9, 4, 5, 6, 1, 2, 3, 0, ...operators, 'C', '='].map((button) => (
          <button key={button} onClick={() => handleButtonClick(button)}>
            {button}
          </button>
        ))}
        <button onClick={() => handleButtonClick('backspace')} className="backspace">
          Backspace
        </button>
      </div>
    </div>
  );
};

export default Calculator;
