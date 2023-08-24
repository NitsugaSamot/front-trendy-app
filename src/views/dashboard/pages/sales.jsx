import axios from "axios";
import { useState } from "react";

const Sales = () => {

    const [users, setUsers] = useState()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`https://back-trendy-app.up.railway.app/users/all-purchases`
                );
                const { data } = response;
                setUsers(data);
            } catch (error) {
                window.alert("Error al obtener los datos del personaje");
            }
        };
        fetchData();
    }, []);

    return (
        <div>
        {
            users.map((user, index) => (
                <div key={index}>
                  <h1>{user.userName}</h1> // Usar user.userId para mostrar el ID de usuario
                  <h1>{purchaseDetails.title}</h1>
                  <h1>{purchaseDetails.unit_price}</h1>
                </div>
            ))
        }
    </div>
    )

    }
export default Sales