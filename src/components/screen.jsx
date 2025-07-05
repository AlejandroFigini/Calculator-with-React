import { useRef, useState, useEffect, useContext } from 'react';
import { motion } from 'framer-motion';
// Components
import { History } from './History';
import { CalculatorMode } from './CalculatorMode';
import { BlinkingCurson } from './BlinkingCursor';
// Context
import { CalculatorContext } from '../context/CalculatorContext';

export function Screen() {
  const {
    expression,
    result,
    ans,
    completeOperation,
    open,
  } = useContext(CalculatorContext);

  const inputRef = useRef(null);
  const [displayUp, setdisplayUp] = useState('Ans = ' + ans);
  const [displayDown, setdisplayDown] = useState(expression);

  useEffect(() => {
    setdisplayUp(completeOperation ? result : 'Ans = ' + ans);
  }, [completeOperation]);

  // Put blinking cursor inside parentheses
  useEffect(() => {
    const index = expression.length - open;
    setdisplayDown(
      <>
        {open > 0 ? (
          <>
            {expression.slice(0, index)}
            <BlinkingCurson completeOperation={completeOperation} />
            <span style={{ color: '#696464' }}>{expression.slice(index)}</span>
          </>
        ) : (
          <>
            {expression}
            <BlinkingCurson completeOperation={completeOperation} />
          </>
        )}
      </>
    );
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
        className={`col-span-2 row-start-1 row-end-2 bg-black rounded-[0.5vw] grid grid-cols-1 [grid-template-rows:2vw_auto] gap-[1vw] p-[0.7vw] transition-all duration-200 '}`}
      >
        <CalculatorMode />
        <History />
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
              y: completeOperation ? 20 : 0,
              color: completeOperation ? '#ffffff' : '#aca3a3',
              fontSize: completeOperation ? '1vw' : '.6vw',
            }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            {displayUp}
          </motion.h2>
          <motion.h2
            className="absolute"
            animate={{
              y: completeOperation ? 0 : 20,
              color: completeOperation ? '#aca3a3' : '#ffffff',
              fontSize: completeOperation ? '.6vw' : '1vw',
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
