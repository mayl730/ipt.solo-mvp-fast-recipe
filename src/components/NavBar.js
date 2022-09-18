import React from "react";
import { Link } from "react-router-dom";
import {ButtonIcon} from './ui/Buttons';
import { MdAdd } from "react-icons/md";

// import 'bootstrap/dist/css/bootstrap.min.css';


export default function NavBar(props) {
  return (
    <header className="sticky top-0 z-50">
      <nav className="border-gray-200 px-10 lg:px-6 py-2.5 dark:bg-gray-800">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          <Link to="/">
          <img src={require('../assets/img_logo1.png')} className="desktop:mt-2 desktop:mr-3 desktop:h-10 h-7" alt="fast recipe Logo" />
          </Link>
        
        <Link to="add-recipe">
          <ButtonIcon><MdAdd className="inline w-5 h-4 align-middle" />Add Recipe</ButtonIcon>
        </Link>
       
        </div>
      </nav>
    </header>
  );
}
