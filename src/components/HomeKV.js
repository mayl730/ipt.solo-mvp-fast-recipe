import React from "react";


export default function HomeKV(props) {
  return (
    <div className="container mx-auto grid grid-cols-1 desktop:grid-cols-3 desktop:gap-4">
        <div className="col-span-3 container desktop:col-span-1">
            <img src={require('../assets/img_kv_food.png')} alt="fast recipe Logo" />
        </div>
         <div className="col-span-3 desktop:col-span-2 mx-4 mb-8 desktop:m-auto">
            <h3 className="font-montserrat text-4xl  text-black-800 my-3">Keep it easy, Cook with Joy.</h3>
            <span className="font-cabin text-lg text-black-800">Explore thousands of top-rated quick & easy recipe for breakfast, lunch or dinner!</span>
         </div>
    </div>
  );
}
