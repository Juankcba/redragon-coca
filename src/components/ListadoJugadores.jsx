import React from "react";
import Jugador from "./Jugador";
import Webcam from "react-webcam";
const ListadoJugadores = ({
  usuarioAutenticado,
  edit,
  jugadores,
  setJugador,
  eliminarJugador,
}) => {
  return (
    <div className={edit ? "md:w-1/2 lg:w-3/5 " : " pb-10 md:flex  "}>
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
        <div className=" h-48 mb-36 md:h-auto md:overflow-y-scroll no-scrollbar w-10/12 mx-auto">
          {jugadores.map((jugador) => (
            <Jugador
              key={jugador.id}
              jugador={jugador}
              eliminarJugador={eliminarJugador}
              setJugador={setJugador}
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
