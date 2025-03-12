import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

function NavScrollExample() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Function to get user from localStorage
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

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("user");
    window.dispatchEvent(new Event("userLoggedOut"));
    navigate("/");
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Brand
          as={Link}
          to={
            user && (user.role === "dealer" || user.role === "contractor")
              ? "/newdashboard"
              : "/"
          }
        >
          <img
            style={{ width: "8rem", height: "7rem" }}
            alt="logo"
            src="primeghar.png"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto" navbarScroll></Nav>
          <Nav
            className="me-auto"
            style={{ display: "flex", gap: "2rem", fontSize: "1.2rem" }}
            navbarScroll
          >
            <Nav.Link
              as={Link}
              to={
                user && (user.role === "dealer" || user.role === "contractor")
                  ? "/newdashboard"
                  : "/"
              }
            >
              Home
            </Nav.Link>

            {/* ✅ Show 'My Listing' if user is dealer/contractor */}
            {user && (user.role === "dealer" || user.role === "contractor") ? (
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

            {user ? (
              <div className="d-flex align-items-center gap-3">
                {user.avatar && (
                  <img
                    src={user.avatar}
                    alt="User Avatar"
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "50%",
                      objectFit: "cover",
                    }}
                  />
                )}
                <span>{user.name}</span>
                <Button
                  variant="outline-danger"
                  size="sm"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </div>
            ) : (
              <Nav.Link as={Link} to="/login">
                Login
              </Nav.Link>
            )}
          </Nav>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Type Location Here"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success">Search</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavScrollExample;
