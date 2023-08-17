import { useState } from "react";
import { Link } from "react-router-dom";
import Alert from "../alert/alert";
import axios from "axios";
// import axiosClient from "../../contextClient/config/axiosClient";
import imageLogo from "../../assets/trendy-spot-logo.png";
import "./styles.css";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repetirPassword, setRepetirPassword] = useState("");
  const [alert, setAlert] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    if ([name, email, password, repetirPassword].includes("")) {
      setAlert({
        msg: "Todos los campos son obligatorios",
        error: true,
      });
      return;
    }

    if (password !== repetirPassword) {
      setAlert({
        msg: "Los Passwords no coinciden",
        error: true,
      });
      return;
    }

    if (password.length < 6) {
      setAlert({
        msg: "El Password debe tener al menos 6 caracteres",
        error: true,
      });
      return;
    }

    setAlert({});

    // Crear usuario de la api

    try {
      const { data } = await axios.post(
       "https://back-trendy-app.up.railway.app/users",
        {
          name,
          email,
          password,
        }
      );

      setAlert({
        msg: data.msg,
        error: false,
      });

      setName("");
      setEmail("");
      setPassword("");
      setRepetirPassword("");
    } catch (error) {
      setAlert({
        msg: error.response.data.error,
        error: true,
      });
    }
  };

  const handleInputChange = (e, setState) => {
    // Eliminar espacios en blanco al principio y al final del valor
    const value = e.target.value.trim();
    setState(value);
  };

  setTimeout(() => {
    setAlert({});
  }, 6000);

  const { msg } = alert;

  return (
    <>
      <div className="mainRegister">
        <h3 className="titleLogin">Crea una cuenta para hacer tu compra</h3>

        {msg && <Alert alerta={alert} />}

        <form action="" className="formRegister" onSubmit={handleSubmit}>
          <div className="columna">
            <div className="divInput">
              <label className="label" htmlFor="name">
                Name
              </label>
              <input
                id="name"
                type="text"
                placeholder="Tu name"
                className="input"
                value={name}
                onChange={(e) => handleInputChange(e, setName)}
              />
            </div>

            <div className="divInput">
              <label className="label" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="Email de Registro"
                className="input"
                value={email}
                onChange={(e) => handleInputChange(e, setEmail)}
              />
            </div>

            <div className="divInput">
              <label className="label" htmlFor="password">
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="Password"
                className="input"
                value={password}
                onChange={(e) => handleInputChange(e, setPassword)}
              />
            </div>

            <div className="divInput">
              <label className="label" htmlFor="password">
                Repetir Password
              </label>
              <input
                id="password2"
                type="password"
                placeholder="Repetir tu Password"
                className="input"
                value={repetirPassword}
                onChange={(e) => handleInputChange(e, setRepetirPassword)}
              />
            </div>
          </div>

          <div className="columna">
            <img src={imageLogo} alt="logo-home" className="logoRegister" />
          </div>

          <input
            type="submit"
            value="Crear Cuenta"
            className="btnCreateAccount"
          />
        </form>

        <nav className="navRegister">
          <Link className="linksRegister" to="/login">
            ¿Tienes una cuenta? Inicia Sesión
          </Link>
          <Link className="linksRegister" to="/olvide-password">
            Olvidé Mi Password
          </Link>
        </nav>
      </div>
    </>
  );
};

export default Register;