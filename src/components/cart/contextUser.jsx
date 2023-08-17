import Home from "../../views/home/home";
import Nav from "../nav/nav";
import "./styles.css";

const ContextUser = () => {
  return (
    <>
      <div className="containerDiv">
        <Nav />
        <Home />
      </div>
    </>
  );
};

export default ContextUser;
