import { Container, Nav, Navbar } from "react-bootstrap";
import Logo from "/public/Logo.png";
import { useLocation, useNavigate } from "react-router-dom";
const DefaultNavbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isActive = (path) => location.pathname === path;
  return (
    <div>
      <Navbar expand="lg" className="bg-body-light border-bottom ">
        <Container>
          <Navbar.Brand href="" className="fw-bold fs-6">
            <img
              src={Logo}
              alt="Logo"
              width="30"
              height="30"
              className=" d-inline-block align-top  me-2"
              onClick={() => navigate("/dashboard-home")}
            />
            SIMS PPOB
          </Navbar.Brand>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto fs-6 fw-bold">
              <Nav.Link
                className={isActive("/top-up") ? "text-warning" : ""}
                href=""
                onClick={() => navigate("/top-up")}
              >
                Top Up
              </Nav.Link>
              <Nav.Link
                href=""
                className={isActive("/riwayat-transaksi") ? "text-warning" : ""}
                onClick={() => navigate("/riwayat-transaksi")}
              >
                Transaction
              </Nav.Link>
              <Nav.Link
                href=""
                className={isActive("/akun") ? "text-warning" : ""}
                onClick={() => navigate("/profilku")}
              >
                Akun
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};
export default DefaultNavbar;
