import React from 'react';

function Input({
  type = '',
  className = '',
  placeholder="",
  onChange
}) {
  return (
    <input type={type} className={`bg-gray-100 border-transparent text-gray-900 text-sm rounded-full focus:ring-orange-200 focus:border-solid focus:border-orange-200 block w-full p-8.5` + className} placeholder={placeholder} onChange={onChange}>
    </input>
  );
}

function Select({
  className = '',
  onChange,
  children
}) {
  return (
    <select className={`bg-gray-100 text-gray-900 border-transparent	text-sm rounded-full focus:ring-orange-200 focus:border-solid focus:border-orange-200 block w-full p-2.5` + className}onChange={onChange}>
      {children}
    </select>
  );
}

export {Input, Select};