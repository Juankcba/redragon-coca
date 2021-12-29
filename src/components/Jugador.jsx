import React from "react";
import swal from "sweetalert";
import firebase from "../../firebase";
function Jugador({
  usuarioAutenticado,
  edit,
  jugador,
  setJugador,
  eliminarJugador,
  setJugadores,
  jugadores,
}) {
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
  const setProximo = async (jugador, state) => {
    try {
      await firebase.db
        .collection("jugadores")
        .doc(jugador.id)
        .update(jugador)
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
                  create: jugador.create,
                }
              : jugadorState
          );
          setJugadores(jugadoresAcutalizados);
        });
    } catch (error) {
      console.log(error);
    }
  };
  if (edit) {
    return (
      <div className="mt-5   bg-white shadow-md rounded-lg py-10 px-5 w-full">
        <p className="font-bold mb-3 text-gray-700 uppercase">
          Nombre: {""} <span className="font-normal">{jugador.name}</span>
        </p>
        <p className="font-bold mb-3 text-gray-700 uppercase">
          Juego: {""}
          <span className="font-normal">{jugador.game}</span>
        </p>
        {jugador.proximo && <p>Próximo</p>}
        {jugador.jugando && <p>Jugando</p>}
        {edit && usuarioAutenticado && (
          <div className="flex justify-between flex-col lg:flex-row gap-1 mt-10">
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
    );
  } else {
    if (jugador.ocultar) {
      return <div></div>;
    } else {
      return (
        <div className="mt-5   bg-white shadow-md rounded-lg py-10 px-5 w-full">
          <p className="font-bold mb-3 text-gray-700 uppercase">
            Nombre: {""} <span className="font-normal">{jugador.name}</span>
          </p>
          <p className="font-bold mb-3 text-gray-700 uppercase">
            Juego: {""}
            <span className="font-normal">{jugador.game}</span>
          </p>
          {jugador.proximo && <p>Próximo</p>}
          {jugador.jugando && <p>Jugando</p>}
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
      );
    }
  }
}

export default Jugador;
