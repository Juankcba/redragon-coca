import React from "react";
import Header from "../components/Header";
import Formulario from "../components/Formulario";
import Footer from "../components/Footer";
import ListadoJugadores from "../components/ListadoJugadores";
function NuevoJugador({
  jugadores,
  jugador,
  setJugador,
  setJugadores,
  eliminarJugador,
  usuarioAutenticado,
}) {
  return (
    <div className="container h-auto mx-auto mt-12  md:flex ">
      <Formulario
        jugadores={jugadores}
        jugador={jugador}
        setJugadores={setJugadores}
        setJugador={setJugador}
      />
      <ListadoJugadores
        jugadores={jugadores}
        setJugador={setJugador}
        eliminarJugador={eliminarJugador}
        edit={true}
        usuarioAutenticado={usuarioAutenticado}
      />
    </div>
  );
}

export default NuevoJugador;
