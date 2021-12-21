import React from "react";
import Formulario from "./Formulario";

function Header() {
  return (
    <div className="bg-white h-32 ">
      <div className="flex justify-between w-10/12 mx-auto sm:w-full pt-10 h-28">
        <img
          src="../../assets/img/logo-coca.png"
          alt="logo-coca-cola"
          className=" h-12 w-auto object-contain "
        />
        <h1 className="font-black text-md md:text-5xl text-center md:w-2/3 mx-auto">
          Verano 2022
        </h1>
        <img
          src="../../assets/img/redragon-logo.png"
          alt="logo-redragon"
          className="w-auto object-contain h-14 "
        />
      </div>
      <div className="divisor-header w-full"></div>
    </div>
  );
}

export default Header;
