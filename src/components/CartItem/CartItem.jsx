import { useContext } from 'react';
import { CarritoContext } from '../context/CarritoContext';
import React from 'react';
import "./CartItem.css"

const CartItem = ({ nombre, cantidad, precio, idEliminado }) => {
  const { eliminarProducto } = useContext(CarritoContext);
  return (
    <div className="cart-item">
      <h1>{nombre}</h1>
      <p>Cantidad: {cantidad}</p>
      <p>Precio: $ {precio}</p>
      <button onClick={() => eliminarProducto(idEliminado)}>Eliminar</button>
    </div>
  );
};

export default CartItem;
