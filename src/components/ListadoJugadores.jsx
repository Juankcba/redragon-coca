import React from "react";
import Jugador from "./Jugador";
import Webcam from "react-webcam";
const ListadoJugadores = ({ edit, jugadores, setJugador, eliminarJugador }) => {
  return (
    <div className={edit ? "md:w-1/2 lg:w-3/5 md:h-screen" : "flex "}>
      {!edit && (
        <div className="md:w-1/2 lg:w-3/5 md:h-screen mt-10 ">
          <h2 className="text-center text-white font-bold uppercase mb-5">
            CAMARA EN VIVO
          </h2>
          <Webcam className="p-5 mt-0 pt-0 mx-auto rounded-lg" />
        </div>
      )}
      <div className={edit ? "" : "md:w-1/2 lg:w-3/5 md:h-screen mt-10"}>
        {jugadores && jugadores.length > 0 ? (
          <h2 className="text-center text-white font-bold uppercase">
            Jugadores Participantes
          </h2>
        ) : null}
        <div className="md:h-screen overflow-y-auto no-scrollbar w-10/12 mx-auto">
          {jugadores.map((jugador) => (
            <Jugador
              key={jugador.id}
              jugador={jugador}
              eliminarJugador={eliminarJugador}
              setJugador={setJugador}
              edit={edit}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ListadoJugadores;
