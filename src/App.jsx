import React, { useState } from "react";
import logo from "./logo.svg";

import Header from "./components/Header";
import Formulario from "./components/Formulario";
import ListadoJugadores from "./components/ListadoJugadores";

function App() {
  const [jugadores, setJugadores] = useState([]);

  return (
    <div className="container-fluid mx-auto">
      <Header />
      <div className="container mx-auto mt-12  md:flex ">
        <Formulario jugadores={jugadores} setJugadores={setJugadores} />
        <ListadoJugadores jugadores={jugadores} />
      </div>
    </div>
  );
}

export default App;
