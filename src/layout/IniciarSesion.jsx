import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import firebase from "../../firebase";
import { Link } from "react-router-dom";
import swal from "sweetalert";
function IniciarSesion({ usuarioAutenticado, guardarUsuarioAutenticado }) {
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await firebase.login(user, password);
      await firebase.auth.onAuthStateChanged((user) => {
        if (user) {
          console.log("autenticado", user);
          guardarUsuarioAutenticado(user);
          setUser("");
          setPassword("");
          setError(null);
          swal({ title: "Ingreso Correcto", icon: "success" });
        }
      });
      return "ok";
    } catch (error) {
      console.log("Hubo un error al iniciar la sesion", error.message);
      setError(error.message);
      return error.message;
    }
  };
  return (
    <div className="container-fluid mx-auto">
      <Header />
      {visible && (
        <div className=" z-10 absolute top-0 left-0 w-full h-screen   ">
          <div className="bg-slate-500 opacity-50 w-full h-screen  relative z-0 top-0 left-0"></div>
          <div className="bg-white w-2/3 md:w-3/12 h-screen p-5 opacity-100 absolute top-0 left-0 z-10 mx-auto">
            <div className="flex justify-between">
              <h2 className="text-center font-bold text-lg ">Menu </h2>
              <button onClick={() => setVisible(!visible)}>Cerrar</button>
            </div>
            <nav className="flex flex-col" onClick={() => setVisible(false)}>
              <Link to="/registro">Sorteo</Link>
              <Link to="/jugadores">Jugadores</Link>
              {usuarioAutenticado && (
                <>
                  <Link to="/jugadores/nuevo">Agregar Jugadores</Link>
                  <Link to="/registro/nuevo">Agregar Participante</Link>
                </>
              )}
            </nav>
          </div>
        </div>
      )}

      <div>
        {!usuarioAutenticado ? (
          <div className=" container mx-auto mt-12  md:flex contenido-principal  flex justify-center">
            <form
              onSubmit={handleSubmit}
              className="bg-white shadow-md rounded-lg mb-10 py-2 px-3 mx-2  lg:py-10 lg:px-10 w-full md:w-5/12  lg:mx-10"
            >
              <div className="mb-5">
                <label htmlFor="user" className="block text-gray-700 uppercase">
                  Usuario
                </label>
                <input
                  id="user"
                  type="text"
                  value={user}
                  placeholder="Usuario"
                  className="border-2 w-full p-2 mt-2 rounded-md"
                  onChange={(e) => setUser(e.target.value)}
                />
              </div>
              <div className="mb-5">
                <label
                  htmlFor="password"
                  className="block text-gray-700 uppercase"
                >
                  Contraseña
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  placeholder="Contraseña"
                  className="border-2 w-full p-2 mt-2 rounded-md"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <input
                type="submit"
                value="Ingresar"
                className="text-white uppercase font-bold bg-red-600 w-full p-3 hover:bg-red-900 cursor-pointer rounded-lg transition-color"
              />
              <button
                type="button"
                className="text-white font-bold uppercase bg-gray-700 hover:bg-gray-800 rounded-lg p-3 w-full  mt-5"
                onClick={() => setVisible(!visible)}
              >
                Menu
              </button>
              {error && (
                <p className="mt-2 bg-red-500 p-2 text-center uppercase text-white">
                  Hubo un error
                </p>
              )}
            </form>
          </div>
        ) : (
          <div className="container contenido-principal  mt-20">
            <h1 className="text-center text-white font-bold">
              Bienvenido {usuarioAutenticado.email}
            </h1>
            <div className="flex justify-center mt-10 mx-auto">
              <div className="bg-white shadow-md rounded-lg mb-10 py-2 px-3 mx-2">
                <Link to="/registro/nuevo">Sorteos</Link>
              </div>
              <div className="bg-white shadow-md rounded-lg mb-10 py-2 px-3 mx-2">
                <Link to="/jugadores">Jugadores</Link>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default IniciarSesion;
