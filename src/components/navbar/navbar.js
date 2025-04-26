import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Navbar,
  Nav,
  Container,
  Button,
} from "react-bootstrap";
import { FaWhatsapp } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import "./navbar.css";

function NavScrollExample() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const fetchUser = () => {
    const storedUser = localStorage.getItem("user");
    setUser(storedUser ? JSON.parse(storedUser) : null);
  };

  useEffect(() => {
    fetchUser();

    const handleUserChange = () => fetchUser();
    window.addEventListener("userLoggedIn", handleUserChange);
    window.addEventListener("userLoggedOut", handleUserChange);

    return () => {
      window.removeEventListener("userLoggedIn", handleUserChange);
      window.removeEventListener("userLoggedOut", handleUserChange);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.dispatchEvent(new Event("userLoggedOut"));
    navigate("/");
  };

  return (
    <Navbar expand="lg" className="custom-navbar shadow-sm" sticky="top">
      <Container fluid>
        <Navbar.Brand as={Link} to={user?.role ? "/dashboard" : "/"}>
          <img
            src="primeghar.png"
            alt="Prime Ghar"
            style={{ width: "8rem", height: "auto" }}
          />
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav className="me-auto align-items-lg-center gap-lg-4 nav-links">
            <Nav.Link as={Link} to={user?.role ? "/dashboard" : "/"}>
              Home
            </Nav.Link>
            {user?.role === "dealer" || user?.role === "contractor" ? (
              <Nav.Link as={Link} to="/newdashboard">
                My Listing
              </Nav.Link>
            ) : (
              <>
                <Nav.Link as={Link} to="/dealers">
                  Dealers
                </Nav.Link>
                <Nav.Link as={Link} to="/contractors">
                  Contractors
                </Nav.Link>
              </>
            )}
          </Nav>

          {user ? (
            <Nav className="d-flex align-items-center gap-3">
              <div className="d-flex align-items-center gap-2 user-box">
                {user.avatar && (
                  <img
                    src={user.avatar}
                    alt="Avatar"
                    className="avatar-img"
                  />
                )}
                <span className="user-name">{user.name}</span>
              </div>

              {/* WhatsApp & Email Icons */}
              <a
                href="https://wa.me/yourNumberHere"
                target="_blank"
                rel="noopener noreferrer"
                className="icon-link"
              >
                <FaWhatsapp size={28} style={{ color: "#25d366" }} />
              </a>
              <a
                href="mailto:your@email.com"
                className="icon-link"
              >
                <MdEmail size={28} style={{ color: "#111" }} />
              </a>

              <Button
                variant="outline-danger"
                size="md"
                onClick={handleLogout}
                className="rounded-pill"
              >
                Logout
              </Button>
            </Nav>
          ) : (
            <Nav>
              <Nav.Link as={Link} to="/login">
                Login
              </Nav.Link>
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavScrollExample;
