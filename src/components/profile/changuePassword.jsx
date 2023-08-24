import { useState } from "react";
import ProfileNav from "./profileNav";
import Alert from "../alert/alert";
import useAuth from "../../contextClient/hooks/useAuth";
import Purchases from "./purchases";
import "./profileStyles.css";

const ChangePassword = () => {
  const { updatePassword } = useAuth();

  const [alerta, setAlerta] = useState({});
  const [password, setPassword] = useState({
    pwd_curr: "",
    pwd_new: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (Object.values(password).some((campo) => campo === "")) {
      setAlerta({
        msg: "Todos los campos son obligatorios",
        error: true,
      });
      return;
    }

    if (password.pwd_new.length < 6) {
      setAlerta({
        msg: "El Password debe tener al menos 6 caracteres",
        error: true,
      });
      return;
    }

    const response = await updatePassword(password);

    setAlerta(response);
  };

  const { msg } = alert;

  return (
    <>
      <ProfileNav />

      {msg && <Alert alerta={alerta} />}
      <form className="profileForm" onSubmit={handleSubmit} action="">
        <div className="column">
          <label className="label" htmlFor="">
            Current password
          </label>

          <input
            type="password"
            className="inputProfile"
            name="pwd_curr"
            placeholder="Write your current password"
            onChange={(e) =>
              setPassword({
                ...password,
                [e.target.name]: e.target.value,
              })
            }
          />
        </div>

        <div className="column">
          <label className="label" htmlFor="">
            New password
          </label>

          <input
            type="password"
            className="inputProfile"
            name="pwd_new"
            placeholder="Write your current password"
            onChange={(e) =>
              setPassword({
                ...password,
                [e.target.name]: e.target.value,
              })
            }
          />
        </div>

        <div>
          <input
            className="btnEditProfile"
            type="submit"
            value="Update password"
          />
        </div>
      </form>
      <div className="divPurchases">
        <Purchases />
      </div>
    </>
  );
};

export default ChangePassword;
