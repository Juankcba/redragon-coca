import React, { useState, useEffect } from "react";
import logo from "./logo.svg";

import Header from "./components/Header";
import Formulario from "./components/Formulario";
import ListadoJugadores from "./components/ListadoJugadores";
import Footer from "./components/Footer";
function App() {
  const [jugadores, setJugadores] = useState([]);
  const [jugador, setJugador] = useState({});

  const eliminarJugador = (id) => {
    const jugadoresActualizados = jugadores.filter(
      (juagadorState) => juagadorState.id !== id
    );

    setJugadores(jugadoresActualizados);
  };
  useEffect(() => {
    const obtenerLocal = () => {
      const jugadoresLocal =
        JSON.parse(localStorage.getItem("jugadores")) ?? [];
      setJugadores(jugadoresLocal);
    };
    obtenerLocal();
  }, []);
  useEffect(() => {
    localStorage.setItem("jugadores", JSON.stringify(jugadores));
  }, [jugadores]);
  return (
    <div className="container-fluid mx-auto">
      <Header />
      <div className="container mx-auto mt-12  md:flex ">
        <Formulario
          jugadores={jugadores}
          jugador={jugador}
          setJugadores={setJugadores}
          setJugador={setJugador}
        />
        <ListadoJugadores
          jugadores={jugadores}
          setJugador={setJugador}
          eliminarJugador={eliminarJugador}
        />
      </div>
      <Footer />
    </div>
  );
}

export default App;
