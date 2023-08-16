import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Alert from "../alert/alert";
import axiosClient from "../../contextClient/config/axiosClient";
import imageLogo from "../../assets/trendy-spot-logo.png";
import "./styles.css";

const NewPassword = () => {
  const [password, setPassword] = useState("");
  const [validToken, setValidToken] = useState(false);
  const [alert, setAlert] = useState({});
  const [passwordModified, setPasswordModified] = useState(false);

  const params = useParams();
  const { token } = params;

  useEffect(() => {
    const testToken = async () => {
      try {
        await axiosClient(`/users/reset-password/${token}`);
        setValidToken(true);
      } catch (error) {
        setAlert({
          msg: error.response.data.msg,
          error: true,
        });
      }
    };
    testToken();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password.length < 6) {
      setAlert({
        msg: "El Password debe tener al menos 6 caracteres",
        error: true,
      });
      return;
    }
    try {
      const url = `/users/reset-password/${token}`;

      const { data } = await axiosClient.post(url, { password });
      setAlert({
        msg: data.msg,
        error: false,
      });
      setPassword("");
      setPasswordModified(true);
    } catch (error) {
      setAlert({
        msg: error.response.data.msg,
        error: true,
      });
    }
  };
  const handleInputChange = (e, setState) => {
    // Eliminar espacios en blanco al principio y al final del valor
    const value = e.target.value.trim();
    setState(value);
  };

  const { msg } = alert;

  return (
    <>
      <div className="mainRegister">
        <h3 className="titleLogin">Crea una cuenta para hacer tu compra</h3>

        {msg && <Alert alerta={alert} />}

        {validToken && (
          <form action="" className="formRegister" onSubmit={handleSubmit}>
            <div className="columna">
              <div className="divInput">
                <label className="label" htmlFor="password">
                  Nuevo Password
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
            </div>

            <div className="columna">
              <img src={imageLogo} alt="logo-home" className="logoRegister" />
            </div>

            <input
              type="submit"
              value="Crear nuevo password"
              className="btnCreateAccount"
            />
          </form>
        )}

        {passwordModified && (
          <Link className="linksRegister" to="/login">
            Inicia Sesión
          </Link>
        )}
      </div>
    </>
  );
};

export default NewPassword;