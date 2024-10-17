import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/login";

import RegisterPage from "./pages/register";

import "bootstrap/dist/css/bootstrap.min.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import TopUp from "./pages/topup";
import DashboardLayouts from "./pages/Dashboars";
function App() {
  const routes = [
    {
      path: "/",
      element: <LoginPage></LoginPage>,
    },
    {
      path: "/register",
      element: <RegisterPage></RegisterPage>,
    },
    {
      path: "/dashboard-home",
      element: <DashboardLayouts></DashboardLayouts>,
    },
    {
      path: "/login",
      element: <LoginPage></LoginPage>,
    },
    {
      path: "/top-up",
      element: <TopUp></TopUp>,
    },
    {
      path: "*",
      element: <div>404 - Page Not Found</div>,
    },
  ];
  return (
    <Routes>
      {routes.map((route, index) => (
        <Route key={index} path={route.path} element={route.element} />
      ))}
    </Routes>
  );
}

export default App;
