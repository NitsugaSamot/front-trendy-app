// import axios from "axios";
// import axiosClient from "../../contextClient/config/axiosClient";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { initMercadoPago } from "@mercadopago/sdk-react";
import { NavLink } from "react-router-dom";
import useAuth from "../../contextClient/hooks/useAuth";
import imageCart from "../../assets/cart.png";
import imageCart2 from "../../assets/cart2.png";
import imageLogo from "../../assets/trendy-spot-logo.png";
import imageUser from '../../assets/user.png'
import "./nav.css";
import {
  getAllClothes,
  searchName,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
} from "../../redux/actions";

const Nav = () => {
  const { auth } = useAuth();

  const { closeSession } = useAuth();

  initMercadoPago("APP_USR-d7ee1f6e-0196-45be-81ed-388bfebc9319");
  const location = useLocation();
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [admin, setAdmin] = useState("")

  // Obtener el estado del carrito desde el store usando useSelector
  const cart = useSelector((state) => state.cart);
  // Estado local para controlar la visibilidad del carrito y el precio total
  const [cartVisible, setCartVisible] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);

  // Calcular el precio total del carrito cada vez que cambie
  useEffect(() => {
    let total = 0;
    cart.forEach((item) => {
      total += item.price * item.quantity;
    });
    setTotalPrice(total);
  }, [cart]);

  const orderData = {
    quantity: 1,
    name: "Compra en TrendySpot",
    price: totalPrice,
  };

    const savePurchases = {
    items: cart.map(item => ({
      id: item.id,
      title: item.name,
      price: item.price,
      description: item.description,
      quantity: item.quantity,
    })),
    total: totalPrice,
  };

    const handleBuyAndConfirm = async () => {
    event.preventDefault();
  
    try {
      savePurchases.items.forEach(async (item) => {
        const { id, title, price, quantity, description } = item;
        // Realizar la acción de confirmar la compra para cada producto
        await axios.post(`https://back-trendy-app.up.railway.app/users/${auth.id}/purchases`, {
          id,
          name: title,
          price,
          quantity,
          description,
          rating: false
        });
      });
  
      // Realizar la acción de crear la preferencia de MercadoPago
      const response = await axios.post("https://back-trendy-app.up.railway.app/mercadopago/order", orderData);
      const link = response.data.response.body.init_point;
      window.location.href = link;
  
      // Vaciar el carrito
      handleEmptyCart();
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleIncrement = (itemId, size, color) => {
    dispatch(increaseQuantity(itemId, size, color));
  };

  const handleDecrement = (itemId, size, color) => {
    dispatch(decreaseQuantity(itemId, size, color));
  };

  // Manejar el envío del formulario de búsqueda
  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(searchName(search));
    setSearch("");
  };

  // Manejar la entrada de texto en el campo de búsqueda
  const handleInputName = (event) => {
    setSearch(event.target.value);
  };

  // Vaciar el carrito, eliminando todos los elementos
  const handleEmptyCart = () => {
    cart.forEach((item) => {
      dispatch(removeFromCart(item.id, item.color, item.size));
    });
  };

  const searchAdmin = async () => {
    const { id } = auth;
    const { data } = await axios.get(`https://back-trendy-app.up.railway.app/users/${id}`);
    setAdmin(data);
    console.log(data)
  };
  if (admin.id !== auth.id && admin === "") {
    searchAdmin();
    console.log(admin)
  }

  return (
    <div className="containerNav">
      {/* Logo del enlace de inicio */}

      {auth.token ? (
        <NavLink to="/logged_in">
          <img src={imageLogo} alt="logo-home" className="logoHome" />
        </NavLink>
      ) : (
        <NavLink to="/">
          <img src={imageLogo} alt="logo-home" className="logoHome" />
        </NavLink>
      )}
      {admin.type == 1 && (
        <NavLink to="/dashboard">
          <button style={{ width: '5rem', height: '2rem' }} className="btnSearch">Admin</button>
        </NavLink>
      )}

      {/* Formulario de búsqueda */}
      {!location.pathname.startsWith("/detail") && !location.pathname.startsWith("/create") && (
        <form onSubmit={handleSubmit}>
          <input
            className="search"
            type="text"
            placeholder="Search your clothes"
            value={search}
            onChange={handleInputName}
          />
          <button className="btnSearch" type="submit">
            Search
          </button>
        </form>
      )}

      {/* Contenedor del icono del carrito */}
      <div className="cart-icon-container">
        <div className="cart-icon" onClick={() => setCartVisible(!cartVisible)}>
          {/* Icono del carrito */}
          {cart.length > 0 ? (
            <img src={imageCart2} alt="Carrito" className="icon-image" />
          ) : (
            <img src={imageCart} alt="Carrito" className="icon-image" />
          )}

          {/* Mostrar cantidad de elementos en el carrito */}
          {cart.length > 0 && (
            <div className="bak-cart-count">
              <span className="cart-count">{cart.length}</span>
            </div>
          )}
        </div>
        {/* Mostrar el contenido del carrito si está visible */}
        {cartVisible && (
          <div className="cart-popup">
            <div className="cart-items">
              {/* Mostrar los elementos en el carrito */}
              {cart.map((item) => (

                <div key={item.id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '4px' }}>
                  <div style={{ backgroundColor: 'rgb(47, 203, 255)', color: 'white', padding: '3px', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
                    <h6 style={{ fontWeight: 'bold' }}>{item.name}</h6>
                    <div>
                      <h7 style={{ margin: '5px', fontWeight: 'bold' }}>Talle: {item.size.toUpperCase()}</h7>
                      <h7 style={{ margin: '5px', fontWeight: 'bold' }}>/ Color: {item.color[0].toUpperCase() + item.color.slice(1)}</h7>
                    </div>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <div style={{ padding: '3px', marginLeft: '50px' }}>
                      <button
                        className="quantity-button"
                        onClick={() =>
                          handleDecrement(item.id, item.size, item.color)
                        }
                      > - </button>
                      <button
                        className="quantity-button"
                        onClick={() =>
                          handleIncrement(item.id, item.size, item.color)
                        }
                      >
                        +
                      </button>
                      <p>Cantidad: {item.quantity}</p>
                    </div>

                    <div style={{ padding: '3px', marginLeft: '50px', marginRight: '50px' }}>
                      <p style={{ margin: '1px', fontWeight: 'bold', color: 'Green' }}>Precio: ${item.price * item.quantity}</p>
                      {/* Botón para eliminar un elemento del carrito */}
                      <button
                        className="remove-button"
                        onClick={() =>
                          dispatch(removeFromCart(item.id, item.color, item.size))
                        }
                      >
                        🗑
                      </button>
                    </div>
                  </div>

                </div>
              ))}
            </div>
            {/* Mostrar el precio total del carrito */}
            <div style={{ fontWeight: 'bold', color: 'Green' }}>Total: ${totalPrice}</div>
            {/* Botón para vaciar el carrito */}

            <div className="maxDiv">


              {auth.token ? (
                <>
                  <button style={{ backgroundColor: 'red' }} className="buy" onClick={handleEmptyCart}>
                    Empty Cart
                  </button>
                  <button className="buy" onClick={handleBuyAndConfirm}>
                    Buy
                  </button>
                </>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                  <div style={{ display: "flex", justifyContent: 'center', alignItems: 'center', width: '15rem' }}>
                    <button className="empty-cart-button" onClick={handleEmptyCart}>
                      Empty Cart
                    </button>
                    <button className="empty-cart-button" disabled>
                      Buy
                    </button>
                  </div>
                  <div>
                    <p style={{ marginTop: '0.5rem', color: 'red' }}>
                      Debes estar logeado para concretar la compra
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {auth.token ? (
        <>
          <NavLink to="/logged_in/edit-profile">
            <img  style={{ width: "2rem" }} src={imageUser} alt="logo-home" width={"45px"}/>
          </NavLink>

          <NavLink to="/">
            <button className="btnSearch" onClick={closeSession}>
              Log Out
            </button>
          </NavLink>
        </>
      ) : (
        <NavLink to="/login">
          <button className="btnSearch">Sing Up</button>
        </NavLink>
      )}
    </div>
  );
};
export default Nav;
