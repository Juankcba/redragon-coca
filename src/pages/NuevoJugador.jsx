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
  disponible,
  juegos,
}) {
  return (
    <div className="container h-full mx-auto mt-12  md:flex ">
      <Formulario
        jugadores={jugadores}
        jugador={jugador}
        setJugadores={setJugadores}
        setJugador={setJugador}
        disponible={disponible}
        juegos={juegos}
      />
      <ListadoJugadores
        juegos={juegos}
        jugadores={jugadores}
        setJugador={setJugador}
        setJugadores={setJugadores}
        eliminarJugador={eliminarJugador}
        edit={true}
        usuarioAutenticado={usuarioAutenticado}
      />
    </div>
  );
}

export default NuevoJugador;
