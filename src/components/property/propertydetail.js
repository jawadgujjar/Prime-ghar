import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Carousel,
  Card,
  ListGroup,
  Button,
  Image,
} from "react-bootstrap";
import {
  property as propertyApi,
  user as userApi,
  users,
} from "../../utils/axios"; // User API import

function PropertyDetail() {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [postedBy, setPostedBy] = useState(null);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const response = await propertyApi.get(`/${id}`);
        setProperty(response.data);
        console.log(response.data);
        // Fetch user details based on listedby ID
        if (response.data.listedBy) {
          fetchUser(response.data.listedBy);
        }
      } catch (error) {
        console.error("Error fetching property:", error);
      }
    };

    const fetchUser = async (userId) => {
      try {
        const userResponse = await users.get(`/${userId}`);
        setPostedBy(userResponse.data);
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchProperty();
  }, [id]);

  if (!property) return <p>Loading property details...</p>;

  return (
    <Container className="mt-4">
      {/* Owner Section */}
      {postedBy && (
        <Card className="mb-4 shadow-sm p-3">
          <Row className="align-items-center">
            <Col xs={3} className="text-center">
              <Image
                src={postedBy.avatar || "/default-avatar.jpg"}
                roundedCircle
                width={80}
                height={80}
                alt="User"
              />
            </Col>
            <Col xs={9}>
              <h5 className="mb-0">{postedBy.name}</h5>
              <p className="text-muted mb-1">{postedBy.email}</p>
              <div className="d-flex gap-2 mt-2">
                <Button variant="primary">📞 Call Now</Button>
                <Button variant="success">💬 Message</Button>
              </div>
            </Col>
          </Row>
        </Card>
      )}

      <Row className="g-4">
        {/* Left Side - Image Carousel */}
        <Col md={6}>
          <Carousel>
            {property.images.map((img, index) => (
              <Carousel.Item key={index}>
                <img
                  src={img}
                  className="d-block w-100"
                  alt={`Property ${index + 1}`}
                  style={{ maxHeight: "400px", objectFit: "cover" }}
                />
              </Carousel.Item>
            ))}
          </Carousel>
        </Col>

        {/* Right Side - Property Details */}
        <Col md={6}>
          <Card className="shadow-sm p-3">
            <Card.Body>
              <Card.Title className="fw-bold">{property.title}</Card.Title>
              <h4 className="text-success">
                Rs. {property.price} {property.isNegotiable && "(Negotiable)"}
              </h4>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <strong>Type:</strong> {property.type}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Location:</strong> {property.location.city},{" "}
                  {property.location.address}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Area:</strong> {property.location.area}{" "}
                  {property.location.unit}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Description:</strong> {property.description}
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>

          <Card className="mt-3 shadow-sm p-3">
            <Card.Body>
              <Card.Title>Features</Card.Title>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  🛏 Bedrooms: {property.features.bedrooms}
                </ListGroup.Item>
                <ListGroup.Item>
                  🚽 Bathrooms: {property.features.bathrooms}
                </ListGroup.Item>
                <ListGroup.Item>
                  🏠 Floors: {property.features.floors}
                </ListGroup.Item>
                <ListGroup.Item>
                  🚗 Garage: {property.features.garage ? "Yes" : "No"}
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default PropertyDetail;
