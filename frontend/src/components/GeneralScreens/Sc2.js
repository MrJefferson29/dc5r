import React, { useState } from "react";
import styled from "styled-components";
import { Row, Col, Container } from "react-bootstrap";
import { FiMail, FiMessageSquare, FiTrendingUp } from "react-icons/fi";
import TestimonialSlider from "./Testimonies";
import verifies from "../../Assets/nas3.jpg";
import big1 from "../../Assets/nas2.jpg";
import big2 from "../../Assets/big2.jpg";
import { useNavigate } from "react-router-dom";

export default function Sc2() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (email.trim() === "") {
      alert("Please enter your email.");
    } else {
      alert(`Performance updates activated for ${email}!`);
      setEmail("");
    }
  };

  return (
    <Styles>
      {/* Editorial Content Section - Refocused on Performance Parts */}
      <Container className="content-container">
        <Row className="editorial-row align-items-center">
          <Col lg={6}>
            <div className="editorial-img-wrapper">
              <img src={big1} alt="Precision Engineering" />
              <div className="accent-bar" />
            </div>
          </Col>
          <Col lg={6}>
            <div className="editorial-content">
              <span className="pre-title"><FiTrendingUp /> Peak Performance</span>
              <h2>Track Tested. <br />Street Legal.</h2>
              <p>
                Every component in our catalog undergoes rigorous stress testing 
                on the Nürburgring. We don't just sell parts; we provide the 
                mechanical edge required to shave seconds off your lap time.
              </p>
              <button className="carbon-btn" onClick={() => navigate("/about")}>
                View Technical Specs
              </button>
            </div>
          </Col>
        </Row>
      </Container>

      {/* CUSTOMER REVIEWS - Matching the Dark Mode mobile screenshot */}
      <div className="reviews-section">
        <Container>
          <div className="section-header white">
            <h3>Customer Reviews</h3>
            <div className="red-line" />
          </div>
          
          <div className="testimonial-card-main">
             <span className="quote-icon">“</span>
             <p className="review-text">
               "Great communication, fast shipping and high quality. When I 
               unwrapped the box, I felt like a kid at Christmas. I highly 
               recommend buying from here. I definitely will be back for more!"
             </p>
             <h5 className="reviewer-name">— Aaron B.</h5>
          </div>

          <div className="review-pagination">
             <span className="p-dot active" />
             {[...Array(7)].map((_, i) => <span key={i} className="p-dot" />)}
          </div>
        </Container>
      </div>

      {/* Newsletter Section - High Tech Glow */}
      <div className="newsletter-section">
        <Container>
          <div className="newsletter-box">
            <div className="icon-badge"><FiMail /></div>
            <h3>Join the Pit Crew</h3>
            <p>Get instant alerts on drop dates for limited edition performance parts and flash sales.</p>
            <div className="form-wrapper">
              <input
                type="email"
                placeholder="ENTER EMAIL FOR EARLY ACCESS"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button onClick={handleSubmit}>Subscribe</button>
            </div>
          </div>
        </Container>
      </div>

      {/* REACH NEW LIMITS BANNER - Matching the bottom of your image */}
      <div className="limits-banner">
        <div className="overlay" />
        <img src={verifies} alt="Reach New Limits" className="parallax-img" />
        <div className="banner-content">
           <h2>Reach New Limits</h2>
           <button onClick={() => navigate("/all-pets")}>Shop Collection</button>
        </div>
      </div>
    </Styles>
  );
}

const Styles = styled.div`
  background-color: #ffffff;

  /* Editorial Section Styling */
  .editorial-row { margin: 6rem 0; }
  
  .editorial-img-wrapper {
    position: relative;
    img { width: 100%; height: 450px; object-fit: cover; filter: grayscale(100%); transition: 0.5s; }
    &:hover img { filter: grayscale(0%); }
    .accent-bar { position: absolute; bottom: -10px; left: -10px; width: 60%; height: 10px; background: #cc0000; }
  }

  .editorial-content {
    padding-left: 4rem;
    .pre-title { color: #cc0000; font-weight: 900; text-transform: uppercase; letter-spacing: 2px; display: flex; align-items: center; gap: 8px; }
    h2 { font-size: 3.5rem; font-weight: 900; text-transform: uppercase; line-height: 1; margin: 1rem 0; color: #111; }
    p { color: #666; font-size: 1.1rem; line-height: 1.6; margin-bottom: 2rem; }
    .carbon-btn { background: #111; color: white; border: none; padding: 1rem 2rem; font-weight: 800; text-transform: uppercase; cursor: pointer; border-left: 4px solid #cc0000; transition: 0.3s; &:hover { background: #cc0000; border-color: #111; } }
  }

  /* REVIEWS SECTION - Dark Theme based on image */
  .reviews-section {
    background: #111;
    color: white;
    padding: 6rem 0;
    text-align: center;

    .section-header {
      margin-bottom: 3rem;
      h3 { text-transform: uppercase; font-weight: 900; letter-spacing: 2px; }
      .red-line { width: 40px; height: 3px; background: #cc0000; margin: 1rem auto; }
    }

    .testimonial-card-main {
      max-width: 800px;
      margin: 0 auto;
      .quote-icon { font-size: 5rem; color: #cc0000; font-family: serif; display: block; height: 50px; }
      .review-text { font-size: 1.4rem; font-style: italic; line-height: 1.8; margin-bottom: 2rem; }
      .reviewer-name { font-weight: 800; text-transform: uppercase; color: #cc0000; }
    }

    .review-pagination {
      display: flex; justify-content: center; gap: 10px; margin-top: 3rem;
      .p-dot { width: 8px; height: 8px; border-radius: 50%; background: #444; }
      .p-dot.active { background: white; width: 20px; border-radius: 4px; }
    }
  }

  /* NEWSLETTER - Industrial Style */
  .newsletter-section {
    background: #f4f4f4;
    padding: 5rem 0;
    text-align: center;
    .icon-badge { font-size: 3rem; color: #cc0000; }
    h3 { font-weight: 900; text-transform: uppercase; font-size: 2.2rem; }
    .form-wrapper {
      max-width: 600px; margin: 2rem auto; display: flex;
      input { flex: 1; padding: 1.2rem; border: 2px solid #111; font-weight: 700; outline: none; }
      button { background: #111; color: white; border: none; padding: 0 3rem; font-weight: 900; text-transform: uppercase; transition: 0.3s; &:hover { background: #cc0000; } }
    }
  }

  /* LIMITS BANNER - Parallax style */
  .limits-banner {
    position: relative;
    height: 500px;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    color: white;

    .parallax-img { position: absolute; width: 100%; height: 120%; object-fit: cover; top: -10%; z-index: 1; }
    .overlay { position: absolute; inset: 0; background: rgba(0,0,0,0.5); z-index: 2; }
    
    .banner-content {
      position: relative;
      z-index: 3;
      h2 { font-size: 4rem; font-weight: 900; text-transform: uppercase; margin-bottom: 2rem; }
      button { background: transparent; color: white; border: 3px solid white; padding: 1rem 3rem; font-weight: 900; text-transform: uppercase; transition: 0.3s; &:hover { background: white; color: #111; } }
    }
  }

  @media (max-width: 991px) {
    .editorial-content { padding-left: 0; text-align: center; margin-top: 2rem; }
    .banner-content h2 { font-size: 2.5rem; }
    .form-wrapper { flex-direction: column; input { margin-bottom: 1rem; } }
  }
`;