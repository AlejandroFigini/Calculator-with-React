import { faBars, faCalculator, faFlask, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';

export function CalculatorMode({ changeMode, mode }) {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className='flex justify-start items-center'>
      <ul>
        <li
          className={`relative cursor-pointer font-light ${showMenu ? 'text-[rgb(36, 48, 48)]' : 'text-white'}`}
          onClick={() => setShowMenu((prev) => !prev)} // open menu
        >
          <span>
            <FontAwesomeIcon icon={showMenu ? faChevronDown : faBars} /> {mode}
          </span>
          <ul
            className={`flex 
              gap-[0.5vw] 
              absolute 
              mt-[0.2vw] 
              left-[0.9vw] 
              origin-top 
              scale-y-0 
              transition-transform 
              duration-300 
              ease-in-out 
              ${showMenu ? 'scale-y-100' : ''}`}
          >
            <li
              className='cursor-pointer text-[#999da9] font-light'
              onClick={(e) => {
                e.stopPropagation(); // prevent menu reopening
                changeMode('Standar');
                setShowMenu(false); // close menu
              }}
            >
              <span>
                <FontAwesomeIcon icon={faCalculator} /> Standar
              </span>
            </li>
            <li
              className='cursor-pointer text-[#999da9] font-light'
              onClick={(e) => {
                e.stopPropagation();
                changeMode('Scientific');
                setShowMenu(false);
              }}
            >
              <span>
                <FontAwesomeIcon icon={faFlask} /> Scientific
              </span>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  );
}
