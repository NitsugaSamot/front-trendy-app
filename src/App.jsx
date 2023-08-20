import { Routes, Route, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import Home from "./views/home/home";
import Detail from "./views/detail/detail";
import CreateProduct from "./views/createProduct/createProduct";
import Login from "./components/login/login";
import Nav from "./components/nav/nav";
import Register from "./components/login/register";
import AuthLayout from "./contextClient/layoutClient/authLayoutClient";
import ProtectedRoutes from "./components/layouts/protectedRoutes";
import ConfirmAccount from "./components/login/confirmAccount";
import ConfirmationPage from "./mercadoPago/confirmationPage";
import ForgetPassword from "./components/login/forgetPassword";
import NewPassword from "./components/login/newPassword";
import { AuthProvider } from "./contextClient/context/authProvider";
import ContextUser from "./components/cart/contextUser";
import { getAllClothes, initializeCart } from "./redux/actions";
import "./App.css";
import Sidebar from "./views/dashboard/sidebar/sidebar";
import Inicio from "./views/dashboard/pages/inicio";
import Clients from "./views/dashboard/pages/clients";
import Sales from "./views/dashboard/pages/sales";
import Coments from "./views/dashboard/pages/coments";
import UpdateProduct from "./views/dashboard/pages/updateProduct";

function App() {
  const dispatch = useDispatch();

  const storedCart = JSON.parse(localStorage.getItem("cart")) || [];

  useEffect(() => {
    dispatch(getAllClothes());
    dispatch(initializeCart(storedCart));
  }, [dispatch, storedCart]);

  const location = useLocation();

  // Define las rutas en las que no quieres mostrar el componente Nav
  const pathsWithoutNav = ["/login", "/register", "/confirm", "/logged_in", '/dashboard'];

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
          <Route path="/dashboard" element={<Sidebar />}>
            <Route index element={< Inicio /> }/> 
            <Route path="usuarios" element={<Clients />} />
            <Route path="ventas" element={<Sales />} /> 
            <Route path="comentarios" element={<Coments />} />
            <Route path="products" element={<UpdateProduct />} />
          </Route>
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
