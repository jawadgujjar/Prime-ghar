import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import "./dealer.css";

const dealers = [
  { name: "Usman Traders", location: "Lahore, Pakistan", image: "dealer.jpg" },
  { name: "Ali Property", location: "Karachi, Pakistan", image: "dealer.jpg" },
  {
    name: "Zain Realtors",
    location: "Islamabad, Pakistan",
    image: "dealer.jpg",
  },
  {
    name: "Ahmad Estates",
    location: "Faisalabad, Pakistan",
    image: "dealer.jpg",
  },
];

const DealersList = () => {
  return (
    <div>
      {" "}
      <div className="background-dealer">
        <h2 className="text-center text-warning mb-4 pt-4">Top Dealers</h2>
      </div>
      <Container className="py-5">
        <Row className="justify-content-center">
          {dealers.map((dealer, index) => (
            <Col key={index} md={6} lg={4} xl={3} className="mb-4">
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
                  src={dealer.image}
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
                    {dealer.location}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default DealersList;
