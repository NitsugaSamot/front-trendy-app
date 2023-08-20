import { Link as NavLink, Outlet } from "react-router-dom";
import { FaHome, FaUser, FaCommentDots, FaDollarSign } from "react-icons/fa";
import NavD from "../navD/navD";

import "./sidebar.css";
 
function Sidebar() {
  return (
    <div className="sidebar-container">

      <NavD />
      <div className="content-container">

        <div className="sidebar">
          <ul className="ul">
            <li className="li">
              <NavLink
                to="/dashboard"
                className="link-light"
              >
                <FaHome className="me-2 text-light" />HOME</NavLink>
            </li>
            <li className="li">
              <NavLink
                to="/dashboard/usuarios"
                className="link-light" >
                <FaUser className="me-2 text-light" /> USERS</NavLink>
            </li>
            <li className="li">
              <NavLink
                to="/dashboard/comentarios"
                className="link-light">
                <FaCommentDots className="me-1 text-light" />COMMENTS</NavLink>
            </li>
            <li className="li">
              <NavLink
                to="/dashboard/ventas"
                className="link-light" >
                <FaDollarSign className="me-2" /> SALES</NavLink>
            </li>
            <li className="li">
              <NavLink
                to="/dashboard/products"
                className="link-light" >
                <FaDollarSign className="me-2" /> Products</NavLink>
            </li>
          </ul>
        </div>

        <div className="content">
          <Outlet />

        </div>
      </div>
    </div>
  );
}

export default Sidebar;