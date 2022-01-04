import React, { useState, useEffect } from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import IniciarSesion from "./layout/IniciarSesion";
import NuevoJugador from "./pages/NuevoJugador";
import Layout from "./layout/Layout";
import firebase from "../firebase";
import ListadoJugadores from "./components/ListadoJugadores";
import Registro from "./pages/Registro";
import NuevoParticipante from "./pages/NuevoParticipante";
import Jugadores from "./pages/Jugadores";
import RegistroJugadores from "./pages/RegistroJugadores";
import RegistroGanadores from "./pages/RegistroGanadores";
function App() {
  const [participantes, setParticipantes] = useState([]);
  const [participante, setParticipante] = useState({});
  const [jugadores, setJugadores] = useState([]);
  const [jugador, setJugador] = useState({});
  const [usuarioAutenticado, guardarUsuarioAutenticado] = useState(null);
  useEffect(() => {
    const checkUser = async () => {
      await firebase.auth.onAuthStateChanged((user) => {
        if (user) {
          guardarUsuarioAutenticado(user);
          console.log(user);
        }
      });
    };
    checkUser();
  }, []);
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
  const eliminarParticipante = async (id) => {
    try {
      // const url = import.meta.env.VITE_API_URL + `/jugadores/${id}`;
      // const respuesta = await fetch(url, {
      //   method: "DELETE",
      // });
      // await respuesta.json();
      console.log("res delete", id);
      await firebase.db
        .collection("participantes")
        .doc(id)
        .delete()
        .then(() => {
          const participantesActualizados = participantes.filter(
            (juagadorState) => juagadorState.id !== id
          );
          setParticipantes(participantesActualizados);
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

  useEffect(() => {
    const getProductsApi = async () => {
      let array = [];

      const result = await firebase.db
        .collection("participantes")
        .get()
        .then(function (querySnapshot) {
          querySnapshot.forEach(function (doc) {
            array.push({
              ...doc.data(),
              id: doc.id,
            });
          });
          setParticipantes(array);
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
    <Layout>
      <RegistroJugadores
        jugadores={jugadores}
        jugador={jugador}
        setJugadores={setJugadores}
        setJugador={setJugador}
        eliminarJugador={eliminarJugador}
        edit={false}
      />
    </Layout>
  );
}

export default App;
