import React, { useState } from "react";
import swal from "sweetalert";
import firebase from "../../firebase";
import {
  LeadingActions,
  SwipeableList,
  SwipeableListItem,
  SwipeAction,
  TrailingActions,
} from "react-swipeable-list";
import "react-swipeable-list/dist/styles.css";
function Jugador({
  usuarioAutenticado,
  edit,
  jugador,
  setJugador,
  eliminarJugador,
  setJugadores,
  jugadores,
  proximos,
  jugando,
}) {
  const [loading, setLoading] = useState(false);
  const [loadingNext, setLoadingNext] = useState(false);
  const [loadingHide, setLoadingHide] = useState(false);
  const [loadingMiss, setLoadingMiss] = useState(false);

  const handleEliminar = () => {
    swal({
      title: "Vas a eliminar a un jugador",
      text: "Una vez eliminado no podras recuperar la información",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        eliminarJugador(jugador.id);
        swal("Poof! ese jugador ha sido eliminado!", {
          icon: "success",
        });
      }
    });
  };
  const handleProximo = async () => {
    const proximos = jugadores.filter((jugador) => jugador.proximo == true);
    const jugando = jugadores.filter((jugador) => jugador.jugando == true);
    const lista = jugadores.filter(
      (jugador) =>
        jugador.oculto == false &&
        jugador.jugando == false &&
        jugador.proximo == false
    );
    if (jugador.proximo) {
      console.log(" a jugar", jugando, lista);
      if (jugando.length > 0) {
        await setProximo(jugando[0], 3);
      }
      await setProximo(jugador, 1);
      console.log(lista);
      await setProximo(lista[0], 2);

      // await setProximo(jugador, 2);
      const jugadoresAcutalizados = jugadores.map((jugadorState) =>
        jugadorState.id === jugador.id
          ? {
              name: jugador.name,
              email: jugador.email,
              game: jugador.game,
              id: jugador.id,
              ocultar: state == 3 ? true : false,
              jugando: state == 1 ? true : false,
              proximo: state == 2 ? true : false,
              create: jugador.create,
            }
          : jugadorState
      );
      setJugadores(jugadoresAcutalizados);
    }

    if (!jugador.proximo && !jugador.jugando) {
      await setProximo(jugador, 2);
      const jugadoresAcutalizados = jugadores.map((jugadorState) =>
        jugadorState.id === jugador.id
          ? {
              name: jugador.name,
              email: jugador.email,
              game: jugador.game,
              id: jugador.id,
              ocultar: state == 3 ? true : false,
              jugando: state == 1 ? true : false,
              proximo: state == 2 ? true : false,
              create: jugador.create,
            }
          : jugadorState
      );
      setJugadores(jugadoresAcutalizados);
    }

    if (jugador.jugando) {
      await setProximo(jugador, 3);
      const jugadoresAcutalizados = jugadores.map((jugadorState) =>
        jugadorState.id === jugador.id
          ? {
              name: jugador.name,
              email: jugador.email,
              game: jugador.game,
              id: jugador.id,
              ocultar: state == 3 ? true : false,
              jugando: state == 1 ? true : false,
              proximo: state == 2 ? true : false,
              create: jugador.create,
            }
          : jugadorState
      );
      setJugadores(jugadoresAcutalizados);
    }
  };
  const leadingActions = () => (
    <LeadingActions>
      <SwipeAction onClick={handleProximo}>
        {jugador.jugando ? "Ocultar" : jugador.proximo ? "A Jugar" : "Proximo"}
      </SwipeAction>
    </LeadingActions>
  );

  const trailingActions = () => (
    <TrailingActions>
      <SwipeAction onClick={() => console.log("editar", jugadores)}>
        Eliminar
      </SwipeAction>
    </TrailingActions>
  );

  const setProximo = async (jugador, state) => {
    if (state == 3) setLoadingHide(true);
    if (state == 2) setLoadingNext(true);
    if (state == 1) setLoading(true);
    if (state == 4) setLoadingMiss(true);
    try {
      await firebase.db
        .collection("jugadores")
        .doc(jugador.id)
        .update({
          ...jugador,
          ocultar: state == 3 ? true : false,
          jugando: state == 1 ? true : false,
          proximo: state == 2 ? true : false,
          falto: state == 4 ? true : false,
        })
        .then(() => {
          const jugadoresAcutalizados = jugadores.map((jugadorState) =>
            jugadorState.id === jugador.id
              ? {
                  name: jugador.name,
                  email: jugador.email,
                  game: jugador.game,
                  id: jugador.id,
                  ocultar: state == 3 ? true : false,
                  jugando: state == 1 ? true : false,
                  proximo: state == 2 ? true : false,
                  falto: state == 4 ? true : false,
                  create: jugador.create,
                }
              : jugadorState
          );
          setJugadores(jugadoresAcutalizados);
          if (state == 3) setLoadingHide(false);
          if (state == 2) setLoadingNext(false);
          if (state == 1) setLoading(false);
          if (state == 4) setLoadingMiss(false);
        });
      if (state == 2) {
        await firebase.db
          .collection("mail")
          .add({
            to: jugador.email,
            message: {
              subject: "¡Sos el Próximo ! #GAMERZONE de COCA-COLA y REDRAGON",
              text: `Ya estas registrado para jugar ${jugador.game}. Toda la Suerte!`,
              html: `<code>
            <div >
            <h1>${jugador.name},  LLEGÓ TU TURNO, ¡SOS EL PRÓXIMO!</h1>
            </br>
            <h2>Te invitamos a que te acerques al <b>#GAMERZONE</b> para sumarte a tu próxima batalla.</h2>

            </br>
            <img src="https://firebasestorage.googleapis.com/v0/b/redragon-ff0b0.appspot.com/o/Recurso%207.png?alt=media&token=d0f6e3b9-35af-4556-8f62-f96b8b54f3dd" alt="img-" />
            </div>
            </code> `,
            },
          })
          .then(() => console.log("Queued email for delivery!"));
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
    swal("Poof! ese jugador ha sido editado!", {
      icon: "success",
    });
  };
  if (edit) {
    return (
      <SwipeableList>
        <SwipeableListItem
          leadingActions={leadingActions()}
          trailingActions={trailingActions()}
        >
          <div className="  bg-white shadow-md rounded-lg py-10 px-5 w-full">
            <p className="font-bold mb-3 text-gray-700 uppercase">
              Nombre: {""} <span className="font-normal">{jugador.name}</span>
            </p>
            <p className="font-bold mb-3 text-gray-700 uppercase">
              Juego: {""}
              <span className="font-normal">{jugador.game}</span>
            </p>
            {jugador.proximo && <p>Estado : Próximo</p>}
            {jugador.jugando && <p>Estado : Jugando</p>}
            {jugador.ocultar && <p>Estado : Oculto</p>}
            {edit && usuarioAutenticado && (
              <>
                <div className="flex justify-center flex-col lg:flex-row gap-3 mt-10">
                  <button
                    type="button"
                    className="bg-blue-500 py-2 px-5 flex justify-center text-white  gap-1  font-bold uppercase rounded-lg hover:bg-blue-800"
                    onClick={() => setProximo(jugador, 3)}
                  >
                    Ocultar
                    {loadingHide && (
                      <div className="animate-spin rounded-full h-7 w-7 border-b-4 border-white"></div>
                    )}
                  </button>
                  <button
                    type="button"
                    className="bg-blue-500 py-2 px-5  text-center  text-white flex justify-center  gap-1  font-bold uppercase rounded-lg hover:bg-blue-800"
                    onClick={() => setProximo(jugador, 4)}
                  >
                    Falto
                    {loadingMiss && (
                      <div className="animate-spin rounded-full h-7 w-7 border-b-4 border-white"></div>
                    )}
                  </button>
                  <button
                    type="button"
                    className="bg-violet-500 py-2 px-5 flex justify-center gap-1 text-white font-bold uppercase rounded-lg hover:bg-violet-800"
                    onClick={() => setProximo(jugador, 1)}
                  >
                    Jugando
                    {loading && (
                      <div className="animate-spin rounded-full h-7 w-7 border-b-4 border-white"></div>
                    )}
                  </button>
                  <button
                    type="button"
                    className="bg-cyan-500 py-2 px-5  text-white text-center flex justify-center gap-1  font-bold uppercase rounded-lg hover:bg-cyan-800"
                    onClick={() => setProximo(jugador, 2)}
                  >
                    Próximo
                    {loadingNext && (
                      <div className="animate-spin rounded-full h-7 w-7 border-b-4 border-white"></div>
                    )}
                  </button>
                </div>
                <div className="flex justify-end flex-col lg:flex-row gap-3 mt-4 lg:mr-16 ">
                  <button
                    type="button"
                    className="bg-black py-2 px-5  text-white font-bold uppercase rounded-lg hover:bg-gray-800"
                    onClick={() => setJugador(jugador)}
                  >
                    Editar
                  </button>
                  <button
                    type="button"
                    className="py-2 px-5 bg-red-600 hover:bg-red-700 uppercase font-bold text-center text-white rounded-lg"
                    onClick={handleEliminar}
                  >
                    Eliminar
                  </button>
                </div>
              </>
            )}
          </div>
        </SwipeableListItem>
      </SwipeableList>
    );
  } else {
    if (jugador.ocultar) {
      return <div></div>;
    } else {
      return (
        <SwipeableList>
          <SwipeableListItem
            leadingActions={leadingActions()}
            trailingActions={trailingActions()}
          >
            <div className=" bg-white shadow-md rounded-lg py-10 px-5 w-full">
              <p className="font-bold mb-3 text-gray-700 uppercase">
                Nombre: {""} <span className="font-normal">{jugador.name}</span>
              </p>
              <p className="font-bold mb-3 text-gray-700 uppercase">
                Juego: {""}
                <span className="font-normal">{jugador.game}</span>
              </p>
              {/* {jugador.proximo && <p>Próximo</p>}
          {jugador.jugando && <p>Jugando</p>} */}
              {edit && usuarioAutenticado && (
                <div className="flex justify-between mt-10">
                  <button
                    type="button"
                    className="bg-black py-2 px-5  text-white font-bold uppercase rounded-lg hover:bg-gray-800"
                    onClick={() => setJugador(jugador)}
                  >
                    Editar
                  </button>
                  <button
                    type="button"
                    className="bg-blue-500 py-2 px-5  text-white font-bold uppercase rounded-lg hover:bg-blue-800"
                    onClick={() => setProximo(jugador, 3)}
                  >
                    Ocultar
                  </button>
                  <button
                    type="button"
                    className="bg-violet-500 py-2 px-5  text-white font-bold uppercase rounded-lg hover:bg-violet-800"
                    onClick={() => setProximo(jugador, 1)}
                  >
                    Jugando
                  </button>
                  <button
                    type="button"
                    className="bg-cyan-500 py-2 px-5  text-white font-bold uppercase rounded-lg hover:bg-cyan-800"
                    onClick={() => setProximo(jugador, 2)}
                  >
                    Próximo
                  </button>
                  <button
                    type="button"
                    className="py-2 px-5 bg-red-600 hover:bg-red-700 uppercase font-bold text-center text-white rounded-lg"
                    onClick={handleEliminar}
                  >
                    Eliminar
                  </button>
                </div>
              )}
            </div>
          </SwipeableListItem>
        </SwipeableList>
      );
    }
  }
}

export default Jugador;
