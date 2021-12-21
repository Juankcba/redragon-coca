import React from 'react';

function Jugador(props) {
    return (
        <div className="mt-5 flex justify-between bg-white shadow-md rounded-lg py-10 px-5 ">
        <p className="font-bold mb-3 text-gray-700 uppercase">Nombre: {""}</p>
        <span>Hook</span>
        <p className="font-bold mb-3 text-gray-700 uppercase">Juego: {""}</p>
        <span>Hook</span>
      </div>
    );
}

export default Jugador;