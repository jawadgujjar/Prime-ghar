import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import { login, register } from "../../utils/axios"; // Axios instances for API calls

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
    navigate(isLogin ? "/signup" : "/login");
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      let response;
      if (isLogin) {
        response = await login.post("/login", {
          email: formData.email,
          password: formData.password,
        });
      } else {
        response = await register.post("/register", formData);
      }

      console.log("Response:", response.data);

      if (isLogin) {
        localStorage.setItem("token", response.data.tokens.access.token);
        localStorage.setItem("user", JSON.stringify(response.data.user)); // Save entire user object
        window.dispatchEvent(new Event("userLoggedIn")); // ✅ Dispatch event

        // Role-based navigation
        if (
          response.data.user.role === "dealer" ||
          response.data.user.role === "contractor"
        ) {
          navigate("/newdashboard"); // Dealer or contractor
        } else {
          navigate("/"); // Normal user
        }
      } else {
        navigate("/login"); // Redirect to login after successful signup
      }
    } catch (err) {
      console.error("Error:", err.response?.data?.message || err.message);
      setError(err.response?.data?.message || "Something went wrong.");
    }
  };

  return (
    <Container
      fluid
      className="d-flex justify-content-center align-items-center vh-100"
      style={{ backgroundColor: "#000" }}
    >
      <Row>
        <Col md={12}>
          <Card
            style={{
              width: "400px",
              backgroundColor: "#1a1a1a",
              color: "#ff6600",
              borderRadius: "10px",
            }}
            className="p-4 shadow-lg"
          >
            <Card.Body>
              <h3 className="text-center mb-4">
                {isLogin ? "Login" : "Sign Up"}
              </h3>
              {error && <p className="text-danger text-center">{error}</p>}
              <Form onSubmit={handleSubmit}>
                {!isLogin && (
                  <Form.Group className="mb-3">
                    <Form.Label>Full Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      placeholder="Enter your name"
                      className="bg-dark text-light border-0"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                )}
                <Form.Group className="mb-3">
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    placeholder="Enter email"
                    className="bg-dark text-light border-0"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    placeholder="Enter password"
                    className="bg-dark text-light border-0"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Button
                  type="submit"
                  variant="warning"
                  className="w-100 mb-3 fw-bold"
                >
                  {isLogin ? "Login" : "Sign Up"}
                </Button>
              </Form>
              <p className="text-center">
                {isLogin
                  ? "Don't have an account? "
                  : "Already have an account? "}
                <span
                  className="text-warning fw-bold"
                  style={{ cursor: "pointer" }}
                  onClick={toggleAuthMode}
                >
                  {isLogin ? "Sign Up" : "Login"}
                </span>
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AuthPage;
