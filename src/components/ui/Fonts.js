import React from 'react';

function H1({
    className = '',
    children
  }) {
    return (
      <h1 className={className + " " + `font-montserrat text-4xl text-black-800 my-3`}>{children}</h1>
    );
  }
  

function H2({
  className = '',
  children
}) {
  return (
    <h2 className={className + " " + `text-3xl font-montserrat font-bold text-black-800 my-7`}>{children}</h2>
  );
}

function H3({
    className = '',
    children
  }) {
    return (
    <h3 className={`font-montserrat text-4xl text-black-800 desktop:my-7` + ' ' + className}>{children}</h3> 
    );
  }


function H4({
    className = '',
    children
  }) {
    return (
    <h4 className={`font-montserrat text-2xl text-black-800 my-5` + className }>{children}</h4> 
    );
  }

export {H1, H2, H3, H4};