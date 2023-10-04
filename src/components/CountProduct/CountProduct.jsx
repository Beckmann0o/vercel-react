import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CarritoContext } from '../context/CarritoContext';


const CountProduct = ({id}) => {
  const [cantidad, setCantidad] = useState(1);
  const [terminarCompra, setTerminarCompra] = useState(false);
  const navigate = useNavigate();
  const { agregarProducto } = useContext(CarritoContext);


  function incrementarContador() {
    setCantidad(cantidad + 1);
  }

  function decrementarContador() {
    setCantidad(cantidad - 1);
  }

  function cambioEstadoCompra() {
    setTerminarCompra(true);
  }

  function terminarCompraClick() {
    agregarProducto(id,cantidad);
    navigate('/cart');
  }

  return (
    <>
      {terminarCompra ? (
        <>
          <button onClick={terminarCompraClick}>Terminar compra</button>
        </>
      ) : (
        <>
          <button onClick={incrementarContador}>+</button>
          <p>{cantidad}</p>
          <button onClick={decrementarContador}>-</button>
          <button onClick={cambioEstadoCompra}>Terminar compra</button>
        </>
      )}
    </>
  );
};

export default CountProduct;


