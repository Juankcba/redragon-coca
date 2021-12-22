import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
function IniciarSesion() {
  const [visible, setVisible] = useState(false);
  return (
    <div className="container-fluid mx-auto">
      <Header />
      {visible && (
        <div className=" z-10 absolute top-0 left-0 w-full h-screen   ">
          <div className="bg-slate-500 opacity-50 w-full h-screen  relative z-0 top-0 left-0"></div>
          <div className="bg-white w-3/12 h-screen p-5 opacity-100 absolute top-0 left-0 z-10 mx-auto">
            <div className="flex justify-between">
              <h2 className="text-center font-bold text-lg ">Menu </h2>
              <button onClick={() => setVisible(!visible)}>Cerrar</button>
            </div>
            <nav className="flex flex-col">
              <Link to="/jugadores">Jugadores</Link>
              <Link to="/jugadores/nuevo">Agregar Jugadores</Link>
            </nav>
          </div>
        </div>
      )}

      <div className="container mx-auto mt-12  md:flex contenido-principal flex justify-center">
        <form className="bg-white shadow-md rounded-lg mb-10 py-10 px-10 w-5/12 h-full mx-10">
          <div className="mb-5">
            <label htmlFor="user" className="block text-gray-700 uppercase">
              Usuario
            </label>
            <input
              id="user"
              type="text"
              placeholder="Usuario"
              className="border-2 w-full p-2 mt-2 rounded-md"
            />
          </div>
          <div className="mb-5">
            <label htmlFor="password" className="block text-gray-700 uppercase">
              Contraseña
            </label>
            <input
              id="password"
              type="password"
              placeholder="Contraseña"
              className="border-2 w-full p-2 mt-2 rounded-md"
            />
          </div>
          <input
            type="submit"
            value="Ingresar"
            className="text-white uppercase font-bold bg-red-600 w-full p-3 hover:bg-red-900 cursor-pointer rounded-lg transition-color"
          />
          <button
            type="button"
            className="text-white font-bold uppercase bg-gray-700 hover:bg-gray-800 rounded-lg p-3 w-full  mt-5"
            onClick={() => setVisible(!visible)}
          >
            Menu
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
}

export default IniciarSesion;
