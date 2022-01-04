import React from "react";
import logo from "../../assets/img/logo-coca.png";
import logored from "../../assets/img/redragon-logo.png";
function Header({ setVisible }) {
  return (
    <div className="bg-white h-32 ">
      <div className="flex justify-between w-10/12 mx-auto pt-10  pb-10 h-28">
        <img
          src={logo}
          alt="logo-coca-cola"
          className=" h-12 w-auto object-contain cursor-pointer"
          onClick={() => setVisible(true)}
        />

        <img
          src={logored}
          alt="logo-redragon"
          className="w-auto object-contain h-16 "
        />
      </div>
      <div className="divisor-header w-full"></div>
    </div>
  );
}

export default Header;
