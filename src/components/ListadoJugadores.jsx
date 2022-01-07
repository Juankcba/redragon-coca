import React, { useState, useEffect } from "react";
import Jugador from "./Jugador";
import Webcam from "react-webcam";
const ListadoJugadores = ({
  usuarioAutenticado,
  edit,
  jugadores,
  setJugador,
  eliminarJugador,
  setJugadores,
  juegos,
}) => {
  const [jugadoresVs, setJugadoresVs] = useState([]);
  const [jugadoresNext, setJugadoresNext] = useState([]);
  const [jugadoresFilter, setJugadoresFilter] = useState(jugadores || []);
  const [jugadoresFilterByGAme, setJugadoresFilterByGame] = useState(
    jugadores || []
  );
  const [juegoFilter, setJuegoFilter] = useState("");

  useEffect(() => {
    let data = jugadores.filter((item) => item.jugando == true);
    setJugadoresVs(data);
    data = jugadores.filter((item) => item.proximo == true);
    setJugadoresNext(data);
    setJugadoresFilter(jugadores);
  }, [jugadores]);
  useEffect(() => {
    if (juegoFilter != "") {
      setJugadoresFilterByGame(
        jugadoresFilter.filter((item) => item.game == juegoFilter)
      );
    } else {
      setJugadoresFilterByGame(jugadoresFilter);
    }
  }, [juegoFilter]);

  const filterJugadores = (state) => {
    if (state == 1) {
      setJugadoresFilter(jugadores.filter((item) => item.ocultar == true));
    }
    if (state == 2) {
      setJugadoresFilter(jugadores.filter((item) => item.jugando == true));
    }
    if (state == 3) {
      setJugadoresFilter(jugadores.filter((item) => item.proximo == true));
    }
    if (state == 4) {
      setJugadoresFilter(jugadores.filter((item) => item.falto == true));
    }

    if (state == 5) {
      setJugadoresFilter(jugadores);
    }
    if (state == 6) {
      setJugadoresFilter(
        jugadores.filter(
          (item) =>
            item.ocultar == false &&
            item.jugando == false &&
            item.proximo == false
        )
      );
    }
  };
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
            Jugadores Participantes - <b>{jugadores.length}</b>
          </h2>
        ) : null}
        {jugadores && jugadores.length > 0 ? <section></section> : null}
        <section>
          {jugadoresVs.length > 0 && (
            <div className="flex justify-between w-2/3 mx-auto mt-4 mb-4 text-white">
              <h2>{jugadoresVs[0].name}</h2>
              <h1>VS</h1>
              {jugadoresVs.length > 1 && <h2>{jugadoresVs[1].name}</h2>}
            </div>
          )}
        </section>
        <div className=" h-64 md:h-auto   w-11/12 lg:w-10/12 mx-auto">
          {jugadoresNext.length > 0 && edit == false
            ? jugadoresNext.map((jugador) => (
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
              ))
            : null}
          {edit && (
            <>
              <div className="flex justify-between mt-5">
                <button
                  type="button"
                  onClick={() => filterJugadores(1)}
                  className="bg-blue-500  p-3 rounded-lg text-white font-bold "
                >
                  Ocultos
                </button>
                <button
                  type="button"
                  onClick={() => filterJugadores(2)}
                  className="bg-violet-500 p-3 rounded-lg text-white font-bold "
                >
                  Jugando
                </button>
                <button
                  type="button"
                  onClick={() => filterJugadores(3)}
                  className="bg-cyan-500 p-3 rounded-lg text-white font-bold "
                >
                  Próximos
                </button>
                <button
                  type="button"
                  onClick={() => filterJugadores(4)}
                  className="bg-cyan-500 p-3 rounded-lg text-white font-bold "
                >
                  Faltaron
                </button>
                <button
                  type="button"
                  onClick={() => filterJugadores(6)}
                  className="bg-cyan-500 p-3 rounded-lg text-white font-bold "
                >
                  Siguientes
                </button>
                <button
                  type="button"
                  onClick={() => filterJugadores(5)}
                  className="bg-cyan-500 p-3 rounded-lg text-white font-bold "
                >
                  Todos
                </button>
              </div>
              <div className="w-full mt-10">
                <select
                  id="gameFitler"
                  className="border-2 w-full p-2 mt-2 rounded-md"
                  type="text"
                  placeholder="Nombre del Juego"
                  value={juegoFilter}
                  onChange={(e) => setJuegoFilter(e.target.value)}
                >
                  <option value="" disabled>
                    Todos
                  </option>
                  {juegos.map((juego) => (
                    <option value={juego.name} key={juego.id}>
                      {juego.name}
                    </option>
                  ))}
                </select>
              </div>
              {jugadoresFilterByGAme.map((jugador) => (
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
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ListadoJugadores;
