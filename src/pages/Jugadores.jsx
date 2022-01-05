import React, { useState, useEffect } from "react";
import botella from "../../assets/img/botella.svg";
import gamerzone from "../../assets/img/gamerzone.svg";
import Jugador from "../components/Jugador";
import Webcam from "react-webcam";
import vs from "../../assets/img/vs.svg";

const Jugadores = ({
  jugadores,
  setJugadores,

  setJugador,
  edit,
  eliminarJugador,
}) => {
  const [proximos, setProximos] = useState([]);
  const [jugando, setJugando] = useState([]);
  const [jugadoresState, setJugadoresState] = useState([]);

  useEffect(() => {
    setProximos(jugadores.filter((jugador) => jugador.proximo == true));
    setJugando(jugadores.filter((jugador) => jugador.jugando == true));
    setJugadoresState(jugadores);
  }, [jugadores]);
  return (
    <main>
      <div className="flex ">
        <img
          src={botella}
          alt="botella-coca-cola"
          className="image-botella-left"
        />
        <div className="contenido-jugadores ">
          <div className="jugadores-left">
            <div className="">
              <img
                src={gamerzone}
                className="img-gamer-zone"
                alt="gamerzone-img"
              />
              <h1 className="text-white text-center font-bold uppercase mt-20 text-5xl">
                Próximos jugadores
              </h1>
              <section className="w-100 lg:pr-20 lg:pl-20 mt-20 mx-auto ">
                {proximos.map((jugador, index) => (
                  <Jugador
                    key={index}
                    jugador={jugador}
                    proximos={proximos}
                    jugando={jugando}
                    jugadores={jugadoresState}
                    setJugadores={setJugadores}
                  />
                ))}
              </section>
            </div>
          </div>
          <div className="jugadores-right pr-20 pl-20 mx-auto ">
            <Webcam className="p-5 mt-10 pt-0 mx-auto rounded-lg webcam" />
            <div className="flex justify-center w-10/12 mx-auto mt-12 flex-col   2xl:flex-row">
              {jugando.length && (
                <>
                  <div className="jugador-vs-title">
                    <h2 className="text-ellipsis overflow-hidden">
                      {jugando[0].name}
                    </h2>
                  </div>
                  <img src={vs} alt="vs" className="img-vs" />
                  {jugando && jugando.length > 1 && (
                    <div className="jugador-vs-title ">
                      <h2 className="text-ellipsis overflow-hidden">
                        {jugando[1].name}
                      </h2>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Jugadores;
