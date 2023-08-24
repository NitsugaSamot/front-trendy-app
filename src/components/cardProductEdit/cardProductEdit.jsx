import { useState } from "react";
import axios from "axios";
import validation from "./validation";
import validationStock from "./validationStock";
import "./cardProductEdit.css";
const CardProductEdit = ({ showProduct, onSuccessfulUpdate }) => {
  const [productEdit, setProductEdit] = useState({
    name: showProduct.name,
    price: showProduct.price,
    description: showProduct.description,
    brand: showProduct.brand,
  });
  const [error, setError] = useState({});
  const [errorStock, setErrorStock] = useState({});

  const [stockEdit, setStockEdit] = useState({
    s: {
      blanco: showProduct.stock.s.blanco,
      negro: showProduct.stock.s.negro,
      gris: showProduct.stock.s.gris,
    },
    m: {
      blanco: showProduct.stock.m.blanco,
      negro: showProduct.stock.m.negro,
      gris: showProduct.stock.m.gris,
    },
    l: {
      blanco: showProduct.stock.l.blanco,
      negro: showProduct.stock.l.negro,
      gris: showProduct.stock.l.gris,
    },
    xl: {
      blanco: showProduct.stock.xl.blanco,
      negro: showProduct.stock.xl.negro,
      gris: showProduct.stock.xl.gris,
    },
  });

  const handleStockEdit = (event) => {
    const { name, value } = event.target;
    const [size, color] = name.split(".")[1].split("-");
    setStockEdit((prevStock) => ({
      ...prevStock,
      [size]: {
        ...prevStock[size],
        [color]: value,
      },
    }));
    setErrorStock(
      validationStock({
        ...stockEdit,
        [size]: {
          ...stockEdit[size],
          [color]: value,
        },
      })
    );
  };

  const handleProductEdit = (event) => {
    const { name, value } = event.target;
    setProductEdit({ ...productEdit, [name]: value });
    setError(validation({ ...productEdit, [name]: value }));
  };

  const handleSubmit = async () => {
    const form = {
      id: showProduct.id,
      name: productEdit.name,
      price: productEdit.price,
      description: productEdit.description,
      brand: productEdit.brand,
      stock: stockEdit,
    };
    try {
      
      const res = await axios.put(
        `https://back-trendy-app.up.railway.app/products/updateProduct`,
        form
      );
      if (res.status === 200) {
        alert("The product has been updated.");
        onSuccessfulUpdate();
      }
    } catch (error) {
      console.log("Error updating user:", error);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <h4 style={{ margin: "2px", color: 'white' }}>{showProduct.name}</h4>
      <div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                padding: "3px",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <label
                style={{
                  fontWeight: "bold",
                  display: "flex",
                  flexDirection: "column",
                  color: "white",
                }}
              >
                New price
                <input
                  name="price"
                  value={productEdit.price}
                  onChange={handleProductEdit}
                ></input>
                {error.price && <span>{error.price}</span>}
              </label>

              <label
                style={{
                  fontWeight: "bold",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  color: "white"
                }}
              >
                New description
                <textarea
                  style={{ width: "50rem", height: "10rem" }}
                  name="description"
                  value={productEdit.description}
                  onChange={handleProductEdit}
                />
                {error.description && <span>{error.description}</span>}
              </label>
            </div>

            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
              <div className="stocks">
                <h5>S</h5>
                <label>
                  {" "}
                  White
                  <input
                    name="stock.s-blanco"
                    value={stockEdit.s.blanco}
                    onChange={handleStockEdit}
                  ></input>
                  {errorStock && <span>{errorStock.stock}</span>}
                </label>
                <label>
                  {" "}
                  Black
                  <input
                    name="stock.s-negro"
                    value={stockEdit.s.negro}
                    onChange={handleStockEdit}
                  ></input>
                  {errorStock && <span>{errorStock.stock}</span>}
                </label>
                <label>
                  {" "}
                  Grey
                  <input
                    name="stock.s-gris"
                    value={stockEdit.s.gris}
                    onChange={handleStockEdit}
                  ></input>
                  {errorStock && <span>{errorStock.stock}</span>}
                </label>
              </div>

              <div className="stocks">
                <h5>M</h5>

                <input
                  name="stock.m-blanco"
                  value={stockEdit.m.blanco}
                  onChange={handleStockEdit}
                ></input>
                {errorStock && <span>{errorStock.stock}</span>}

                <input
                  name="stock.m-negro"
                  value={stockEdit.m.negro}
                  onChange={handleStockEdit}
                ></input>
                {errorStock && <span>{errorStock.stock}</span>}

                <input
                  name="stock.m-gris"
                  value={stockEdit.m.gris}
                  onChange={handleStockEdit}
                ></input>
                {errorStock && <span>{errorStock.stock}</span>}
              </div>

              <div className="stocks">
                <h5>L</h5>
                <input
                  name="stock.l-blanco"
                  value={stockEdit.l.blanco}
                  onChange={handleStockEdit}
                ></input>
                {errorStock && <span>{errorStock.stock}</span>}

                <input
                  name="stock.l-negro"
                  value={stockEdit.l.negro}
                  onChange={handleStockEdit}
                ></input>
                {errorStock && <span>{errorStock.stock}</span>}

                <input
                  name="stock.l-gris"
                  value={stockEdit.l.gris}
                  onChange={handleStockEdit}
                ></input>
                {errorStock && <span>{errorStock.stock}</span>}
              </div>

              <div className="stocks">
                <h5>XL</h5>
                <input
                  name="stock.xl-blanco"
                  value={stockEdit.xl.blanco}
                  onChange={handleStockEdit}
                ></input>
                {errorStock && <span>{errorStock.stock}</span>}

                <input
                  name="stock.xl-negro"
                  value={stockEdit.xl.negro}
                  onChange={handleStockEdit}
                ></input>
                {errorStock && <span>{errorStock.stock}</span>}

                <input
                  name="stock.xl-gris"
                  value={stockEdit.xl.gris}
                  onChange={handleStockEdit}
                ></input>
                {errorStock && <span>{errorStock.stock}</span>}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
      <button
        style={{
          width: "10rem",
          margin: "4px",
        }}
        onClick={handleSubmit}
      >
        Update Product
      </button>
      </div>
    </div>
  );
};

export default CardProductEdit;