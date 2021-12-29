import React from "react";
import swal from "sweetalert";
import firebase from "../../firebase";
function Participante({
  usuarioAutenticado,
  edit,
  jugador,
  setJugador,
  eliminarParticipante,
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
        eliminarParticipante(jugador.id);
        swal("Poof! ese jugador ha sido eliminado!", {
          icon: "success",
        });
      }
    });
  };
  return (
    <div
      className={
        "mt-5   bg-white shadow-md rounded-lg py-10 px-5 w-3/5 mx-auto"
      }
    >
      <p className="font-bold mb-3 text-gray-700 uppercase">
        Nombre: {""}{" "}
        <span className="font-normal">
          {jugador.name} {jugador.apellido}
        </span>
      </p>
      <p className="font-bold mb-3 text-gray-700 uppercase">
        E-mail: {""}
        <span className="font-normal">{jugador.email}</span>
      </p>
      <p className="font-bold mb-3 text-gray-700 uppercase">
        Dni: {""}
        <span className="font-normal">{jugador.dni}</span>
      </p>
      {jugador.proximo && <p>Próximo</p>}
      {jugador.jugando && <p>Jugando</p>}
      {edit && usuarioAutenticado && (
        <div className="flex justify-end mt-10">
          <button
            type="button"
            className="bg-black py-2 px-5 mr-2 text-white font-bold uppercase rounded-lg hover:bg-gray-800"
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
      )}
    </div>
  );
}

export default Participante;
