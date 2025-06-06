import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Image,
  Spinner,
  Alert,
  Card,
  Button,
} from "react-bootstrap";
import { users, property } from "../../utils/axios";
import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaStar,
  FaBuilding,
  FaClipboardList,
} from "react-icons/fa";

const DealerDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [dealer, setDealer] = useState(null);
  const [propertiesList, setPropertiesList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDealerDetails = async () => {
      try {
        const response = await users.get(`/${id}`);
        setDealer(response.data);

        const propertiesResponse = await property.get(`/user/${id}`);
        setPropertiesList(propertiesResponse.data || []);
      } catch (err) {
        setError("Failed to fetch dealer details. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchDealerDetails();
  }, [id]);

  if (loading) return <Spinner animation="border" variant="warning" />;
  if (error) return <Alert variant="danger">{error}</Alert>;
  if (!dealer) return <p className="text-muted">Dealer not found.</p>;

  return (
    <Container className="py-5">
      {/* Dealer Profile */}
      <Row className="align-items-center bg-white shadow p-4 rounded mb-4">
        <Col md={3} className="text-center">
          <Image
            src={dealer.avatar || "/default-avatar.jpg"}
            fluid
            className="rounded-circle border border-warning"
            style={{ width: "150px", height: "150px" }}
          />
        </Col>
        <Col md={9}>
          <h2 className="fw-bold text-primary">{dealer.name}</h2>
          <p>
            <FaEnvelope className="me-2 text-secondary" /> {dealer.email}
          </p>
          <p>
            <FaPhone className="me-2 text-secondary" /> +{dealer.phoneNumber}
          </p>
          <p className="fw-bold text-muted">{dealer.role?.toUpperCase()}</p>
        </Col>
      </Row>

      {/* Dealer Stats */}
      <Row className="text-center bg-light p-3 rounded shadow mb-4">
        <Col md={4}>
          <FaBuilding className="text-primary fs-1" />
          <h5 className="fw-bold mt-2">{dealer.agencyName}</h5>
        </Col>
        <Col md={4}>
          <FaClipboardList className="text-success fs-1" />
          <h5 className="fw-bold mt-2">Listings: {propertiesList.length}</h5>
        </Col>
        <Col md={4}>
          <FaStar className="text-warning fs-1" />
          <h5 className="fw-bold mt-2">
            Rating: {dealer.rating || "No Ratings"}
          </h5>
        </Col>
      </Row>

      {/* Property Listings */}
      <h4 className="fw-bold text-dark mt-4">Properties Listed</h4>
      <Row>
        {propertiesList.length > 0 ? (
          propertiesList.map((property) => (
            <Col md={4} key={property.id} className="mb-4">
              <Card
                className="shadow-sm border-0 hover-effect"
                onClick={() => navigate(`/propertydetail/${property.id}`)}
              >
                <Card.Img
                  variant="top"
                  src={property.images?.[0] || "/default-property.jpg"}
                  style={{ height: "200px", objectFit: "cover" }}
                />
                <Card.Body>
                  <Card.Title className="fw-bold text-primary">
                    {property.title}
                  </Card.Title>
                  <Card.Text className="text-muted">
                    <FaMapMarkerAlt className="me-2 text-danger" />
                    {property.location?.address || "Unknown"}
                  </Card.Text>
                  <p className="fw-bold">
                    Price: Rs {property.price.toLocaleString()}
                  </p>
                  <Button variant="outline-primary" size="sm">
                    View Details
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <p className="text-muted mt-4">
            No properties listed by this dealer.
          </p>
        )}
      </Row>
    </Container>
  );
};

export default DealerDetails;
