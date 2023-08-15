import { initMercadoPago } from '@mercadopago/sdk-react';
import axios from "axios";

import "./Product.css";

const Product = () => {
      
  
  // Inicialización de Mercado Pago con tu clave pública
  initMercadoPago("APP_USR-d7ee1f6e-0196-45be-81ed-388bfebc9319");

  
  // Función para crear una preferencia de pago
  const createPreference = async () => {
    //id, title, description, image, stock, condition, price, quantity
    try {
      const response = await axios.post("http://localhost:3004/mercadopago/order", {
        description: "Short Nike",
        price: 100,
        quantity: 1
      });
      // Obtengo el link para reedirigir al cliente a la pagina de pago.
      const init_point = response.data.response.body.init_point
      return init_point;

    } catch (error) {
      console.log(error);
    }
  };


  // Manejador para el botón de compra
  const handleBuy = async () => {
    try {
      const init_point = await createPreference();
      window.location.href = init_point
     
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1> Aca va a ver un producto para comprar</h1>
      <div className="card-product-container">
        <div className="card-product">
          <div className="card">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSoffAXsYsveeqJSIEyRrRk3iCKKhY-z5WOIA&usqp=CAU"
              alt="Product Image"
              style={{ maxWidth: '200px' }}
            />
            <h3>Short Nike</h3>
            <p className="price">$100</p>
            <button onClick={handleBuy}>Buy</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
