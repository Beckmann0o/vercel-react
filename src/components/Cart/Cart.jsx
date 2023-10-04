import { CarritoContext } from "../context/CarritoContext";
import { Link } from "react-router-dom";
import { useContext } from "react";
import CartItem from "../CartItem/CartItem";
import React from 'react';
import "./Cart.css"

export const Cart = () => {
  const { carrito, vaciarCarrito, total, cantidadTotal } = useContext(CarritoContext);
  return (
    <div className="cart-container">
      {carrito.map(product => (
        <CartItem
          key={product.item.id}
          nombre={product.item.nombre}
          precio={product.item.precio}
          cantidad={product.cantidad}
          idEliminado={product.item.id}
        />
      ))}

      <div className="cart-summary">
        <div className="cart-summary-box">
          <h3>Total: ${total}</h3>
          <h3>Cantidad total: {cantidadTotal}</h3>
        </div>
        <button onClick={() => vaciarCarrito()} className="empty-cart-button">Vaciar carrito</button>
      </div>

      <div className="cart-links">
        <Link to='/' className="continue-shopping-link">Seguir Comprando</Link>
        <Link to='/checkout' className="checkout-link">Finalizar Compra</Link>
      </div>
    </div>
  );
}

export default Cart;
