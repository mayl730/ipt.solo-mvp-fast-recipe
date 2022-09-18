import React from 'react';


function ButtonIcon({
  className = '',
  type = "submit",
  children,
  color = 'text-orange-200',
  onClick,
}) {
  return (
    <button
      type = {type}
      className={
        color + ` hover:text-orange-100 font-bold py-2 px-1 text-base ` + className
      }
      onClick={onClick}
    >
   
    <span className="align-middle text-sm desktop:text-base">{children}</span> 
    </button>
  );
}

function ButtonConfirm({
  type = "submit",
  className = "",
  children,
  onClick,
  color = "bg-orange-200",
  processing,
}) {
  return (
    <button
      type={type}
      className={
        color + ` hover:opacity-80 text-white font-bold py-2 px-5 rounded-full
        block text-base` + className
      }
      onClick={onClick}
      
      >

 <span className="text-sm inline">{children}</span>
    </button>
  );
}

export {ButtonIcon, ButtonConfirm};