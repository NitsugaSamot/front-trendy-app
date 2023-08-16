import { Routes, Route, useLocation } from "react-router-dom";
import AuthLayout from "./contextlogin/layouts/AuthLayout";
import ProtectedRoutes from "./components/Layouts/ProtectedRoutes";
import Home from "./views/home/home";
import Detail from "./views/detail/detail";
import CreateProduct from "./views/createProduct/createProduct";
import Nav from "./components/nav/nav";
import { Login } from "./components/Login/Login";
import Register from "./components/Login/Register";
import ConfirmAccount from "./components/Login/ConfirmAccount";
import ForgetPassword from "./components/Login/ForgetPassword";
import { NewPassword } from "./components/Login/NewPassword";
import { AuthProvider } from "./contextlogin/context/AuthProvider";
import ContextUser from "./components/carrito/ContextUser";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getAllClothes } from "./redux/actions";
import { initializeCart } from "../src/redux/actions";
import ConfirmationPage from "./MercadoPago/confirmationPage";
import "./App.css";

function App() {
  const dispatch = useDispatch();

  const storedCart = JSON.parse(localStorage.getItem("cart")) || [];

  useEffect(() => {
    dispatch(getAllClothes());
    dispatch(initializeCart(storedCart));
  }, [dispatch, storedCart]);

  const location = useLocation();

  // Define las rutas en las que no quieres mostrar el componente Nav
  const pathsWithoutNav = ["/login", "/register", "/confirm", "/logged_in"];

  const shouldShowNav = !pathsWithoutNav.some((path) =>
    location.pathname.startsWith(path)
  );

  return (
    <div>
      <AuthProvider>
        {shouldShowNav && <Nav />}

        <Routes>
          <Route path="/" element={<AuthLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="detail/:id" element={<Detail />} />
            <Route path="create" element={<CreateProduct />} />
            <Route path="login" element={<Login />} />
            <Route path="login/register" element={<Register />} />
            <Route path="confirm/:id" element={<ConfirmAccount />} />
            <Route path="reset-password" element={<ForgetPassword />} />
            <Route path="new-password/:token" element={<NewPassword />} />
            <Route path="/confirmation" element={<ConfirmationPage />} />

            <Route />
            <Route path="/logged_in" element={<ProtectedRoutes />}>
              <Route index element={<ContextUser />} />
            </Route>
          </Route>
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
