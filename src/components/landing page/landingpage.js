import React from "react";
import "./landingpage.css";  // Importing custom styles

function Landing() {
  return (
    <div className="landing-container">
      <header className="landing-header">
        <div className="logo">RealEstate</div>
        <nav>
          <ul>
            <li><a href="#properties">Properties</a></li>
            <li><a href="#contractors">Contractors</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </nav>
      </header>

      <section className="hero">
        <div className="hero-content">
          <div className="hero-title">Find Your Dream Property</div>
          <div className="hero-description">Explore properties listed by dealers and contractors to build your ideal home.</div>
          <button className="cta-button">Start Exploring</button>
        </div>
      </section>

      <section id="properties" className="section">
        <div className="section-title">Property Dealers</div>
        <div className="property-list">
          <div className="property-card">
            <img src="https://via.placeholder.com/150" alt="Property" />
            <div className="card-title">Property Dealer 1</div>
            <div className="card-description">Explore beautiful properties in the city center.</div>
          </div>
          <div className="property-card">
            <img src="https://via.placeholder.com/150" alt="Property" />
            <div className="card-title">Property Dealer 2</div>
            <div className="card-description">Find your dream home with affordable prices.</div>
          </div>
          {/* More Property Cards */}
        </div>
      </section>

      <section id="contractors" className="section">
        <div className="section-title">Contractors</div>
        <div className="contractor-list">
          <div className="contractor-card">
            <img src="https://via.placeholder.com/150" alt="Contractor" />
            <div className="card-title">Contractor 1</div>
            <div className="card-description">Build your dream home with the best materials and designs.</div>
          </div>
          <div className="contractor-card">
            <img src="https://via.placeholder.com/150" alt="Contractor" />
            <div className="card-title">Contractor 2</div>
            <div className="card-description">Renovating and building homes with excellence.</div>
          </div>
          {/* More Contractor Cards */}
        </div>
      </section>

      <section id="contact" className="contact-section">
        <div className="contact-title">Contact Us</div>
        <form className="contact-form">
          <input type="text" className="contact-input" placeholder="Your Name" required />
          <input type="email" className="contact-input" placeholder="Your Email" required />
          <textarea className="contact-textarea" placeholder="Your Message" required></textarea>
          <button type="submit" className="cta-button">Send Message</button>
        </form>
      </section>

      <footer className="landing-footer">
        <div className="footer-text">© 2025 RealEstate. All rights reserved.</div>
      </footer>
    </div>
  );
}

export default Landing;
