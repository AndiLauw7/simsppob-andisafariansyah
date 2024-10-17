import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/login";
import RegisterPage from "./pages/register";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import TopUp from "./pages/topup";
import PembayaranBanner from "./pages/pembayaran-banner";
import DashboardLayouts from "./pages/Dashboars";
import RiwayatTransaksi from "./pages/riwayatTransaksi";
import ProfilKu from "./pages/profilku";
import ProfilKuUpdate from "./pages/editProfilku";
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
      path: "/pembayaran-banner",
      element: <PembayaranBanner></PembayaranBanner>,
    },
    {
      path: "/riwayat-transaksi",
      element: <RiwayatTransaksi></RiwayatTransaksi>,
    },
    {
      path: "/profilku",
      element: <ProfilKu></ProfilKu>,
    },
    {
      path: "/profilku-update",
      element: <ProfilKuUpdate></ProfilKuUpdate>,
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
