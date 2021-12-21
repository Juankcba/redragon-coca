import React from "react";
import Jugador from "./Jugador";

const ListadoJugadores = () => {
  return (
    <div className="md:w-1/2 ">
      <h2 className="text-center font-bold uppercase">Proximos jugadores</h2>
      <div className="md:h-screen overflow-y-auto no-scrollbar w-10/12 mx-auto">
        <Jugador />
        <Jugador />
        <Jugador />
        <Jugador />
        <Jugador />
        <Jugador />
        <Jugador />
      </div>
    </div>
  );
};

export default ListadoJugadores;
