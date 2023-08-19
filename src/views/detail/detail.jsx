import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import { addToCart } from "../../redux/actions";
import { NavLink } from "react-router-dom";
import Alerta from "../../components/Alerta/Alerta";
import axiosClient from "../../config/axiosClient";
import useAuth from "../../hooks/useAuth";
import axios from 'axios';

import Nav from "../../components/nav/nav";

import './detail.css'
import { useDispatch } from "react-redux";


const Detail = () => {
  const { id } = useParams();
  const [garment, setGarment] = useState({});
  const [imagePP, setImagePP] = useState('');
  const [expanded, setExpanded] = useState(false);
  const [colorsAvailable, setColorsAvailable] = useState([]);
  const [size, setSize] = useState("");
  const [stockComb, setStockComb] = useState(0);

  const {auth} = useAuth()
  const [query, setQuery] = useState({})
  const [alerta, setAlerta] = useState({})
  const dispatch = useDispatch()
  // Estado para controlar la visualización del modal
  const [showModal, setShowModal] = useState(false);



  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3004/products/${id}`);
        const { data } = response;
        setGarment(data);
      } catch (error) {
        window.alert("Error al obtener los datos del personaje");
      }
    }
    fetchData();
  }, [id])

  const carousel = (event) => {
    setImagePP(garment.image[event.target.value]);
  }

  useEffect(() => {
  }, [imagePP]);

  
    const toogleExpand = () => {
      setExpanded(!expanded);
    };

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

  console.log(garment.interactions)

  const handleClickStock = (event, stock = garment.stock) => {
    setColorsAvailable([])
    setSize(event.target.value);

    for (let index in stock[size]) {
      if (stock[size][index] > 0) {
        console.log(index);
        setColorsAvailable((colorsAvailable) => [...colorsAvailable, index]);
        console.log(colorsAvailable);
      }
    }
    console.log(colorsAvailable);
  };

  const handleClickColor = (event, stock = garment.stock) => {
    const color = event.target.name;

    if (color) {
      setStockComb(stock[size][color]);
    }
  };

  console.log(auth);

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


         const requestData = {
          userId: auth.id,
          userName: auth.name,
          message: query.message
        };
    

         await axiosClient.post(`/products/${id}/add-query`, requestData)

        setAlerta({
          msg: 'Query sended',
          error: false
        })

        setQuery({message: ''})

            setGarment((prevGarment) => ({
      ...prevGarment,
      interactions: [
        ...prevGarment.interactions,
        requestData
      ]
    }));


      } catch (error) {
        console.log(error)
      }
  
  }

      setTimeout(() => {
        setAlerta({})
    }, 9000);

  const { msg } = alerta

  return(

    <div className="">
      <Nav />
      <div className="theRealMaxContainer">
      <div className="carousel-inner maxContainer">
        <div className="mediumContainer">
          <div className="imageCont">

            <div className="divBtn">
            {garment.image && garment.image.map((imag, index) => (
            <button style={{backgroundImage: `url(${imag})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center', width: '100px', height: '100px', marginRight: '5px', marginTop: "7px", border: "none"}} key={index} value={index} onClick={carousel}/>
            ))}
            </div>

            <div className="divImage">
            {garment.image && <img className="productImage" src={imagePP || garment.image[0]} alt={garment.name} />}
            {garment.price && ( 
              <div className="priceh4">
              <hr />
              <h4 className="therealh4">${garment.price}</h4>
              <hr />

          <h5>Check our stock!</h5>
              <div className="divButtons">
            <button className="buttonSize" onClick={handleClickStock} value="s">
              S
            </button>
            <button className="buttonSize" onClick={handleClickStock} value="m">
              M
            </button>
            <button className="buttonSize" onClick={handleClickStock} value="l">
              L
            </button>
            <button className="buttonSize" onClick={handleClickStock} value="xl">
              XL
            </button>
          </div>

          <div>
            {colorsAvailable.map((color) => (
              <button style={{width: '100px', background: `${color}`}} className="buttonSize2" onClick={handleClickColor} name={color} key={color}>
                {color}
              </button>
            ))}
          </div>
          <hr />
          <div className="stock">Stock: {stockComb}</div>

            </div>
              )}
            </div>
          </div>
          
        <div className="divMaxDetails">
          <div className="allDetailsDiv">
            <hr />
            {garment.name && <h3>{garment.name}</h3>}
            <hr />
            {garment.productbrand && <h5>{garment.productbrand}</h5>}
            <hr />
            {garment.description && <h5>{expanded ? garment.description : garment.description.slice(0, 99) + '...'}
            </h5>}
            <span style={{cursor: "pointer", marginLeft: "5px", color: "rgb(47, 203, 255)"}} onClick={toogleExpand}>{expanded ? 'Ver menos' : 'Ver mas'}</span>

    
            <hr />


{/* 
            <div>
              {garment.interactions && <h5>{garment.interactions}</h5>}
            </div> */}
            

            <hr />
          <button onClick={handleAddToCart}>Añadir al carrito</button>
          
          {/* Modal para mostrar cuando se agrega un producto al carrito */}
          <Modal show={showModal} onHide={() => setShowModal(false)}>
            <Modal.Header closeButton>
              <Modal.Title>Producto agregado al carrito</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {/* Mostrar detalles del producto recién añadido en el modal */}
              <p>Nombre: {garment.name}</p>
              <p>Precio: ${garment.price}</p>
              {/* Puedes agregar más detalles aquí si es necesario */}
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setShowModal(false)}>
                Cerrar
              </Button>
            </Modal.Footer>
          </Modal>

          </div>
        </div>
      </div>
      </div>
      </div>
      <div className="interactions">
                {/* <h5>Consultation:</h5> */}



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
                        // placeholder="Insert your name"
                        value={auth.name}
                        disabled

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