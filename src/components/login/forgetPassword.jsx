import { Link } from "react-router-dom";
import { useState } from "react";
import Alert from "../alert/alert";
import axios from "axios";
// import axiosClient from "../../contextClient/config/axiosClient";
import "./styles.css";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [alert, setAlert] = useState({});

  const handleInputChange = (e, setState) => {
    // Eliminar espacios en blanco al principio y al final del valor
    const value = e.target.value.trim();
    setState(value);
  };

  const handleSubmit = async (e) => {
    console.log("hola");
    e.preventDefault();

    if ([email].includes("")) {
      setAlert({
        msg: "Debes introducir el email de registro para poder acceder a la recuperación de tu password",
        error: true,
      });
      return;
    }

    try {
      const { data } = await axios.post(
        "https://back-trendy-app.up.railway.app/users/reset-password",
        {
          email,
        }
      );

      setAlert({
        msg: data.msg,
        error: false,
      });

      // setEmail('');
    } catch (error) {
      setAlert({
        msg: error.response.data.msg,
        error: true,
      });
    }
  };

  const { msg } = alert;

  return (
    <>
      <div className="mainRegister">
        <h3 className="titleLogin">
          Recupera el acceso a tu cuenta de Trendy-Spot
        </h3>

        {msg && <Alert alerta={alert} />}

        <form action="" className="formRegister" onSubmit={handleSubmit}>
          <div className="columna">
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
          </div>

          {/* <div className="columna">
          <img src={imageLogo} alt="logo-home" className="logoRegister" />
        </div> */}

          <input
            type="submit"
            value="Enviar instrucciones"
            className="btnCreateAccount"
          />
        </form>

        <nav className="navRegister">
          <Link className="linksRegister" to="/login">
            ¿Tienes una cuenta? Inicia Sesión
          </Link>
          <Link className="linksRegister" to="/login/register">
            ¿No tienes una cuenta? Registrate
          </Link>
        </nav>
      </div>
    </>
  );
};

export default ForgetPassword;
