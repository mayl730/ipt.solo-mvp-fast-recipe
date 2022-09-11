import React from 'react';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

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
        `bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full ` + className
      }
      disabled={processing}
    >
  
      <span>{children}</span>
    </button>
  );
}