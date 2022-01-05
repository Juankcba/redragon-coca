import React, { useState, useEffect } from "react";
import FormularioSorteo from "../components/FormularioSorteo";
import ListadoParticipante from "../components/ListadoParticipantes";
import AppleLottery from "react-lottery";
import "react-lottery/dist/index.css";
import botella from "../../assets/img/botella.svg";
import botella2 from "../../assets/img/botella-2.svg";
import gamerzone from "../../assets/img/gamerzone.svg";
let lotteryTimes = 5;

function Registro({
  setParticipantes,
  setParticipante,
  participantes,
  participante,
  usuarioAutenticado,
  eliminarParticipante,
}) {
  const [ganador, setGanador] = useState("");
  const [participants, setParticipants] = useState([]);
  const [prize, setPrize] = useState("Redragon HA300 Scepter Pro");
  const [sorteando, setSorteando] = useState(false);
  const [prizes, setPrizes] = useState([
    {
      id: 1,
      name: "Redragon HA300 Scepter Pro",
      cantidad: 4,
      url: "https://res.cloudinary.com/dghlpdczf/image/upload/v1640810872/redragon/HA300_PNGHQ_2_qd8kfm.png",
    },
    {
      id: 2,
      name: "Redragon M607 Griffin",
      cantidad: 2,
      url: "https://res.cloudinary.com/dghlpdczf/image/upload/v1640810874/redragon/M607_PNGHQ_1_lge8it.png",
    },
    {
      id: 3,
      name: "Redragon M719 Invader RGB",
      cantidad: 6,
      url: "https://res.cloudinary.com/dghlpdczf/image/upload/v1640810873/redragon/M719_PNGHQ_1_ezpl6f.png",
    },
    {
      id: 4,
      name: "Redragon M908 Impact",
      cantidad: 6,
      url: "https://res.cloudinary.com/dghlpdczf/image/upload/v1640810873/redragon/M908_PNGHQ_1_t78t2m.png",
    },
    {
      id: 5,
      name: "Redragon K503 Harpe PRO",
      cantidad: 5,
      url: "https://res.cloudinary.com/dghlpdczf/image/upload/v1640810873/redragon/K503A_HQ_1_owfr6h.png",
    },
    {
      id: 6,
      name: "Redragon M711 Cobra FPS",
      cantidad: 3,
      url: "https://res.cloudinary.com/dghlpdczf/image/upload/v1640810873/redragon/M711FPS_esij6y.png",
    },
  ]);

  const handleSubmit = (e) => {
    console.log("sorteando");
    setImageToItem();
    setSorteando(true);
  };

  function findPrize() {
    return prizes.find((prizeState) => prizeState.name == prize) || {};
  }

  function setImageToItem() {
    let imgUrl =
      prizes.find((prizeState) => prizeState.name == prize).url || "";
    let array = [];

    participantes.map((participante) =>
      array.push({ ...participante, img: imgUrl })
    );
    setParticipants(array);
  }
  function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }
  function getRow() {
    console.log(participants.length / 2);
    return Math.ceil(participants.length / 4) + 1;
  }
  return (
    <main>
      <h1 className="mt-10 mb-5 text-center text-white font-bold lg:text-5xl ">
        ¡Participa por increíbles premios!
      </h1>
      <div className="flex">
        <div className="container lg:flex lg:justify-between mt-10 lg:px-10 mx-auto ">
          <img
            src={botella}
            alt="botella-coca-cola"
            className="image-botella-left"
          />
          <div className="lg:w-full  mt-10">
            {sorteando ? (
              ganador != "" ? (
                <div className="border-4 p-10">
                  <h3 className="text-white text-center  text-5xl">
                    ¡Felicitaciones!
                  </h3>
                  <h2 className="text-white text-center uppercase mt-10 text-5xl">
                    {ganador.name} {ganador.apellido}
                  </h2>
                  <h3 className="text-white text-center uppercase mt-10 text-5xl">
                    DNI: {ganador.dni}
                  </h3>
                  <h4 className="text-white text-center uppercase mt-10 text-3xl">
                    Ganaste un
                  </h4>
                  <div className="flex justify-center mt-10">
                    <img src={findPrize().url} width="100" height="50" />
                  </div>
                  <p className="text-white text-center uppercase">
                    {findPrize().name}
                  </p>
                  <button
                    onClick={() => {
                      setGanador(""), setSorteando(false);
                    }}
                    className="mt-10 bg-white px-10 h-10 mx-auto w-2/3 rounded-lg"
                  >
                    Volver
                  </button>
                </div>
              ) : (
                <>
                  <AppleLottery
                    list={participants}
                    rowCount={getRow()}
                    style={{
                      width: "60vw",
                      height: "600px",
                    }}
                    itemStyle={(item, index, isActive) => {
                      return {
                        background: "#fff",
                      };
                    }}
                    itemImage={findPrize().url}
                    itemImageStyle={{
                      height: "100px",
                      width: "auto",
                      objectFit: "contain",
                      objectPosition: "center",
                    }}
                    btnIamge={gamerzone}
                    btnStyle={{
                      width: "auto",
                      objectFit: "contain",
                      objectPosition: "center",
                      height: "100%",
                    }}
                    validate={(next) => {
                      if (lotteryTimes <= 0) {
                        alert("No more lottery times! Now give you 5 times.");
                        lotteryTimes = 5;
                      } else {
                        lotteryTimes -= 1;
                        setTimeout(() => next(true), 50);
                      }
                    }}
                    onLotteryStart={(complete, state) => {
                      setTimeout(
                        () => complete(getRandomInt(participants.length)),
                        50
                      );
                    }}
                    onLotteryComplete={(index, item) => {
                      setGanador(item);
                    }}
                  />
                </>
              )
            ) : (
              <form
                onSubmit={handleSubmit}
                className="bg-white shadow-md rounded-lg mb-10 py-10 px-5 mx-10 w-2/3 mx-auto"
              >
                <label
                  htmlFor="prize"
                  className="block text-gray-700 uppercase text-center mb-10"
                >
                  Vamos a Sortear el siguiente Premio - {participantes.length}
                </label>
                <div className="flex justify-center gap-20">
                  <select
                    id="prize"
                    className="border-2 w-1/2 p-2 mt-2 rounded-md"
                    type="text"
                    placeholder="Seleccion el Premio "
                    value={prize.name}
                    onChange={(e) => setPrize(e.target.value)}
                  >
                    {prizes.map((prize) => (
                      <option key={prize.id} value={prize.name}>
                        {prize.name}
                      </option>
                    ))}
                  </select>
                  <img src={findPrize().url} width="100" height="50" />
                </div>
                <button
                  type="submit"
                  disabled={participantes.length > 0 ? false : true}
                  className="mt-10 text-white uppercase font-bold bg-red-600 w-full p-3 hover:bg-red-900 cursor-pointer rounded-lg transition-color"
                >
                  SORTEAR
                </button>
              </form>
            )}
          </div>
          <img
            src={botella2}
            alt="botella-coca-cola"
            className="image-botella-right"
          />
        </div>
      </div>
    </main>
  );
}

export default Registro;
