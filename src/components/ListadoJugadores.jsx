import React from "react";
import Jugador from "./Jugador";

const ListadoJugadores = () => {
  return (
    <div className="w-1/2">
      <h2 className="text-center font-bold mb-5 uppercase">
        Proximos jugadores
      </h2>
      <Jugador />
      <Jugador />
      <Jugador />
      <Jugador />
    </div>
  );
};

export default ListadoJugadores;
