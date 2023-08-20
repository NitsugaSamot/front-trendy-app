import { useState } from "react";
import axios from "axios";
import validation from "./validation";
import validationStock from "./validationStock";

const CardProductEdit = ({ showProduct, onSuccessfulUpdate }) => {

  const [productEdit, setProductEdit] = useState({
    name: showProduct.name,
    price: showProduct.price,
    description: showProduct.description,
    brand: showProduct.brand,
  });
  const [error, setError] = useState({})
  const [errorStock, setErrorStock] = useState({})
  

  const [stockEdit, setStockEdit] = useState({
    s: {
      blanco: showProduct.stock.s.blanco,
      negro: showProduct.stock.s.negro,
      gris: showProduct.stock.s.gris
    },
    m: {
      blanco: showProduct.stock.m.blanco,
      negro: showProduct.stock.m.negro,
      gris: showProduct.stock.m.gris
    },
    l: {
      blanco: showProduct.stock.l.blanco,
      negro: showProduct.stock.l.negro,
      gris: showProduct.stock.l.gris
    },
    xl: {
      blanco: showProduct.stock.xl.blanco,
      negro: showProduct.stock.xl.negro,
      gris: showProduct.stock.xl.gris
    }
  });

  const handleStockEdit = (event) => {
    const { name, value } = event.target;
    const [size, color] = name.split('.')[1].split('-');
    setStockEdit(prevStock => ({
      ...prevStock,
      [size]: {
        ...prevStock[size],
        [color]: value
      }
    }));
    setErrorStock(validationStock({
      ...stockEdit,
      [size]: {
        ...stockEdit[size],
        [color]: value
      }
    }))
  };

  const handleProductEdit = (event) => {
    const { name, value } = event.target;
    setProductEdit({ ...productEdit, [name]: value });
    setError(validation({...productEdit, [name]: value }))
  };

  const handleSubmit = async () => {
    const form = {
      id: showProduct.id,
      name: productEdit.name,
      price: productEdit.price,
      description: productEdit.description,
      brand: productEdit.brand,
      stock: stockEdit
    }
    try {
      const res = await axios.put(`http://localhost:3004/products/updateProduct`, form);
      if (res.status === 200) {
        alert("The product has been updated.");
        onSuccessfulUpdate();
      }
    } catch (error) {
      console.log("Error updating user:", error);
    }
  }

  return (
    <div>
      <h1>{showProduct.name}</h1>
      <label>New price: 
        <input name="price" value={productEdit.price} onChange={handleProductEdit}></input>
        {error.price && <span>{error.price}</span>} 
      </label>
      <label>New description: 
        <input name="description" value={productEdit.description} onChange={handleProductEdit}></input>
        {error.description && <span>{error.description}</span>}
      </label>
      <label>
        <input name="stock.s-blanco" value={stockEdit.s.blanco} onChange={handleStockEdit}></input>
        {errorStock && <span>{errorStock.stock}</span>}
      </label>
      <label>
        <input name="stock.s-negro" value={stockEdit.s.negro} onChange={handleStockEdit}></input>
        {errorStock && <span>{errorStock.stock}</span>}
      </label>
      <label>
        <input name="stock.s-gris" value={stockEdit.s.gris} onChange={handleStockEdit}></input>
        {errorStock && <span>{errorStock.stock}</span>}
      </label>
      <label>
        <input name="stock.m-blanco" value={stockEdit.m.blanco} onChange={handleStockEdit}></input>
        {errorStock && <span>{errorStock.stock}</span>}
      </label>
      <label>
        <input name="stock.m-negro" value={stockEdit.m.negro} onChange={handleStockEdit}></input>
        {errorStock && <span>{errorStock.stock}</span>}
      </label>
      <label>
        <input name="stock.m-gris" value={stockEdit.m.gris} onChange={handleStockEdit}></input>
        {errorStock && <span>{errorStock.stock}</span>}
      </label>
      <label>
        <input name="stock.l-blanco" value={stockEdit.l.blanco} onChange={handleStockEdit}></input>
        {errorStock && <span>{errorStock.stock}</span>}
      </label>
      <label>
        <input name="stock.l-negro" value={stockEdit.l.negro} onChange={handleStockEdit}></input>
        {errorStock && <span>{errorStock.stock}</span>}
      </label>
      <label>
        <input name="stock.l-gris" value={stockEdit.l.gris} onChange={handleStockEdit}></input>
        {errorStock && <span>{errorStock.stock}</span>}
      </label>
      <label>
        <input name="stock.xl-blanco" value={stockEdit.xl.blanco} onChange={handleStockEdit}></input>
        {errorStock && <span>{errorStock.stock}</span>}
      </label>
      <label>
        <input name="stock.xl-negro" value={stockEdit.xl.negro} onChange={handleStockEdit}></input>
        {errorStock && <span>{errorStock.stock}</span>}
      </label>
      <label>
        <input name="stock.xl-gris" value={stockEdit.xl.gris} onChange={handleStockEdit}></input>
        {errorStock && <span>{errorStock.stock}</span>}
      </label>
      <button onClick={handleSubmit}>Update Product</button>
    </div>

  );
}

export default CardProductEdit;