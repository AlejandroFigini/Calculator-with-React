export function Button({ icon, operator, action }) {
  return (
    <button
      className={`
        bg-[rgba(72,95,97,0.099)] 
        text-[rgba(255,255,255,0.634)] 
        transition-all duration-200 ease-in-out 
        shadow-[-5px_3px_13px_-6px_rgba(0,0,0,0.58)] 
        [text-shadow:-3px_1px_8px_rgba(0,0,0,0.3)] 
        border-[0.06vw] border-[rgba(255,255,255,0.51)] 
        rounded-[0.25vw] 
        text-[0.8vw] 
        p-[0.75vw] 
        cursor-pointer
        hover:bg-[#186064] 
        hover:text-[rgb(255,255,255)]        
        btn-${icon}
      `}
      onClick={() => action(operator || icon)}
    >
      {icon}
    </button>
  );
}
