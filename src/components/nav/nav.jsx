import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllClothes, searchName, removeFromCart, increaseQuantity, decreaseQuantity } from "../../redux/actions";
import { NavLink } from "react-router-dom";

import { initMercadoPago } from '@mercadopago/sdk-react';
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import axiosClient from "../../config/axiosClient";

import { useParams } from "react-router-dom";

import imageCart from "../../assets/cart.png"
import imageLogo from '../../assets/trendy-spot-logo.png'
import './nav.css'

const Nav = () => {

  const { auth } = useAuth();

  const {closeSession} = useAuth()

  const { id } = useParams()

  initMercadoPago("APP_USR-d7ee1f6e-0196-45be-81ed-388bfebc9319");
  const location = useLocation();
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

// Obtener el estado del carrito desde el store usando useSelector
  const cart = useSelector((state) => state.cart);
  console.log(cart)

  // Estado local para controlar la visibilidad del carrito y el precio total
  const [cartVisible, setCartVisible] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);

  // Calcular el precio total del carrito cada vez que cambie
  useEffect(() => {
    let total = 0;
    cart.forEach(item => {
      total += item.price * item.quantity;
    });
    setTotalPrice(total);
  }, [cart]);

  // const orderData = {
  //   items: cart.map(item => ({
  //     id: item.id,
  //     title: item.name,
  //     description: item.description,
  //     unit_price: item.price,
  //     quantity: item.quantity,
  //   })),

const orderData = {
  quantity: 1,
  name: "Compra en TrendySpot",
  price: totalPrice
}

const savePurchases = {
  items: cart.map(item => ({
    id: item.id,
    nombre: item.name,
    precio: item.price,
    descripción: item.description,
    cantidad: item.quantity,
  })),
  total: totalPrice,
};

const handleBuy = () => {
  const createPreference = async () => {
    try {
      const response = await axios.post("http://localhost:3004/mercadopago/order", orderData);
      const link = response.data.response.body.init_point;
      window.location.href = link;
      handleEmptyCart()
      console.log(savePurchases);
      await axiosClient.post(`/users/${id}/purchases`,savePurchases)
    } catch (error) {
      console.log(error.message);
    }
  };

  // Llamar a la función para crear la preferencia al hacer clic en el botón "Buy"
  createPreference();
};

const handleIncrement = (itemId) => {
  dispatch(increaseQuantity(itemId));
};

const handleDecrement = (itemId) => {
  dispatch(decreaseQuantity(itemId));
};


// Manejar la acción de refrescar la lista de prendas
const handleRefresh = () => {
  dispatch(getAllClothes());
  window.scrollTo(0, 500);
}

// Manejar el envío del formulario de búsqueda
const handleSubmit = (event) => {
  event.preventDefault();
  dispatch(searchName(search));
  navigate("/")
  setSearch("");
};

// Manejar la entrada de texto en el campo de búsqueda
const handleInputName = (event) => {
  setSearch(event.target.value);
};

// Vaciar el carrito, eliminando todos los elementos
const handleEmptyCart = () => {
  cart.forEach(item => {
    dispatch(removeFromCart(item.id));
  });
};


return (
  <div className="containerNav">
    {/* Logo del enlace de inicio */}

        
           {auth.token ? ( 

            <NavLink to="/logged_in/profile">
            <img src={imageLogo} alt="logo-home" className="logoHome" />
            </NavLink>
           ) : ( 

            <NavLink to="/">
            <img src={imageLogo} alt="logo-home" className="logoHome" />
          </NavLink>

           )} 

    {/* Formulario de búsqueda */}
    {!location.pathname.startsWith('/detail') && (
      <form onSubmit={handleSubmit}>
        <input
          className="search"
          type="text"
          placeholder="Search your clothes"
          value={search}
          onChange={handleInputName}
        />
        <button className="btnSearch" type="submit">Search</button>
      </form>
    )}

    {/* Botón de refrescar en la página principal */}
    {location.pathname === '/' && (
      <button className='btnRefresh' onClick={handleRefresh}>Refresh</button>
    )}

    {/* Enlace para crear una nueva prenda */}
    <NavLink to="/create">
      <button className='btnSearch'>create</button>
    </NavLink>

    {/* Contenedor del icono del carrito */}
<div className="cart-icon-container">
      <div className="cart-icon" onClick={() => setCartVisible(!cartVisible)}>
        {/* Icono del carrito */}
        <img src={imageCart} alt="Carrito" className="icon-image" />
        {/* Mostrar cantidad de elementos en el carrito */}
        {cart.length > 0 && <div className="bak-cart-count"><span className="cart-count">{cart.length}</span></div>}
      </div>
      {/* Mostrar el contenido del carrito si está visible */}
      {cartVisible && (
        <div className="cart-popup">
          <div className="cart-items">
            {/* Mostrar los elementos en el carrito */}
            {cart.map(item => (
              <div key={item.id} className="cart-item">
                <p>{item.name}</p>
                  <button className="quantity-button" onClick={() => handleDecrement(item.id)}>-</button>
                <p>Cantidad: {item.quantity}</p>
                  <button className="quantity-button" onClick={() => handleIncrement(item.id)}>+</button>
                <div>
                </div>
                <p>Precio: ${item.price * item.quantity}</p>
                {/* Botón para eliminar un elemento del carrito */}
                <button
                  className="remove-button"
                  onClick={() => dispatch(removeFromCart(item.id))}
                >
                  X
                </button>
              </div>
            ))}
          </div>
          {/* Mostrar el precio total del carrito */}
          <div className="cart-total">
            Total: ${totalPrice}
          </div>
          {/* Botón para vaciar el carrito */}
         

          <div className="maxDiv">
              <button className="empty-cart-button" onClick={handleEmptyCart}>
                Empty Cart
              </button>

              
               {auth.token ? ( 
                <button className="buy" onClick={handleBuy}>
                  Buy
                </button>
               ) : ( 
                <>
                <button className="empty-cart-button buyDisabled" disabled>
                  Buy
                </button>
                <p className="alert">Ten en cuenta que debes estar logeado para poder concretar la compra</p>
                </>
               )} 
          </div>
        </div>
      )}
    </div>

    {auth.token ? (

        <NavLink  to="/">
        <button 
            className='btnSearch'
            onClick={closeSession} 
          >Log Out</button>
        </NavLink>
       ) : (
        <NavLink to="/login">
        <button className='btnSearch'>Sing Up</button>
        </NavLink>

    )}
   </div>
);
}
export default Nav;