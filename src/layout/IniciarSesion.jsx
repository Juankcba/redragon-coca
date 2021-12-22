import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
function IniciarSesion() {
  return (
    <div className="container-fluid mx-auto">
      <Header />
      <div className="container mx-auto mt-12  md:flex contenido-principal flex justify-center">
        <form className="bg-white shadow-md rounded-lg mb-10 py-10 px-10 w-5/12 mx-10">
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
        </form>
      </div>
      <Footer />
    </div>
  );
}

export default IniciarSesion;
