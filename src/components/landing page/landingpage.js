import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Input, Button, message } from "antd";
import { users, contact } from "../../utils/axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./landingpage.css";

function Landing() {
  const navigate = useNavigate();
  const [dealers, setDealers] = useState([]);
  const [contractors, setContractors] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    users
      .get("?role=dealer")
      .then((res) => setDealers(res.data.results))
      .catch((err) => console.error("Dealers Fetch Error:", err));

    users
      .get("?role=contractor")
      .then((res) => setContractors(res.data.results))
      .catch((err) => console.error("Contractors Fetch Error:", err));
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

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 768, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <div className="landing-container">
      <section className="hero">
        <div className="hero-content">
          <h1>Find Your Dream Property</h1>
          <p>Explore properties listed by dealers and contractors.</p>
        </div>
      </section>

      {/* Dealers Section */}
      <section id="dealers" className="section">
        <h2>Property Dealers</h2>
        {dealers.length > 0 ? (
          <Slider {...sliderSettings}>
            {dealers.map((dealer) => (
              <div
                key={dealer.id}
                className="property-card"
                onClick={() => handleNavigate("dealer", dealer.id)}
              >
                <img
                  src={dealer.avatar || "https://via.placeholder.com/150"}
                  alt={dealer.name}
                />
                <h3>{dealer.name}</h3>
                <p>{dealer.description}</p>
              </div>
            ))}
          </Slider>
        ) : (
          <p>No dealers found.</p>
        )}
      </section>

      {/* Contractors Section */}
      <section id="contractors" className="section">
        <h2>Contractors</h2>
        {contractors.length > 0 ? (
          <Slider {...sliderSettings}>
            {contractors.map((contractor) => (
              <div
                key={contractor.id}
                className="contractor-card"
                onClick={() => handleNavigate("contractor", contractor.id)}
              >
                <img
                  src={contractor.avatar || "https://via.placeholder.com/150"}
                  alt={contractor.name}
                />
                <h3>{contractor.name}</h3>
                <p>{contractor.description}</p>
              </div>
            ))}
          </Slider>
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
            rules={[
              { required: true, message: "Please enter your email" },
              { type: "email", message: "Enter a valid email" },
            ]}
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
