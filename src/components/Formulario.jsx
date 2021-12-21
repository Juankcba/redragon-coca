import React, { useState, useEffect } from "react";

function Formulario({ setJugadores, jugadores }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [game, setGame] = useState("");

  const [error, setError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(name, email, game);
    //validacion
    if ([name, email, game].includes("")) {
      console.log("hay al menos un campo vacio");
      setError(true);
      return;
    }
    setError(false);
    setJugadores([...jugadores, { name: name, email: email, game: game }]);
    setName("");
    setGame("");
    setEmail("");
  };
  return (
    <div className="md:w-1/2 lg:w-2/5">
      <h2 className="mb-5 text-center text-white font-bold">
        BATALLA DEL VERANO{" "}
      </h2>
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg mb-10 py-10 px-5 mx-10"
      >
        {error && (
          <div className="text-center text-white bg-red-800 p-3 uppercase font-bold mb-3 rounded-md">
            <p>Todos los campos son obligatorios</p>
          </div>
        )}
        <div className="mb-5">
          <label htmlFor="name" className="block text-gray-700 uppercase">
            Nombre del jugador
          </label>
          <input
            id="name"
            className="border-2 w-full p-2 mt-2 rounded-md"
            type="text"
            value={name}
            placeholder="Nombre del Jugador"
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="mb-5">
          <label htmlFor="email" className="block text-gray-700 uppercase">
            Correo electrónico
          </label>
          <input
            id="email"
            className="border-2 w-full p-2 mt-2 rounded-md"
            type="text"
            placeholder="Dirección de email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-5">
          <label htmlFor="game" className="block text-gray-700 uppercase">
            Juego
          </label>
          <select
            id="name"
            className="border-2 w-full p-2 mt-2 rounded-md"
            type="text"
            placeholder="Nombre del Juego"
            value={game}
            onChange={(e) => setGame(e.target.value)}
          >
            <option value="" disabled>
              Selecciona una opcion
            </option>
            <option value="Lol">Lol</option>
            <option value="Counter">Counter</option>
            <option value="Fornite">Fornite</option>
            <option value="Minecraft">Minecraft</option>
          </select>
        </div>
        <input
          type="submit"
          value="Registrate"
          className="text-white uppercase font-bold bg-red-600 w-full p-3 hover:bg-red-900 cursor-pointer transition-color"
        />
      </form>
    </div>
  );
}

export default Formulario;
