import React from 'react';
import { MdOutlineSearch } from "react-icons/md";

export default function Button1({
  type = 'submit',
  className = '',
  children,
  onClick
}) {
  return (
    <button
      type={type}
      className={
        `bg-orange-200 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full inline text-base` + className
      }
      onClick={onClick}>
   <MdOutlineSearch className="inline w-5 h-4" />
 <span className="text-sm inline">{children}</span>

     
    </button>
  );
}