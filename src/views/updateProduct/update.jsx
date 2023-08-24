import { useEffect, useState } from "react";
import axios from "axios";
import CardProductEdit from "../../components/cardProductEdit/cardProductEdit";
import Table from "react-bootstrap/Table";
const Update = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [showProduct, setShowProduct] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://back-trendy-app.up.railway.app/products"
        );
        const { data } = response;
        setAllProducts(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [refreshKey]);

  const handleProduct = (event) => {
    const productId = Number(event.target.value);
    const selectedProduct = allProducts.find(
      (product) => product.id === productId
    );
    setShowProduct(selectedProduct);
    if(isEditing) {
      setIsEditing(false);
    } else {
      setIsEditing(true);
    }
    
  };

  const triggerDataRefresh = () => {
    setRefreshKey((prevKey) => prevKey + 1);
  };

  return (
    <div>
      <div>
        {isEditing && (
          <CardProductEdit
            showProduct={showProduct}
            onSuccessfulUpdate={triggerDataRefresh}
          />
        )}
      </div>

      <Table striped bordered hover size="sm" variant="dark">
        <thead style={{ backgroundColor: "#212529" }}>
          <th>Id</th>
          <th>Name</th>
          <th>Brand</th>
          <th>Price</th>
          <th>/Stock S {<br />}White</th>
          <th>Black</th>
          <th>Grey</th>
          <th>/ Stock M {<br />}White</th>
          <th>Black</th>
          <th>Grey</th>
          <th>/ Stock L {<br />}White</th>
          <th>Black</th>
          <th>Grey</th>
          <th>/ Stock Xl {<br />}White</th>
          <th>Black</th>
          <th>Grey</th>
        </thead>

        <tbody>
          {allProducts?.map((product, index) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>{product.brand}</td>
              <td>{product.price}</td>
              <td>{product.stock.s.blanco}</td>
              <td>{product.stock.s.negro}</td>
              <td>{product.stock.s.gris}</td>
              <td>{product.stock.m.blanco}</td>
              <td>{product.stock.m.negro}</td>
              <td>{product.stock.m.gris}</td>
              <td>{product.stock.l.blanco}</td>
              <td>{product.stock.l.negro}</td>
              <td>{product.stock.l.gris}</td>
              <td>{product.stock.xl.blanco}</td>
              <td>{product.stock.xl.negro}</td>
              <td>{product.stock.xl.gris}</td>
              <button
                style={{ margin: "2px" }}
                value={product.id}
                onClick={handleProduct}
              >
                Edit Stock
              </button>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Update;