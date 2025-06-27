import { useState, useEffect } from 'react';
import { evaluate } from 'mathjs';

// Components
import { Screen } from './components/screen';
import { CalculatorButtons } from './components/CalculatorButtons';

export function App() {
  const [expression, setExpression] = useState('');
  const [result, setResult] = useState(0);
  const [ans, setAns] = useState(0);
  const [open, setOpen] = useState(0); // count open parentheses
  const [mode, setMode] = useState('Standar');
  const [history, setHistory] = useState([]);
  const buttons = {
    basic: [
      { icon: 'C', action: clearScreen },
      { icon: '←', action: deleteCharScreen },
      { icon: '%', action: updateScreen },
      { icon: '+', action: updateScreen },
      { icon: '1', action: updateScreen },
      { icon: '2', action: updateScreen },
      { icon: '3', action: updateScreen },
      { icon: '÷', action: updateScreen },
      { icon: '4', action: updateScreen },
      { icon: '5', action: updateScreen },
      { icon: '6', action: updateScreen },
      { icon: '-', action: updateScreen },
      { icon: '7', action: updateScreen },
      { icon: '8', action: updateScreen },
      { icon: '9', action: updateScreen },
      { icon: 'x', action: updateScreen },
      { icon: '0', action: updateScreen },
      { icon: '.', action: updateScreen },
      { icon: '=', action: calculateResult }
    ],
    scientific: [
      { icon: 'e', action: updateScreen },
      { icon: 'Ans', action: updateScreen },
      { icon: 'π', action: updateScreen },
      { icon: '(', operator: '()', action: IncreaseParentheses },
      { icon: ')', action: DecreaseParentheses },
      { icon: '|x|', operator: 'abs()', action: IncreaseParentheses },
      { icon: 'Rnd', operator: 'round()', action: IncreaseParentheses },
      { icon: '√', operator: '√()', action: IncreaseParentheses },
      { icon: 'log', operator: 'log()', action: IncreaseParentheses },
      { icon: 'In', operator: 'In()', action: IncreaseParentheses },
      { icon: 'cos', operator: 'cos()', action: IncreaseParentheses },
      { icon: 'sen', operator: 'sin()', action: IncreaseParentheses },
      { icon: 'tan', operator: 'tan()', action: IncreaseParentheses },
      { icon: 'x!', operator: '!', action: updateScreen },
      { icon: '^', operator: '^()', action: IncreaseParentheses }
    ]
  };

  // Button functions
  function clearScreen() {
    setExpression('');
    setResult(0);
    setOpen(0);
  }

  function IncreaseParentheses(value) {
    updateScreen(value);
    setOpen((prev) => prev + 1);
  }

  function DecreaseParentheses() {
    setOpen((prev) => Math.max(0, prev - 1));
  }

  function updateScreen(value) {
    setExpression((prev) => {
      let formattedValue = value;

      if (/^[^0-9.]$/.test(value)) {
        formattedValue = ` ${value} `; // add space if the input is a symbol
      }

      switch (true) {
        case value === '=': // always show = in the end of the expression
          setOpen(0);
          return prev + formattedValue;

        case result !== 0: // Start a new operation keeping the last result
          setResult(0);
          setOpen(0);
          return ans + formattedValue;

        case value === ')': // Only update the parentheses counter
          return prev;

        case open > 0: // Determine the position of the input based on open parentheses
          return prev.slice(0, -open) + formattedValue + prev.slice(-open);

        default:
          return prev + formattedValue;
      }
    });
  }

  function deleteCharScreen() {
    setExpression((prev) => {
      let newExp = prev;

      const emptyFuncOrParensRegex = /(log|ln|cos|sen|tan|√|Rnd|abs)?\(\)/g;

      // delete empty parentheses or functions
      if (emptyFuncOrParensRegex.test(newExp)) {
        setOpen((prevOpen) => prevOpen - 1);
        newExp = newExp.replace(emptyFuncOrParensRegex, '');
      }

      const match = newExp.match(/(\)+)$/);
      const count = match ? match[0].length : 0;
      setOpen(count);

      // inside parentheses
      if (count > 0) {
        if (newExp.slice(0, -count).endsWith(' ')) {
          newExp = newExp.slice(0, -count - 3) + newExp.slice(-count);
        } else {
          newExp = newExp.slice(0, -count - 1) + newExp.slice(-count);
        }
      }

      // outside parentheses
      if (count === 0) {
        if (newExp.endsWith(' ')) {
          newExp = newExp.slice(0, -3);
        } else {
          newExp = newExp.slice(0, -1);
        }
      }

      return newExp;
    });
  }

  function parseExpression(value) {
    return value
      .replaceAll('x', '*')
      .replaceAll('÷', '/')
      .replaceAll('√', 'sqrt')
      .replaceAll('π', 'pi')
      .replaceAll('Ans', ans)
      .replaceAll('In', 'log')
      .replaceAll('log', 'log10');
  }

  function calculateResult() {
    try {
      const result = evaluate(parseExpression(expression));
      setResult(result);
      setHistory((prev) => [...prev, expression]);
      updateScreen('=');
    } catch {
      setResult('Syntax Error');
    }
  }

  function updateScreenFromHistory(value) {
    clearScreen();
    setExpression(value);
  }

  function changeMode(value) {
    setMode(value);
  }

  // update ans value if the result is correct
  useEffect(() => {
    if (![0, 'Syntax Error'].includes(result)) {
      setAns(result);
    }
  }, [result]);

  return (
    <>
      <Screen
        updateScreenFromHistory={updateScreenFromHistory}
        history={history}
        expression={expression}
        result={result}
        ans={ans}
        changeMode={changeMode}
        mode={mode}
        open={open}
      />
      <div className="flex justify-center">
        <CalculatorButtons
          basicButtons={buttons.basic}
          scientificButtons={buttons.scientific}
          mode={mode}
        />
      </div>
    </>
  );
}
