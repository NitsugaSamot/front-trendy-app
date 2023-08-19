import React, { useState } from "react";
import axiosClient from "../../config/axiosClient";
import { addToCart } from "../../redux/actions";
import useAuth from "../../hooks/useAuth";
import Alerta from "../../components/Alerta/Alerta";

const Interactions = () => {
  const { auth } = useAuth();
  const [garment, setGarment] = useState({});
  const [query, setQuery] = useState({});
  const [alerta, setAlerta] = useState({});

  const handleAddToCart = () => {
    // Crear un objeto que representa el elemento en el carrito
    const cartItem = {
      id: garment.id,
      interactions: garment.interactions,
      quantity: 1,
    };
    dispatch(addToCart(cartItem));
    // setShowModal(true);
  };

    // const handleSubmit = async e => {
  //     e.preventDefault()

  //     if ( !query.message) {
  //       setAlerta({
  //         msg: 'Debes enviar un mensaje',
  //         error: true
  //       });
  //       return;
  //     }

  //     try {
  //        const requestData = {
  //         userId: auth.id,
  //         userName: auth.name,
  //         message: query.message
  //       };
    

  //        await axiosClient.post(`/products/${id}/add-query`, requestData)

  //       setAlerta({
  //         msg: 'Query sended',
  //         error: false
  //       })

  //       setQuery({message: ''})

  //           setGarment((prevGarment) => ({
  //     ...prevGarment,
  //     interactions: [
  //       ...prevGarment.interactions,
  //       requestData
  //     ]
  //   }));


  //     } catch (error) {
  //       console.log(error)
  //     }
  
  // }

  //     setTimeout(() => {
  //       setAlerta({})
  //   }, 9000);

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
//   const handleSubmit = async e => {
//     e.preventDefault();

//     if (!query.message) {
//       setAlerta({
//         msg: "Debes enviar un mensaje",
//         error: true,
//       });
//       return;
//     }

//     try {
//       const requestData = {
//         userId: auth.id,
//         userName: auth.name,
//         message: query.message,
//       };

//       await axiosClient.post(`/products/${id}/add-query`, requestData);

//       setAlerta({
//         msg: "Query sent",
//         error: false,
//       });

//       updateInteractions(requestData);

//       setQuery({ message: "" });
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   setTimeout(() => {
//     setAlerta({});
//   }, 9000);

//   const { msg } = alerta;

  return (
    <div className="interactions">
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
        {/* {interactions && (
          <ul>
            {interactions.map((interaction, index) => (
              <div className="interaction" key={index}>
                <div className="user">
                  <p>{interaction.name}</p>
                </div>

                <div className="message">
                  <p>{interaction.message}</p>
                </div>
              </div>
            ))}
          </ul>
        )} */}
      </div>

      <form action="" onSubmit={handleSubmit} className="myQuery">
        <h3>Type your query</h3>
        <label className="labelQuery" htmlFor="query">
          Send us your inquiry, the administrator will answer your questions as
          soon as possible
        </label>
        <input
          id="query"
          type="text"
          className="inputName"
          value={auth.name}
          disabled
        />

        <input
          id="query"
          type="text"
          className="textQuery"
          placeholder="Insert your question"
          value={query.message}
          onChange={(e) => setQuery({ ...query, message: e.target.value })}
        />

        {msg && <Alerta alerta={alerta} />}

        <input type="submit" value="Send" className="btnSend" />
      </form>
    </div>
  );
};

export default Interactions;
