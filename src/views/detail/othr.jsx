import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import { addToCart } from "../../redux/actions";
import { NavLink } from "react-router-dom";
import Alerta from "../../components/Alerta/Alerta";
import axiosClient from "../../config/axiosClient";
import useAuth from "../../hooks/useAuth";
import axios from 'axios';
import './detail.css'
import { useDispatch } from "react-redux";
const Detail = () => {
  
  const [query, setQuery] = useState({})
  const [alerta, setAlerta] = useState({})
  const dispatch = useDispatch()
  // Estado para controlar la visualización del modal
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {

    // Manejador para agregar la prenda actual al carrito
  const handleAddToCart = () => {
    // Crear un objeto que representa el elemento en el carrito
    const cartItem = {
      id: garment.id,
      name: garment.name,
      price: garment.price,
      description: garment.description,
      stock: garment.stock,
      interactions: garment.interactions,
      quantity: 1,
    };
    dispatch(addToCart(cartItem));
    setShowModal(true);
  };



  const handleSubmit = async e => {
    e.preventDefault()

    if ( !query.message) {
      setAlerta({
        msg: 'Todos los campos son obligatorios',
        error: true
      });
      return;
    }

    try {
      const { data } = await axiosClient.post(`/products/${id}/add-query`, query)

      setAlerta({
        msg: 'Query sended',
        error: false
      })

      setQuery({message: ''})

    } catch (error) {
      console.log(error)
    }

}

    setTimeout(() => {
      setAlerta({})
  }, 9000);

const { msg } = alerta

  return(
    <div className="interactionsOtherUsers">
                
    {garment.interactions && (
      <ul>
        {garment.interactions.map((interaction, index) => (
          <div className="interaction" key={index}>
            <div className="user">
                <p>{interaction.name}</p>
            </div>
            
            <div className="message">
                 
                <p>Message: {interaction.message}</p>
            </div>
            
          </div>
        ))}
      </ul>
    )}
</div>

<form action="" onSubmit={handleSubmit} className="myQuery">
  <h3>Type your query</h3>
  <label className="labelQuery" htmlFor="query">Send us your inquiry, the administrator will answer your questions as soon as possible</label>
  <input
        id="query"
        type="text"
        className="inputName" 
        placeholder="Insert your name"
        value={auth.name}
        disabled
        // value={query.name} 
        onChange={e => setQuery({ ...query, name: e.target.value })} 
        // onChange={e => setQuery(e.target.value)}
        
    />

    <input
        id="query"
        type="text"
        className="textQuery" 
        placeholder="Insert your question"
        value={query.message} 
        onChange={e => setQuery({ ...query, message: e.target.value })} 
        // onChange={e => setQuery(e.target.value)}
        
    />

      {msg && <Alerta alerta={alerta}/>}

    <input type="submit" value="Send" className="btnSend" />
</form>

</div>
</div>
  )
};

export default Detail;