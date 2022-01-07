import React, { useState, useEffect } from "react";
import {
  format,
  formatDistanceToNowStrict,
  formatDistance,
  formatRelative,
  subDays,
} from "date-fns";
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
import ConfigurarSorteo from "./pages/ConfigurarSorteo";
function App() {
  const [refresh, setRefresh] = useState(true);
  const [participantes, setParticipantes] = useState([]);
  const [participante, setParticipante] = useState({});
  const [jugadores, setJugadores] = useState([]);
  const [jugador, setJugador] = useState({});
  const [disponible, setDisponible] = useState(false);
  const [juegos, setJuegos] = useState([]);
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
      console.log("refrescando");
      let array = [];

      const result = await firebase.db
        .collection("jugadores")
        .get()
        .then(function (querySnapshot) {
          querySnapshot.forEach(function (doc) {
            let day = toDateTime(doc.data().create.seconds);

            let actual = new Date();

            if (
              day.getDay() == actual.getDay() &&
              day.getMonth() == actual.getMonth()
            ) {
              array.push({
                ...doc.data(),
                id: doc.id,
              });
            }
          });
          setJugadores(array);
          setRefresh(false);
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
    if (refresh) {
      getProductsApi();
    }
  }, [refresh]);

  useEffect(() => {
    const getProductsApi = async () => {
      let array = [];

      const result = await firebase.db
        .collection("participantes")
        .get()
        .then(function (querySnapshot) {
          querySnapshot.forEach(function (doc) {
            let day = toDateTime(doc.data().create.seconds);

            let actual = new Date();

            if (
              day.getDay() == actual.getDay() &&
              day.getMonth() == actual.getMonth()
            ) {
              array.push({
                ...doc.data(),
                id: doc.id,
              });
            }
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
  useEffect(() => {
    const getProductsApi = async () => {
      let array = [];

      const result = await firebase.db
        .collection("juegos")
        .get()
        .then(function (querySnapshot) {
          querySnapshot.forEach(function (doc) {
            array.push({
              ...doc.data(),
              id: doc.id,
            });
          });
          setJuegos(array);
        })
        .catch(function (error) {
          console.log("Error getting documents: ", error);
          return null;
        });

      return array;
    };

    getProductsApi();
  }, []);
  useEffect(() => {
    const getProductsApi = async () => {
      const result = await firebase.db
        .collection("registro")
        .doc("disponible")
        .get()
        .then(function (querySnapshot) {
          setDisponible(querySnapshot.data().state);
        })
        .catch(function (error) {
          console.log("Error getting documents: ", error);
          return null;
        });
    };

    getProductsApi();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <IniciarSesion
              usuarioAutenticado={usuarioAutenticado}
              guardarUsuarioAutenticado={guardarUsuarioAutenticado}
            />
          }
        ></Route>
        <Route
          path="/registro-jugadores"
          element={<Layout usuarioAutenticado={usuarioAutenticado} />}
        >
          <Route
            index
            element={
              <RegistroJugadores
                disponible={disponible}
                juegos={juegos}
                jugadores={jugadores}
                jugador={jugador}
                setJugadores={setJugadores}
                setJugador={setJugador}
                eliminarJugador={eliminarJugador}
                edit={false}
              />
            }
          />
        </Route>
        <Route
          path="/registro-ganadores"
          element={<Layout usuarioAutenticado={usuarioAutenticado} />}
        >
          <Route
            index
            element={
              <RegistroGanadores
                setParticipantes={setParticipantes}
                setParticipante={setParticipante}
                participantes={participantes}
                participante={participante}
                usuarioAutenticado={usuarioAutenticado}
                eliminarParticipante={eliminarParticipante}
              />
            }
          />
        </Route>
        <Route
          path="/jugadores"
          element={<Layout usuarioAutenticado={usuarioAutenticado} />}
        >
          <Route
            index
            element={
              <Jugadores
                setRefresh={setRefresh}
                disponible={disponible}
                juegos={juegos}
                jugadores={jugadores}
                setJugador={setJugador}
                eliminarJugador={eliminarJugador}
                setJugadores={setJugadores}
                edit={false}
              />
            }
          />
          <Route
            path="nuevo"
            element={
              <NuevoJugador
                disponible={disponible}
                juegos={juegos}
                usuarioAutenticado={usuarioAutenticado}
                jugadores={jugadores}
                jugador={jugador}
                setJugadores={setJugadores}
                setJugador={setJugador}
                eliminarJugador={eliminarJugador}
              />
            }
          />
        </Route>
        <Route
          path="/registro"
          element={<Layout usuarioAutenticado={usuarioAutenticado} />}
        >
          <Route
            index
            element={
              <Registro
                setParticipantes={setParticipantes}
                setParticipante={setParticipante}
                participantes={participantes}
                participante={participante}
                usuarioAutenticado={usuarioAutenticado}
              />
            }
          />
          <Route
            path="nuevo"
            element={
              <NuevoParticipante
                setParticipantes={setParticipantes}
                setParticipante={setParticipante}
                participantes={participantes}
                participante={participante}
                usuarioAutenticado={usuarioAutenticado}
                eliminarParticipante={eliminarParticipante}
              />
            }
          />
          <Route />
        </Route>
        <Route
          path="/configuracion"
          element={<Layout usuarioAutenticado={usuarioAutenticado} />}
        >
          <Route
            index
            element={
              <ConfigurarSorteo
                jugadores={jugadores}
                setJugador={setJugador}
                eliminarJugador={eliminarJugador}
                setJugadores={setJugadores}
                juegos={juegos}
                setJuegos={setJuegos}
                disponible={disponible}
                setDisponible={setDisponible}
                edit={false}
              />
            }
          />
          <Route
            path="nuevo"
            element={
              <NuevoJugador
                disponible={disponible}
                juegos={juegos}
                usuarioAutenticado={usuarioAutenticado}
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

export function toDateTime(secs) {
  var t = new Date(1970, 0, 1); // Epoch
  t.setSeconds(secs);
  return t;
}

export default App;
