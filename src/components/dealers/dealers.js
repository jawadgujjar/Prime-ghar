import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Spinner, Alert } from "react-bootstrap";
import { Link } from "react-router-dom"; // Import Link
import { users } from "../../utils/axios"; // Ensure correct path for axios import
import "./dealer.css";

const DealersList = () => {
  const [dealers, setDealers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDealers = async () => {
      try {
        const response = await users.get("?role=dealer");
        setDealers(response.data.results);
      } catch (err) {
        setError("Failed to fetch dealers. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchDealers();
  }, []);

  return (
    <div>
      <div className="background-contractor">
        <h2 className="text-center text-warning mb-4 pt-4">
          Top Property Dealers
        </h2>
      </div>
      <Container className="py-5">
        {loading ? (
          <div className="text-center">
            <Spinner animation="border" variant="warning" />
          </div>
        ) : error ? (
          <Alert variant="danger" className="text-center">
            {error}
          </Alert>
        ) : (
          <Row className="justify-content-center">
            {dealers.length > 0 ? (
              dealers.map((dealer, index) => (
                <Col key={index} md={6} lg={4} xl={3} className="mb-4">
                  <Link to={`/dealers/${dealer.id}`} style={{ textDecoration: "none" }}>
                    <Card
                      style={{
                        backgroundColor: "#1a1a1a",
                        color: "#ff6600",
                        borderRadius: "10px",
                      }}
                      className="shadow-lg"
                    >
                      <Card.Img
                        variant="top"
                        src={dealer.avatar || "default-avatar.jpg"}
                        alt={dealer.name}
                        style={{
                          height: "200px",
                          objectFit: "cover",
                          borderTopLeftRadius: "10px",
                          borderTopRightRadius: "10px",
                        }}
                      />
                      <Card.Body>
                        <Card.Title className="text-center fw-bold">
                          {dealer.name}
                        </Card.Title>
                        <Card.Text className="text-center">
                          {dealer.agencyName || dealer.email}
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  </Link>
                </Col>
              ))
            ) : (
              <p className="text-center text-muted">
                No Property Dealers found.
              </p>
            )}
          </Row>
        )}
      </Container>
    </div>
  );
};

export default DealersList;
