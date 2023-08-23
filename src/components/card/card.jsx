import { NavLink } from "react-router-dom";
import  Card  from "react-bootstrap/Card";
import Image from "react-bootstrap/Image"
import './card.css'

const Cards = ({ image, id, name, price, productbrand }) => {

  return (
    <Card style={{width:"15rem", height: '25rem'}}>
      <NavLink to={`/detail/${id}`}>
        <h2 className="price">$ {price}</h2>
        <hr />
        <Image src={image[0]} alt={name} rounded style={{width: '13rem', marginTop: '1rem'}}/>
        <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Subtitle style={{color: 'black'}}>{productbrand}</Card.Subtitle>
        </Card.Body>
      </NavLink>
    </Card>
  );
};

export default Cards;
