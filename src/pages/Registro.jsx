import React, { useState, useEffect } from "react";
import FormularioSorteo from "../components/FormularioSorteo";
import ListadoParticipante from "../components/ListadoParticipantes";
function Registro({
  setParticipantes,
  setParticipante,
  participantes,
  participante,
  usuarioAutenticado,
  eliminarParticipante,
}) {
  const [prize, setPrize] = useState("");

  const handleSubmit = async (e) => {
    setPrize("");
  };
  return (
    <div className="container-fluid contenido-principal pt-10 mb-14">
      <h1 className="mb-5 text-center text-white font-bold">
        ¡Participa por increíbles premios!
      </h1>
      <div className="container flex justify-between mt-10 lg:px-10 mx-auto ">
        <div className="w-1/2 mt-20">
          <form
            onSubmit={handleSubmit}
            className="bg-white shadow-md rounded-lg mb-10 py-10 px-5 mx-10"
          >
            <label htmlFor="prize" className="block text-gray-700 uppercase">
              Vamos a Sortear el siguiente Premio
            </label>
            <select
              id="prize"
              className="border-2 w-full p-2 mt-2 rounded-md"
              type="text"
              placeholder="Seleccion el Premio "
              value={prize}
              onChange={(e) => setPrize(e.target.value)}
            >
              <option value="" disabled>
                Selecciona una opcion
              </option>
              <option value="Lol">Lol</option>
              <option value="Counter">Counter</option>
              <option value="Fornite">Fornite</option>
              <option value="Minecraft">Minecraft</option>
            </select>
            <input
              type="submit"
              value="SORTEAR"
              className="mt-10 text-white uppercase font-bold bg-red-600 w-full p-3 hover:bg-red-900 cursor-pointer rounded-lg transition-color"
            />
          </form>
        </div>
        <div className="mb-10 py-10 px-5 w-1/2 mx-10 ">
          <ListadoParticipante
            participantes={participantes}
            setParticipantes={setParticipantes}
            setParticipante={setParticipante}
            usuarioAutenticado={usuarioAutenticado}
            eliminarParticipante={eliminarParticipante}
            edit={false}
          />
        </div>
      </div>
    </div>
  );
}

export default Registro;
