import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";
const Layout = ({ usuarioAutenticado }) => {
  const [visible, setVisible] = useState(false);
  return (
    <div className="container-fluid mx-auto h-screen">
      {visible && (
        <div className=" z-10 absolute top-0 left-0 w-full h-screen   ">
          <div className="bg-slate-500 opacity-50 w-full h-screen  relative z-0 top-0 left-0"></div>
          <div className="bg-white w-2/3 md:w-3/12 h-screen p-5 opacity-100 absolute top-0 left-0 z-10 mx-auto">
            <div className="flex justify-between">
              <h2 className="text-center font-bold text-lg ">Menu </h2>
              <button onClick={() => setVisible(!visible)}>Cerrar</button>
            </div>
            <nav className="flex flex-col" onClick={() => setVisible(false)}>
              <Link to="/registro">Sorteo</Link>
              <Link to="/jugadores">Jugadores</Link>
              {usuarioAutenticado && (
                <>
                  <Link to="/jugadores/nuevo">Agregar Jugadores</Link>
                  <Link to="/registro/nuevo">Agregar Participante</Link>
                </>
              )}
            </nav>
          </div>
        </div>
      )}
      <Header setVisible={setVisible} />

      <Outlet />
      <Footer />
    </div>
  );
};

export default Layout;
