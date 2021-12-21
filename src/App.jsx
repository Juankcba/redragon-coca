import { useState } from "react";
import logo from "./logo.svg";

import Header from "./components/Header";
import Formulario from "./components/Formulario";
import ListadoJugadores from "./components/ListadoJugadores";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="container-fluid mx-auto">
      <Header />
      <div className="container mx-auto mt-12  md:flex ">
        <Formulario />
        <ListadoJugadores />
      </div>
    </div>
  );
}

export default App;
