import { useState } from 'react';
import { faClockRotateLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export function History({ history, updateScreenFromHistory }) {
  const [Open, setOpen] = useState(false);

  return (
    <>
      <div className="flex justify-end items-center relative">
        <FontAwesomeIcon
          icon={faClockRotateLeft}
          onClick={() => setOpen(!Open)}
          className={`
            transition-all 
            duration-200 
            ease-in-out 
            hover:scale-[1.02] 
            hover:text-[#186064] 
            hover:cursor-pointer
            ${Open ? 'text-[#186064]' : 'text-white'}
          `}
        />
        <div
          className={`
            absolute 
            bg-[#0b0c0c]       
            top-[-0.7vw] 
            [scrollbar-width:none] 
            h-[7.9vw] 
            w-[7vw] 
            overflow-y-scroll 
            overflow-x-hidden 
            rounded-r-[0.5vw] 
            transition-all 
            duration-300 
            ease-in-out 
            ${Open ? 'translate-x-[7.2vw] opacity-100' : 'opacity-0 translate-x-full'}
          `}
        >
          {history.map((entry, index) => (
            <h3
              className="
                text-[rgba(255,231,231,0.596)] 
                transition-all 
                duration-100 
                ease-in-out 
                px-[0.5vw] 
                py-[0.2vw]
                hover:bg-[#186064] 
                hover:cursor-pointer 
                hover:scale-[1.05] 
                hover:text-white
              "
              key={index}
              onClick={function () {
                updateScreenFromHistory(entry);
              }}
            >
              {entry}
            </h3>
          ))}
        </div>
      </div>
    </>
  );
}
