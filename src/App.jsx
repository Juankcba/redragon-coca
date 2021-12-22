import React, { useState, useEffect } from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import IniciarSesion from "./layout/IniciarSesion";
import NuevoJugador from "./pages/NuevoJugador";
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
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<IniciarSesion />}></Route>
        <Route
          path="/nuevojugador"
          element={
            <NuevoJugador
              jugadores={jugadores}
              jugador={jugador}
              setJugadores={setJugadores}
              setJugador={setJugador}
              eliminarJugador={eliminarJugador}
            />
          }
        ></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
