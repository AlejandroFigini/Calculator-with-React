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
            top-[-0.5vw] 
            left-[-5.5vw] 
            [scrollbar-width:none] 
            max-h-[7vw]	
            w-[7vw] 
            overflow-y-scroll 
            overflow-x-hidden 
            rounded-[0.2vw]             
            transition-all 
            duration-300 
            ease-in-out 
            ${Open ? 'translate-x-[7.2vw] opacity-100' : 'opacity-0 translate-x-full'}
          `}
        >
          <p className="p-2 sticky top-0 bg-[#0b0c0c] z-10 text-[.6vw]">
   {history.length} operation{history.length !== 1 ? 's' : ''}
</p>

          {history.map((entry, index) => (
            <h3
              className="
                text-[rgba(255,231,231,0.596)] 
                transition-all 
                duration-100 
                ease-in-out 
                px-[0.5vw] 
                py-[0.3vw]
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
