import React, { useState, useEffect } from "react";
import firebase from "../../firebase";
function FormularioSorteo({ setJugadores, jugadores, jugador, setJugador }) {
  const [name, setName] = useState("");
  const [apellido, setApellido] = useState("");
  const [email, setEmail] = useState("");
  const [dni, setDni] = useState("");

  const [error, setError] = useState(false);

  useEffect(() => {
    if (Object.keys(jugador).length > 0) {
      setName(jugador.name);
      setEmail(jugador.email);
      setDni(jugador.dni);
      setApellido(jugador.apellido);
    }
  }, [jugador]);

  const generarID = () => {
    const random = Math.random().toString(36).substr(2);
    const fecha = Date.now().toString(36);
    return random + fecha;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    //validacion
    if ([name, email, dni].includes("")) {
      console.log("hay al menos un campo vacio");
      setError(true);
      return;
    }
    setError(false);
    if (jugador.id) {
      try {
        // const url = import.meta.env.VITE_API_URL + `/jugadores/${jugador.id}`;
        // const respuesta = await fetch(url, {
        //   method: "PUT",
        //   body: JSON.stringify({
        //     name: name,
        //     email: email,
        //     game: game,
        //     create: new Date(),
        //   }),
        //   headers: {
        //     "Content-Type": "application/json",
        //   },
        // });
        // const resultado = await respuesta.json();
        await firebase.db
          .collection("participantes")
          .doc(jugador.id)
          .update({
            name: name,
            email: email,
            dni: dni,
            apellido: apellido,
            create: new Date(),
            id: jugador.id,
          })
          .then(() => {
            const jugadoresAcutalizados = jugadores.map((jugadorState) =>
              jugadorState.id === jugador.id
                ? {
                    name: name,
                    apellido: apellido,
                    email: email,
                    dni: dni,
                    id: jugador.id,
                  }
                : jugadorState
            );
            setJugadores(jugadoresAcutalizados);
            setJugador({});
          });
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        // const url = import.meta.env.VITE_API_URL + "/jugadores";
        // const respuesta = await fetch(url, {
        //   method: "POST",
        //   body: JSON.stringify({
        //     name: name,
        //     email: email,
        //     game: game,
        //     create: new Date(),
        //     id: generarID(),
        //   }),
        //   headers: {
        //     "Content-Type": "application/json",
        //   },
        // });
        // const resultado = await respuesta.json();
        let id = generarID();
        await firebase.db
          .collection("participantes")
          .doc(id)
          .set({
            name: name,
            apellido: apellido,
            email: email,
            dni: dni,
            create: new Date(),
            id: id,
          })
          .then(() => {
            setJugadores([
              ...jugadores,
              {
                name: name,
                apellido: apellido,
                email: email,
                dni: dni,
                create: new Date(),
                id: id,
              },
            ]);
          });
      } catch (error) {
        console.log(error);
      }
    }

    setName("");
    setApellido("");
    setDni("");
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
          <label htmlFor="lastname" className="block text-gray-700 uppercase">
            Apellido del jugador
          </label>
          <input
            id="lastname"
            className="border-2 w-full p-2 mt-2 rounded-md"
            type="text"
            value={apellido}
            placeholder="Apellido del Jugador"
            onChange={(e) => setApellido(e.target.value)}
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
          <label htmlFor="dni" className="block text-gray-700 uppercase">
            DNI
          </label>
          <input
            id="dni"
            className="border-2 w-full p-2 mt-2 rounded-md"
            type="number"
            placeholder="Documento Nacional de Identidad"
            value={dni}
            onChange={(e) => setDni(e.target.value)}
          />
        </div>

        <input
          type="submit"
          value={jugador.id ? "Guardar Registro " : "Registrate"}
          className="text-white uppercase font-bold bg-red-600 w-full p-3 hover:bg-red-900 cursor-pointer rounded-lg transition-color"
        />
      </form>
    </div>
  );
}

export default FormularioSorteo;
