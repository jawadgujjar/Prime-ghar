import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
    navigate(isLogin ? "/signup" : "/login"); // Navigation between Login and Signup
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
              <Form>
                {!isLogin && (
                  <Form.Group className="mb-3">
                    <Form.Label>Full Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter your name"
                      className="bg-dark text-light border-0"
                    />
                  </Form.Group>
                )}
                <Form.Group className="mb-3">
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    className="bg-dark text-light border-0"
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter password"
                    className="bg-dark text-light border-0"
                  />
                </Form.Group>
                <Button variant="warning" className="w-100 mb-3 fw-bold">
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
