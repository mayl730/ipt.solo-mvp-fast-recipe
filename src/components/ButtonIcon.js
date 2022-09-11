import React from 'react';
import { MdAdd } from "react-icons/md";



export default function ButtonIcon({
  type = 'submit',
  className = '',
  processing,
  children,
}) {
  return (
    <button
      type={type}
      className={
        ` text-orange-200 hover:text-orange-100 font-bold py-2 px-1 text-xs ` + className
      }
      disabled={processing}
    >
   
 <MdAdd className="inline w-4 h-4 align-middle" /><span className="align-middle">{children}</span>

     
    </button>
  );
}