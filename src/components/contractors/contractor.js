import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Spinner, Alert } from "react-bootstrap";
import { users } from "../../utils/axios"; // Ensure correct path for axios import
import "./contractor.css";
import { useNavigate } from "react-router-dom";

const ContractorsList = () => {
  const [contractors, setContractors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Add this inside the component

  useEffect(() => {
    const fetchContractors = async () => {
      try {
        const response = await users.get("?role=contractor");
        setContractors(response.data.results);
      } catch (err) {
        setError("Failed to fetch contractors. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchContractors();
  }, []);

  return (
    <div>
      <div className="background-contractor">
        <h2 className="text-center text-warning mb-4 pt-4">Top Contractors</h2>
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
            {contractors.length > 0 ? (
              contractors.map((contractor, index) => (
                <Col key={index} md={6} lg={4} xl={3} className="mb-4">
                  <Card
                    onClick={() => navigate(`/contractors/${contractor.id}`)}
                    style={{
                      backgroundColor: "#1a1a1a",
                      color: "#ff6600",
                      borderRadius: "10px",
                    }}
                    className="shadow-lg"
                  >
                    <Card.Img
                      variant="top"
                      src={contractor.avatar || "default-avatar.jpg"}
                      alt={contractor.name}
                      style={{
                        height: "200px",
                        objectFit: "cover",
                        borderTopLeftRadius: "10px",
                        borderTopRightRadius: "10px",
                      }}
                    />
                    <Card.Body>
                      <Card.Title className="text-center fw-bold">
                        {contractor.name}
                      </Card.Title>
                      <Card.Text className="text-center">
                        {contractor.agencyName || contractor.email}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              ))
            ) : (
              <p className="text-center text-muted">No contractors found.</p>
            )}
          </Row>
        )}
      </Container>
    </div>
  );
};

export default ContractorsList;
