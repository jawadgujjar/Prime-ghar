import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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

const NewDashboard = () => {
  const navigate = useNavigate();
  const [dealer, setDealer] = useState(null);
  const [editableDealer, setEditableDealer] = useState({});
  const [propertiesList, setPropertiesList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editMode, setEditMode] = useState(false);

  const handleDelete = async (propertyId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this property?"
    );
    if (!confirmDelete) return;

    const token = localStorage.getItem("token");

    try {
      await property.delete(`/${propertyId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setPropertiesList((prev) => prev.filter((p) => p.id !== propertyId));
    } catch (err) {
      alert("Failed to delete property. Please authenticate.");
      console.error(err);
    }
  };

  const handleUpdate = async () => {
    const token = localStorage.getItem("token");
    
    // Only send fields that have changed
    const changes = {};
    Object.keys(editableDealer).forEach(key => {
      if (editableDealer[key] !== dealer[key]) {
        changes[key] = editableDealer[key];
      }
    });

    if (Object.keys(changes).length === 0) {
      setEditMode(false);
      return;
    }

    try {
      const response = await users.patch(`/${dealer.id}`, changes, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setDealer(response.data);
      localStorage.clear();
      window.location.reload();
      setEditMode(false);
    } catch (err) {
      alert("Failed to update profile.");
      console.error(err);
    }
  };

  const handleEditChange = (field, value) => {
    // Only update the editableDealer if the value is different from original
    if (value !== dealer[field]) {
      setEditableDealer(prev => ({ ...prev, [field]: value }));
    } else {
      // If value matches original, remove it from editableDealer
      setEditableDealer(prev => {
        const newEditable = { ...prev };
        delete newEditable[field];
        return newEditable;
      });
    }
  };

  useEffect(() => {
    const fetchDealerDetails = async () => {
      const storedUser = localStorage.getItem("user");
      const userData = storedUser ? JSON.parse(storedUser) : null;
      const userId = userData?.id;

      if (!userId) {
        setError("User ID not found in localStorage.");
        setLoading(false);
        return;
      }

      try {
        const response = await users.get(`/${userId}`);
        setDealer(response.data);

        const propertiesResponse = await property.get(`/user/${userId}`);
        setPropertiesList(propertiesResponse.data || []);
      } catch (err) {
        setError("Failed to fetch dealer details. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchDealerDetails();
  }, []);

  if (loading) return <Spinner animation="border" variant="warning" />;
  if (error) return <Alert variant="danger">{error}</Alert>;
  if (!dealer) return <p className="text-muted">Dealer not found.</p>;

  return (
    <Container className="py-5">
      {/* Dealer Profile */}
      <Row className="align-items-center bg-white shadow p-4 rounded mb-4">
        <Col md={3} className="text-center">
          <Image
            src={
              editMode && editableDealer.avatar 
                ? editableDealer.avatar 
                : dealer.avatar || "/default-avatar.jpg"
            }
            fluid
            className="rounded-circle border border-warning mb-2"
            style={{ width: "150px", height: "150px", objectFit: "cover" }}
          />
          {editMode && (
            <input
              type="text"
              className="form-control mt-2"
              placeholder="Image URL"
              value={editableDealer.avatar || dealer.avatar || ""}
              onChange={(e) => handleEditChange('avatar', e.target.value)}
            />
          )}
        </Col>

        <Col md={9}>
          {editMode ? (
            <>
              <input
                type="text"
                className="form-control mb-2"
                placeholder="Name"
                value={editableDealer.name || dealer.name || ""}
                onChange={(e) => handleEditChange('name', e.target.value)}
              />
              <input
                type="email"
                className="form-control mb-2"
                placeholder="Email"
                value={editableDealer.email || dealer.email || ""}
                onChange={(e) => handleEditChange('email', e.target.value)}
              />
              <input
                type="text"
                className="form-control mb-2"
                placeholder="Phone Number"
                value={editableDealer.phoneNumber || dealer.phoneNumber || ""}
                onChange={(e) => handleEditChange('phoneNumber', e.target.value)}
              />
              <Button variant="success" size="sm" onClick={handleUpdate}>
                Save
              </Button>{" "}
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setEditMode(false)}
              >
                Cancel
              </Button>
            </>
          ) : (
            <>
              <h2 className="fw-bold text-primary">{dealer.name}</h2>
              <p>
                <FaEnvelope className="me-2 text-secondary" /> {dealer.email}
              </p>
              <p>
                <FaPhone className="me-2 text-secondary" /> +
                {dealer.phoneNumber}
              </p>
              <p className="fw-bold text-muted">{dealer.role?.toUpperCase()}</p>
              <Button
                variant="outline-warning"
                size="sm"
                onClick={() => {
                  setEditMode(true);
                  setEditableDealer({});
                }}
              >
                Edit Profile
              </Button>
            </>
          )}
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

      {/* Property Listings Header */}
      <Row className="d-flex justify-content-between align-items-center mt-4">
        <Col>
          <h4 className="fw-bold text-dark">Properties Listed</h4>
        </Col>
        <Col className="text-end">
          <Button variant="primary" onClick={() => navigate("/add-property")}>
            {dealer.role === "contractor"
              ? "+ Add Portfolio"
              : "+ Add Property"}
          </Button>
        </Col>
      </Row>

      {/* Property Cards */}
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
                  <div className="d-flex justify-content-between">
                    <Button
                      variant="outline-primary"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/propertydetail/${property.id}`);
                      }}
                    >
                      View Details
                    </Button>

                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(property.id);
                      }}
                    >
                      Delete
                    </Button>
                  </div>
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

export default NewDashboard;
