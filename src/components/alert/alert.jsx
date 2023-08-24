import "./alert.css";

const Alert = ({ alert }) => {
  return (
    <div
      className={`${alert.error ? "alertRed" : "alertOk"} bg-gradient-to-br`}
    >
      {alert.msg}
    </div>
  );
};

export default Alert;
