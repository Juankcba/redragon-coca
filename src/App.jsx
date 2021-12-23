import React, { useState, useEffect } from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import IniciarSesion from "./layout/IniciarSesion";
import NuevoJugador from "./pages/NuevoJugador";
import Layout from "./layout/Layout";
import firebase from "../firebase";
import ListadoJugadores from "./components/ListadoJugadores";
function App() {
  const [jugadores, setJugadores] = useState([]);
  const [jugador, setJugador] = useState({});

  const eliminarJugador = async (id) => {
    try {
      // const url = import.meta.env.VITE_API_URL + `/jugadores/${id}`;
      // const respuesta = await fetch(url, {
      //   method: "DELETE",
      // });
      // await respuesta.json();
      // console.log("res delete", respuesta);
      await firebase.db
        .collection("jugadores")
        .doc(id)
        .delete()
        .then(() => {
          const jugadoresActualizados = jugadores.filter(
            (juagadorState) => juagadorState.id !== id
          );
          setJugadores(jugadoresActualizados);
        });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const getProductsApi = async () => {
      let array = [];

      const result = await firebase.db
        .collection("jugadores")
        .get()
        .then(function (querySnapshot) {
          querySnapshot.forEach(function (doc) {
            array.push({
              ...doc.data(),
              id: doc.id,
            });
          });
          setJugadores(array);
        })
        .catch(function (error) {
          console.log("Error getting documents: ", error);
          return null;
        });

      return array;
    };
    // const obtenerLocal = async () => {
    //   const url = import.meta.env.VITE_API_URL + "/jugadores";
    //   const respuesta = await fetch(url);
    //   const jugadoresLocal = (await respuesta.json()) ?? [];

    //   setJugadores(jugadoresLocal);
    // };
    getProductsApi();
  }, []);

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
