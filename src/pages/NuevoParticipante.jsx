import React from "react";
import FormularioSorteo from "../components/FormularioSorteo";
import ListadoParticipante from "../components/ListadoParticipantes";
export default function NuevoParticipante({
  setParticipantes,
  setParticipante,
  participantes,
  participante,
  usuarioAutenticado,
  eliminarParticipante,
}) {
  return (
    <div className="container-fluid contenido-principal pt-10 mb-14 md:flex">
      <FormularioSorteo
        setJugadores={setParticipantes}
        jugadores={participantes}
        jugador={participante}
        setJugador={setParticipante}
        usuarioAutenticado={usuarioAutenticado}
      />
      <ListadoParticipante
        edit={true}
        participantes={participantes}
        setParticipantes={setParticipantes}
        setParticipante={setParticipante}
        usuarioAutenticado={usuarioAutenticado}
        eliminarParticipante={eliminarParticipante}
      />
    </div>
  );
}
