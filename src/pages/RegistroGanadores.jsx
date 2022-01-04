import React from "react";
import gamerzonerd from "../../assets/img/gamerzonerd.png";
import FormularioSorteo from "../components/FormularioSorteo";
const RegistroGanadores = ({
  setParticipantes,
  setParticipante,
  participantes,
  participante,
  usuarioAutenticado,
  eliminarParticipante,
}) => {
  return (
    <main>
      <div className="flex justify-center xl:gap-20 p-4 xl:p-20 lg:flex-row flex-col">
        <div className="w-full  lg:w-6/12 flex justify-center min-w-min mx-auto ">
          <FormularioSorteo
            setJugadores={setParticipantes}
            jugadores={participantes}
            jugador={participante}
            setJugador={setParticipante}
            usuarioAutenticado={usuarioAutenticado}
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

export default RegistroGanadores;
