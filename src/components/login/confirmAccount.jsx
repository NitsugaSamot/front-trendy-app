import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Alert from "../alert/alert";
import axios from "axios";
// import axiosClient from "../../contextClient/config/axiosClient";
import "./styles.css";

const ConfirmAccount = () => {
  const [alert, setAlert] = useState({});
  const [accountConfirmated, setAccountConfirmated] = useState(false);

  const params = useParams();
  const { id } = params; //desestructuramos extrayendo id de params

  useEffect(() => {
    const confirmAccount = async () => {
      try {
        // const url = `https://back-trendy-app.up.railway.app/users/confirm/${id}`;
        const { data } = await axios.post(
          `https://back-trendy-app.up.railway.app/users/confirm`
        );

        console.log(data);
        setAlert({
          msg: data.msg,
          error: false,
        });
        setAccountConfirmated(true);
      } catch (error) {
        setAlert({
          msg: error.response.data.error,
          error: true,
        });
      }
    };
    confirmAccount();
  }, []);

  const { msg } = alert;

  return (
    <>
      <div>Confirm Account</div>

      <div className="mt-20 md:mt-10 shadow-lg px-5 py-10 rounded-xl bg-white">
        {msg && <Alert alerta={alert} />}

        {accountConfirmated && (
          <Link
            className="block text-center my-5 text-slate-500 uppercase text-sm"
            to="/login"
          >
            Log In
          </Link>
        )}
      </div>
    </>
  );
};

export default ConfirmAccount;
