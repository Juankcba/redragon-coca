import React, { useState, useEffect } from "react";
import firebase from "../../firebase";
import swal from "sweetalert";
const ConfigurarSorteo = ({ disponible, setDisponible, juegos, setJuegos }) => {
  const [loading, setLoading] = useState(false);
  const handleChange = async () => {
    console.log("cambiando");
    setLoading(true);
    try {
      await firebase.db
        .collection("registro")
        .doc("disponible")
        .update({ state: !disponible })
        .then(() => {
          swal("¡Cambio el estado!  ", {
            icon: "success",
          });
          setDisponible(!disponible);
          setLoading(false);
        });
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  const handleChangeGame = async (juego) => {
    console.log("cambiando", juego);

    try {
      await firebase.db
        .collection("juegos")
        .doc(juego.id)
        .update({ ...juego, available: !juego.available })
        .then(() => {
          const juegosActualizados = juegos.map((juegoState) =>
            juegoState.id === juego.id
              ? {
                  name: juego.name,
                  id: juego.id,
                  available: !juego.available,
                }
              : juegoState
          );

          setJuegos(juegosActualizados);
          swal("¡Cambio el estado!  ", {
            icon: "success",
          });
        });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <section className="mt-10 w-full flex flex-col lg:flex-row">
      <div className="bg-white shadow-md rounded-lg mb-10 py-10 px-10 mx-10 lg:w-2/12 ">
        <h2 className=" text-2xl">
          Estado:{" "}
          <span
            className={
              disponible ? "text-green-500 font-bold" : "text-red-500 font-bold"
            }
          >
            {disponible ? "Disponible" : "Cerrado"}
          </span>
        </h2>

        <button
          className="text-white  mt-10 flex justify-center gap-2 uppercase font-bold bg-red-600 w-full p-3 hover:bg-red-900 cursor-pointer rounded-lg transition-color"
          type="button"
          onClick={() => handleChange()}
        >
          Cambiar a {disponible ? "No Disponible" : "Disponible "}
          {loading && (
            <div className=" flex justify-center items-center">
              <div className="animate-spin rounded-full h-7 w-7 border-b-4 border-white"></div>
            </div>
          )}
        </button>
      </div>
      <div className="bg-white shadow-md rounded-lg mb-10 py-10 px-10 mx-10 lg:w-2/12 ">
        <h1 className="text-center mb-10 text-2xl ">Juegos Cargados</h1>
        {juegos.map((juego) => (
          <div className="flex justify-between mb-2" key={juego.id}>
            <h3 className="py-1">{juego.name}</h3>
            <button
              onClick={() => handleChangeGame(juego)}
              className={
                juego.available
                  ? "bg-green-500 px-6 rounded-lg text-white "
                  : "rounded-lg bg-red-500 px-5 text-white"
              }
              type="button"
            >
              {juego.available ? "ON" : "OFF"}
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ConfigurarSorteo;
