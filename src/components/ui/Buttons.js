import React from 'react';
import { MdAdd } from "react-icons/md";


function ButtonIcon({
  type = 'submit',
  className = '',
  processing,
  children,
}) {
  return (
    <button
      type={type}
      className={
        ` text-orange-200 hover:text-orange-100 font-bold py-2 px-1 text-base ` + className
      }
      disabled={processing}
    >
   
    <MdAdd className="inline w-5 h-4 align-middle" /><span className="align-middle text-sm	desktop:text-base">{children}</span> 
    </button>
  );
}

function ButtonConfirm({
  type = "submit",
  className = "",
  children,
  onClick
}) {
  return (
    <button
      type={type}
      className={
        `bg-orange-200 hover:bg-orange-100 text-white font-bold py-2 px-5 rounded-full
        block text-base` + className
      }
      onClick={onClick}>

 <span className="text-sm inline">{children}</span>
    </button>
  );
}

export {ButtonIcon, ButtonConfirm};