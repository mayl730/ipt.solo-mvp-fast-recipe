import React from 'react';

function Input({
  type = '',
  name = '',
  value = '',
  className = '',
  placeholder="",
  onChange
}) {
  return (
    <input type={type} className={`bg-white border-gray-200	text-gray-900 text-sm rounded-full focus:ring-orange-200 focus:bg-gray-100 focus:border-solid focus:border-orange-200 block w-full p-8.5` + ' ' + className} placeholder={placeholder} onChange={onChange} value = {value} name = {name}>
    </input>
  );
}

function Label({
  className = '',
  children
}) {
  return (
    <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">{children}</label>
  );
}

function Select({
  className = '',
  onChange,
  children
}) {
  return (
    <select className={`bg-white text-gray-900 border-gray-200 text-sm rounded-full focus:ring-orange-200 focus:bg-gray-100 focus:border-solid focus:border-orange-200 block w-full p-2.5` + ' ' + className}onChange={onChange}>
      {children}
    </select>
  );
}

export {Label, Input, Select};