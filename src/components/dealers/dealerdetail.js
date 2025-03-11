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
} from "react-bootstrap";
import { users, property } from "../../utils/axios";
import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaStar,
  FaBuilding,
  FaClipboardList,
  FaClipboardCheck,
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
      {/* Profile Header */}
      <Row className="align-items-center bg-dark text-white p-4 rounded shadow-lg mb-4">
        <Col md={3} className="text-center">
          <Image
            src={dealer.avatar || "/default-avatar.jpg"}
            fluid
            className="rounded-circle border border-warning"
            style={{ width: "150px", height: "150px" }}
          />
        </Col>
        <Col md={9}>
          <h2 className="text-warning fw-bold">{dealer.name}</h2>
          <p>
            <FaEnvelope className="text-orange me-2" /> {dealer.email}
          </p>
          <p>
            <FaPhone className="text-orange me-2" /> +{dealer.phoneNumber}
          </p>
          <p className="text-warning fw-bold">{dealer.role?.toUpperCase()}</p>
          <p className="text-light">
            {dealer.agencyAddress[0]?.street}, {dealer.agencyAddress[0]?.city},{" "}
            {dealer.agencyAddress[0]?.country}
          </p>
        </Col>
      </Row>

      {/* Dealer Information */}
      <Row className="bg-light p-4 rounded shadow-lg mb-4">
        <Col md={4} className="text-center border-end">
          <FaBuilding className="text-dark fs-1" />
          <h5 className="fw-bold mt-2">{dealer.agencyName}</h5>
        </Col>
        <Col md={4} className="text-center border-end">
          <FaClipboardList className="text-dark fs-1" />
          <h5 className="fw-bold mt-2">
            Total Listings: {propertiesList.length}
          </h5>
        </Col>
        <Col md={4} className="text-center">
          <FaStar className="text-warning fs-1" />
          <h5 className="fw-bold mt-2">
            Rating: {dealer.rating || "No Ratings"}
          </h5>
        </Col>
      </Row>
      <Row className="bg-light p-4 rounded shadow-lg mb-4">
        <Col md={6}>
          <h5 className="fw-bold">Agency NTN:</h5>
          <p>{dealer.agencyNtnNumber}</p>
        </Col>
        <Col md={6}>
          <h5 className="fw-bold">Description:</h5>
          <p>{dealer.description}</p>
        </Col>
      </Row>

      {/* Properties Listed */}
      {propertiesList.length > 0 ? (
        <Row className="mt-4">
          <h4 className="text-dark fw-bold">Properties Listed</h4>
          {propertiesList.map((property) => (
            <Col md={4} key={property.id} className="mb-4">
              <Card
                className="shadow-lg border-0"
                style={{ cursor: "pointer", backgroundColor: "#fff" }}
                onClick={() => navigate(`/propertydetail/${property.id}`)}
              >
                <Card.Img
                  variant="top"
                  src={property.images?.[0] || "/default-property.jpg"}
                  style={{ height: "200px", objectFit: "cover" }}
                />
                <Card.Body>
                  <Card.Title className="text-orange fw-bold">
                    {property.title}
                  </Card.Title>
                  <Card.Text className="text-muted">
                    <FaMapMarkerAlt className="me-2 text-danger" />
                    {property.location?.address || "Unknown"}
                  </Card.Text>
                  <p className="fw-bold">
                    Price: Rs {property.price.toLocaleString()}
                  </p>
                  <p className="text-success">
                    {property.isNegotiable ? "Negotiable" : "Fixed Price"}
                  </p>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      ) : (
        <p className="text-muted mt-4">No properties listed by this dealer.</p>
      )}
    </Container>
  );
};

export default DealerDetails;
