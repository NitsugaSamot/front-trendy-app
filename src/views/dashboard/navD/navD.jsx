import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { NavLink } from "react-router-dom";
import logo from '../../../assets/trendy-spot-logo.png';
import './navD.css'
const NavD = () => {
    const [showOffcanvas, setShowOffcanvas] = useState(false);

    const handleToggleOffcanvas = () => {
        setShowOffcanvas(!showOffcanvas);
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-white">
            <div className="container-fluid" style={{marginLeft: '30px'}}>
               <NavLink to="/logged_in">
                <Button alt="logoHome"> Trendy-app </Button>
                </NavLink>       
                <NavLink to="/create">
                    <Button>Create Product</Button>
                </NavLink>
                <img src="https://img.freepik.com/foto-gratis/chico-worldface-espanol-fondo-blanco_53876-137665.jpg" alt="User" className="rounded-circle" />
                <Button variant="primary" onClick={handleToggleOffcanvas}>Lionel Messi</Button>
            </div>
            <Offcanvas show={showOffcanvas} onHide={handleToggleOffcanvas} placement="end">
                <hr />
                <p>Nombre: Lionel </p>
                <hr />
                <p>Apellido: Messi</p>
                <hr />
                <p>País: Argentina</p>
                <hr />
                <p>Email: messiloco@gmail.com</p>
            </Offcanvas>
        </nav>
    );
};

export default NavD;