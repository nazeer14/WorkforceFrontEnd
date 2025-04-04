import React from "react";
import { useSelector } from "react-redux";
import HomeData from '../components/HomeData'

function HomeData() {
 
  
  return (

    <div className="flex flex-col items-center mw-100  text-center lg:mt-20">
      <h1 className="lg:text-4xl text-xl text-blue-700 font-bold ">Welcome to WorkForce – Your Trusted Labor Provider</h1>
      <p className="lg:text-2xl m-2 lg:block hidden">
        Finding reliable daily labor has never been easier! <br/>At WorkForce, we
        connect clients with skilled and hardworking laborers for all types of
        daily tasks.<br/> Whether you need construction workers, helpers, cleaners,
        or any other daily labor, we’ve got you covered.
      </p>
      <h2 className="text-2xl text-purple-700">Why Choose WorkForce?</h2>
      <ul className="lg:text-xl">
        <li>✅ Wide range of skilled and unskilled workers </li>
        <li>✅ Quick and hassle-free hiring process </li>
        <li>✅ Reliable and professional workforce</li>
      </ul>
      <h3 className="lg:text-3xl text-xl ">
        Let WorkForce simplify your search for daily labor—Efficient, Reliable,
        and On-Demand!
      </h3>
    </div>
  );
}

export default HomeData;
