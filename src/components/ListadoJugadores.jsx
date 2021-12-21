import React from "react";
import Jugador from "./Jugador";

const ListadoJugadores = ({ jugadores }) => {
  return (
    <div className="md:w-1/2 ">
      <h2 className="text-center text-white font-bold uppercase">
        Proximos jugadores
      </h2>
      <div className="md:h-screen overflow-y-auto no-scrollbar w-full mx-auto">
        {jugadores.map((jugador) => (
          <Jugador jugador={jugador} />
        ))}
      </div>
    </div>
  );
};

export default ListadoJugadores;
