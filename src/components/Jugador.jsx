import React from "react";

function Jugador({ jugador }) {
  return (
    <div className="mt-5 flex justify-between  bg-white shadow-md rounded-lg py-10 px-5 w-full">
      <p className="font-bold mb-3 text-gray-700 uppercase">Nombre: {""}</p>
      <span>{jugador.name}</span>
      <p className="font-bold mb-3 text-gray-700 uppercase">Juego: {""}</p>
      <span>{jugador.game}</span>
    </div>
  );
}

export default Jugador;
