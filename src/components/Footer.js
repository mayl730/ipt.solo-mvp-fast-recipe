import React from "react";
import { H4, P1 } from './ui/Fonts';
import { FaFacebookSquare, FaInstagramSquare, FaTwitter } from "react-icons/fa";


export default function Footer(props) {
  return (
<footer class="mt-24 bg-yellow-100 text-center desktop:text-left">
  <div class="container mx-auto p-6 text-gray-800">
    
    <div class="flex flex-col desktop:flex-row">
      <div class="mb-6 md:mb-0 desktop:basis-1/3">
        <H4 class="font-medium mb-2 uppercase">Connect</H4>
        <div className="text-black-800 text-3xl opacity-90">
            <FaFacebookSquare className="inline mr-5"/>
            <FaInstagramSquare className="inline mr-5"/>
            <FaTwitter className="inline mr-5"/>
        </div>

      </div>
      
      <div class="mb-6 md:mb-0 desktop:basis-1/3">
        <H4 class="font-medium mb-2 uppercase">Learn More</H4>
        <P1 class="mb-4">
        <ul className="text-orange-200">
            <li>About us</li>
            <li>Contact Us</li>
            <li>FAQ</li>
        </ul>
        </P1>
      </div>

      <div class="mb-6 md:mb-0 desktop:basis-1/3">
        <H4 class="font-medium mb-2 uppercase">About</H4>
        <P1 class="mb-4">
        Fast Recipe is a personal recipe project written by React.JS, Tailwind CSS & RESTful API written by Express.JS, Node.JS & Knex.JS.
You can check the 
<a className="text-orange-200" href="https://github.com/mayl730/ipt.solo-mvp-fast-recipe" target="_blank" rel="noreferrer"> github repository here.</a>
        </P1>
      </div>

    </div>
  </div>

  <div className="font-cabin text-center text-gray-700 p-4 ">
    <a className="text-orange-200" href="http://code.maylai.xyz" target="_blank" rel="noreferrer">Code & Design by May Lai, All rights reserved</a>
  </div>
</footer>
  );
}
