import React from "react";
import Participante from "./Participante";

const ListadoParticipante = ({
  participantes,
  setParticipantes,
  eliminarParticipante,
  setParticipante,
  usuarioAutenticado,
}) => {
  return (
    <div className={"md:w-1/2 lg:w-3/5 "}>
      <h2 className="mb-5 text-center text-white font-bold">
        Listado de Participantes
      </h2>
      {participantes.map((participante) => (
        <Participante
          jugador={participante}
          edit={true}
          setJugadores={setParticipantes}
          usuarioAutenticado={usuarioAutenticado}
          jugadores={participantes}
          eliminarParticipante={eliminarParticipante}
          setJugador={setParticipante}
        />
      ))}
    </div>
  );
};

export default ListadoParticipante;
