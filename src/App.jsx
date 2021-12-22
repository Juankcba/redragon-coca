import React, { useState, useEffect } from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import IniciarSesion from "./layout/IniciarSesion";
import NuevoJugador from "./pages/NuevoJugador";
import Layout from "./layout/Layout";
import ListadoJugadores from "./components/ListadoJugadores";
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
        <Route path="/jugadores" element={<Layout />}>
          <Route
            index
            element={
              <ListadoJugadores
                jugadores={jugadores}
                setJugador={setJugador}
                eliminarJugador={eliminarJugador}
                edit={false}
              />
            }
          />
          <Route
            path="nuevo"
            element={
              <NuevoJugador
                jugadores={jugadores}
                jugador={jugador}
                setJugadores={setJugadores}
                setJugador={setJugador}
                eliminarJugador={eliminarJugador}
              />
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
