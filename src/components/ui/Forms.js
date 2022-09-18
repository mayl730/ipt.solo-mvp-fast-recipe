import React from 'react';

function Input({
  type = '',
  name = '',
  value = '',
  className = '',
  placeholder='',
  as='',
  rows,
  onChange
}) {
  return (
    <input type={type} className={`bg-white border-gray-200	text-gray-900 text-sm rounded-full focus:ring-orange-200 focus:bg-gray-100 focus:border-solid focus:border-orange-200 block w-full p-8.5` + ' ' + className} placeholder={placeholder} onChange={onChange} value = {value} name = {name} as = {as} rows = {rows}>
    </input>
  );
}

function Textarea({
  type = '',
  name = '',
  value = '',
  className = '',
  as = '',
  rows,
  onChange
}) {
  return (
    <textarea id="message" rows={rows} class={`block p-2.5 w-full text-gray-900 bg-white border-gray-200 rounded-lg border focus:ring-orange-200 focus:bg-gray-100 focus:border-orange-200 ` + className } as = {as} type = {type} name = {name} value = {value} onChange = {onChange}></textarea>

  );
}

function InputFile({
  type = 'file',
  onChange
}) {
  return (
    <input class="form-control
    block
    w-full
    px-3
    py-1.5
    text-base
    font-normal
    text-gray-700
    bg-white bg-clip-padding
    border border-solid border-gray-300
    rounded-full
    transition
    ease-in-out
    m-0
    focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" type="file" id="formFile"/>
  );
}

function Label({
  className = '',
  children
}) {
  return (
    <label class={`block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300 ` + className}>{children}</label>
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

export {Label, Input, Select, InputFile, Textarea};