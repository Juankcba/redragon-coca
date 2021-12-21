import React from "react";

function Jugador({ jugador }) {
  return (
    <div className="mt-5   bg-white shadow-md rounded-lg py-10 px-5 w-full">
      <p className="font-bold mb-3 text-gray-700 uppercase">
        Nombre: {""} <span className="font-normal">{jugador.name}</span>
      </p>
      <p className="font-bold mb-3 text-gray-700 uppercase">
        Juego: {""}
        <span className="font-normal">{jugador.game}</span>
      </p>
    </div>
  );
}

export default Jugador;
