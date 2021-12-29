import React from "react";
import Participante from "./Participante";

const ListadoParticipante = ({
  participantes,
  setParticipantes,
  eliminarParticipante,
  setParticipante,
  usuarioAutenticado,
  edit,
}) => {
  return (
    <div className=" md:w-4/5 lg:w-3/5 w-100 mx-auto h-screen ">
      <h2 className="mb-5 text-center text-white font-bold text uppercase">
        Listado de Participantes
      </h2>
      <div className="mx-auto  w-3/5  text-center ">
        <div className="bg-white rounded-lg ml-auto px-5 p-5 lg:w-4/12 w-100">
          <h2>
            Participantes : <strong>{participantes.length}</strong>
          </h2>
        </div>
      </div>
      {participantes.map((participante) => (
        <Participante
          key={participante.id}
          jugador={participante}
          edit={edit}
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
