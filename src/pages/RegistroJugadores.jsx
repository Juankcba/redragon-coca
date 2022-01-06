import React, { useState, useEffect } from "react";
import gamerzonerd from "../../assets/img/gamerzonerd.png";
import Formulario from "../components/Formulario";
const RegistroJugadores = ({
  jugadores,
  jugador,
  setJugador,
  setJugadores,
  eliminarJugador,
  usuarioAutenticado,
  disponible,
  juegos,
}) => {
  const [registro, setRegistro] = useState(false);
  return (
    <main>
      {registro ? (
        <div className="mt-10">
          <h2 className="text-white text-center lg:text-4xl">
            ¡Gracias por registrarte!
          </h2>
          {!disponible && (
            <>
              <h3 className="text-white text-center lg:text-2xl mt-10">
                En este momento no está disponible el registro
              </h3>
              <h4 className="text-white text-center lg:text-2xl mt-10">
                Estas participando por increíbles premios
              </h4>
            </>
          )}
          <h5>
            No te olvides de revisar tu casilla de correo y correo no deseado.
          </h5>
          <div className="w-full lg:w-6/12 flex justify-center mx-auto flex-1">
            <img
              src={gamerzonerd}
              alt="img-gamer-zone"
              className="gamer-zone-rd"
            />
          </div>
          {registro && (
            <div className="flex justify-center">
              <button
                onClick={() => setRegistro(false)}
                className="mt-10 bg-white px-10 h-10 mx-auto align-middle rounded-lg  "
              >
                Volver
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="flex justify-center xl:gap-20 p-4 xl:p-20 lg:flex-row flex-col">
          <div className="w-full  lg:w-6/12 flex justify-center min-w-min mx-auto ">
            <Formulario
              disponible={disponible}
              jugadores={jugadores}
              jugador={jugador}
              setJugadores={setJugadores}
              setJugador={setJugador}
              juegos={juegos}
              setRegistro={setRegistro}
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
      )}
    </main>
  );
};

export default RegistroJugadores;
