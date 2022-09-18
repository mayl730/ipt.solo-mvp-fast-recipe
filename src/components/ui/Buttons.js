import React from 'react';
import { MdAdd } from "react-icons/md";


function ButtonIcon({
  type = 'submit',
  className = '',
  processing,
  children,
  color = 'text-orange-200',
}) {
  return (
    <button
      type={type}
      className={
        color + ` hover:text-orange-100 font-bold py-2 px-1 text-base ` + className
      }
      disabled={processing}
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
}) {
  return (
    <button
      type={type}
      className={
        color + ` hover:opacity-80 text-white font-bold py-2 px-5 rounded-full
        block text-base` + className
      }
      onClick={onClick}>

 <span className="text-sm inline">{children}</span>
    </button>
  );
}

export {ButtonIcon, ButtonConfirm};