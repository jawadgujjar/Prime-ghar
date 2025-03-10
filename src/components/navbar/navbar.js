import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";

function NavScrollExample() {
  return (
    <Navbar
      expand="lg"
      className="bg-body-tertiary"
      style={{
        padding: "1rem",
      }}
    >
      <Container fluid>
        <Navbar.Brand as={Link} to="/">
          Prime Ghar
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto"
            style={{ maxHeight: "100px" }}
            navbarScroll
          ></Nav>
          <Nav
            className="me-auto"
            style={{
              maxHeight: "100px",
              display: "flex",
              gap: "2rem",
              fontSize: "1.2rem",
            }}
            navbarScroll
          >
            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/dealers">
              Dealers
            </Nav.Link>
            <Nav.Link as={Link} to="/contractors">
              Contractors
            </Nav.Link>
            <Nav.Link as={Link} to="/login">
              Login
            </Nav.Link>{" "}
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
