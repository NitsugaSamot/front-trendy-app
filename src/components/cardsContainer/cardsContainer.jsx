import Cards from "../card/card.jsx";
import Row from 'react-bootstrap/Row';

const cardsContainer = ({currentProduct}) => {
    return (
        <Row xs={1} md={2} className="g-1">
        {currentProduct?.map((product) => (
            <Cards 
              key={product.id}
              id={product.id}
              name={product.name}
              image={product.image}
              price={product.price}
              productbrand={product.productbrand}
            />
        ))}
      </Row>
    )
};

export default cardsContainer;