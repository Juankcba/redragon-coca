import React from "react";
import logo from "../../assets/img/logo-coca.png";
import logored from "../../assets/img/redragon-logo.png";
function Header({ setVisible }) {
  return (
    <div className="bg-white h-32 ">
      <div className="flex justify-between w-10/12 mx-auto pt-4  pb-4 h-28">
        <img
          src={logo}
          alt="logo-coca-cola"
          className="logo-coca-header"
          onClick={() => setVisible(true)}
        />

        <img src={logored} alt="logo-redragon" className="logo-footer" />
      </div>
      <div className="divisor-header w-full"></div>
    </div>
  );
}

export default Header;
