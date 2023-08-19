import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllClothes, searchName, removeFromCart, increaseQuantity, decreaseQuantity } from "../../redux/actions";
import { NavLink } from "react-router-dom";

import { initMercadoPago } from '@mercadopago/sdk-react';
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import useAuth from "../../hooks/useAuth";

import imageCart from "../../assets/cart.png"
import imageLogo from '../../assets/trendy-spot-logo.png'
import './nav.css'

const Nav = () => {

  const { auth } = useAuth();

  const {closeSession} = useAuth()

  initMercadoPago("APP_USR-d7ee1f6e-0196-45be-81ed-388bfebc9319");
  const location = useLocation();
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

// Obtener el estado del carrito desde el store usando useSelector
  const cart = useSelector((state) => state.cart);

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

const handleBuy = () => {
  const createPreference = async () => {
    try {
      const response = await axios.post("http://localhost:3004/mercadopago/order", orderData);
      const link = response.data.response.body.init_point;
      window.location.href = link;
      handleEmptyCart()
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



     {/* <NavLink to="/">
      <img src={imageLogo} alt="logo-home" className="logoHome" />
    </NavLink>  */}

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

          {/* Botón para comprar */}
          {/* <button className="empty-cart-button" onClick={handleBuy}>
            Buy
          </button> */}
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




// const Nav = () => {

//   const { auth } = useAuth();

//   const {closeSession} = useAuth()

//   initMercadoPago("APP_USR-d7ee1f6e-0196-45be-81ed-388bfebc9319");


// import imageCart from "../../assets/cart.png";
// import imageLogo from '../../assets/trendy-spot-logo.png';




// const Nav = () => {

//   const { auth } = useAuth();

//   const {closeSession} = useAuth()


//   initMercadoPago("APP_USR-d7ee1f6e-0196-45be-81ed-388bfebc9319");


//   const location = useLocation();
//   const [search, setSearch] = useState("");
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   // CARRITO //
//   const cart = useSelector((state) => state.cart);
//   const [cartVisible, setCartVisible] = useState(false);
//   const [totalPrice, setTotalPrice] = useState(0);
//   // Calcular el precio total del carrito cada vez que cambie //
//   useEffect(() => {
//     let total = 0;
//     cart.forEach(item => {
//       total += item.price * item.quantity;
//     });
//     setTotalPrice(total);
//   }, [cart]);
  
//   const orderData = {
//     quantity: 1,
//     name: "Compra en TrendySpot",
//     price: totalPrice
//   }
  
//   const handleBuy = () => {
//     const createPreference = async () => {
//       try {
//         const response = await axios.post("http://localhost:3004/mercadopago/order", orderData);
//         const link = response.data.response.body.init_point;
//         window.location.href = link;
//         handleEmptyCart()
//       } catch (error) {
//         console.log(error.message);
//       }
//     };
  
//     // Llamar a la función para crear la preferencia al hacer clic en el botón "Buy"
//     createPreference();
//   };

//   const handleIncrement = (itemId) => {
//     dispatch(increaseQuantity(itemId));
//   };
  
//   const handleDecrement = (itemId) => {
//     dispatch(decreaseQuantity(itemId));
//   };

//   const handleEmptyCart = () => {
//     cart.forEach(item => {
//       dispatch(removeFromCart(item.id));
//     });
//   };

// // Obtener el estado del carrito desde el store usando useSelector
//   // const cart = useSelector((state) => state.cart);

//   const handleRefresh = () => {
//     dispatch(getAllClothes());
//     window.scrollTo(0, 400);
//   }


//   // Estado local para controlar la visibilidad del carrito y el precio total


//   // Calcular el precio total del carrito cada vez que cambie
//   useEffect(() => {
//     let total = 0;
//     cart.forEach(item => {
//       total += item.price * item.quantity;
//     });
//     setTotalPrice(total);
//   }, [cart]);

//   // const orderData = {
//   //   items: cart.map(item => ({
//   //     id: item.id,
//   //     title: item.name,
//   //     description: item.description,
//   //     unit_price: item.price,
//   //     quantity: item.quantity,
//   //   })),

// // const orderData = {
// //   quantity: 1,
// //   name: "Compra en TrendySpot",
// //   price: totalPrice
// // }

// // const handleBuy = () => {
// //   const createPreference = async () => {
// //     try {
// //       const response = await axios.post("http://localhost:3004/mercadopago/order", orderData);
// //       const link = response.data.response.body.init_point;
// //       window.location.href = link;
// //       handleEmptyCart()
// //     } catch (error) {
// //       console.log(error.message);
// //     }
// //   };


//   // Llamar a la función para crear la preferencia al hacer clic en el botón "Buy"
//   createPreference();

//   const handleInputName = (event) => {
//     setSearch(event.target.value);
//   };

//   return (
//     <div className="containerNav">
//       <NavLink to="/">
//         <img src={imageLogo} alt="logo-home" className="logoHome" />
//       </NavLink>
      
//       <div>
//       <input
//        className="search"
//         type="text"
//         placeholder="Search your clothes"
//         value={search}
//         onChange={handleInputName}
//         onSubmit={handleSubmit}
//       />
//       <button className="btnSearch" type="submit">Search</button>
//       </div>
      
      
//       {location.pathname === '/'  && <button className='btnRefresh' onClick={handleRefresh}>Refresh</button>}
//       <NavLink  to="/create">
//         <button className='btnSearch'>Create</button>
//       </NavLink>

//       <NavLink  to="/login/register">
//         <button className='btnSearch'>Sign up</button>
//       </NavLink>
      
//       {/* Contenedor del icono del carrito */}
//     <div className="cart-icon-container">
      
//       <div className="cartDiv">
//       <div className="cart-icon" onClick={() => setCartVisible(!cartVisible)}>
//         {/* Icono del carrito */}
//         <img src={imageCart} alt="Carrito" className="icon-image" />
//         {/* Mostrar cantidad de elementos en el carrito */}
//         <div className="bak-cart-count">
//           <span className="cart-count">{cart.length}</span>
//           </div>
//       </div>
//       </div>
//       {/* Mostrar el contenido del carrito si está visible */}
//       {cartVisible && (
//         <div className="cart-popup">
//           <div className="cart-items">
//             {/* Mostrar los elementos en el carrito */}
//             {cart.map(item => (
//               <div key={item.id} className="cart-item">
//                 <p>{item.name}</p>
//                   <button className="quantity-button" onClick={() => handleDecrement(item.id)}>-</button>
//                 <p>Cantidad: {item.quantity}</p>
//                   <button className="quantity-button" onClick={() => handleIncrement(item.id)}>+</button>
//                 <div>
//                 </div>
//                 <p>Precio: ${item.price * item.quantity}</p>
//                 {/* Botón para eliminar un elemento del carrito */}
//                 <button
//                   className="remove-button"
//                   onClick={() => dispatch(removeFromCart(item.id))}
//                 >
//                   X
//                 </button>
//               </div>
//             ))}
//           </div>
//           {/* Mostrar el precio total del carrito */}
//           <div className="cart-total">
//             Total: ${totalPrice}
//           </div>
//           {/* Botón para vaciar el carrito */}
//           <div className="maxDiv">
//           <button className="empty-cart-button" onClick={handleEmptyCart}>
//             Empty Cart
//           </button>
//           {/* Botón para comprar */}
//           <button className="empty-cart-button" onClick={handleBuy}>
//             Buy
//           </button>
//           </div>
//         </div>
//       )}
      
//       </div>
//     </div>
//   );

// };

// const handleIncrement = (itemId) => {
//   dispatch(increaseQuantity(itemId));
// };

// const handleDecrement = (itemId) => {
//   dispatch(decreaseQuantity(itemId));
// };


// // Manejar la acción de refrescar la lista de prendas
// const handleRefresh = () => {
//   dispatch(getAllClothes());
//   window.scrollTo(0, 500);
// }

// // Manejar el envío del formulario de búsqueda
// const handleSubmit = (event) => {
//   event.preventDefault();
//   dispatch(searchName(search));
//   navigate("/")
//   setSearch("");
// };

// // Manejar la entrada de texto en el campo de búsqueda
// const handleInputName = (event) => {
//   setSearch(event.target.value);
// };

// // Vaciar el carrito, eliminando todos los elementos
// const handleEmptyCart = () => {
//   cart.forEach(item => {
//     dispatch(removeFromCart(item.id));
//   });
// };


// return (
//   <div className="containerNav">
//     {/* Logo del enlace de inicio */}
//     <NavLink to="/">
//       <img src={imageLogo} alt="logo-home" className="logoHome" />
//     </NavLink>

//     {/* Formulario de búsqueda */}
//     {!location.pathname.startsWith('/detail') && (
//       <form onSubmit={handleSubmit}>
//         <input
//           className="search"
//           type="text"
//           placeholder="Search your clothes"
//           value={search}
//           onChange={handleInputName}
//         />
//         <button className="btnSearch" type="submit">Search</button>
//       </form>
//     )}

//     {/* Botón de refrescar en la página principal */}
//     {location.pathname === '/' && (
//       <button className='btnRefresh' onClick={handleRefresh}>Refresh</button>
//     )}

//     {/* Enlace para crear una nueva prenda */}
//     <NavLink to="/create">
//       <button className='btnSearch'>create</button>
//     </NavLink>

//     {/* Contenedor del icono del carrito */}
// <div className="cart-icon-container">
//       <div className="cart-icon" onClick={() => setCartVisible(!cartVisible)}>
//         {/* Icono del carrito */}
//         <img src={imageCart} alt="Carrito" className="icon-image" />
//         {/* Mostrar cantidad de elementos en el carrito */}
//         {cart.length > 0 && <div className="bak-cart-count"><span className="cart-count">{cart.length}</span></div>}
//       </div>
//       {/* Mostrar el contenido del carrito si está visible */}
//       {cartVisible && (
//         <div className="cart-popup">
//           <div className="cart-items">
//             {/* Mostrar los elementos en el carrito */}
//             {cart.map(item => (
//               <div key={item.id} className="cart-item">
//                 <p>{item.name}</p>
//                   <button className="quantity-button" onClick={() => handleDecrement(item.id)}>-</button>
//                 <p>Cantidad: {item.quantity}</p>
//                   <button className="quantity-button" onClick={() => handleIncrement(item.id)}>+</button>
//                 <div>
//                 </div>
//                 <p>Precio: ${item.price * item.quantity}</p>
//                 {/* Botón para eliminar un elemento del carrito */}
//                 <button
//                   className="remove-button"
//                   onClick={() => dispatch(removeFromCart(item.id))}
//                 >
//                   X
//                 </button>
//               </div>
//             ))}
//           </div>
//           {/* Mostrar el precio total del carrito */}
//           <div className="cart-total">
//             Total: ${totalPrice}
//           </div>
//           {/* Botón para vaciar el carrito */}
//           <button className="empty-cart-button empty" onClick={handleEmptyCart}>
//             Empty Cart
//           </button>
//           {auth.token ? (
//             <button className="buy" onClick={handleBuy}>
//               Buy
//             </button>
//           ) : (
//             <>
//             <button className="empty-cart-button buyDisabled" disabled>
//               Buy
//             </button>
//             <p className="alert">Ten en cuenta que debes estar logeado para poder concretar la compra</p>
//             </>
//           )}
//           {/* Botón para comprar */}
//           {/* <button className="empty-cart-button" onClick={handleBuy}>
//             Buy
//           </button> */}
//         </div>
//       )}
//     </div>

//     {auth.token ? (

//         <NavLink  to="/">
//         <button 
//             className='btnSearch'
//             onClick={closeSession} 
//           >Log Out</button>
//         </NavLink>
//        ) : (
//         <NavLink to="/login">
//         <button className='btnSearch'>Sing Up</button>
//         </NavLink>

//     )}
//    </div>
// );
// }
// export default Nav;

// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { getAllClothes, searchName, removeFromCart, increaseQuantity, decreaseQuantity } from "../../redux/actions";
// import { NavLink } from "react-router-dom";
// import { initMercadoPago } from '@mercadopago/sdk-react';
// import { useLocation, useNavigate } from "react-router-dom";
// import axios from "axios";
// import useAuth from "../../hooks/useAuth";


// import imageCart from "../nav/cart.png"
// import imageLogo from './trendy-spot-logo.png'
// import './nav.css'

// const Nav = () => {

//   const { auth } = useAuth();

//   initMercadoPago("APP_USR-d7ee1f6e-0196-45be-81ed-388bfebc9319");
//   const location = useLocation();
//   const [search, setSearch] = useState("");
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const isCartDisabled = auth.token;

// // Obtener el estado del carrito desde el store usando useSelector
//   const cart = useSelector((state) => state.cart);

//   // Estado local para controlar la visibilidad del carrito y el precio total
//   const [cartVisible, setCartVisible] = useState(false);
//   const [totalPrice, setTotalPrice] = useState(0);

//   // Calcular el precio total del carrito cada vez que cambie
//   useEffect(() => {
//     let total = 0;
//     cart.forEach(item => {
//       total += item.price * item.quantity;
//     });
//     setTotalPrice(total);
//   }, [cart]);

//   // const orderData = {
//   //   items: cart.map(item => ({
//   //     id: item.id,
//   //     title: item.name,
//   //     description: item.description,
//   //     unit_price: item.price,
//   //     quantity: item.quantity,
//   //   })),

// const orderData = {
//   quantity: 1,
//   name: "Compra en TrendySpot",
//   price: totalPrice
// }

// const handleBuy = () => {
//   const createPreference = async () => {
//     try {
//       const response = await axios.post("http://localhost:3004/mercadopago/order", orderData);
//       const link = response.data.response.body.init_point;
//       window.location.href = link;
//       handleEmptyCart()
//     } catch (error) {
//       console.log(error.message);
//     }
//   };

//   // Llamar a la función para crear la preferencia al hacer clic en el botón "Buy"
//   createPreference();
// };

// const handleIncrement = (itemId) => {
//   dispatch(increaseQuantity(itemId));
// };

// const handleDecrement = (itemId) => {
//   dispatch(decreaseQuantity(itemId));
// };


// // Manejar la acción de refrescar la lista de prendas
// const handleRefresh = () => {
//   dispatch(getAllClothes());
//   window.scrollTo(0, 500);
// }

// // Manejar el envío del formulario de búsqueda
// const handleSubmit = (event) => {
//   event.preventDefault();
//   dispatch(searchName(search));
//   navigate("/")
//   setSearch("");
// };

// // Manejar la entrada de texto en el campo de búsqueda
// const handleInputName = (event) => {
//   setSearch(event.target.value);
// };

// // Vaciar el carrito, eliminando todos los elementos
// const handleEmptyCart = () => {
//   cart.forEach(item => {
//     dispatch(removeFromCart(item.id));
//   });
// };

// return (
//   <div className="containerNav">
//     {/* Logo del enlace de inicio */}
//     <NavLink to="/">
//       <img src={imageLogo} alt="logo-home" className="logoHome" />
//     </NavLink>

//     {/* Formulario de búsqueda */}
//     {!location.pathname.startsWith('/detail') && (
//       <form onSubmit={handleSubmit}>
//         <input
//           className="search"
//           type="text"
//           placeholder="Search your clothes"
//           value={search}
//           onChange={handleInputName}
//         />
//         <button className="btnSearch" type="submit">Search</button>
//       </form>
//     )}

//     {/* Botón de refrescar en la página principal */}
//     {location.pathname === '/' && (
//       <button className='btnRefresh' onClick={handleRefresh}>Refresh</button>
//     )}

//     {/* Enlace para crear una nueva prenda */}
//     <NavLink to="/create">
//       <button className='btnSearch'>create</button>
//     </NavLink>

//     {/* Contenedor del icono del carrito */}
//     {auth.token ? (
//       <div className="cart-icon-container">
//         <div className="cart-icon" onClick={() => setCartVisible(!cartVisible)}>
//           {/* Icono del carrito */}
//           <img src={imageCart} alt="Carrito" className="icon-image" />
//           {/* Mostrar cantidad de elementos en el carrito */}
//           {cart.length > 0 && <div className="bak-cart-count"><span className="cart-count">{cart.length}</span></div>}
//         </div>
//         {/* Mostrar el contenido del carrito si está visible */}
//         {cartVisible && (
//           <div className="cart-popup">
//             <div className="cart-items">
//               {/* Mostrar los elementos en el carrito */}
//               {cart.map(item => (
//                 <div key={item.id} className="cart-item">
//                   <p>{item.name}</p>
//                   <button className="quantity-button" onClick={() => handleDecrement(item.id)}>-</button>
//                   <p>Cantidad: {item.quantity}</p>
//                   <button className="quantity-button" onClick={() => handleIncrement(item.id)}>+</button>
//                   <div>
//                   </div>
//                   <p>Precio: ${item.price * item.quantity}</p>
//                   {/* Botón para eliminar un elemento del carrito */}
//                   <button
//                     className="remove-button"
//                     onClick={() => dispatch(removeFromCart(item.id))}
//                   >
//                     X
//                   </button>
//                 </div>
//               ))}
//             </div>
//             {/* Mostrar el precio total del carrito */}
//             <div className="cart-total">
//               Total: ${totalPrice}
//             </div>
//             {/* Botón para vaciar el carrito */}
//             <button className="empty-cart-button" onClick={handleEmptyCart}>
//               Empty Cart
//             </button>
//             {/* Botón para comprar */}
//             <button className="empty-cart-button" onClick={handleBuy}>
//               Buy
//             </button>
//           </div>
//         )}
//       </div>
//     ) : (
//       <div className="cart-icon-container disabled">
//         <div className="cart-icon" onClick={() => setCartVisible(!cartVisible)}>
//           {/* Icono del carrito */}
//           <img src={imageCart} alt="Carrito" className="icon-image" />
//           {/* Mostrar cantidad de elementos en el carrito */}
//           {cart.length > 0 && <div className="bak-cart-count"><span className="cart-count">{cart.length}</span></div>}
//         </div>
//         {/* Mostrar el contenido del carrito si está visible */}
//         {cartVisible && (
//           <div className="cart-popup">
//             <div className="cart-items">
//               {/* Mostrar los elementos en el carrito */}
//               {cart.map(item => (
//                 <div key={item.id} className="cart-item">
//                   <p>{item.name}</p>
//                   <button className="quantity-button" onClick={() => handleDecrement(item.id)}>-</button>
//                   <p>Cantidad: {item.quantity}</p>
//                   <button className="quantity-button" onClick={() => handleIncrement(item.id)}>+</button>
//                   <div>
//                   </div>
//                   <p>Precio: ${item.price * item.quantity}</p>
//                   {/* Botón para eliminar un elemento del carrito */}
//                   <button
//                     className="remove-button"
//                     onClick={() => dispatch(removeFromCart(item.id))}
//                   >
//                     X
//                   </button>
//                 </div>
//               ))}
//             </div>
//             {/* Mostrar el precio total del carrito */}
//             <div className="cart-total">
//               Total: ${totalPrice}
//             </div>
//             {/* Botón para vaciar el carrito */}
//             <button className="empty-cart-button" onClick={handleEmptyCart}>
//               Empty Cart
//             </button>
//             {/* Botón para comprar */}
//             <button className="empty-cart-button" onClick={handleBuy}>
//               Buy
//             </button>
//           </div>
//         )}
//         <NavLink to="/login">
//           <button className='btnSearch'>Sing Up</button>
//         </NavLink>
//       </div>
//     )}
//   </div>
// );
//               }


// export default Nav;

























































// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { getAllClothes, searchName, removeFromCart, increaseQuantity, decreaseQuantity } from "../../redux/actions";
// import { NavLink } from "react-router-dom";
// import { initMercadoPago } from '@mercadopago/sdk-react';
// import { useLocation, useNavigate } from "react-router-dom";
// import axios from "axios";

// import imageCart from "../nav/cart.png"
// import imageLogo from './trendy-spot-logo.png'
// import './nav.css'

// const Nav = () => {
//   initMercadoPago("APP_USR-d7ee1f6e-0196-45be-81ed-388bfebc9319");
//   const location = useLocation();
//   const [search, setSearch] = useState("");
//   const dispatch = useDispatch();
//   const navigate = useNavigate();


//   // Obtener el estado del carrito desde el store usando useSelector
//   const cart = useSelector((state) => state.cart);

//   // Estado local para controlar la visibilidad del carrito y el precio total
//   const [cartVisible, setCartVisible] = useState(false);
//   const [totalPrice, setTotalPrice] = useState(0);

//   // Calcular el precio total del carrito cada vez que cambie
//   useEffect(() => {
//     let total = 0;
//     cart.forEach(item => {
//       total += item.price * item.quantity;
//     });
//     setTotalPrice(total);
//   }, [cart]);

//   // const orderData = {
//   //   items: cart.map(item => ({
//   //     id: item.id,
//   //     title: item.name,
//   //     description: item.description,
//   //     unit_price: item.price,
//   //     quantity: item.quantity,
//   //   })),


// const orderData = {
//   quantity: 1,
//   name: "Compra en TrendySpot",
//   price: totalPrice
// }

// const handleBuy = () => {
//   const createPreference = async () => {
//     try {
//       const response = await axios.post("http://localhost:3004/mercadopago/order", orderData);
//       const link = response.data.response.body.init_point;
//       window.location.href = link;
//       handleEmptyCart()
//     } catch (error) {
//       console.log(error.message);
//     }
//   };

// <<<<<<< HEAD
//   const handleInputName = (event) => {
//     setSearch(event.target.value);
//   };

//   return (
//     <div className="containerNav">
//       <NavLink to="/">
//         <img src={imageLogo} alt="logo-home" className="logoHome" />
//       </NavLink>
      
//       {!location.pathname.startsWith('/detail') && <form onSubmit={handleSubmit}>
//       <input
//        className="search"
//         type="text"
//         placeholder="Search your clothes"
//         value={search}
//         onChange={handleInputName}
//       />
//       <button className="btnSearch" type="submit">Search</button>
//       </form>}

//       <NavLink  to="/create">
//         <button className='btnSearch'>create</button>
//       </NavLink>

//       <NavLink  to="/login/register">
//         <button className='btnSearch'>Registrate</button>
//       </NavLink>
//     </div>
//   );
// =======
//   // Llamar a la función para crear la preferencia al hacer clic en el botón "Buy"
//   createPreference();
// >>>>>>> rober
// };

// const handleIncrement = (itemId) => {
//   dispatch(increaseQuantity(itemId));
// };

// const handleDecrement = (itemId) => {
//   dispatch(decreaseQuantity(itemId));
// };


// // Manejar la acción de refrescar la lista de prendas
// const handleRefresh = () => {
//   dispatch(getAllClothes());
//   window.scrollTo(0, 500);
// }

// // Manejar el envío del formulario de búsqueda
// const handleSubmit = (event) => {
//   event.preventDefault();
//   dispatch(searchName(search));
//   navigate("/")
//   setSearch("");
// };

// // Manejar la entrada de texto en el campo de búsqueda
// const handleInputName = (event) => {
//   setSearch(event.target.value);
// };

// // Vaciar el carrito, eliminando todos los elementos
// const handleEmptyCart = () => {
//   cart.forEach(item => {
//     dispatch(removeFromCart(item.id));
//   });
// };


// return (
//   <div className="containerNav">
//     {/* Logo del enlace de inicio */}
//     <NavLink to="/">
//       <img src={imageLogo} alt="logo-home" className="logoHome" />
//     </NavLink>

//     {/* Formulario de búsqueda */}
//     {!location.pathname.startsWith('/detail') && (
//       <form onSubmit={handleSubmit}>
//         <input
//           className="search"
//           type="text"
//           placeholder="Search your clothes"
//           value={search}
//           onChange={handleInputName}
//         />
//         <button className="btnSearch" type="submit">Search</button>
//       </form>
//     )}

//     {/* Botón de refrescar en la página principal */}
//     {location.pathname === '/' && (
//       <button className='btnRefresh' onClick={handleRefresh}>Refresh</button>
//     )}

//     {/* Enlace para crear una nueva prenda */}
//     <NavLink to="/create">
//       <button className='btnSearch'>create</button>
//     </NavLink>

//     {/* Contenedor del icono del carrito */}
//     <div className="cart-icon-container">
//       <div className="cart-icon" onClick={() => setCartVisible(!cartVisible)}>
//         {/* Icono del carrito */}
//         <img src={imageCart} alt="Carrito" className="icon-image" />
//         {/* Mostrar cantidad de elementos en el carrito */}
//         {cart.length > 0 && <div className="bak-cart-count"><span className="cart-count">{cart.length}</span></div>}
//       </div>
//       {/* Mostrar el contenido del carrito si está visible */}
//       {cartVisible && (
//         <div className="cart-popup">
//           <div className="cart-items">
//             {/* Mostrar los elementos en el carrito */}
//             {cart.map(item => (
//               <div key={item.id} className="cart-item">
//                 <p>{item.name}</p>
//                   <button className="quantity-button" onClick={() => handleDecrement(item.id)}>-</button>
//                 <p>Cantidad: {item.quantity}</p>
//                   <button className="quantity-button" onClick={() => handleIncrement(item.id)}>+</button>
//                 <div>
//                 </div>
//                 <p>Precio: ${item.price * item.quantity}</p>
//                 {/* Botón para eliminar un elemento del carrito */}
//                 <button
//                   className="remove-button"
//                   onClick={() => dispatch(removeFromCart(item.id))}
//                 >
//                   X
//                 </button>
//               </div>
//             ))}
//           </div>
//           {/* Mostrar el precio total del carrito */}
//           <div className="cart-total">
//             Total: ${totalPrice}
//           </div>
//           {/* Botón para vaciar el carrito */}
//           <button className="empty-cart-button" onClick={handleEmptyCart}>
//             Empty Cart
//           </button>
//           {/* Botón para comprar */}
//           <button className="empty-cart-button" onClick={handleBuy}>
//             Buy
//           </button>
//         </div>
//       )}
//     </div>
//   </div>
// );
// }
// export default Nav;
