import { FaStore, FaPhone } from "react-icons/fa"
import {MdEmail} from "react-icons/md"
import "./footer.css"; 
import image from "../../assets/trendy-spot-logo.png"

const Footer = () => {
  return (
    <div className="footer">
      <div className="top-bar">
        <img id="logo" src={image} alt="Logo de la empresa" />
        <footer className="menu">
          <ul>
            <li>Home</li>
            <li>Us</li>
            <li>Contact</li>
          </ul>
        </footer>
      </div>
      <div className="main-section">
        <div className="about-us">
          <h3>About us</h3>
          <p>Somos una empresa especializada en la venta de productos deportivos de alta calidad. Nuestro objetivo es brindar soluciones excepcionales para mejorar tu rendimiento y disfrutar al máximo de tu pasión por el deporte.</p>
        </div>
        <div className="contact-us">
          <h3>Contáctanos</h3>
          <FaStore /> <span>Calle Roca 123, Ciudad Corrientes, País Argentina</span><br />
          <FaPhone/>  <span>+00 000 000 000</span><br />
          <MdEmail/> <span>info@empresa.com</span><br />
        </div>
      </div>
      <div className="bottom-bar">
        <i className="fab fa-facebook-f"></i>
        <i className="fab fa-twitter"></i>
        <i className="fab fa-instagram"></i>
        <i className="fab fa-linkedin-in"></i>
        <a id="back-to-top" href="#"><i className="fas fa-angle-up"></i></a>
      </div>
      <div className="copy-right">
        <span> &copy;2023 Trendy Spot, todos los derechos reservados.</span>
      </div>
    </div>
  );
};

export default Footer;