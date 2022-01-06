import React, { useState, useEffect } from "react";
import firebase from "../../firebase";
import swal from "sweetalert";

function Formulario({
  setJugadores,
  jugadores,
  jugador,
  setJugador,
  juegos,
  disponible,
  setRegistro,
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [game, setGame] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (Object.keys(jugador).length > 0) {
      setName(jugador.name);
      setEmail(jugador.email);
      setGame(jugador.game);
    }
  }, [jugador]);

  const generarID = () => {
    const random = Math.random().toString(36).substr(2);
    const fecha = Date.now().toString(36);
    return random + fecha;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    //validacion
    if ([name, email, game].includes("")) {
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
          .collection("jugadores")
          .doc(jugador.id)
          .update({
            name: name,
            email: email,
            game: game,
            create: new Date(),
            ocultar: false,
            jugando: false,
            proximo: false,
            falto: false,
            disponible: disponible,
            id: jugador.id,
          })
          .then(() => {
            const jugadoresAcutalizados = jugadores.map((jugadorState) =>
              jugadorState.id === jugador.id
                ? {
                    name: name,
                    email: email,
                    game: game,
                    id: jugador.id,
                    ocultar: false,
                    jugando: false,
                    proximo: false,

                    falto: false,
                    disponible: disponible,
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
        let id = generarID();
        await firebase.db
          .collection("jugadores")
          .doc(id)
          .set({
            name: name,
            email: email,
            game: game,
            ocultar: false,
            jugando: false,
            proximo: false,
            falto: false,
            disponible: disponible,
            create: new Date(),
            id: id,
          })
          .then(async () => {
            setJugadores([
              ...jugadores,
              {
                name: name,
                email: email,
                game: game,
                ocultar: false,
                jugando: false,
                proximo: false,
                falto: false,
                disponible: disponible,
                create: new Date(),
                id: id,
              },
            ]);
            swal("¡ Ya estas registrado, Mucha Suerte !  ", {
              icon: "success",
            });
          });

        await firebase.db
          .collection("mail")
          .add({
            to: email,
            message: {
              subject: "¡Bienvenido a #GAMERZONE de COCA-COLA y REDRAGON!",
              text: disponible
                ? `Ya estas registrado para jugar ${game}. Toda la Suerte!`
                : `En este momento no está disponible el registro, pero participas por increíbles premios`,
              html: `<code>
              <div >
              <h1>Hola ${name},</h1>
              </br>
              ${
                disponible
                  ? `<h2>Ya estas registrado para jugar ${game}. Toda la Suerte!</h2>`
                  : `<h2>En este momento no está disponible el registro, pero participas por increíbles premios</h2>`
              }
              </br>
              <img src="https://firebasestorage.googleapis.com/v0/b/redragon-ff0b0.appspot.com/o/Recurso%206.png?alt=media&token=6e4ee9d8-e1ca-4264-81f2-4befdd308a5d" alt="img-" />
              </div>
              </code> `,
            },
          })
          .then(() => console.log("Queued email for delivery!"));
      } catch (error) {
        console.log(error);
      }
    }

    setName("");
    setGame("");
    setEmail("");
    setLoading(false);
    setRegistro(true);
  };
  return (
    <div className="md:w-3/5 xl:w-3/5 w-full">
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
            {juegos.map((juego) => (
              <option key={juego.id} value={juego.name}>
                {juego.name}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="text-white flex justify-center gap-2 uppercase font-bold bg-red-600 w-full p-3 hover:bg-red-900 cursor-pointer rounded-lg transition-color"
        >
          {jugador.id ? "Guardar Registro " : "Registrate"}
          {loading && (
            <div className=" flex justify-center items-center">
              <div className="animate-spin rounded-full h-7 w-7 border-b-4 border-white"></div>
            </div>
          )}
        </button>
      </form>
    </div>
  );
}

export default Formulario;
