import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { users } from "../../utils/axios";
import { Card, Container, Spinner, Alert } from "react-bootstrap";

function SearchPage() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchLocation = queryParams.get("location")?.toLowerCase().trim();

  const [dealer, setDealer] = useState(null);
  const [contractor, setContractor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [dealersRes, contractorsRes] = await Promise.all([
          users.get("?role=dealer"),
          users.get("?role=contractor"),
        ]);

        const filteredDealers = dealersRes.data.results.filter(d =>
          d.location?.toLowerCase().includes(searchLocation)
        );
        const filteredContractors = contractorsRes.data.results.filter(c =>
          c.location?.toLowerCase().includes(searchLocation)
        );

        setDealer(filteredDealers[0] || null);
        setContractor(filteredContractors[0] || null);
      } catch (err) {
        setError("Failed to load search results. Please try again.");
        console.error("Search Error:", err);
      } finally {
        setLoading(false);
      }
    };

    if (searchLocation) {
      fetchData();
    }
  }, [searchLocation]);

  if (loading) {
    return (
      <Container className="text-center my-5">
        <Spinner animation="border" role="status" />
        <p className="mt-3">Searching in "{searchLocation}"...</p>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="my-5">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container className="my-5" style={{ maxWidth: "600px" }}>
      <h2 className="text-center mb-5">Search Results for "{searchLocation}"</h2>

      {/* Dealer Section */}
      {dealer ? (
        <Card className="mb-4 shadow-sm">
          <Card.Img
            variant="top"
            src={dealer.avatar || "https://via.placeholder.com/600x200?text=No+Image"}
            style={{ objectFit: "cover", height: "200px" }}
          />
          <Card.Body>
            <h5 className="text-muted mb-2">Dealer</h5>
            <Card.Title>{dealer.name}</Card.Title>
            <Card.Text>
              <strong>Location:</strong> {dealer.location}
            </Card.Text>
            <Card.Text>{dealer.description}</Card.Text>
          </Card.Body>
        </Card>
      ) : (
        <p className="text-center text-muted">No dealer found in "{searchLocation}"</p>
      )}

      {/* Contractor Section */}
      {contractor ? (
        <Card className="mb-4 shadow-sm">
          <Card.Img
            variant="top"
            src={contractor.avatar || "https://via.placeholder.com/600x200?text=No+Image"}
            style={{ objectFit: "cover", height: "200px" }}
          />
          <Card.Body>
            <h5 className="text-muted mb-2">Contractor</h5>
            <Card.Title>{contractor.name}</Card.Title>
            <Card.Text>
              <strong>Location:</strong> {contractor.location}
            </Card.Text>
            <Card.Text>{contractor.description}</Card.Text>
          </Card.Body>
        </Card>
      ) : (
        <p className="text-center text-muted">No contractor found in "{searchLocation}"</p>
      )}
    </Container>
  );
}

export default SearchPage;
