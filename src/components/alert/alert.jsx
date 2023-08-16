import "./alert.css";

const Alert = ({ alerta }) => {
  return (
    <div
      className={`${alerta.error ? "alertRed" : "alertOk"} bg-gradient-to-br`}
    >
      {alerta.msg}
    </div>
  );
};

export default Alert;
