import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';

import { History } from './History';
import { CalculatorMode } from './CalculatorMode';
import { BlinkingCurson } from './BlinkingCursor';

export function Screen({ expression, result, ans, changeMode, mode, history, updateScreenFromHistory, open }) {
  const inputRef = useRef(null);
  const displayUp = result === 0 ? 'Ans = ' + ans : result;
  const [displayDown, setdisplayDown] = useState(expression);
  const animateCondition = result !== 0;

  useEffect(() => {
    // Put blinking cursor inside parentheses
    if (open > 0) {
      const index = expression.length - open;
      setdisplayDown(
        <>
          {expression.slice(0, index)}
          <BlinkingCurson result={result} />
          <span style={{ color: '#696464' }}>{expression.slice(index)}</span>
        </>
      );
    } else {
      setdisplayDown(
        <>
          {expression}
          <BlinkingCurson result={result} />
        </>
      );
    }
  }, [expression, open]);

  // Automatically move to the end of the expression
  useEffect(() => {
    if (inputRef.current) {
      requestAnimationFrame(() => {
        inputRef.current.scrollLeft = inputRef.current.scrollWidth;
      });
    }
  }, [expression, displayDown]);

  return (
    <>
      <div
        className={`col-span-2 row-start-1 row-end-2 bg-black rounded-[0.5vw] grid grid-cols-1 [grid-template-rows:2vw_auto] gap-[1vw] p-[0.7vw] transition-all duration-200 ${mode === 'Scientific' ? 'w-[24vw]' : 'w-[12vw]'}`}
      >
        <CalculatorMode changeMode={changeMode} mode={mode} />
        <History updateScreenFromHistory={updateScreenFromHistory} history={history} />
        <div
          ref={inputRef}
          className="
            col-span-2
            row-start-2 row-end-3
            overflow-x-scroll
            [scrollbar-width:thin]
            [scrollbar-color:transparent_transparent]
            relative
            hover:[scrollbar-color:#626060_#00000000]
            min-h-[4vw]
          "
        >
          {/* change location of both h2 */}
          <motion.h2
            className="absolute"
            animate={{
              y: animateCondition ? 20 : 0,
              color: animateCondition ? '#ffffff' : '#aca3a3',
              fontSize: animateCondition ? '1vw' : '.6vw',
            }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            {displayUp}
          </motion.h2>
          <motion.h2
            className="absolute"
            animate={{
              y: animateCondition ? 0 : 20,
              color: animateCondition ? '#aca3a3' : '#ffffff',
              fontSize: animateCondition ? '.6vw' : '1vw',
            }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            {displayDown}
          </motion.h2>
        </div>
      </div>
    </>
  );
}
