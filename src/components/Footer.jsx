import React from "react";
import latas from "../../assets/img/latas.svg";
function Footer() {
  let year = new Date();

  return (
    <footer className="h-max  w-full text-center text-white">
      <img
        src={latas}
        alt="latas"
        className="p-0 m-0  w-full h-20 mb--10 bg-repeat-x position-relative-bottom"
      />
      <div className="bg-black ">
        <h3 className=" py-8">
          &copy; Todos los derechos reservados {year.getFullYear()}
        </h3>
      </div>
    </footer>
  );
}

export default Footer;
