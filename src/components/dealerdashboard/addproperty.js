import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Alert, Spinner, Row, Col, Card } from "react-bootstrap";
import { property } from "../../utils/axios";

const AddProperty = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    type: "Home",
    location: { city: "", address: "", area: "", unit: "Marla" },
    price: "",
    isNegotiable: false,
    features: { bedrooms: 0, bathrooms: 0, floors: 1, garage: false },
    contactNumber: "",
    images: [],
    videos: [],
    status: "Available",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLocationChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      location: { ...formData.location, [name]: value },
    });
  };

  const handleFeatureChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      features: { ...formData.features, [name]: Number(value) },
    });
  };

  const handleFileChange = (e, type) => {
    const files = Array.from(e.target.files);
    const fileUrls = files.map((file) => URL.createObjectURL(file)); // Convert to temporary URLs
    setFormData({ ...formData, [type]: fileUrls });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const storedUser = localStorage.getItem("user");
      const userData = storedUser ? JSON.parse(storedUser) : null;
      const userId = userData?.id;

      if (!userId) throw new Error("User ID not found!");

      const newProperty = { ...formData, listedBy: userId };
      await property.post("/", newProperty);
      navigate("/newdashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add property.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="container py-5"
      style={{
        backgroundColor: "#121212",
        color: "#FFA500",
        borderRadius: "10px",
        padding: "30px",
      }}
    >
      <h2 className="mb-4" style={{ textAlign: "center", fontWeight: "bold" }}>
        Add New Property
      </h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Type</Form.Label>
              <Form.Select
                name="type"
                value={formData.type}
                onChange={handleChange}
              >
                <option value="Home">Home</option>
                <option value="Plot">Plot</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>

        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <h5>Location</h5>
        <Row>
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>City</Form.Label>
              <Form.Control
                type="text"
                name="city"
                value={formData.location.city}
                onChange={handleLocationChange}
                required
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                name="address"
                value={formData.location.address}
                onChange={handleLocationChange}
                required
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>Area</Form.Label>
              <Form.Control
                type="number"
                name="area"
                value={formData.location.area}
                onChange={handleLocationChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>

        <Form.Group className="mb-3">
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Contact Number</Form.Label>
          <Form.Control
            type="text"
            name="contactNumber"
            value={formData.contactNumber}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Upload Property Images</Form.Label>
          <Form.Control
            type="file"
            multiple
            accept="image/*"
            onChange={(e) => handleFileChange(e, "images")}
          />
        </Form.Group>

        <Button
          variant="warning"
          type="submit"
          disabled={loading}
          style={{ width: "100%" }}
        >
          {loading ? <Spinner size="sm" animation="border" /> : "Add Property"}
        </Button>
      </Form>
    </div>
  );
};

export default AddProperty;
