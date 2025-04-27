import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Input, Button, message } from "antd";
import { users, contact } from "../../utils/axios";
import { StarFilled, StarTwoTone } from "@ant-design/icons";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./landingpage.css";

function Landing() {
  const navigate = useNavigate();
  const [dealers, setDealers] = useState([]);
  const [contractors, setContractors] = useState([]);
  const [filteredDealers, setFilteredDealers] = useState([]);
  const [filteredContractors, setFilteredContractors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        const [dealersRes, contractorsRes] = await Promise.all([
          users.get("?role=dealer"),
          users.get("?role=contractor"),
        ]);

        if (isMounted) {
          const allDealers = dealersRes.data.results;
          const allContractors = contractorsRes.data.results;

          const uniqueDealers = allDealers.filter(
            (dealer, index, self) =>
              index === self.findIndex((d) => d.id === dealer.id)
          );

          const uniqueContractors = allContractors
            .filter((c) => !uniqueDealers.find((d) => d.id === c.id))
            .filter(
              (contractor, index, self) =>
                index === self.findIndex((c) => c.id === contractor.id)
            );

          setDealers(uniqueDealers);
          setContractors(uniqueContractors);
          setFilteredDealers(uniqueDealers);
          setFilteredContractors(uniqueContractors);
        }
      } catch (err) {
        console.error("Fetch Error:", err);
        message.error("Failed to load data. Please refresh the page.");
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleNavigate = (role, id) => {
    navigate(`/${role}s/${id}`);
  };

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      await contact.post("/", values);
      message.success("Your message has been sent successfully!");
    } catch (error) {
      console.error("Contact Form Error:", error);
      message.error("Failed to send message. Please try again.");
    }
    setLoading(false);
  };

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);

    if (!value) {
      setFilteredDealers(dealers);
      setFilteredContractors(contractors);
      return;
    }

    const filterAddress = (user) => {
      if (!user.agencyAddress || !user.agencyAddress.length) return false;
      const address = user.agencyAddress[0];
      const addressFields = [
        address.street,
        address.city,
        address.state,
        address.zipCode,
        address.country,
      ];
      return addressFields.some(
        (field) => field && field.toLowerCase().includes(value)
      );
    };

    setFilteredDealers(dealers.filter(filterAddress));
    setFilteredContractors(contractors.filter(filterAddress));
  };

  return (
    <div className="landing-container">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Find Your Dream Property</h1>
          <p>Explore properties listed by dealers and contractors.</p>
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search by address..."
              value={searchTerm}
              onChange={handleSearch}
            />
            <button type="submit">Search</button>
          </div>
        </div>
      </section>

      {/* Dealers Section */}
      <section id="dealers" className="section">
        <h2>Property Dealers</h2>
        <hr/>
        {filteredDealers.length ? (
          <div className="card-grid">
            {filteredDealers.map((dealer) => (
              <div
                key={dealer.id}
                className="property-card"
                onClick={() => handleNavigate("dealer", dealer.id)}
              >
                <img
                  src={dealer.avatar || " "}
                  alt={dealer.name}
                  onError={(e) => (e.target.src = " ")}
                />
                <h3>{dealer.name}</h3>
                <p>{dealer.description || "No description available"}</p>
                <div className="product-ratings-left">
                  <div className="reviews">
                    <h4 style={{ fontWeight:'bold'}}>Reviews:</h4>
                  </div>
                  <span className="stars">
                    <StarFilled />
                    <StarFilled />
                    <StarFilled />
                    <StarFilled />
                    <StarTwoTone twoToneColor="#fadb14" />
                  </span>
                </div>
                <div style={{textAlign:'left',fontWeight:'bold'}}>Total Listing: 02</div>
              </div>
            ))}
          </div>
        ) : (
          <p>No dealers found.</p>
        )}
      </section>

      {/* Contractors Section */}
      <section id="contractors" className="section">
        <h2>Contractors</h2>
        <hr/>
        {filteredContractors.length ? (
          <div className="card-grid">
            {filteredContractors.map((contractor) => (
              <div
                key={contractor.id}
                className="contractor-card"
                onClick={() => handleNavigate("contractor", contractor.id)}
              >
                <img
                  src={contractor.avatar || " "}
                  alt={contractor.name}
                  onError={(e) => (e.target.src = " ")}
                />
                <h3>{contractor.name}</h3>
                <p>{contractor.description || "No description available"}</p>
                <div className="product-ratings-left">
                  <div className="reviews">
                    <h4>Reviews:</h4>
                  </div>
                  <span className="stars">
                    <StarFilled />
                    <StarFilled />
                    <StarFilled />
                    <StarFilled />
                    <StarTwoTone twoToneColor="#fadb14" />
                  </span>
                </div>
                <div style={{textAlign:'left',fontWeight:'bold'}}>Total Listing: 05</div>
              </div>
            ))}
          </div>
        ) : (
          <p>No contractors found.</p>
        )}
      </section>

      {/* Contact Us Section */}
      <section id="contact" className="contact-section">
        <div className="contact-title">Contact Us</div>
        <Form
          className="contact-form"
          onFinish={handleSubmit}
          layout="vertical"
        >
          <Form.Item
            name="name"
            rules={[{ required: true, message: "Please enter your name" }]}
          >
            <Input placeholder="Your Name" className="contact-input" />
          </Form.Item>

          <Form.Item
            name="email"
            rules={[{ required: true, message: "Please enter your email" }]}
          >
            <Input placeholder="Your Email" className="contact-input" />
          </Form.Item>

          <Form.Item
            name="message"
            rules={[{ required: true, message: "Please enter your message" }]}
          >
            <Input.TextArea
              placeholder="Your Message"
              rows={4}
              className="contact-textarea"
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              block
              className="contact-btn"
            >
              Send Message
            </Button>
          </Form.Item>
        </Form>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>
          &copy; {new Date().getFullYear()} Prime Ghar. All rights reserved.
        </p>
      </footer>
    </div>
  );
}

export default Landing;
