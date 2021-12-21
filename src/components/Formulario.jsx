import React from "react";

function Formulario() {
  return (
    <div className="md:w-1/2 lg:w-2/5">
      <h2 className="mb-5 text-center font-bold">BATALLA DEL VERANO </h2>
      <form className="bg-white shadow-md rounded-lg mb-10 py-10 px-5 mx-10">
        <div className="mb-5">
          <label htmlFor="name" className="block text-gray-700 uppercase">
            Nombre del jugador
          </label>
          <input
            id="name"
            className="border-2 w-full p-2 mt-2 rounded-md"
            type="text"
            placeholder="Nombre del Jugador"
          />
        </div>

        <div className="mb-5">
          <label htmlFor="email" className="block text-gray-700 uppercase">
            Correo electrónico
          </label>
          <input
            id="email"
            className="border-2 w-full p-2 mt-2 rounded-md"
            type="text"
            placeholder="Dirección de email"
          />
        </div>
        <div className="mb-5">
          <label htmlFor="game" className="block text-gray-700 uppercase">
            Juego
          </label>
          <select
            id="name"
            className="border-2 w-full p-2 mt-2 rounded-md"
            type="text"
            placeholder="Nombre del Juego"
          >
            <option value="counter">Lol</option>
            <option value="counter">Counter</option>
            <option value="counter">otros</option>
            <option value="counter">otros</option>
          </select>
        </div>
        <input
          type="submit"
          value="Registrate"
          className="text-white uppercase font-bold bg-red-600 w-full p-3 hover:bg-red-900 cursor-pointer transition-color"
        />
      </form>
    </div>
  );
}

export default Formulario;
