import { useEffect, useState } from "react";
import useAuth from "../../contextClient/hooks/useAuth";
import axios from "axios";
//import axiosClient from "../../contextClient/config/axiosClient";
import './profileStyles.css'

const Purchases = () => {
  const { auth } = useAuth(); // Supongo que obtienes la información del usuario aquí
  const [purchases, setPurchases] = useState([]);

  useEffect(() => {
    if (auth) {
      axios.get(`https://back-trendy-app.up.railway.app/users/${auth.id}/purchases`)
        .then(response => {
          setPurchases(response.data);
        })
        .catch(error => {
          console.error("Error fetching purchases:", error);
        });
    }
  }, [auth]);

  return (
    <>
    <div>  
    <span style={{fontWeight: 'bold', width: '100%', color: 'white', margin: '5px'}}>Thank you for your buy's</span>
    <div>
    <div className="purchases">
        {purchases.map(purchase => (
          <div className="purchase" key={purchase.id}>
            <div className="titlePurchase">
                  <h5>{purchase.title}</h5>
            </div>
            <p>Precio: {purchase.unit_price}</p>
            {/* Agrega aquí más detalles de la compra si lo deseas */}
          </div>
        ))}
      </div>
    </div>

    </div>
    </>
  );
}

export default Purchases;
