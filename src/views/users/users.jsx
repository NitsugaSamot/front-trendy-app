import { useState, useEffect } from "react";
import axios from "axios";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [reloadData, setReloadData] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://back-trendy-app.up.railway.app/users`
        );
        const { data } = response;
        setUsers(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [reloadData]); // Agregado reloadData como dependencia
  const handleIsDelete = async (event) => {
    const userDelete = users.find((user) => user.id == event.target.id); // Usar find en lugar de map

    try {
      const res = await axios.put(
        `https://back-trendy-app.up.railway.app/users`,
        userDelete
      );
      console.log(res.data);
      if (res.status === 200) {
        setReloadData(!reloadData);
      }
    } catch (error) {
      console.log("Error updating user:", error);
    }
  };

  return (
      <div>
        <Table striped bordered hover size="sm" variant="dark">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Type</th>
              <th>Confirm</th>
              <th>Deleted</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr style={{justifyContent: 'center', alignItems: 'center'}}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.type ? "1" : "0"}</td>
                <td>{user.confirmated ? "Confirmed" : "Not Confirmed"}</td>
                <td>{user.isDeleted ? "Deleted" : "Active"}</td>
                <td>
                <Button
                variant="danger"
                  style={{transform: "none", boxShadow: "none", border: 'none', margin: '5px'}}
                  id={user.id}
                  onClick={handleIsDelete}
                >
                  Delete
                </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
  );
};

export default Users;