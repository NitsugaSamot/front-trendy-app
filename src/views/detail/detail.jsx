import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import { addToCart } from "../../redux/actions";

import Nav from "../../components/nav/nav";
import classnames from "classnames";
import useAuth from "../../contextClient/hooks/useAuth";

import "./detail.css";

const Detail = () => {
  const { id } = useParams();
  const [garment, setGarment] = useState({});
  const [imagePP, setImagePP] = useState("");
  const [expanded, setExpanded] = useState(false);
  const [colorsAvailable, setColorsAvailable] = useState([]);
  const [size, setSize] = useState("");
  const [stockComb, setStockComb] = useState(0);
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);

  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedButton, setSelectedButton] = useState("");
  const [selectedColorName, setSelectedColorName] = useState(""); // Estado para almacenar el nombre del color seleccionado

  //-------------------------- VALORACIÓN
  const [rating, setRating] = useState(0); // Inicializa con 0 estrellas
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [promedio, setPromedio] = useState(0); //
  const [usuario, setUsuario] = useState(null);
  const [botonSubmit, setBotonSubmit] = useState(false);

  const calcularPromedio = (ratings) => {
    const sum = ratings.reduce((total, rating) => total + rating, 0);
    return sum / ratings.length || 0;
  };

  const handleRating = (selectedRating) => {
    console.log("Seleccionaste " + selectedRating + " estrellas.");
    setRating(selectedRating);
  };

  const handleSubmitRating = async () => {
    try {
      if (usuario && usuario.purchaseOrder) {
        const productInPurchaseOrder = usuario.purchaseOrder.find(
          (order) => order.id === parseInt(id)
        );

        if (productInPurchaseOrder && productInPurchaseOrder.rating === false) {
          console.log(usuario.id);
          console.log(id);
          const setearPurchase = await axios.put(
            "https://back-trendy-app.up.railway.app/users/ratingTrue",
            {
              userId: parseInt(usuario.id),
              idProduct: parseInt(id),
            }
          );
          console.log(setearPurchase.data);

          const response = await axios.post(
            "https://back-trendy-app.up.railway.app/products/rating",
            { id: id, newRating: rating } // Envío el id y la valoración del producto
          );
          setRating(0); // Reinicia el estado de la valoración
          setShowSuccessAlert(true); // Me muestra un alert de que se envio la valoración
          console.log(response.data); // Muestro lo  que me devuelve el back
          setBotonSubmit(true);
        } else {
          alert(
            "The user has not purchased this product or has already given a review."
          );
        }
      } else {
        alert("The user's information could not be verified");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const cart = useSelector((state) => state.cart); // Estado local y del localStorage del Carrito
  const { auth } = useAuth();

  const selectedSizeClass = (size) =>
    classnames("buttonSize", {
      seleccionado: selectedSize === size,
    });

  const selectedColorClass = (color) =>
    classnames("buttonSize2", {
      seleccionado: selectedColor === color,
    });
  //-----------------------------------------------------------------

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://back-trendy-app.up.railway.app/products/${id}`
        );
        console.log(response.data.ratings);
        const { data } = response;
        setGarment(data);

        const ratings = data.ratings || [];
        const promedio = calcularPromedio(ratings);
        setPromedio(promedio);
      } catch (error) {
        window.alert("Error al obtener los datos del personaje");
      }
    };
    fetchData();
  }, [id]);

  useEffect(() => {
    const valoracion = async () => {
      try {
        if (auth.id) {
          //https://back-trendy-app.up.railway.app/users/
          const response = await axios.get(
            `https://back-trendy-app.up.railway.app/users/${auth.id}`
          );
          setUsuario(response.data);
          console.log(response.data.purchaseOrder[0]);
        }
      } catch (error) {
        console.log(error);
      }
    };

    valoracion();
  }, [auth.id]);

  // Cambiar la imagen principal cuando se haga clic en un botón de imagen
  const carousel = (event) => {
    setImagePP(garment.image[event.target.value]);
  };

  useEffect(() => {}, [imagePP]);

  const toogleExpand = () => {
    setExpanded(!expanded);
  };

  // Manejador para agregar la prenda actual al carrito
  const handleAddToCart = () => {
    if (!size || !selectedColorName) {
      alert("Please select color and size");
      return;
    }

    // Verificar si el producto ya está en el carrito
    const itemAlreadyInCart = cart.find(
      (item) =>
        item.id === garment.id &&
        item.size === size &&
        item.color === selectedColorName
    );

    if (itemAlreadyInCart) {
      alert("This product is already in the cart");
      return; // Salir de la función si el producto ya está en el carrito
    }

    // Crear un objeto que representa el elemento en el carrito
    const cartItem = {
      id: garment.id,
      color: selectedColorName,
      size: size,
      name: garment.name,
      price: garment.price,
      description: garment.description,
      stock: garment.stock,
      quantity: 1,
    };
    dispatch(addToCart(cartItem));
    setShowModal(true);
  };

  // Manejador para cambiar el tamaño seleccionado
  const handleClickStock = (event, stock = garment.stock) => {
    setColorsAvailable([]);
    setSelectedButton(event.target.value);
    const newSize = event.target.value;
    setSelectedSize(newSize);
    setColorsAvailable([]);
    setSize(event.target.value);

    for (let index in stock[size]) {
      if (stock[size][index] > 0) {
        setColorsAvailable((colorsAvailable) => [...colorsAvailable, index]);
      }
    }
  };

  // Manejador para cambiar el color seleccionado
  const handleClickColor = (event, stock = garment.stock) => {
    const color = event.target.name;

    if (color) {
      setSelectedColor(color);
      setSelectedButton(color);
      setStockComb(stock[size][color]);
      setSelectedColorName(color);
    }
  };

  return (
    <div className="">
      <Nav />

      <div className="theRealMaxContainer">
        <div className="carousel-inner maxContainer">
          <div className="mediumContainer">
            <div className="imageCont">
              <div className="divBtn">
                {garment.image &&
                  garment.image.map((imag, index) => (
                    <button
                      style={{
                        backgroundImage: `url(${imag})`,
                        backgroundSize: "cover",
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "center",
                        width: "100px",
                        height: "100px",
                        marginRight: "5px",
                        marginTop: "7px",
                        border: "none",
                      }}
                      key={index}
                      value={index}
                      onClick={carousel}
                    />
                  ))}
              </div>

              <div className="divImage">
                {garment.image && (
                  <img
                    className="productImage"
                    src={imagePP || garment.image[0]}
                    alt={garment.name}
                  />
                )}
                <hr />
                {garment.price && (
                  <div className="priceh4">
                    <hr />
                    <h4 className="therealh4">${garment.price}</h4>
                    <hr />
                  </div>
                )}
              </div>
            </div>

            <div className="divMaxDetails">
              <div className="allDetailsDiv">
                <hr />
                {garment.name && <h3>{garment.name}</h3>}
                <hr />
                {garment.productbrand && <h4>{garment.productbrand}</h4>}
                <hr />
                <h4>Average ratings: {promedio.toFixed(2)}</h4>
                <hr />
                <div style={{ width: "30rem" }}>
                  {garment.description && (
                    <h5>
                      {expanded
                        ? garment.description
                        : garment.description.slice(0, 300) + "..."}
                    </h5>
                  )}
                </div>
                <span
                  style={{
                    cursor: "pointer",
                    marginLeft: "5px",
                    color: "rgb(47, 203, 255)",
                  }}
                  onClick={toogleExpand}
                >
                  {expanded ? "Show less..." : "Show more..."}
                </span>
                <hr />
                <div>
                  <h5>Check our Stock!</h5>
                  <div className="divButtons">
                    <button
                      className={
                        selectedSize === "s"
                          ? "buttonSize seleccionado"
                          : "buttonSize"
                      }
                      onClick={handleClickStock}
                      value="s"
                    >
                      S
                    </button>
                    <button
                      className={
                        selectedSize === "m"
                          ? "buttonSize seleccionado"
                          : "buttonSize"
                      }
                      onClick={handleClickStock}
                      value="m"
                    >
                      M
                    </button>
                    <button
                      className={
                        selectedSize === "l"
                          ? "buttonSize seleccionado"
                          : "buttonSize"
                      }
                      onClick={handleClickStock}
                      value="l"
                    >
                      L
                    </button>
                    <button
                      className={
                        selectedSize === "xl"
                          ? "buttonSize seleccionado"
                          : "buttonSize"
                      }
                      onClick={handleClickStock}
                      value="xl"
                    >
                      XL
                    </button>
                  </div>
                  <hr />
                  <div className="divButtons">
                    {colorsAvailable.map((color) => (
                      <button
                        className={selectedColorClass(color)}
                        onClick={handleClickColor}
                        name={color}
                        key={color}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                  <hr />
                  <div className="stock">Stock: {stockComb}</div>
                  <button onClick={handleAddToCart}>Add to cart</button>
                </div>

                {/* Modal para mostrar cuando se agrega un producto al carrito */}
                <Modal show={showModal} onHide={() => setShowModal(false)}>
                  <Modal.Header closeButton>
                    <Modal.Title>Producto agregado al carrito</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    {/* Mostrar detalles del producto recién añadido en el modal */}
                    <p>NAME: {garment.name}</p>
                    <p>PRICE: ${garment.price}</p>
                    <p>SIZE: {size}</p>
                    <p>COLOR: {selectedColorName}</p>
                    {/* Puedes agregar más detalles aquí si es necesario */}
                  </Modal.Body>
                  <Modal.Footer>
                    <Button
                      variant="secondary"
                      onClick={() => setShowModal(false)}
                    >
                      Close
                    </Button>
                  </Modal.Footer>
                </Modal>
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr />

      <div>
        <h2>★ RATE THE PRODUCT ★</h2>
        {
          <div className="rating">
            {[1, 2, 3, 4, 5].map((estrellas) => (
              <span
                key={estrellas}
                className={`estrellas ${rating >= estrellas ? "active" : ""}`}
                onClick={() => handleRating(estrellas)}
              >
                ★
              </span>
            ))}
          </div>
        }
        <button onClick={handleSubmitRating} disabled={botonSubmit}>
          Send Feedback
        </button>
        {showSuccessAlert && (
          <div
            className="alert alert-success d-flex align-items-center"
            role="alert"
          >
            <svg
              className="bi flex-shrink-0 me-2"
              width="24"
              height="24"
              role="img"
              aria-label="Success:"
            >
              <use xlinkHref="#check-circle-fill" />
            </svg>
            <div>Rating sent successfully</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Detail;
