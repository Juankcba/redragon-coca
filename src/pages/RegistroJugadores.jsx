import React from "react";
import gamerzonerd from "../../assets/img/gamerzonerd.png";
import Formulario from "../components/Formulario";
const RegistroJugadores = ({
  jugadores,
  jugador,
  setJugador,
  setJugadores,
  eliminarJugador,
  usuarioAutenticado,
}) => {
  return (
    <main>
      <div className="flex justify-center xl:gap-20 p-4 xl:p-20 lg:flex-row flex-col">
        <div className="w-full  lg:w-6/12 flex justify-center min-w-min mx-auto ">
          <Formulario
            jugadores={jugadores}
            jugador={jugador}
            setJugadores={setJugadores}
            setJugador={setJugador}
            className="flex-1"
          />
        </div>
        <div className="w-full lg:w-6/12 flex justify-center mx-auto flex-1">
          <img
            src={gamerzonerd}
            alt="img-gamer-zone"
            className="gamer-zone-rd"
          />
        </div>
      </div>
    </main>
  );
};

export default RegistroJugadores;
