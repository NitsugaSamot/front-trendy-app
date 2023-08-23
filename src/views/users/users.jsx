import { useState, useEffect } from 'react';
import axios from 'axios';
import './users.css';
import UserCard from '../../components/userCard/userCard';


const Users = () => {
    const [users, setUsers] = useState([]);
    const [reloadData, setReloadData] = useState(false);
 
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`https://back-trendy-app.up.railway.app/users`);
                const { data } = response;
                setUsers(data);
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, [reloadData]); // Agregado reloadData como dependencia
    const handleIsDelete = async (event) => {
        const userDelete = users.find(user => user.id == event.target.id); // Usar find en lugar de map

        try {
            const res = await axios.put(`https://back-trendy-app.up.railway.app/users`, userDelete);
            console.log(res.data)
            if (res.status === 200) {
                setReloadData(!reloadData);
            }
        } catch (error) {
            console.log("Error updating user:", error);
        }
    }

    return (
        <div className="ContEXT">
            <div className="ContINT">
                {users?.map((user, index) => (
                    <div className='UserCardsConteiner' key={index}>
                        <UserCard user={user} />
                        <button className='DeleteUser' id={user.id} onClick={handleIsDelete}>boton</button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Users;