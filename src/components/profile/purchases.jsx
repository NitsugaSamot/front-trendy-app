import { useEffect, useState } from "react";
import useAuth from "../../contextClient/hooks/useAuth";
import axiosClient from "../../contextClient/config/axiosClient";
import './profileStyles.css'

const Purchases = () => {
  const { auth } = useAuth(); // Supongo que obtienes la información del usuario aquí
  const [purchases, setPurchases] = useState([]);

  useEffect(() => {
    if (auth) {
      axiosClient.get(`/users/${auth.id}/purchases`)
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
        {/* <div className="titlePurchases">
    <h3>Purchase history</h3>
</div> */}

    <div className="divPurchases">
   

      
    <div >
    <div className="purchases">
        {purchases.map(purchase => (
          <div className="purchase" key={purchase.id}>
            <div className="titlePurchase">
                  <h5>{purchase.title}</h5>
            </div>
            
            <p>Precio: {purchase.unit_price}</p>
            <p>Cantidad: {purchase.quantity}</p>
            <p>Descripción: {purchase.description}</p>
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
