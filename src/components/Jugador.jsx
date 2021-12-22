import React from "react";
import swal from "sweetalert";

function Jugador({ jugador, setJugador, eliminarJugador }) {
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
  return (
    <div className="mt-5   bg-white shadow-md rounded-lg py-10 px-5 w-full">
      <p className="font-bold mb-3 text-gray-700 uppercase">
        Nombre: {""} <span className="font-normal">{jugador.name}</span>
      </p>
      <p className="font-bold mb-3 text-gray-700 uppercase">
        Juego: {""}
        <span className="font-normal">{jugador.game}</span>
      </p>
      <div className="flex justify-between mt-10">
        <button
          type="button"
          className="bg-black py-2 px-10  text-white font-bold uppercase rounded-lg hover:bg-gray-800"
          onClick={() => setJugador(jugador)}
        >
          Editar
        </button>
        <button
          type="button"
          className="py-2 px-10 bg-red-600 hover:bg-red-700 uppercase font-bold text-center text-white rounded-lg"
          onClick={handleEliminar}
        >
          Eliminar
        </button>
      </div>
    </div>
  );
}

export default Jugador;
