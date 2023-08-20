import { useEffect, useState } from "react";
import axios from 'axios';
import ProductCardAdmin from "../../components/productCardAdmin/productCardAdmin";
import CardProductEdit from "../../components/cardProductEdit/cardProductEdit";

const Update = () => {

  const [allProducts, setAllProducts] = useState([]);
  const [showProduct, setShowProduct] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://back-trendy-app.up.railway.app/products');
        const { data } = response;
        setAllProducts(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, [refreshKey]);

  const handleProduct = (event) => {
    const productId = Number(event.target.value);
    const selectedProduct = allProducts.find(product => product.id === productId);
    setShowProduct(selectedProduct);
    setIsEditing(true);
  }

  const triggerDataRefresh = () => {
    setRefreshKey(prevKey => prevKey + 1);
  };


  return (
    <div>
      <div>
        {allProducts?.map((product, index) => (
          <div key={product.id}>
            <ProductCardAdmin product={product} />
            <button value={product.id} onClick={handleProduct}>edit</button>
          </div>
        ))}
      </div>
      {isEditing && <div>
        <CardProductEdit showProduct={showProduct} onSuccessfulUpdate={triggerDataRefresh} />
      </div>}
    </div>
  );
}

export default Update;