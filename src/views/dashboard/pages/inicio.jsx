import logo from "../../../assets/trendy-spot-logo.png"
import Image from 'react-bootstrap/Image';

const Inicio = () => {
    return (
      <div>
        <Image src={logo} fluid/>
        <h1 style={{color: 'white'}}>Welcome</h1>
      </div>
    )
  }
   
  export default Inicio;