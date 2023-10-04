import React from 'react';
import { BsFillCartFill } from "react-icons/bs";
import { useContext } from 'react';
import { CarritoContext } from '../context/CarritoContext';
import { Link } from 'react-router-dom';

function CartWidget() {
  const { cantidadTotal } = useContext(CarritoContext);
  return (
    <>
      <Link to="/cart" className="cart-link">
        <BsFillCartFill />
      </Link>

      {
        cantidadTotal > 0 && <p>{cantidadTotal}</p>
      }
    </>
  );
}

export default CartWidget;
