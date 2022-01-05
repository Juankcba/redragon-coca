import React from "react";
import latas from "../../assets/img/latas.svg";
import logo from "../../assets/img/logo-coca.png";
import logored from "../../assets/img/logo-blanco.png";
function Footer() {
  let year = new Date();

  return (
    <footer className="h-max  w-full text-center text-white">
      <div className="bg-black xl:px-20 pt-4 flex xl:flex-row flex-col justify-end  gap-8">
        <img src={logo} alt="logo-coca-cola" className="logo-coca-footer" />
        <img src={logored} alt="logo-redragon" className="logo-footer" />

        <h3 className=" py-8 text-center align-middle">
          &copy; Blade Link - Todos los derechos reservados {year.getFullYear()}
        </h3>
      </div>
    </footer>
  );
}

export default Footer;
