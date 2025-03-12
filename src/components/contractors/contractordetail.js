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
  FaBuilding,
  FaMapMarkerAlt,
  FaStar,
} from "react-icons/fa";

const ContractorDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [contractor, setContractor] = useState(null);
  const [propertiesList, setPropertiesList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchContractor = async () => {
      try {
        const response = await users.get(`/${id}`);
        setContractor(response.data);

        // Contractor ki properties fetch karni hain
        const propertiesResponse = await property.get(`/user/${id}`);
        setPropertiesList(propertiesResponse.data || []);
      } catch (err) {
        setError("Failed to fetch contractor details.");
      } finally {
        setLoading(false);
      }
    };

    fetchContractor();
  }, [id]);

  if (loading) return <Spinner animation="border" variant="warning" />;
  if (error) return <Alert variant="danger">{error}</Alert>;
  if (!contractor) return <p className="text-muted">Contractor not found.</p>;

  return (
    <Container className="py-5">
      {/* Profile Header */}
      <Row className="align-items-center bg-dark text-white p-4 rounded shadow-lg">
        <Col md={3} className="text-center">
          <Image
            src={contractor.avatar || "/default-avatar.jpg"}
            fluid
            style={{
              width: "150px",
              height: "150px",
              border: "5px solid orange",
            }}
          />
        </Col>
        <Col md={9}>
          <h2 className="text-warning fw-bold">{contractor.name}</h2>
          <p className="mb-1">
            <FaEnvelope className="text-orange me-2" /> {contractor.email}
          </p>
          <p className="mb-1">
            <FaPhone className="text-orange me-2" /> +{contractor.phoneNumber}
          </p>
          <p className="mb-0 text-warning fw-bold">
            {contractor.role.toUpperCase()}
          </p>
        </Col>
      </Row>

      {/* Agency Details */}
      <Row className="mt-4 bg-white p-4 rounded shadow-lg">
        <Col md={12}>
          <h4 className="fw-bold text-dark">
            <FaBuilding className="me-2 text-warning" /> {contractor.agencyName}
          </h4>
          <p className="text-muted">
            <FaMapMarkerAlt className="me-2 text-danger" />{" "}
            {contractor.agencyAddress[0]?.street},{" "}
            {contractor.agencyAddress[0]?.city},{" "}
            {contractor.agencyAddress[0]?.state},{" "}
            {contractor.agencyAddress[0]?.zipCode},{" "}
            {contractor.agencyAddress[0]?.country}
          </p>
          <p className="fw-bold text-dark">
            NTN:{" "}
            <span className="text-warning">{contractor.agencyNtnNumber}</span>
          </p>
        </Col>
      </Row>

      {/* Description, Ratings & Reviews */}
      <Row className="mt-4 bg-white p-4 rounded shadow-lg">
        <Col md={8}>
          <h5 className="text-dark fw-bold">About</h5>
          <p className="text-muted">{contractor.description}</p>
        </Col>
        <Col md={4} className="text-center">
          <h5 className="text-dark fw-bold">Rating & Reviews</h5>
          <p className="fw-bold text-warning">
            <FaStar /> <FaStar /> <FaStar /> <FaStar />{" "}
            <FaStar className="text-muted" /> (4.0/5)
          </p>
          <p className="text-muted">(25 Reviews)</p>
        </Col>
      </Row>

      {/* Contractor's Properties */}
      {propertiesList.length > 0 ? (
        <Row className="mt-4">
          <h4 className="text-dark fw-bold">Portfolio Listed</h4>
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
        <p className="text-muted mt-4">
          No properties listed by this contractor.
        </p>
      )}
    </Container>
  );
};

export default ContractorDetail;
