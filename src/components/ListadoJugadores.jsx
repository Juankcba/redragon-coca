import React from "react";
import Jugador from "./Jugador";
import Webcam from "react-webcam";
const ListadoJugadores = ({
  usuarioAutenticado,
  edit,
  jugadores,
  setJugador,
  eliminarJugador,
  setJugadores,
}) => {
  return (
    <div
      className={edit ? "w-full md:w-1/2 lg:w-3/5 " : "w-full pb-10 md:flex  "}
    >
      {!edit && (
        <div className="w-full md:w-1/2 lg:w-3/5  mt-10 ">
          <h2 className="text-center text-white font-bold uppercase mb-5">
            CAMARA EN VIVO
          </h2>
          <Webcam className="p-5 mt-0 pt-0 mx-auto rounded-lg" />
        </div>
      )}
      <div className={edit ? "" : "md:w-1/2 lg:w-3/5 mt-10"}>
        {jugadores && jugadores.length > 0 ? (
          <h2 className="text-center text-white font-bold uppercase">
            Jugadores Participantes
          </h2>
        ) : null}
        <div className=" h-64 md:h-auto   w-11/12 lg:w-10/12 mx-auto">
          {jugadores.map((jugador) => (
            <Jugador
              key={jugador.id}
              jugador={jugador}
              jugadores={jugadores}
              eliminarJugador={eliminarJugador}
              setJugador={setJugador}
              setJugadores={setJugadores}
              edit={edit}
              usuarioAutenticado={usuarioAutenticado}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ListadoJugadores;
