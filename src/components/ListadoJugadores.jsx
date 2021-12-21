import React from "react";
import Jugador from "./Jugador";

const ListadoJugadores = ({ jugadores }) => {
  return (
    <div className="md:w-1/2 lg:w-3/5 md:h-screen ">
      {jugadores.length > 0 ? (
        <h2 className="text-center text-white font-bold uppercase">
          Jugadores Participantes
        </h2>
      ) : null}
      <div className="md:h-screen overflow-y-auto no-scrollbar w-10/12 mx-auto">
        {jugadores.map((jugador) => (
          <Jugador jugador={jugador} />
        ))}
      </div>
    </div>
  );
};

export default ListadoJugadores;
